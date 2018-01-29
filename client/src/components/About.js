import React from "react";

const About = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div className="card card-body text-center">
            <h3>About Page</h3>
            <p>
              This is a full-stack app made with React, Node.js and MongoDB.
            </p>
            <p>
              This is a challenge made by Tekton Labs : more about it&nbsp;
              <a
                href="https://github.com/KenVega-Tekton/secondApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
