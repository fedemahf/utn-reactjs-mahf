import React from 'react';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from '../components/RoutesComponent';
import FirebaseAPI, { FirebaseProductData } from '../services/FirebaseAPI';
import FormInputComponent from '../components/FormInputComponent';
import AuthContext from '../context/AuthContext';

interface IFormInput {
  name: string;
  description: string;
  price: number;
}

export default function ProductEditPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const navigate = useNavigate();
  const context = React.useContext(AuthContext);
  const { paramProductId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [productInfo, setProductInfo] = useState<FirebaseProductData>();
  const [error, setError] = useState<string>('');
  const [didSubmit, setDidSubmit] = useState<boolean>(false);

  const inputs = [
    {label: 'Name', name: 'name', type: 'text'},
    {label: 'Description', name: 'description', type: 'text'},
    {label: 'Price', name: 'price', type: 'number'}
  ];

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    if (!productInfo) {
      throw new Error('Product info not found');
    }

    if (didSubmit) {
      window.alert('Form already submitted, please wait!');
      return;
    }

    setDidSubmit(true);

    try {
      const productData: FirebaseProductData = {
        uid: productInfo.uid,
        name: data.name,
        description: data.description,
        price: data.price
      };
      await FirebaseAPI.editProduct(productData);
      window.alert('Product updated! You are going to be redirected to the product page.');
      navigate(`${RoutePath.PRODUCT}/${productInfo?.uid}`);
    } catch (error: any) {
      window.alert(`Error updating product! ${error}`);
    }

    setDidSubmit(false);
  };

  useEffect(() => {
    if (isLoading && paramProductId) {
      FirebaseAPI.getProductById(paramProductId)
        .then(response => setProductInfo(response))
        .catch(error => setError(error.message))
        .finally(() => setIsLoading(false));
    }
  }, [isLoading, paramProductId]);

  if (!context.isUserLoggedIn) {
    return <Navigate to={RoutePath.LOGIN}></Navigate>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error !== '') {
    return <p>Error: {error}</p>;
  }

  if (!productInfo) {
    return <p>Error: Product info not loaded</p>;
  }

  return (
    <>
      <h1>Edit Product</h1>
      <div>
        <h3>{productInfo.name}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          {
            inputs.map((input: any) => (
              <FormInputComponent
                key={input.name}
                label={input.label}
                type={input.type}
                defaultValue={productInfo[input.name as keyof FirebaseProductData]}
                register={{...register(input.name, { required: true })}}
                errors={errors[input.name as keyof typeof errors]}
              />
            ))
          }
          <button className="formButton" type="button" onClick={() => navigate(`${RoutePath.PRODUCT}/${productInfo.uid}`)}>Cancel</button>
          {' '}
          <button className="formButton" type="submit" disabled={didSubmit}>Save</button>
        </form>
      </div>
    </>
  );
}
