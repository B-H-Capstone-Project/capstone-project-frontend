import React from 'react';
import { LoggedInRouter } from './routers/logged-in-router';
import { LoggedOutRouter } from './routers/logged-out-router';
import { truncate } from 'fs';


function App() {
  // console.log('----------------app---------------');
  // console.log(localStorage.token);
	// return (localStorage.token === undefined ? 
  // <LoggedOutRouter />  :  <LoggedInRouter /> 
  //  );
  // return ( <LoggedOutRouter />);

  const isLoggedIn = true;
	return (isLoggedIn? <LoggedInRouter /> : <LoggedOutRouter />);
}


export default App;
 