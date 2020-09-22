import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { useWalletState } from "../context/wallet";

function PrivateRoute({ children, ...props }) {
  const walletState = useWalletState();
  const isAuthenticated = walletState.wallet;

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
