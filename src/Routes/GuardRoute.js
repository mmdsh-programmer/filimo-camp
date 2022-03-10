import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuth } from '../Helper/Auth';



const GuardRoute = ({ Component, ...rest }) => {
  // we can check user condition here such as role and permission but for now we just check user is login or not
  // const condition = isAuth();
  const condition = false;
  return (
    <>
      {condition ? (
        <Route
          {...rest}
          render={(routeProps) => (

            <Component {...routeProps} />

          )}
        />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
export default GuardRoute;
