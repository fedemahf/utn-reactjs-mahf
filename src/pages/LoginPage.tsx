import React from "react";
import { useForm, SubmitHandler, UseFormRegisterReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../components/RoutesComponent";
import FirebaseAPI from "../services/FirebaseAPI";
import AuthContext from '../context/AuthContext'

interface Props {}

interface IFormInput {
  email: string;
  password: string;
}

interface FormInputComponentProps {
  label: string;
  type?: string;
  register: UseFormRegisterReturn;
  errors?: any;
};

const FormInputComponent = (props: FormInputComponentProps): JSX.Element => {
  return (
    <div>
      <label>
        {props.label}
        &nbsp;
        <input className="formInput" type={props.type} {...props.register} />
      </label>
      &nbsp;
      {props.errors?.type === 'required' && 'This input is required.'}
    </div>
  );
};

export default function LoginPage(props: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const navigate = useNavigate();
  const context = React.useContext(AuthContext);

  const inputs = [
    {label: 'Email', name: 'email', type: 'text'},
    {label: 'Password', name: 'password', type: 'password'}
  ];

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    let uid: string | undefined;

    try {
      uid = await FirebaseAPI.loginUser(data.email, data.password);
    } catch (error: any) {
      console.error(error.code);
      console.error(error.message);
      alert(`Error loging in! ${error.message}`);
    }

    if (uid) {
      try {
        const userData = await FirebaseAPI.readUser(uid);
        alert(`Welcome ${userData.firstName} ${userData.lastName}!`);
        context.logInUser(userData);
        navigate(RoutePath.HOME);
      } catch (error) {
        alert(`Error reading user data! ${error}`);
      }
    }
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
          <button className="formButton" type="submit">Login</button>
        </form>
      </div>
    </>
  )
}
