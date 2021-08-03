import React from "react";
import { Redirect, Route } from "react-router-dom";

//source: https://dev.to/olumidesamuel_/implementing-protected-route-and-authentication-in-react-js-3cl4
/*Component that protects route, only accessible if user is logged */
function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("user");
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;