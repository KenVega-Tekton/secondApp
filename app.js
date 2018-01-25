const bodyParser = require("body-parser");
const express = require("express");

const login = require("./routes/login");
const api = require("./routes/api");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(login);
app.use("/api", api);

module.exports = app;
