import React, { Fragment } from "react";
import { Link, useRouteMatch, Route } from "react-router-dom";
import { CreateWallet, OpenWallet } from "./";

function Login() {
  const { path, url } = useRouteMatch();

  return (
    <Fragment>
      <Route path={path} exact>
        <div className="flex flex-grow justify-center">
          <div className="my-auto">
            <Link to={`${url}/create`}>
              <button className="bg-xmrorange hover:bg-xmrorange-darker text-white font-bold my-16 mx-8 py-2 px-4 rounded">
                Create new wallet
              </button>
            </Link>
            <Link to={`${url}/open`}>
              <button className="bg-xmrorange hover:bg-xmrorange-darker text-white font-bold my-16 mx-8 py-2 px-4 rounded">
                Open existing wallet
              </button>
            </Link>
          </div>
        </div>
      </Route>
      <Route path={`${path}/create`}>
        <CreateWallet />
      </Route>
      <Route path={`${path}/open`}>
        <OpenWallet />
      </Route>
    </Fragment>
  );
}

export default Login;
