const express = require("express");
const testingController = require("../controllers/testing.controller.js");

const testingRouter = express.Router();

testingRouter.post("/", testingController.testFetchSession);

module.exports = testingRouter;
