const bcrypt = require("bcryptjs");

let password = "ThisRepresentsSomePassword123";

/*bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});*/

let hashedPassword =
  "$2a$10$Fj6St8qtxek20BayFKYW1OR3kYN3WErSqp2yx74KjQtaNdgKpkUcq";

let hashedPassword2 =
  "$2a$10$DafGKsNmwAnBv1Mm0/i86OP0fO2iE.r4exetr3lAw81/QXYjlAwM.";

bcrypt.compare(password, hashedPassword2, (err, result) => {
  console.log(result);
});
