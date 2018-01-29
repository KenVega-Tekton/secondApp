import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      token: localStorage.getItem("tokenAuth"),
      totalGained: 0
    };
  }

  getOrders() {
    const getOrdersRequest = {
      method: "GET",
      url: "/api/order",
      headers: {
        "x-auth": this.state.token
      },
      json: true
    };

    axios(getOrdersRequest)
      .then((response) => {
        this.setState({
          orders: response.data
        });

        let totalFoo = 0;

        response.data.forEach((order) => {
          totalFoo += order.total;
        });

        this.setState({
          totalGained: totalFoo
        });
        console.log(response);
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  }

  componentWillMount() {
    this.getOrders();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h3 className="text-center">Orders Report</h3>

            <div className="card-body table-responsive text-center">
              <table className="table table-striped table-bordered mb-0">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Client Name</th>
                    <th scope="col">State</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Payment Type</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.orders.map((order, id) => {
                    return (
                      <tr key={id}>
                        <th scope="row">{id + 1}</th>
                        <td>{order.clientName}</td>
                        <td>{order.state}</td>
                        <td>
                          {moment(order.createdAt).format("DD/MM/YY, HH:mm")}
                        </td>
                        <td>{order.paymentType}</td>
                        <td>{order.total}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <th scope="row"> </th>
                    <td colSpan="3"> </td>
                    <td className="table-success">
                      <strong>Cash Flow</strong>
                    </td>
                    <td className="table-success">
                      <strong>{this.state.totalGained}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
