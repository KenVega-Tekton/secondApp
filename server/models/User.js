const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      minlength: 1,
      required: [true, "Email is required"],
      unique: [true, "Email already registered"],
      lowercase: true,
      trim: true,
      validate: {
        validator: function(v) {
          return v.indexOf("tekton") > -1;
        },
        message: "{VALUE} is not a valid email"
      }
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
    role: {
      type: String,
      required: [true, "role is required"],
      enum: ["admin", "cajero", "chef"]
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
  },
  { collection: "userCollection" }
);

//mongoose Schema methods

// overriding a method to change what is sended back as response when signing up a new user - toJSON is a function that is used when res.send is called
UserSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();

  let userObjectModified = {
    _id: userObject._id,
    email: userObject.email,
    role: userObject.role,
    name: userObject.name
  };

  return userObjectModified;
};

UserSchema.methods.generateAuthToken = function() {
  let user = this; // representa la instancia del modelo (un documento)
  let access = "auth";
  let token = jwt
    .sign(
      { _id: user._id.toHexString(), access, role: user.role },
      "superSecretPass"
    )
    .toString();

  user.tokens = user.tokens.concat([{ access, token }]);

  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function(token) {
  let user = this;

  return user.update({
    $pull: {
      tokens: {
        token: token // si el token está, remueve todo tokens (con access )
      }
    }
  });
};

//mongoose middleware - como express middleware
// antes de guardar una contraseña, deberia encriptarse

UserSchema.pre("save", function(next) {
  let user = this; // representa la instancia del modelo (un documento)

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash; // replace the plain text password with the hashed one
        next();
      });
    });
  } else {
    // this case occurs when a request does not change the password (almost always)
    next();
  }
});

//Model methods
UserSchema.statics.findByToken = function(token) {
  let User = this; // representa el Modelo en sí
  let decoded;

  try {
    decoded = jwt.verify(token, "superSecretPass");
  } catch (e) {
    console.log("el token devuelto no es el correcto, no confíes");
    return Promise.reject();
  }

  return User.findOne({
    // esto retorna una promesa
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
  // verificara que hay un usuario con ese email y el password hasheado
  let User = this;

  return User.findOne({
    email: email
  })
    .then((userFound) => {
      if (!userFound) {
        return Promise.reject();
      }

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, userFound.password, (err, result) => {
          if (result) {
            resolve(userFound);
          } else {
            reject();
          }
        });
      });
    })
    .catch((err) => {
      console.log("error finding the user that is trying to signing in: ", err);
    });
};

module.exports = mongoose.model("UserModel", UserSchema);
