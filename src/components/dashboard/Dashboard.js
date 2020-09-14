import React, { useState } from "react";
import monerologo from "../../images/monero-symbol.png";
import Overview from "./Overview";
import PropTypes from "prop-types";
import Wallet from "../Wallet";
import Settings from "./Settings";
import Animation from "../Animation";
import AnimationSettings from "./AnimationSettings";

function Dashboard({
  walletFunctions,
  walletVariables,
  streamerConfig,
  setStreamerConfig,
}) {
  const [dashcomponent, setDashcomponent] = useState("overview");
  let subcomponent;
  if (dashcomponent === "overview") {
    subcomponent = <Overview />;
  } else if (dashcomponent === "wallet") {
    subcomponent = (
      <Wallet
        walletFunctions={walletFunctions}
        walletVariables={walletVariables}
      />
    );
  } else if (dashcomponent === "settings") {
    subcomponent = (
      <Settings
        streamerConfig={streamerConfig}
        setStreamerConfig={setStreamerConfig}
      />
    );
  } else if (dashcomponent === "animation") {
    subcomponent = (
      <Animation
        streamerConfig={streamerConfig}
        setStreamerConfig={setStreamerConfig}
      />
    );
  }
  return (
    <div className="flex flex-grow">
      <nav className="bg-gray-900 w-32 justify-between flex flex-col">
        <div className="mt-10 pl-4">
          <div className="w-full mx-auto">
            <button onClick={() => setDashcomponent("overview")}>
              <img src={monerologo} className="rounded-full w-auto h-10 mb-3" />
            </button>
          </div>
          <div className="mt-10 text-white">
            <ul>
              <li className="mb-6">
                <button onClick={() => setDashcomponent("overview")}>
                  Overview
                </button>
              </li>
              <li className="mb-6">
                <button onClick={() => setDashcomponent("wallet")}>
                  Wallet
                </button>
              </li>
              <li className="mb-6">
                <button onClick={() => setDashcomponent("settings")}>
                  Settings
                </button>
              </li>
              <li>
                <button onClick={() => setDashcomponent("animation")}>
                  Animation
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="px-16 py-4 text-gray-700 bg-gray-200 w-full ">
        {subcomponent}
      </div>
    </div>
  );
}
// Defining property types
Dashboard.propTypes = {
  walletFunctions: PropTypes.object,
  walletVariables: PropTypes.object,
  streamerConfig: PropTypes.object,
  setStreamerConfig: PropTypes.func,
};

export default Dashboard;
