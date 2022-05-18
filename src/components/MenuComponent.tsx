import React from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { RoutePath } from "./RoutesComponent";

const RegisterOrLoginItems = () => {
  const context = React.useContext(AuthContext);
  const navigate = useNavigate();

  const logOutUser = () => {
    context.logOutUser();
    navigate(RoutePath.HOME);
  }

  return context.isUserLoggedIn ? (
    <>
      <li>
        <Link to="#" onClick={() => logOutUser()}>Log out</Link> ({context.userInfo?.firstName} {context.userInfo?.lastName})
      </li>
    </>
  ) : (
    <>
      <li><Link to={RoutePath.REGISTER}>Register</Link></li>
      <li><Link to={RoutePath.LOGIN}>Login</Link></li>
    </>
  );
}

export default function MenuComponent() {
  return (
    <>
      <ul>
        <li><Link to={RoutePath.HOME}>Home</Link></li>
        <RegisterOrLoginItems />
      </ul>
      <hr />
    </>
  );
}
