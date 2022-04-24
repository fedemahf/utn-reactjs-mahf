import { useNavigate } from "react-router-dom";
import { RoutePath } from "./RoutesComponent";

interface Props {
  id: string;
  name: string;
  price: string;
  thumbnail: string;
  permalink: string;
}

export default function ProductComponent(props: Props) {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <img alt={props.name} src={props.thumbnail}></img>
        <p>{props.name}</p>
        <p>{props.price}</p>
        <p>
          <button onClick={() => window.open(props.permalink, '_blank')}>Buy</button>
          &nbsp;
          <button onClick={() => navigate(`${RoutePath.PRODUCT}/${props.id}`)}>Details</button>
        </p>
      </div>
    </>
  );
}
