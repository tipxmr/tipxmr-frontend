import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

/* import { closeWallet, useWalletDispatch } from "../context/wallet"; */
import useWallet from "../hook/useWallet";

function Logout() {
  const wallet = useWallet();
  useEffect(() => {
    wallet.close();
  }, [wallet]);

  return <Redirect to="/" />;
}

export default Logout;
