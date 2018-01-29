import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.sendLoginData = this.sendLoginData.bind(this);
  }

  sendLoginData(event) {
    event.preventDefault();

    const data = {
      email: document.getElementById("dataEmail").value,
      password: document.getElementById("dataPassword").value
    };

    console.log(data);

    axios
      .post("/signin", data)
      .then((response) => {
        localStorage.setItem("tokenAuth", response.headers["x-auth"]);

        this.props.updateCurrentUser(response.data);

        switch (response.data.role) {
          case "cajero":
            this.props.history.push("/add-order");
            break;
          case "chef":
            this.props.history.push("/manage-orders");
            break;
          case "admin":
            this.props.history.push("/admin");
            break;
          default:
            console.log("there was and error signin up");
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card card-body">
              {/*<img className="logo" src="/img/logo.png" alt="logo" />*/}
              <h3 className="text-center">Account Login</h3>
              <form onSubmit={this.sendLoginData}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="dataEmail"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="dataPassword"
                    className="form-control"
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
