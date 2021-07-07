import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from './LayoutAdmin';

function App() {
  return (
    <div className="AppEmployee">
      <Router>
      <Switch>
        <Route path="/admin" component={Admin} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
