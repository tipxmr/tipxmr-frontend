import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import { close, useWalletDispatch } from "../context/wallet";
import { useAppDispatch } from "../store";
import { actions } from "../store/slices/wallet";

function Logout() {
  const walletDispatch = useWalletDispatch();
  const dispatch = useAppDispatch();

  useEffect(() => {
    walletDispatch(close());
    dispatch(actions.close())
  }, [dispatch, walletDispatch]);

  return <Redirect to="/" />;
}

export default Logout;
