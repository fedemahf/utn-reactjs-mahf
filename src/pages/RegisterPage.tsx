import { useForm, SubmitHandler, UseFormRegisterReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../components/RoutesComponent";
import FirebaseAPI from "../services/FirebaseAPI"

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
  let navigate = useNavigate();

  const inputs = [
    {label: 'First name', name: 'firstName', type: 'text'},
    {label: 'Last name', name: 'lastName', type: 'text'},
    {label: 'Email', name: 'email', type: 'text'},
    {label: 'Password', name: 'password', type: 'password'}
  ];

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    try {
      await FirebaseAPI.createUser(data.email, data.password);
      alert(`Registered as ${data.firstName} ${data.lastName}! Email: ${data.email}`);
      navigate(RoutePath.HOME);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error', errorCode);
      console.error(errorMessage);
      alert(`Error! ${errorMessage}`);
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
      <h1>Register</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderInputs()}
          <button className="formButton" type="submit">Register</button>
        </form>
      </div>
    </>
  )
}
