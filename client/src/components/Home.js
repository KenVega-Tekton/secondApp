import React from "react";

const Home = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div className="card card-body text-center">
            <h3>Home Page</h3>
            <p>A webapp made to manage restaurants.</p>
            <p>
              <a
                href="/login"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Login
              </a>
              &nbsp;or&nbsp;
              <a
                href="/register"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
