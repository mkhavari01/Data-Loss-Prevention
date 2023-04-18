const autocannon = require("autocannon");
const data = require("./data.test.json");
require("dotenv").config();

let requestNumber = 0;

function fetchSession() {
  requestNumber = 0;
  const url = "http://localhost:" + (process.env.PORT || 3001);

  const args = process.argv.slice(2);
  const numConnections = args[0] || 330;
  const maxConnectionRequests = args[1] || 1;

  const instance = autocannon(
    {
      url,
      connections: numConnections,
      duration: 10,
      maxConnectionRequests,
      headers: {
        "content-type": "application/json",
      },

      requests: [
        {
          method: "POST",
          path: "/",
          setupRequest: function (request) {
            request.body = JSON.stringify(data[requestNumber]);

            requestNumber++;

            return request;
          },
        },
      ],
    },
    finishedBench
  );

  autocannon.track(instance);

  function finishedBench(err, res) {
    console.log("Finished Bench", err, res);
  }
}

function userUpdate() {
  const url = "http://localhost:" + (process.env.PORT || 3001);

  const args = process.argv.slice(2);
  const numConnections = args[0] || data.length - 1;
  const maxConnectionRequests = args[1] || 1;

  const instance = autocannon(
    {
      url,
      connections: numConnections,
      duration: 10,
      maxConnectionRequests,
      headers: {
        "content-type": "application/json",
      },

      requests: [
        {
          method: "PUT",
          path: "/updateUser",
          setupRequest: function (request) {
            request.body = JSON.stringify(data[requestNumber]);

            requestNumber++;

            return request;
          },
        },
      ],
    },
    finishedBench
  );

  autocannon.track(instance);

  function finishedBench(err, res) {
    console.log("Finished Bench", err, res);
  }
}

userUpdate();
setTimeout(() => {
  fetchSession();
}, 5000);
