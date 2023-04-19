const UserModel = require("../models/user.model.js");

const fetchSession = async (req, res, next) => {
  try {
    const { session } = req.body;

    console.log("session is", session);

    const response = await UserModel.findOne({ session: session });
    console.log("res is", response);

    return res.status(200).json({
      status: "success",
      message: "",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

const allSessions = async (req, res, next) => {
  try {
    const response = await UserModel.find();

    return res.status(200).json({
      status: "success",
      message: "",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { session, email, name, index } = req.body;

    let response = await UserModel.findOneAndUpdate(
      { session: session },
      { $set: { name: name, email: email, index } },
      { new: true }
    );

    if (!response) {
      const newUser = new UserModel({
        name,
        email,
        session,
      });
      response = await newUser.save();
    }

    return res.status(200).json({
      status: "success",
      message: "",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

module.exports = { fetchSession, allSessions, updateUser };
