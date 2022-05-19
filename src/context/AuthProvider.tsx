import React, { useState } from 'react';
import AuthContext from './AuthContext';
import { FirebaseUserData } from '../services/FirebaseAPI';

interface Props {
  children: React.ReactNode
}

const getUserInfoFromLocalStorage = (): FirebaseUserData | undefined => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo !== null ? JSON.parse(userInfo) : undefined;
};

export default function AuthProvider(props: Props) {
  const [loggedIn, setUserLoggedIn] = useState<boolean>(localStorage.getItem('userLoggedIn') === '1');
  const [userInfo, setUserInfo] = useState<FirebaseUserData | undefined>(getUserInfoFromLocalStorage());

  const logInUser = (inputUserInfo: FirebaseUserData) => {
    setUserLoggedIn(true);
    setUserInfo(inputUserInfo);
    localStorage.setItem('userLoggedIn', '1');
    localStorage.setItem('userInfo', JSON.stringify(inputUserInfo));
    window.alert(`Welcome, ${inputUserInfo.firstName} ${inputUserInfo.lastName}!`);
  };

  const logOutUser = () => {
    window.alert(`Goodbye, ${userInfo?.firstName} ${userInfo?.lastName}!`);
    setUserLoggedIn(false);
    setUserInfo(undefined);
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userInfo');
  };

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
