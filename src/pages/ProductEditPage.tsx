import { useEffect, useState } from "react";
import { useForm, SubmitHandler, UseFormRegisterReturn } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { RoutePath } from "../components/RoutesComponent";
import FirebaseAPI, { FirebaseProductData } from "../services/FirebaseAPI"

interface IFormInput {
  name: string;
  description: string;
  price: number;
};

interface FormInputComponentProps {
  label: string;
  type?: string;
  register: UseFormRegisterReturn;
  errors?: any;
  defaultValue?: string | number | readonly string[];
};

const FormInputComponent = (props: FormInputComponentProps): JSX.Element => {
  return (
    <div>
      <label>
        {props.label}
        &nbsp;
        <input className="formInput" type={props.type} defaultValue={props.defaultValue} {...props.register} />
      </label>
      &nbsp;
      {props.errors?.type === 'required' && 'This input is required.'}
    </div>
  );
};

interface Props {}

export default function ProductEditPage(props: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const navigate = useNavigate();
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
      throw new Error("There is not product info");
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
      window.alert('Document updated! You are going to be redirected to the product page.');
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error !== '') {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1>Add Product</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {
            inputs.map((input: any) => (
              <FormInputComponent
                key={input.name}
                label={input.label}
                type={input.type}
                defaultValue={productInfo?.[input.name as keyof FirebaseProductData]}
                register={{...register(input.name, { required: true })}}
                errors={errors[input.name as keyof typeof errors]}
              />
            ))
          }
          <button className="formButton" type="button" onClick={() => navigate(`${RoutePath.PRODUCT}/${productInfo?.uid}`)}>Cancel</button>
          {' '}
          <button className="formButton" type="submit" disabled={didSubmit}>Save</button>
        </form>
      </div>
    </>
  )
}
