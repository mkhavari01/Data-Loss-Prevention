const UserModel = require("../models/user.model.js");

const fetchSession = async (req, res, next) => {
  try {
    const { session } = req.body;

    const sessionID = req.cookies;
    console.log("sessionID is", sessionID);

    const response = await UserModel.findOne({ sessionID: session });
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

const newUser = async (req, res, next) => {
  try {
    const { name, email, sessionID } = req.body;

    const newUser = new UserModel({
      name,
      email,
      sessionID,
    });
    const response = await newUser.save();

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
    const { sessionID, email, name } = req.body;

    const response = await UserModel.findOneAndUpdate(
      { sessionID: sessionID },
      { $set: { name: name, email: email } },
      { new: true }
    );

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

module.exports = { fetchSession, newUser, allSessions, updateUser };
