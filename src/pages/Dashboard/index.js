import React from "react";
import { useRouteMatch, Route, Link, Redirect } from "react-router-dom";

import monerologo from "../../images/monero-symbol.png";

import Overview from "./Overview";
import Wallet from "./Wallet";
import Settings from "./Settings";
import AnimationSettings from "./AnimationSettings";

function Dashboard() {
  const { path, url } = useRouteMatch();

  return (
    <div className="flex flex-grow">
      <nav className="bg-gray-900 w-32 justify-between flex flex-col">
        <div className="mt-10 pl-4">
          <div className="w-full mx-auto">
            <Link to={`${url}/overview`}>
              <img src={monerologo} className="rounded-full w-auto h-10 mb-3" />
            </Link>
          </div>
          <div className="mt-10 text-white">
            <ul>
              <li className="mb-6">
                <Link to={`${url}/overview`}>Overview</Link>
              </li>
              <li className="mb-6">
                <Link to={`${url}/wallet`}>Wallet</Link>
              </li>
              <li className="mb-6">
                <Link to={`${url}/settings`}>Settings</Link>
              </li>
              <li className="mb-6">
                <Link to={`${url}/animation`}>Animation</Link>
              </li>
              <li className="mb-6">
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="px-16 py-4 text-gray-700 bg-gray-200 w-full ">
        <Route exact path={path}>
          <Redirect to={`${path}/overview`} />
        </Route>
        <Route path={`${path}/overview`}>
          <Overview />
        </Route>
        <Route path={`${path}/wallet`}>
          <Wallet />
        </Route>
        <Route path={`${path}/settings`}>
          <Settings />
        </Route>
        <Route path={`${path}/animation`}>
          <AnimationSettings />
        </Route>
      </div>
    </div>
  );
}

export default Dashboard;
