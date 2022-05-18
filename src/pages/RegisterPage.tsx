import React from "react";
import { useForm, SubmitHandler, UseFormRegisterReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../components/RoutesComponent";
import AuthContext from "../context/AuthContext";
import FirebaseAPI, { FirebaseUserData } from "../services/FirebaseAPI"

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

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

interface Props {}

export default function RegisterPage(props: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const navigate = useNavigate();
  const [didSubmit, setDidSubmit] = React.useState<boolean>(false);
  const context = React.useContext(AuthContext);

  const inputs = [
    {label: 'First name', name: 'firstName', type: 'text'},
    {label: 'Last name', name: 'lastName', type: 'text'},
    {label: 'Email', name: 'email', type: 'text'},
    {label: 'Password', name: 'password', type: 'password'}
  ];

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    if (didSubmit) {
      alert(`Form already submitted, please wait!`);
      return;
    }

    let uid: string | undefined;
    setDidSubmit(true);

    try {
      uid = await FirebaseAPI.insertUser(data.email, data.password);
    } catch (error: any) {
      console.error(error.code);
      console.error(error.message);
      alert(`Error creating user! ${error.message}`);
    }

    if (uid) {
      try {
        const userData: FirebaseUserData = { uid: uid, firstName: data.firstName, lastName: data.lastName };
        const documentId = await FirebaseAPI.insertUserData(userData);
        console.log("Document written with ID: ", documentId);
        alert(`Registered as ${data.firstName} ${data.lastName}! Email: ${data.email}`);
        context.logInUser(userData);
        navigate(RoutePath.HOME);
      } catch (error) {
        console.error("Error adding document: ", error);
        alert(`Error adding document! ${error}`);
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
      <h1>Register</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderInputs()}
          <button className="formButton" type="submit" disabled={didSubmit}>Register</button>
        </form>
      </div>
    </>
  )
}
