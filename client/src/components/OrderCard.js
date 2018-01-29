import React, { Component } from "react";
import OrderDish from "./OrderDish";
import moment from "moment";

class OrderCard extends Component {
  render() {
    return (
      <div className="card border-dark mb-3">
        <div className="card-header border-dark d-flex">
          <div className="mr-auto">
            Name : <strong>{this.props.order.clientName}</strong>
          </div>
          <div className="ml-auto">
            <strong>
              {moment(this.props.order.createdAt).format("DD/MM/YY, HH:mm")}
            </strong>
          </div>
        </div>

        <div className="card-body text-center">
          <table className="table table-striped table-sm table-bordered mb-0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Dish Name</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {this.props.order.orderDetails.map((orderDetail, id2) => {
                return (
                  <OrderDish
                    key={id2}
                    id={id2}
                    name={orderDetail.name}
                    quantity={orderDetail.quantity}
                  />
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="card-footer border-dark d-flex">
          <div className="mx-auto">
            {this.props.order.state === "comanda" ? (
              <button
                onClick={this.props.changeOrderState}
                className="btn btn-warning"
                id={this.props.order._id}
              >
                Mark as : In process
              </button>
            ) : null}
            {this.props.order.state === "in process" ? (
              <button
                onClick={this.props.changeOrderState}
                className="btn btn-success"
                id={this.props.order._id}
              >
                Mark as : Done
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default OrderCard;
