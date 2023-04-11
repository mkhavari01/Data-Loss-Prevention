const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.router.js");
const cookieParser = require("cookie-parser");
const UserModel = require("./models/user.model.js");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/task-cloud";

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    console.log("u choose room", data);
    socket.join(data);
  });

  socket.on("send_message", async (data) => {
    console.log("data is", data);
    const response = await UserModel.findOneAndUpdate(
      { sessionID: data.sessionID },
      { $set: { name: data.name, email: data.email } },
      { new: true }
    );
    if (!response) {
      console.log("i came here");
      const newUser = new UserModel({
        name: data.name,
        email: data.email,
        sessionID: data.sessionID,
      });
      const response2 = await newUser.save();
      console.log("response2", response2);
    }
    console.log("response is", response);
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
      console.log("SERVER IS RUNNING");
    })
  )
  .catch((err) => console.log(err));
