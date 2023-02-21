import React from 'react';
import { LoggedInRouter } from './routers/logged-in-router';
import { LoggedOutRouter } from './routers/logged-out-router';
<<<<<<< HEAD
import { truncate } from 'fs';


function App() {
  // console.log('----------------app---------------');
  // console.log(localStorage.token);
	// return (localStorage.token === undefined ? 
  // <LoggedOutRouter />  :  <LoggedInRouter /> 
  //  );
  // return ( <LoggedOutRouter />);

  const isLoggedIn = true;
=======
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

function App() {
  
  const isLoggedIn = useSelector((state:RootState) => state.isLoggedIn);
>>>>>>> bee1424 (added login)
	return (isLoggedIn? <LoggedInRouter /> : <LoggedOutRouter />);
}


export default App;
 