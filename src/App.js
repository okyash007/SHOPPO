import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Info from './components/Info';
import Checkout from './components/Checkout';

import { useStateValue } from './StateProvider';

function App() {

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Switch>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/info">
            <Info />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
