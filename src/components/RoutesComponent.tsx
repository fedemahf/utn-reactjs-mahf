import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProductAddPage from "../pages/ProductAddPage";
import ProductEditPage from "../pages/ProductEditPage";
import ProductPage from "../pages/ProductPage";
import RegisterPage from "../pages/RegisterPage";
import MenuComponent from "./MenuComponent";

export enum RoutePath {
  HOME = '/',
  REGISTER = '/register',
  LOGIN = '/login',
  PRODUCT_ADD = '/product/add',
  PRODUCT_EDIT = '/product/edit',
  PRODUCT = '/product',
}

export default function RoutesComponent() {
  return (
    <BrowserRouter>
      <MenuComponent />
      <Routes>
        <Route path={RoutePath.HOME} element={<HomePage />}/>
        <Route path={RoutePath.REGISTER} element={<RegisterPage />} />
        <Route path={RoutePath.LOGIN} element={<LoginPage />} />
        <Route path={RoutePath.PRODUCT_ADD} element={<ProductAddPage />} />
        <Route path={`${RoutePath.PRODUCT_EDIT}/:paramProductId`} element={<ProductEditPage />} />
        <Route path={`${RoutePath.PRODUCT}/:paramProductId`} element={<ProductPage />} />
        <Route
            path="*"
            element={<Navigate replace to="/" />}
        />
      </Routes>
    </BrowserRouter>
  )
}
