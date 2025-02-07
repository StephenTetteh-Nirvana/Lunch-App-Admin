import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom'
import ProtectedRoutes from '../components/ProtectedRoutes'

// Lazy-loaded components
const AddFoods = lazy(() => import('../pages/AddFoods'));
const ListOfFoods = lazy(() => import('../pages/ListOfFoods'));
const EditProduct = lazy(() => import('../pages/EditProduct'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const Departments = lazy(() => import('../pages/Departments'));
const NotFound = lazy(() => import('../pages/NotFound'));

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/foodList" element={<ListOfFoods />}>
        <Route path=":id" element={<EditProduct />} />
      </Route>

      <Route element={<ProtectedRoutes/>}>
        <Route path='/' element={<AddFoods/>}/>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/departments" element={<Departments />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
