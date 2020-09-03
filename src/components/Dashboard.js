import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import monerologo from "../images/monero-symbol.png";
import Overview from "./Overview";
import Wallet from "./Wallet";
import Settings from "./Settings";
import Animation from "./Animation";

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

  return (
    <div className="h-full">
      <div className="flex flex-row">
        {/* Sidebar */}
        <nav className="bg-gray-900 h-full w-32 justify-between flex flex-col ">
          <div className="mt-10 pl-4">
            <Link to="/dashboard">
              <img
                src={monerologo}
                className="rounded-full w-10 h-10 mb-3 mx-auto"
              />
            </Link>
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
          {subcomponent}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
