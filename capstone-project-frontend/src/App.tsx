import React from 'react';
import { LoggedInRouter } from './routers/logged-in-router';
import { LoggedOutRouter } from './routers/logged-out-router';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';


function App() {
	const isAuth = useSelector((state: RootState) => state.auth);
  console.log(isAuth);
	return (isAuth.isLoggedIn? <LoggedInRouter /> : <LoggedOutRouter />);
}


export default App;
 