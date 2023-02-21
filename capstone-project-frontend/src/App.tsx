import React from 'react';
import { LoggedInRouter } from './routers/logged-in-router';
import { LoggedOutRouter } from './routers/logged-out-router';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

function App() {
  
  const isLoggedIn = useSelector((state:RootState) => state.isLoggedIn);
	return (isLoggedIn? <LoggedInRouter /> : <LoggedOutRouter />);
}


export default App;
 