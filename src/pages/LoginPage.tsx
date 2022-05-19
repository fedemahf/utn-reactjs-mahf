import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../components/RoutesComponent";
import FirebaseAPI from "../services/FirebaseAPI";
import AuthContext from '../context/AuthContext'
import FormInputComponent from '../components/FormInputComponent'

interface IFormInput {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const navigate = useNavigate();
  const context = React.useContext(AuthContext);
  const [didSubmit, setDidSubmit] = React.useState<boolean>(false);

  const inputs = [
    {label: 'Email', name: 'email', type: 'text'},
    {label: 'Password', name: 'password', type: 'password'}
  ];

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    if (didSubmit) {
      window.alert(`Form already submitted, please wait!`);
      return;
    }

    let uid: string | undefined;
    setDidSubmit(true);

    try {
      uid = await FirebaseAPI.getUserId(data.email, data.password);
    } catch (error: any) {
      console.error(error.code);
      console.error(error.message);
      window.alert(`Error loging in! ${error.message}`);
    }

    if (uid) {
      try {
        const userData = await FirebaseAPI.getUserDataById(uid);
        context.logInUser(userData);
        navigate(RoutePath.HOME);
      } catch (error) {
        window.alert(`Error reading user data! ${error}`);
      }
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

  return (
    <>
      <h1>Login</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderInputs()}
          <button className="formButton" type="submit" disabled={didSubmit}>Login</button>
        </form>
      </div>
    </>
  )
}
