const mongoose = require("mongoose");

const app = require("./app");
const config = require("./config");

mongoose.Promise = global.Promise;

mongoose
  .connect(config.MONGODB)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(err => {
    console.log("Error connecting to the DB : ", err);
  });

app.listen(config.PORT, () => {
  console.log(`server started listening on port : ${config.PORT}`);
});
