import { UseFormRegisterReturn } from "react-hook-form";

export interface FormInputComponentProps {
  label: string;
  type?: string;
  register: UseFormRegisterReturn;
  errors?: any;
  defaultValue?: string | number | readonly string[];
};

export default function FormInputComponent (props: FormInputComponentProps): JSX.Element {
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
