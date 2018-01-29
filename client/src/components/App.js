import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import axios from "axios";

import Header from "./Header";
import AddOrder from "./AddOrder";
import Orders from "./Orders";
import Admin from "./Admin";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import About from "./About";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      token: localStorage.getItem("tokenAuth") || null
    };

    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.signOutUser = this.signOutUser.bind(this);
  }

  // get the current user and set the state
  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    if (this.state.token === null) {
      this.setState({
        currentUser: false
      });
      console.log("no hay token");
      return; // si no hay token. ya ni es necesario realizar request
    }

    const getCurrentUserRequest = {
      method: "GET",
      url: "/users/me",
      headers: {
        "x-auth": this.state.token
      },
      json: true
    };

    axios(getCurrentUserRequest)
      .then((response) => {
        this.setState({
          currentUser: response.data
        });
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  }

  updateCurrentUser(data) {
    this.setState({
      currentUser: data
    });
  }

  signOutUser() {
    localStorage.removeItem("tokenAuth");
    this.setState({
      currentUser: false
    });
  }

  renderHome() {
    if (this.state.currentUser) {
      switch (this.state.currentUser.role) {
        case "chef":
          return Orders;
        case "cajero":
          return AddOrder;
        case "admin":
          return Admin;
        default:
          return Home;
      }
    } else {
      return Home;
    }
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            {/*<Header currentUser={this.state.currentUser} />*/}

            <Route
              path="/"
              render={(props) => (
                <Header
                  currentUser={this.state.currentUser}
                  signOutUser={this.signOutUser}
                  {...props}
                />
              )}
            />

            <Route exact path="/" component={this.renderHome()} />
            <Route path="/about" component={About} />
            <Route path="/add-order" component={AddOrder} />
            <Route path="/manage-orders" component={Orders} />
            <Route path="/admin" component={Admin} />

            <Route path="/register" component={Register} />
            <Route
              path="/login"
              render={(props) => (
                <Login updateCurrentUser={this.updateCurrentUser} {...props} />
              )}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
