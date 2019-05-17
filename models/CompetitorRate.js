const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const competitorRateSchema = Schema({
  name: { type: String, required: true },
  years: [Schema.Types.Mixed],
});

module.exports = mongoose.model("CompetitorRate", competitorRateSchema);
