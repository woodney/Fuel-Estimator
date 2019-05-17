const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken");
const secretKey = "";

let loginSchema = Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

loginSchema.pre("save", function(next) {
  let user = this;
  //If the password is not modified then dont save a new password
  if (!user.isModified("password")) {
    return next;
  }

  bcrypt.genSalt(12, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hashedPassword) => {
      user.password = hashedPassword;
      next();
    });
  });
});

loginSchema.methods.comparePassword = function(givenPassword, cb) {
  bcrypt.compare(givenPassword, this.password, (err, same) => {
    if (err) {
      return cb(err);
    }

    cb(null, same);
  });
};

module.exports = mongoose.model("Login", loginSchema);
