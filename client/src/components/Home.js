import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div className="card card-body text-center">
            <h3 className="mb-3">Home Page</h3>
            <p>A webapp made to manage restaurants.</p>
            <p>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              &nbsp;or&nbsp;
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
