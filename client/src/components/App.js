import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import AddOrder from "./AddOrder";
import Orders from "./Orders";
import Register from "./Register";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/add-order" component={AddOrder} />
          <Route path="/manage-orders" component={Orders} />
          <Route path="/register" component={Register} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
