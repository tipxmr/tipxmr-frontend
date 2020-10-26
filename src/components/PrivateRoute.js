import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import useWallet from "../hook/useWallet";
import { isNil } from "ramda";

function PrivateRoute({ children, ...props }) {
  const wallet = useWallet();
  const isAuthenticated = !isNil(wallet.wallet) && isNil(wallet.error);

  return (
    <Route
      {...props}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
