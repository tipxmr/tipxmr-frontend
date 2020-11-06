import React, { useState } from "react";
import CreateWallet from "./CreateWallet";
import Info from "./Info";

function Signup() {
  const [showInfo, setShowInfo] = useState(true);
  const [showCreateWallet, setShowCreateWallet] = useState(false);
  return (
    <div className="w-full container m-auto">
      {showInfo ? (
        <Info
          stateSetterInfo={setShowInfo}
          stateSetterCreate={setShowCreateWallet}
        />
      ) : null}
      {showCreateWallet ? <CreateWallet /> : null}
    </div>
  );
}

export default Signup;
