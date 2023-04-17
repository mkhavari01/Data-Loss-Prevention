const UserModel = require("../models/user.model.js");

const testFetchSession = async (req, res, next) => {
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

module.exports = { testFetchSession };
