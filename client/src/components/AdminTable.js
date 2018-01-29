import React, { Component } from "react";

class AdminTable extends Component {
  render() {
    return (
      <div className="card-body">
        <table className="table table-striped table-sm table-bordered mb-0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Client Name</th>
              <th scope="col">Created At</th>
              <th scope="col">Payment Type</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {this.props.order.orderDetails.map((orderDetail, id2) => {
              return (
                <tr>
                  <th scope="row">{this.props.id + 1}</th>
                  <td>{this.props.name}</td>
                  <td>{this.props.quantity}</td>
                  {/*
                    <OrderDish
                      key={id2}
                      id={id2}
                      name={orderDetail.name}
                      quantity={orderDetail.quantity}
                    />
                   */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AdminTable;
