

const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    admin: { type: String, default: "user" },
    img: { type: String, required: false },
    interests: [{ type: mongoose.Types.ObjectId, ref: "interest" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema, "users");
module.exports = User;