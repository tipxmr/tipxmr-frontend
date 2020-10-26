import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import useWallet from "../hook/useWallet";
import { isNil } from "ramda";

function PrivateRoute({ children, ...props }) {
  const wallet = useWallet();
  const [isAuthenticated, setIsAuthenticated] = useState();
  //const isAuthenticated = !isNil(wallet.wallet) && isNil(wallet.error);
  console.log("privateRoute wallet", wallet);
  const { isPending } = wallet.status;
  useEffect(() => {
    setIsAuthenticated(!isNil(wallet.wallet) && isNil(wallet.error));
  }, [wallet]);
  if (isPending) {
    return null;
  }
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
