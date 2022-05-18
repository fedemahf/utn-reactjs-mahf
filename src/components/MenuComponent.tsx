import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { RoutePath } from "./RoutesComponent";

const RegisterOrLoginItems = () => {
  const context = React.useContext(AuthContext);

  return context.isUserLoggedIn ? (
    <>
      <li>
        <Link to="#" onClick={() => context.logOutUser()}>Log out ({context.userInfo?.firstName} {context.userInfo?.lastName})</Link>
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
