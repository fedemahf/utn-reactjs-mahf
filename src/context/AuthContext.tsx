import React from "react"
import { FirebaseUserData } from "../services/FirebaseAPI";

export interface IAuth {
  isUserLoggedIn: boolean;
  userInfo?: FirebaseUserData;
  logInUser: (userInfo: FirebaseUserData) => void;
  logOutUser: () => void;
}

const defaultContext: IAuth = {
  isUserLoggedIn: false,
  userInfo: {
    uid: '',
    firstName: '',
    lastName: ''
  },
  logInUser: () => {},
  logOutUser: () => {}
};

const AuthContext = React.createContext<IAuth>(defaultContext);

export default AuthContext
