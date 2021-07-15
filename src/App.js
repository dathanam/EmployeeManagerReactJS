import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from './LayoutAdmin';
import User from './LayoutUser';

function App() {
  return (
      <Router>
      <Switch>
        <Route path="/" exact component={User} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </Router>
  );
}

export default App;
