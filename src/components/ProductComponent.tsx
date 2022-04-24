import { Link } from "react-router-dom";

interface Props {
  id: string;
  name: string;
  price: string;
  description?: string;
  children?: any;
  thumbnail: string;
}

export default function ProductComponent(props: Props) {
  return (
    <>
      <div>
        <img alt={props.name} src={props.thumbnail}></img>
        <p>{props.name}</p>
        <p>{props.price}</p>
        <p>{props?.description || ''}</p>
        {props?.children}
        <p>
          <button>Buy</button>
          &nbsp;
          <Link to={`/product/${props.id}`}><button>Details</button></Link>
        </p>
      </div>
    </>
  );
}
