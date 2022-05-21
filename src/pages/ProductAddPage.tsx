import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { RoutePath } from '../components/RoutesComponent';
import FirebaseAPI from '../services/FirebaseAPI';
import FormInputComponent from '../components/FormInputComponent';
import AuthContext from '../context/AuthContext';

interface IFormInput {
  name: string;
  description: string;
  price: number;
}

export default function ProductAddPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const navigate = useNavigate();
  const context = React.useContext(AuthContext);
  const [didSubmit, setDidSubmit] = React.useState<boolean>(false);

  const inputs = [
    {label: 'Name', name: 'name', type: 'text'},
    {label: 'Description', name: 'description', type: 'text'},
    {label: 'Price', name: 'price', type: 'number'}
  ];

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    if (didSubmit) {
      window.alert('Form already submitted, please wait!');
      return;
    }

    setDidSubmit(true);

    try {
      const documentId = await FirebaseAPI.saveProduct(data);
      window.alert('Product created! You are going to be redirected to the product page.');
      navigate(`${RoutePath.PRODUCT}/${documentId}`);
    } catch (error: any) {
      window.alert(`Error creating product! ${error}`);
    }

    setDidSubmit(false);
  };

  const renderInputs = () => {
    return inputs.map((input: any) => (
      <FormInputComponent
        key={input.name}
        label={input.label}
        type={input.type}
        register={{...register(input.name, { required: true })}}
        errors={errors[input?.name as keyof typeof errors]}
      />
    ));
  };

  if (!context.isUserLoggedIn) {
    return <Navigate to={RoutePath.LOGIN}></Navigate>;
  }

  return (
    <>
      <h1>Add Product</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderInputs()}
          <button className="formButton" type="submit" disabled={didSubmit}>Add</button>
        </form>
      </div>
    </>
  );
}
