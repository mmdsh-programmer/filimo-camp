// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { isAuth } from '../Helper/Auth';
// import { lazy } from "react";
// const Home = lazy(() => import("pages/Home"));

// const LoginRoute = (props) => {
//   const condition = isAuth();
//   // const condition = false;
//   console.log(props.element);
//   debugger
  
//   return !condition ? <Route path={[...props.path]} element={props.component} /> :  <Route path="/" element={<Home />} />;
// };
// export default LoginRoute;
// // import React from 'react'
// // import { Navigate, Route } from "react-router-dom"
// // import { isAuth } from '../Helper/Auth';



// // export const PrivateRoute = ({ component: Component, ...rest }) => {
// //   const condition = isAuth();
// //     return (
// //         <Route
// //             {...rest}
// //             render={props => 
// //               condition !== null ? (
// //                     <Component {...props} />
// //                 ) : (
// //                     <Navigate to="/register" />
// //                 )
// //             }
// //         />
// //     )
// // }.
import React from 'react'
import { Navigate, Route } from "react-router-dom"
import { isAuth } from '../Helper/Auth';
export function PrivateRoute({ children }) {
  const auth = isAuth();
  return auth ? children : <Navigate to="/register" />;
}