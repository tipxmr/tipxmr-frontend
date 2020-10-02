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
      <nav className="px-4 bg-xmrgray-darker w-32 justify-between flex flex-col">
        <div className="items-center">
          <div className="py-4 flex-grow">
            <img
              src={monerologo}
              className="rounded-full shadow-xl bg-white transform transition ease-in-out duration-500 hover:scale-125 hover:rotate-360 w-auto h-10 mb-3 m-auto"
            />
          </div>
          <div className="mt-10 text-white">
            <ul className="space-y-5">
              <li>
                <Link to={`${url}/overview`}>Overview</Link>
              </li>
              <li>
                <Link to={`${url}/wallet`}>Wallet</Link>
              </li>
              <li>
                <Link to={`${url}/settings`}>Settings</Link>
              </li>
              <li>
                <Link to={`${url}/animation`}>Animation</Link>
              </li>
              <li>
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
