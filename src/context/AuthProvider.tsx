import React, { useState } from "react"
import AuthContext from "./AuthContext"
import { FirebaseUserData } from "../services/FirebaseAPI"

interface Props {
  children: React.ReactNode
}

export default function AuthProvider(props: Props) {
  const [loggedIn, setUserLoggedIn] = useState<boolean>(localStorage.getItem("userLoggedIn") === "1");
  const [userInfo, setUserInfo] = useState<FirebaseUserData>(JSON.parse(localStorage.getItem("userInfo") || "{}"));

  const logInUser = (userInfo: FirebaseUserData) => {
    setUserLoggedIn(true);
    setUserInfo(userInfo);
    localStorage.setItem("userLoggedIn", "1");
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }

  const logOutUser = () => {
    setUserLoggedIn(false);
    localStorage.removeItem("userLoggedIn");
  }

  return (
    <AuthContext.Provider
      value={{
          isUserLoggedIn: loggedIn,
          userInfo: userInfo,
          logInUser: logInUser,
          logOutUser: logOutUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
