import { useForm, SubmitHandler, UseFormRegisterReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../components/RoutesComponent";

interface IFormInput {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
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
        <input type={props.type} {...props.register} />
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

  const onSubmit: SubmitHandler<IFormInput> = data => {
    alert(`Registered as ${data.firstName} ${data.lastName}!`);
    navigate(RoutePath.HOME);
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
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  )
}
