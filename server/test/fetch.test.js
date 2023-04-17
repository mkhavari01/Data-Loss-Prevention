const autocannon = require("autocannon");
require("dotenv").config();

function startBench() {
  const url = "http://localhost:" + (process.env.PORT || 3001);

  const args = process.argv.slice(2);
  const numConnections = args[0] || 10;
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
      method: "POST",
      body: JSON.stringify({ session: "123" }),
      requests: [
        {
          path: "/test",
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

startBench();
