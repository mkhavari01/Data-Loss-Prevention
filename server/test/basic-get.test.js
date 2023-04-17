// const autocannon = require("autocannon");
// require("dotenv").config();

// function startBench() {
//   const url = "http://localhost:" + process.env.PORT || 3001;

//   const args = process.argv.slice(2);
//   const numConnections = args[0] || 1000;
//   const maxConnectionRequests = args[1] || 1000;

//   const instance = autocannon(
//     {
//       url,
//       connections: numConnections,
//       duration: 10,
//       maxConnectionRequests,
//       headers: {
//         "content-type": "application/json",
//       },
//       requests: [
//         {
//           method: "GET",
//           path: "/",
//         },
//       ],
//     },
//     finishedBench
//   );

//   autocannon.track(instance);

//   function finishedBench(err, res) {
//     console.log("Finished Bench", err, res);
//   }
// }

// startBench();

const io = require("socket.io-client");

const socketUrl = "http://localhost:3001"; // replace with your server URL

describe("WebSocket test", () => {
  let client;

  before((done) => {
    client = io.connect(socketUrl, {
      transports: ["websocket"],
      reconnection: false,
    });

    client.on("connect", () => {
      console.log("WebSocket connected");
      done();
    });

    client.on("error", (error) => {
      console.error("WebSocket error", error);
      done(error);
    });
  });

  after(() => {
    if (client && client.connected) {
      console.log("Disconnecting WebSocket");
      client.disconnect();
    }
  });

  it("should send a message to server", (done) => {
    client.emit("send_message", {
      name: "test",
      email: "test@test.com",
      sessionID: Math.random().toFixed(3),
    });
    console.log("we r here");
    done();

    // client.on("message_sent", (data) => {
    //   expect(data).toEqual({ status: "OK" });
    //   done();
    // });
  });
});
