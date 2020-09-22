import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import { closeWallet, useWalletDispatch } from "../context/wallet";

function Logout() {
  const dispatch = useWalletDispatch();

  useEffect(() => {
    dispatch(closeWallet());
  }, [dispatch]);

  return <Redirect to="/" />;
}

export default Logout;
