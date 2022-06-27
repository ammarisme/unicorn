import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import store from "../../store";

const PrivateRoute = () => {
  const state = store.getState()
  const auth = state.IS_LOGGED_IN; // determine if authorized, from context or however you're doing it
  console.log(auth)
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute
