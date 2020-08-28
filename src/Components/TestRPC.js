import React, { useState, useEffect } from "react";
import monerojs from "monero-javascript";

function TestRPC() {
  const [addr, setAddr] = useState("");
  useEffect(() => {
    const getWallet = async () => {
      let walletWasm = await monerojs.createWalletWasm({
        networkType: "stagenet",
        server: new monerojs.MoneroRpcConnection("http://localhost:38081"),
      });
      setAddr(walletWasm.getMnemonic());
    };
    getWallet();
  }, [addr]);

  // useEffect(() => {
  //   const getAddress = async () => {
  //     let walletRpc = await monerojs.connectToWalletRpc(
  //       "http://localhost:38081"
  //     );

  //     setAddr(walletRpc.createSubaddress());
  //   };
  //   getAddress();
  // }, [addr]);
  return <div>{addr}</div>;
}

export default TestRPC;
