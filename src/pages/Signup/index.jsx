import React, { useState } from "react";
import Login from "./Signup.tsx";
import Info from "./RegistrationInfo.tsx";

function Signup() {
  const [showInfo, setShowInfo] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div>
      {showInfo ? (
        <Info stateSetterInfo={setShowInfo} stateSetterCreate={setShowLogin} />
      ) : null}
      {showLogin ? <Login /> : null}
    </div>
  );
}

export default Signup;
