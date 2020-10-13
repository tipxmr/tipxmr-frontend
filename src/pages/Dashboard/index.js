import React from "react";
import { useRouteMatch, Route, Link, Redirect } from "react-router-dom";
import monerologo from "../../images/monero-symbol.png";
import Overview from "./Overview";
import Wallet from "./Wallet";
import Settings from "./Settings";
import AnimationSettings from "./AnimationSettings";
import clsx from "clsx";

function Dashboard() {
  const { path, url } = useRouteMatch();
  const liStyle = clsx(["transform", "hover:scale-110"]);

  return (
    <div className="flex flex-grow bg-xmrgray-darker">
      <nav className="px-4 flex-1 shadow-xl">
        <div className="items-center">
          <div className="py-4 flex-grow">
            <img
              src={monerologo}
              className="rounded-full shadow-xl bg-white transform transition ease-in-out duration-500 hover:scale-125 hover:rotate-360 w-auto h-10 mb-3 m-auto"
            />
          </div>
          <div className="mt-10 text-gray-200 text-center">
            <ul className="space-y-6">
              <li className={liStyle}>
                <Link to={`${url}/overview`}>Overview</Link>
              </li>
              <li className={liStyle}>
                <Link to={`${url}/wallet`}>Wallet</Link>
              </li>
              <li className={liStyle}>
                <Link to={`${url}/settings`}>Settings</Link>
              </li>
              <li className={liStyle}>
                <Link to={`${url}/animation`}>Animation</Link>
              </li>
              <li className={liStyle}>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="flex-7">
        <div className="m-16">
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
    </div>
  );
}

export default Dashboard;
