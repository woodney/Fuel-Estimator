const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const purchaseSchema = Schema({
  loginId: { type: Schema.Types.ObjectId, ref: "Login" },
  gallons: { type: Number, required: true },
  costPerGallon: { type: Number, required: true },
  date: { type: Date, required: true },
  steet: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  amountDue: { type: Number, required: true }
});

module.exports = mongoose.model("Purchase", purchaseSchema);
