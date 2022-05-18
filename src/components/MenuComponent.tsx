import React from "react";
import { Link } from "react-router-dom";
import AuthContext, { IAuth } from "../context/AuthContext";
import { RoutePath } from "./RoutesComponent";

const GuestItemsComponent = () => {
  return (
    <>
      <li><Link to={RoutePath.REGISTER}>Register</Link></li>
      <li><Link to={RoutePath.LOGIN}>Login</Link></li>
    </>
  );
}

const UserItemsComponent = (props: { context: IAuth }) => {
  const { context } = props;

  return (
    <>
      <li><Link to={RoutePath.PRODUCT_ADD}>Add product</Link></li>
      <li>
        <Link to={RoutePath.HOME} onClick={() => context.logOutUser()}>Log out</Link> ({context.userInfo?.firstName} {context.userInfo?.lastName})
      </li>
    </>
  );
}

export default function MenuComponent() {
  const context = React.useContext(AuthContext);

  return (
    <>
      <ul>
        <li><Link to={RoutePath.HOME}>Home</Link></li>

        {context.isUserLoggedIn ? (
          <UserItemsComponent context={context} />
        ) : (
          <GuestItemsComponent />
        )}
      </ul>
      <hr />
    </>
  );
}
