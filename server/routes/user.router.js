const express = require("express");
const userController = require("../controllers/user.controller.js");

const userRouter = express.Router();

userRouter.post("/", userController.fetchSession);
userRouter.post("/newUser", userController.newUser);
userRouter.get("/allSessions", userController.allSessions);
userRouter.put("/updateUser", userController.updateUser);

module.exports = userRouter;
