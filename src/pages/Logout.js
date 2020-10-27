import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import { close, useWalletDispatch } from "../context/wallet";
//import useWallet from "../hook/useWallet";

function Logout() {
  const dispatch = useWalletDispatch();
  useEffect(() => {
    dispatch(close());
  }, [dispatch]);

  return <Redirect to="/" />;
}

export default Logout;
