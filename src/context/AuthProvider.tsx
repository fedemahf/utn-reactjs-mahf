import React, { useState } from "react"
import AuthContext from "./AuthContext"
import { useNavigate } from "react-router-dom"
import { RoutePath } from "../components/RoutesComponent";

interface Props {
  children: JSX.Element
}

export default function AuthProvider(props: Props) {
    const [loggedIn, setUserLoggedIn] = useState<boolean>(localStorage.getItem("loggedIn") === "1");
    const [userInfo, setUserInfo] = useState<any>(JSON.parse(localStorage.getItem("userInfo") || "{}"));
    const navigate = useNavigate();

    const loginUser = (userInfo) => {
      setUserLoggedIn(true);
      setUserInfo(userInfo);
      localStorage.setItem("loggedIn", "1");
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }

    const logoutUser = () => {
      setUserLoggedIn(false);
      localStorage.removeItem("loggedIn");
      navigate(RoutePath.HOME);
    }

    return (
      <AuthContext.Provider
        value={{
            loggedIn,
            userInfo,
            loginUser,
            logoutUser
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );
}
