import React from 'react';
import Signup from "./Signup";
import Login from "./Login";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const App = () => (
  <div>
    <Router>
      <div>
          <Route path='/' exact component={Login}/>
        <Route path="/signup" exact component={Signup} />
      </div>
    </Router>
  </div>
);

export default App;
