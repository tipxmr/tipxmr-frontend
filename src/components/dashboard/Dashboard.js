import React, { useState } from "react";
import monerologo from "../../images/monero-symbol.png";
import Overview from "./Overview";
import Wallet from "../Wallet";
import Settings from "./Settings";
import Animation from "../Animation";
import SyncButton from "./Syncbutton";

function Dashboard() {
  const [dashcomponent, setDashcomponent] = useState("overview");
  let subcomponent;
  if (dashcomponent === "overview") {
    subcomponent = <Overview />;
  } else if (dashcomponent === "wallet") {
    subcomponent = <Wallet />;
  } else if (dashcomponent === "settings") {
    subcomponent = <Settings />;
  } else if (dashcomponent === "animation") {
    subcomponent = <Animation />;
  }

  const [isSynced, setIsSynced] = useState(false);
  let syncedbutton;
  if (isSynced) {
    syncedbutton = <SyncButton synced={true} />;
  } else {
    syncedbutton = <SyncButton synced={false} />;
  }
  return (
    <div className="flex flex-row h-full">
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
      <div className="px-16 py-4 text-gray-700 bg-gray-200 w-screen">
        <div className="w-1/2 mx-auto mb-4 text-gray-200 text-center">
          {syncedbutton}
        </div>
        {subcomponent}
      </div>
    </div>
  );
}

export default Dashboard;
