import React from "react";
import { LoggedInRouter } from "./routers/logged-in-router";
import { LoggedOutRouter } from "./routers/logged-out-router";

function App() {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
      fetch('http://localhost:8000/api/v1/user', {
        method: "get",
        credentials: "include",
        headers: {
          // needed so express parser says OK to read
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then(result => {
          console.log(result, 'result')
          if (result.data) {
            setUser(result.data)
          }
        });
    }, []);
  const logout = async () => {
      const response = await fetch('http://localhost:8000/api/v1/logout', {
        method: "get",
        credentials: "include",
        headers: {
          // needed so express parser says OK to read
          'Content-Type': 'application/json'
        },
      })
      const result = await response.json();
      if (result.data) {
        setUser(null)
      }
    }
	return (user? <LoggedInRouter /> : <LoggedOutRouter />);
}

export default App;
