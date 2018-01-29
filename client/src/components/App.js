import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import AddOrder from "./AddOrder";
import Orders from "./Orders";
import Admin from "./Admin";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import About from "./About";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" component={Header} />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/add-order" component={AddOrder} />
          <Route path="/manage-orders" component={Orders} />
          <Route path="/admin" component={Admin} />

          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
