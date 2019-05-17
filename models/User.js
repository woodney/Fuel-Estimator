const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const userSchema = Schema({
  loginId: { type: Schema.Types.ObjectId, ref: "Login" },
  name: { type: String, unique: true, required: true },
  company: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: Number, required: true }
});

module.exports = mongoose.model("User", userSchema);
