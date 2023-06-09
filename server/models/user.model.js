const mongoose = require("mongoose");

const UserSchemca = new mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: false },
    session: { type: String, required: true },
    index: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchemca);

module.exports = UserModel;
