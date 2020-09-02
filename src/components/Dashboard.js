import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import monerologo from "../images/monero-symbol.png";
import Overview from "./Overview";
import Wallet from "./Wallet";
import Settings from "./Settings";
import Animation from "./Animation";

function Dashboard() {
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
                  <Link to="/dashboard/overview">
                    <span>Overview</span>
                  </Link>
                </li>
                <li className="mb-6">
                  <Link to="/dashboard/wallet">
                    <span>Wallet</span>
                  </Link>
                </li>
                <li className="mb-6">
                  <Link to="settings">
                    <span>Settings</span>
                  </Link>
                </li>
                <li>
                  <Link to="animation">
                    <span>Animation</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="px-16 py-4 text-gray-700 bg-gray-200 w-screen">
          <Router>
            <Route path="/dashboard/overview" exact>
              <Overview />
            </Route>
            <Route path="/dashboard/wallet" exact>
              <Wallet />
            </Route>
            <Route path="/settings" exact>
              <Settings />
            </Route>
            <Route path="/animation" exact>
              <Animation />
            </Route>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
