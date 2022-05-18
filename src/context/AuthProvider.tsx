import React, { useState } from "react"
import AuthContext from "./AuthContext"
import { useNavigate } from "react-router-dom"
import { RoutePath } from "../components/RoutesComponent";
import { FirebaseUserData } from "../services/FirebaseAPI"

interface Props {
  children: JSX.Element
}

export default function AuthProvider(props: Props) {
    const [loggedIn, setUserLoggedIn] = useState<boolean>(localStorage.getItem("userLoggedIn") === "1");
    const [userInfo, setUserInfo] = useState<FirebaseUserData>(JSON.parse(localStorage.getItem("userInfo") || "{}"));
    const navigate = useNavigate();

    const loginUser = (userInfo: FirebaseUserData) => {
      setUserLoggedIn(true);
      setUserInfo(userInfo);
      localStorage.setItem("userLoggedIn", "1");
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }

    const logoutUser = () => {
      setUserLoggedIn(false);
      localStorage.removeItem("userLoggedIn");
      navigate(RoutePath.HOME);
    }

    return (
      <AuthContext.Provider
        value={{
            isUserLoggedIn: loggedIn,
            userInfo: userInfo,
            logInUser: loginUser,
            logOutUser: logoutUser
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );
}
