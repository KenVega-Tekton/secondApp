import React, { Component } from "react";

class AddOrderRowDish extends Component {
  render() {
    return (
      <div className="form-row">
        <div className="form-group col-7">
          <label>
            Dish {this.props.id + 1} -> (S/. {this.props.dish.dishPrice})
          </label>
          <input
            type="text"
            className="form-control input-name-dishes"
            list="dishesAvailable"
            required
            autoComplete="off"
            onChange={this.props.checkingDishName}
            id={`inputDish${this.props.id}`}
            value={this.props.dish.dishName}
          />
        </div>
        <div className="form-group col-3">
          <label>Quantity</label>
          <input
            type="number"
            className="form-control"
            defaultValue="1"
            min="1"
            required
            id={`inputQuantity${this.props.id}`}
            onChange={this.props.changeNumberDish}
          />
        </div>

        <div className="form-group col-2">
          <label>¿Ok?</label>
          <button
            onClick={this.props.deleteRowDish}
            className="btn btn-danger btn-block"
            id={`deleteDish${this.props.id}`}
          >
            <i className="fa fa-trash" />
          </button>
        </div>
      </div>
    );
  }
}

export default AddOrderRowDish;
