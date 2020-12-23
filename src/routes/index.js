import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import User from '../pages/User';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/user/:user_login+" component={User} />
  </Switch>
);

export default Routes;
