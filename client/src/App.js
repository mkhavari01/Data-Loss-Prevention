import "./App.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function App() {
  const [sessionID, setSessionID] = useState("");

  useEffect(() => {
    console.log("heree");
    const existingSessionID = Cookies.get("sessionID");

    console.log(existingSessionID);

    if (existingSessionID) {
      setSessionID(existingSessionID);
      console.log("existingSessionID", existingSessionID);
    } else {
      console.log("come in else mode ");
      // Generate a new session ID and save it as an HttpOnly cookie
      const newSessionID = generateSessionID();
      const expires = new Date(new Date().getTime() + 20 * 1000);
      Cookies.set("sessionID", newSessionID, { expires });
      setSessionID(newSessionID);
      console.log("newSessionID", newSessionID);
    }
  }, []);

  function generateSessionID() {
    return Math.random().toFixed(2);
  }

  return (
    <div className="App">
      <div className="form-group">
        <span>Name:</span>
        <input className="form-field" type="text" placeholder="Mahdi Khavari" />
      </div>
      <div className="form-group">
        <input className="form-field" type="email" placeholder="Email" />
        <span>@gmail.com</span>
      </div>
      <h1>{sessionID}</h1>
    </div>
  );
}

export default App;
