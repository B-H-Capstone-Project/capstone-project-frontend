import React from "react";
import { LoggedInRouter } from "./routers/logged-in-router";
import { LoggedOutRouter } from "./routers/logged-out-router";

function App() {
  const isLoggedIn = false;
	return (isLoggedIn? <LoggedInRouter /> : <LoggedOutRouter />);
}

export default App;
