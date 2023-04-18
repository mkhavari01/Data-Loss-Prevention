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
  // const url = "https://task-cloud.iran.liara.run/";

  const args = process.argv.slice(2);
  const numConnections = args[0] || 3;
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

function intervalUpdate() {
  const url = "http://localhost:" + (process.env.PORT || 3001);

  const args = process.argv.slice(2);
  const numConnections = args[0] || 1;
  const maxConnectionRequests = args[1] || 1;

  let requestNumber = 0;
  let reqTimes = 0;

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
    reqTimes++;
  }

  // Add interval synchronization to send requests every 5 seconds
  const x = setInterval(() => {
    reqTimes++;
    requestNumber = 0;
    const instance = autocannon(
      {
        url,
        connections: numConnections,
        duration: 5, // Reduce the duration to 5 seconds
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
    console.log("4444444444444444444444444444444444444444444", reqTimes);
    if (reqTimes == 4) {
      clearInterval(x);
    }
    autocannon.track(instance);
  }, 5000); // Repeat the request every 5 seconds
  console.log("4444444444444444444444444444444444444444444");
}

intervalUpdate();
// userUpdate();
// setTimeout(() => {
//   fetchSession();
// }, 5000);
