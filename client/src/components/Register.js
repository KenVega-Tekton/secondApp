import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);

    this.sendRegisterData = this.sendRegisterData.bind(this);
  }

  sendRegisterData(event) {
    event.preventDefault();

    let password = document.getElementById("dataPassword").value;
    let password2 = document.getElementById("dataPassword2").value;

    if (password === password2) {
      const data = {
        name: document.getElementById("dataName").value,
        email: document.getElementById("dataEmail").value,
        password: document.getElementById("dataPassword").value,
        role: document.getElementById("dataRole").value
      };
      console.log(data);
      axios
        .post("/signup", data)
        .then((response) => {
          console.log("respuesta del servidor");
          console.log(response);

          console.log("header token : ", response.headers["x-auth"]);

          // guardar token en localstorage
          localStorage.setItem("tokenAuth", response.headers["x-auth"]);
          //    borrar ese token cuando se carga la aplicacion
          //luego redireccionar
          switch (response.data.role) {
            case "cajero":
              this.props.history.push("/add-order");
              break;
            case "chef":
              this.props.history.push("/manage-orders");
              break;
            default:
              console.log("there was and error signin up");
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("passwords don't match");
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card card-body">
              <h3 className="text-center">Account Register</h3>
              <form onSubmit={this.sendRegisterData}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="dataName"
                    className="form-control"
                    required
                  />
                </div>
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
                <div className="form-group">
                  <label htmlFor="password2">Confirm Password</label>
                  <input
                    type="password"
                    name="password2"
                    id="dataPassword2"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select id="dataRole" name="role" className="form-control">
                    <option value="cajero">Cajero</option>
                    <option value="chef">Chef</option>
                    <option value="admin">Admin</option>
                  </select>
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

export default Register;
