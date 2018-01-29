import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      session: localStorage.getItem("tokenAuth")
        ? JSON.parse(sessionStorage.getItem("tokenAuth"))
        : false
    };

    this.signOutUser = this.signOutUser.bind(this);
  }

  signOutUser(event) {
    event.preventDefault();
    localStorage.removeItem("tokenAuth");
    this.props.history.push("/");
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
        <div className="container">
          <a className="navbar-brand" href="/">
            React App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  About
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="/manage-orders" className="nav-link">
                  Orders
                </a>
              </li>

              <li className="nav-item">
                <a href="/add-order" className="nav-link">
                  Add Order
                </a>
              </li>

              <li className="nav-item">
                <a href="/admin" className="nav-link">
                  Admin
                </a>
              </li>

              <li className="nav-item">
                <a href="/login" className="nav-link">
                  Login
                </a>
              </li>

              <li className="nav-item">
                <a href="/register" className="nav-link">
                  Register
                </a>
              </li>

              <li className="nav-item" onClick={this.signOutUser}>
                <a className="nav-link">Log Out</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
