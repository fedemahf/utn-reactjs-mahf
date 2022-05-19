import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../components/RoutesComponent";
import FirebaseAPI from "../services/FirebaseAPI"
import FormInputComponent from '../components/FormInputComponent'

interface IFormInput {
  name: string;
  description: string;
  price: number;
};

export default function ProductAddPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  let navigate = useNavigate();

  const inputs = [
    {label: 'Name', name: 'name', type: 'text'},
    {label: 'Description', name: 'description', type: 'text'},
    {label: 'Price', name: 'price', type: 'number'}
  ];

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    try {
      const documentId = await FirebaseAPI.saveProduct(data);
      window.alert('Document created! You are going to be redirected to the product page.');
      navigate(`${RoutePath.PRODUCT}/${documentId}`);
    } catch (error: any) {
      window.alert(`Error saving product! ${error}`);
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
      <h1>Add Product</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderInputs()}
          <button className="formButton" type="submit">Add</button>
        </form>
      </div>
    </>
  )
}
