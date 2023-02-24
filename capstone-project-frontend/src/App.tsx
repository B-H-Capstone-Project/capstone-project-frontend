import React from 'react';
import { LoggedInRouter } from './routers/logged-in-router';
import { LoggedOutRouter } from './routers/logged-out-router';
import { truncate } from 'fs';


function App() {
  //const isLoggedIn = useSelector((state:RootState) => state.isLoggedIn);
  const isLoggedIn = true
	return (isLoggedIn? <LoggedInRouter /> : <LoggedOutRouter />);
}


export default App;
 