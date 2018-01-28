import React, { Component } from "react";
import axios from "axios";
import AddOrderRowDish from "./AddOrderRowDish";

class AddOrderDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientName: "",
      paymentType: "cash",
      dishesAvailable: [],
      dishRowSelected: [
        {
          name: "",
          quantity: 1,
          price: 0
        }
      ],
      totalOwed: 0,
      token: localStorage.getItem("tokenAuth")
    };

    this.addRowDish = this.addRowDish.bind(this);
    this.checkingDishName = this.checkingDishName.bind(this);
    this.changeNumberDish = this.changeNumberDish.bind(this);
    this.deleteRowDish = this.deleteRowDish.bind(this);
    this.runFunctionToUpdateTotalPrice = this.runFunctionToUpdateTotalPrice.bind(
      this
    );
    this.sendOrder = this.sendOrder.bind(this);
  }

  getDishes() {
    const getDishesRequest = {
      method: "GET",
      url: "/api/dish",
      headers: {
        "x-auth": this.state.token
      },
      json: true
    };

    axios(getDishesRequest).then(response => {
      this.setState({
        dishesAvailable: response.data
      });
      console.log(response);
    });
  }

  componentWillMount() {
    this.getDishes();
  }

  addRowDish(event) {
    event.preventDefault();

    this.setState({
      dishRowSelected: [
        ...this.state.dishRowSelected,
        { name: "", quantity: 1, price: 0 }
      ]
    });
  }

  deleteRowDish(event) {
    //MEJORAR esta funcion . hay un prolema con asincronia

    event.preventDefault();

    let arrayFoo = this.state.dishRowSelected;

    console.log("antes : ", arrayFoo);
    arrayFoo.splice(event.target.id.slice(10), 1);

    this.setState({
      dishRowSelected: arrayFoo
    });

    this.runFunctionToUpdateTotalPrice();
  }

  checkingDishName(event) {
    let arrayFoo = this.state.dishRowSelected;

    arrayFoo[event.target.id.slice(9)].name = event.target.value;

    let dishFound = this.state.dishesAvailable.find(dish => {
      return dish.name === event.target.value ? dish : 0;
    });

    if (dishFound) {
      arrayFoo[event.target.id.slice(9)].price = dishFound.price;
    } else {
      arrayFoo[event.target.id.slice(9)].price = 0;
    }

    this.setState({
      dishRowSelected: arrayFoo
    });

    this.runFunctionToUpdateTotalPrice();
  }

  changeNumberDish(event) {
    let arrayFoo = this.state.dishRowSelected;

    arrayFoo[event.target.id.slice(13)].quantity = Number(event.target.value);

    this.setState({
      dishRowSelected: arrayFoo
    });

    this.runFunctionToUpdateTotalPrice();
  }

  runFunctionToUpdateTotalPrice() {
    let total = 0;

    this.state.dishRowSelected.forEach(dish => {
      total += dish.price * dish.quantity;
    });

    this.setState({
      totalOwed: total
    });
  }

  sendOrder(event) {
    event.preventDefault();
    console.log(`enviar form`);

    let newOrder = {
      state: "comanda",
      clientName: this.state.clientName,
      paymentType: this.state.paymentType,
      total: this.state.totalOwed,
      orderDetails: this.state.dishRowSelected
    };

    console.log("newOrder que se enviara : ", newOrder);

    const createOrderRequest = {
      method: "POST",
      data: newOrder,
      url: "/api/order",
      headers: {
        "x-auth": this.state.token
      },
      json: true
    };

    axios(createOrderRequest)
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log(err));
  }

  renderDetails() {
    return (
      <div>
        {this.state.dishRowSelected.map((dish, id) => {
          return (
            <AddOrderRowDish
              dish={dish}
              key={id}
              id={id}
              deleteRowDish={this.deleteRowDish}
              checkingDishName={this.checkingDishName}
              changeNumberDish={this.changeNumberDish}
              dishesAvailable={
                this.state.dishesAvailable ? this.state.dishesAvailable : null
              }
            />
          );
        })}

        <datalist id="dishesAvailable">
          {this.state.dishesAvailable
            ? this.state.dishesAvailable.map(dish => (
                <option value={dish.name} key={dish._id} />
              ))
            : null}
        </datalist>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="clientName">Client Name</label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            className="form-control"
            required
            value={this.state.clientName}
            onChange={event => {
              this.setState({ clientName: event.target.value });
            }}
          />
        </div>

        <div className="form-row mt-3 align-items-center">
          <div className="col-6 d-flex justify-content-center">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="paymentType"
                id="inlineRadio1"
                value="card"
                onClick={event => {
                  this.setState({
                    paymentType: "card"
                  });
                }}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Card
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="paymentType"
                id="inlineRadio2"
                value="cash"
                onClick={event => {
                  this.setState({
                    paymentType: "cash"
                  });
                }}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Cash
              </label>
            </div>
          </div>

          <div className="col-4">Number of dishes:</div>
          <div className="col-2">
            <button
              onClick={this.addRowDish}
              className="btn btn-success btn-block"
            >
              <i className="fa fa-plus-circle" />
            </button>
          </div>
        </div>

        <hr />

        {this.renderDetails()}

        <hr />

        <div className="form-group row">
          <label htmlFor="totalOwed" className="col-8 col-form-label">
            Total Owed:
          </label>
          <div className="col-4">
            <input
              type="number"
              className="form-control"
              id="totalOwed"
              name="totalOwed"
              value={this.state.totalOwed}
              readOnly
              required
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.sendOrder}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default AddOrderDetail;
