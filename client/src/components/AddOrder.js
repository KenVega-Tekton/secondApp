import React, { Component } from "react";
import AddOrderForm from "./AddOrderForm";

class AddOrder extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            {/*<div className="card card-body">
              <h3 className="text-center">Add Order</h3>
              <AddOrderForm />
            </div>

            <hr />*/}

            <h3 className="text-center">Add Order</h3>
            <AddOrderForm />
          </div>
        </div>
      </div>
    );
  }
}

export default AddOrder;
