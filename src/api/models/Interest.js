

const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const interestSchema = new Schema(
  {    
    name: { type: String, required: true, unique: true},
  },
  {
    timestamps: true,
  }
);

const Interest = mongoose.model("interest", interestSchema, "interest");
module.exports = Interest;