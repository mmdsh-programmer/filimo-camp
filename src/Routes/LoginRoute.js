import React from 'react'
import { Navigate, Route } from "react-router-dom"
import { isAuth } from '../Helper/Auth';
export function PrivateRoute({ children }) {
  const auth = isAuth();
  return auth ? children : <Navigate to="/register" />;
}