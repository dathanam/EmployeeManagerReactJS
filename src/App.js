import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from './Layout/LayoutAuth';
import Component from './Layout/LayoutAdmin';

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/" exact component={Auth} />
          <Route path="/admin" component={Component} />
        </Switch>
      </Router>
  );
}

export default App;
