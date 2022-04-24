import { Link } from "react-router-dom";
import { RoutePath } from "./RoutesComponent";

interface Props {}

export default function MenuComponent(props: Props) {
  return (
    <ul>
      <li><Link to={RoutePath.HOME}>Home</Link></li>
      <li><Link to={RoutePath.REGISTER}>Register</Link></li>
      <li><Link to={RoutePath.LOGIN}>Login</Link></li>
    </ul>
  );
}
