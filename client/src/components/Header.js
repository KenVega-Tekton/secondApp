import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);

    /*
    this.state = {
      canAccess: this.props.currentUser ? this.props.currentUser.role : false
    };
    */

    this.signOutUser = this.signOutUser.bind(this);
  }

  signOutUser() {
    this.props.signOutUser();
    this.props.history.push("/");
  }

  setHomeRoute() {
    if (this.props.currentUser) {
      switch (this.props.currentUser.role) {
        case "chef":
          return "/manage-orders";
        case "cajero":
          return "/add-order";
        case "admin":
          return "/admin";
        default:
          return null;
      }
    } else {
      return "/";
    }
  }

  renderUserName() {
    if (this.props.currentUser) {
      return (
        <li className="nav-item active">
          <span className="nav-link">
            Welcome {this.props.currentUser.name}
          </span>
        </li>
      );
    }
  }

  renderLinkViews() {
    if (this.props.currentUser) {
      switch (this.props.currentUser.role) {
        case "chef":
          return (
            <li className="nav-item">
              <Link to="/manage-orders" className="nav-link">
                Orders
              </Link>
            </li>
          );
        case "cajero":
          return (
            <li className="nav-item">
              <Link to="/add-order" className="nav-link">
                Add Order
              </Link>
            </li>
          );
        case "admin":
          return (
            <li className="nav-item">
              <Link to="/admin" className="nav-link">
                Admin
              </Link>
            </li>
          );
        default:
          return null;
      }
    } else {
      return null;
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
        <div className="container">
          <Link className="navbar-brand" to={this.setHomeRoute()}>
            React App
          </Link>
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
                <Link to={this.setHomeRoute()} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              {this.renderUserName()}

              {this.renderLinkViews()}

              {!this.props.currentUser ? (
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              ) : null}

              {!this.props.currentUser ? (
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              ) : null}

              {this.props.currentUser ? (
                <li className="nav-item" onClick={this.signOutUser}>
                  <span className="nav-link">Log Out</span>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
