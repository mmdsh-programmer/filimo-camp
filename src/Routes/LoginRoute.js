import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuth } from '../Helper/Auth';

const LoginRoute = (props) => {
  // const condition = isAuth();
  const condition = false;
  return !condition ? <Route path={[...props.path]} component={props.component} /> : <Navigate to="/" />;
};
export default LoginRoute;
