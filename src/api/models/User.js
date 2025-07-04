

const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
//enum interest? 
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, trim: true, unique: true },
    role: { type: String, default: "user" },
    img: { type: String, required: false },
     password: {
       type: String,
       trim: true,
       required: true,
       minlength: [8, "Password 8 characters minimum"],
     },
    interests: [{ type: mongoose.Types.ObjectId, ref: "interest" }],
  },
  {
    timestamps: true,
  }
);

/**Uso bscrypt para password, (no arrow function (=>) para uso de this) */
userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
})
const User = mongoose.model("users", userSchema, "users");
module.exports = User;