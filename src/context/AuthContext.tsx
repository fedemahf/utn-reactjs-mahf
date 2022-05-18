import React from "react"

export interface IAuth {
  isUserLoggedIn: boolean;
  logInUser: () => void;
  logOutUser: () => void;
}

const defaultContext: IAuth = {isUserLoggedIn: false, logInUser: () => {}, logOutUser: () => {}};
const AuthContext = React.createContext<IAuth>(defaultContext);

export default AuthContext
