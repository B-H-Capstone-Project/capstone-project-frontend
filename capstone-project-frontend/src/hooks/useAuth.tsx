import React, { createContext, useContext } from 'react';
import AuthContext from '../context/authProvider';


const authContext = createContext({});

export const UseAuth = () => {
  return (useContext(authContext));
}