import React from 'react';
import { LoggedInRouter } from './routers/logged-in-router';
import { LoggedOutRouter } from './routers/logged-out-router';
import { LOCAL_STORAGE_TOKEN } from  '../src/constant'


function App() {
	const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);
	return (isLoggedIn? <LoggedInRouter /> : <LoggedOutRouter />);
}

export default App;
