import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProductPage from "../pages/ProductPage";
import RegisterPage from "../pages/RegisterPage";
import MenuComponent from "./MenuComponent";

interface Props {}

export enum RoutePath {
  HOME = '/',
  REGISTER = '/register',
  LOGIN = '/login',
  PRODUCT = '/product'
}

export default function RoutesComponent(props: Props) {
  return (
    <BrowserRouter>
      <MenuComponent />
      <Routes>
        <Route path={RoutePath.HOME} element={<HomePage />}/>
        <Route path={RoutePath.REGISTER} element={<RegisterPage />} />
        <Route path={RoutePath.LOGIN} element={<LoginPage />} />
        <Route path={`${RoutePath.PRODUCT}/:paramProductId`} element={<ProductPage />} />
        <Route
            path="*"
            element={<Navigate replace to="/" />}
        />
      </Routes>
    </BrowserRouter>
  )
}