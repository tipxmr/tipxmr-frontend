import React from "react";
import { Route, Switch } from "react-router-dom";
import { Paymentmask, Paymentinfo, Paymentrecieved } from "./components";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Paymentinfo} />
    <Route path="/payment" component={Paymentmask} />
    <Route path="/successful" component={Paymentrecieved} />
  </Switch>
);

export default Routes;
