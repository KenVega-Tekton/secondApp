import React, { Component } from "react";

class OrderDish extends Component {
  render() {
    return (
      <tr>
        <th scope="row">{this.props.id + 1}</th>
        <td>{this.props.dishName}</td>
        <td>{this.props.quantity}</td>
      </tr>
    );
  }
}

export default OrderDish;
