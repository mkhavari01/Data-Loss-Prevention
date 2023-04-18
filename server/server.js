const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.router.js");
const cookieParser = require("cookie-parser");
const UserModel = require("./models/user.model.js");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/task-cloud";

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", async (data) => {
    try {
      const response = await UserModel.findOneAndUpdate(
        { session: data.session },
        { $set: { name: data.name, email: data.email } },
        { new: true }
      );
      if (!response) {
        const newUser = new UserModel({
          name: data.name,
          email: data.email,
          session: data.session,
        });
        await newUser.save();
      }
    } catch (error) {
      socket.emit("ErrorUpdate", {
        status: "Error occurred",
        message: error.message,
      });
      console.log("Error:", error);
    }
  });
});

app.use("/", userRouter);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    server.listen(3001, () => {
      console.log(process.env.MONGODB_URI);
    })
  )
  .catch((err) => console.log(err));
