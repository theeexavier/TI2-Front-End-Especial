import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Posts from "./Posts";
import Post from "./Post";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className="TopHeader">
            <Link to="/Posts">IPTGram</Link>
          </ul>
        </nav>

        <Route path="/Posts" exact component={Posts} />
        <Route path="/Post/:id" exact component={Post} />
      </div>
    </Router>
  );
}

export default App;
