const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  email: {
    type: String,
    minlength: 1,
    required: [true, "Email is required"],
    unique: [true, "Email already registered"],
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: 1,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  rol: {
    type: String,
    required: [true, "Rol is required"],
    enum: ["Admin", "Cajero", "Chef"]
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

//mongoose Schema methods

// generateAuthToken es un metodo creado para poder crear un token
UserSchema.methods.generateAuthToken = function() {
  let user = this; // representa la instancia del modelo (un documento)
  let access = "auth";
  let token = jwt
    .sign({ _id: user._id.toHexString(), access }, "superSecretPass")
    .toString(); // sign(data a hashear, claveSecreta)

  user.tokens = user.tokens.concat([{ access, token }]);
  //   user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

//mongoose middleware - como express middleware
// antes de guardar una contraseña, deberia encriptarse

UserSchema.pre("save", function(next) {
  let user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash; // replace the plain text password with the hashed one
        next();
      });
    });
  } else {
    console.log("passed");
    next();
  }
});

module.exports = mongoose.model("UserModel", UserSchema);
