import React from 'react';
import { LoggedInRouter } from './routers/logged-in-router';
import { LoggedOutRouter } from './routers/logged-out-router';


function App() {
	const token = localStorage.getItem('token');
  //const isLoggedIn = Boolean(token);
  const isLoggedIn = true;
	return (isLoggedIn? <LoggedInRouter /> : <LoggedOutRouter />);
}


export default App;
 