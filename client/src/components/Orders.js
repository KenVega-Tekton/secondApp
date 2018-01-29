import React, { Component } from "react";
import axios from "axios";

import OrderCard from "./OrderCard";

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      token: localStorage.getItem("tokenAuth")
    };

    this.changeOrderState = this.changeOrderState.bind(this);
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
        console.log(response);
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  }

  componentWillMount() {
    this.getOrders();
  }

  changeOrderState(event) {
    let fooArray = this.state.orders;

    let stateNew;

    this.state.orders.find((order, index) => {
      if (order._id === event.target.id) {
        if (fooArray[index].state === "comanda") {
          fooArray[index].state = "in process";
          stateNew = "in process";
        } else if (fooArray[index].state === "in process") {
          fooArray[index].state = "done";
          stateNew = "done";
        } else {
          console.log("algo fue mal");
        }

        this.setState({
          orders: fooArray
        });
        return order;
      } else {
        return false;
      }
    });

    const updateOrderRequest = {
      method: "PUT",
      url: `/api/order/${event.target.id}`,
      data: { state: stateNew },
      headers: {
        "x-auth": this.state.token
      },
      json: true
    };

    axios(updateOrderRequest)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log("error : ", err);
      });

    // para conseguir nuevas ordenes la pagina tendra que ser actualizada periodicamente o tendras que usar algo como websockets
  }

  renderOrders(orderState) {
    if (this.state.orders) {
      return (
        <div>
          {this.state.orders.map((order, id) => {
            if (order.state === orderState) {
              //order.createdAt = new Date(order.createdAt).toDateString();
              return (
                <div key={id}>
                  <OrderCard
                    order={order}
                    id={id}
                    changeOrderState={this.changeOrderState}
                  />
                </div>
              );
            } else {
              return <div key={id /* para evitar warning */} />;
            }
          })}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-lg-6 mx-md-auto mb-2">
            <h3 className="text-center">Orders comanded:</h3>
            {this.renderOrders("comanda")}
          </div>
          <div className="col-md-10 col-lg-6 mx-md-auto">
            <h3 className="text-center ">Orders in process:</h3>
            {this.renderOrders("in process")}
          </div>
        </div>
      </div>
    );
  }
}

export default Orders;
