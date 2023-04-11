const mongoose = require("mongoose");

const UserSchemca = new mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: false },
    sessionID: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchemca);

module.exports = UserModel;
