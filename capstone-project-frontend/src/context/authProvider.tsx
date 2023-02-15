/** @format */

import React, { createContext, useEffect, useState, FC, ReactNode } from 'react';

export const authContext = createContext({});

interface Props {
  children?: ReactNode
}


const AuthProvider: FC<Props> = ({ children }) => {
	const [auth, setAuth] = useState({ loading: true, data: null });
	// we will use loading later

	const setAuthData = (data: any) => {
		setAuth({ loading: false, data: data });
	};
	// a function that will help us to add the user data in the auth;

	useEffect(() => {
		return setAuth({
      loading: false,
      data: JSON.parse(window.localStorage.getItem('authData') || '{}'),
    });
	}, []);

	useEffect(() => {
		window.localStorage.setItem('authData', JSON.stringify(auth.data));
	}, [auth.data]);

	return (
		<authContext.Provider value={{ auth, setAuthData }}>
			{children}
		</authContext.Provider>
	);
};

export default AuthProvider;
