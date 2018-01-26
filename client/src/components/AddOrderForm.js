import React, { Component } from "react";
//import AddOrderDetail from "./AddOrderDetail";
import AddOrderDetail from "./AddOrderDetail";

class AddOrderForm extends Component {
  render() {
    return (
      <form method="post" action="/api/order">
        <AddOrderDetail />
      </form>
    );
  }
}

export default AddOrderForm;
