/* eslint-disable jsx-a11y/no-redundant-roles */
import "./App.css";
import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const socket = io.connect(process.env.REACT_APP_BACKEND_URL);

function App() {
  const spanRef = useRef(null);
  const [sessionID, setSessionID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [prevSession, setPrevSession] = useState("");
  const [loginMdoe, setloginMdoe] = useState(false);
  const [allSessions, setAllSessions] = useState(null);

  useEffect(() => {
    const existingSessionID = Cookies.get("sessionID");

    if (existingSessionID) {
      // setSessionID(existingSessionID);
      submitSession(existingSessionID);
    } else {
      newSessionID();
    }
  }, []);

  function updateInput({ target }) {
    let obj = {};
    target.name === "email" ? setEmail(target.value) : setName(target.value);

    target.name === "email"
      ? (obj.email = target.value)
      : (obj.name = target.value);
    Object.keys(obj).includes("email")
      ? (obj.name = name)
      : (obj.email = email);
    obj.sessionID = sessionID;
    socket.emit("send_message", obj);
  }

  async function submitSession(session) {
    try {
      const res = await axios.post(process.env.REACT_APP_BACKEND_URL, {
        session: prevSession || session,
      });
      if (res.data.data) {
        setName(res.data.data.name);
        setEmail(res.data.data.email);
        setSessionID(res.data.data.sessionID);
        Cookies.set("sessionID", res.data.data.sessionID, { expires: 9 });
      } else {
        newSessionID();
      }
    } catch (error) {
      console.log("error is:", error);
      // alert(error.message);
    } finally {
      setloginMdoe(false);
      setPrevSession("");
    }
  }

  function copyToClipboard() {
    const text = spanRef.current.innerText;
    navigator.clipboard.writeText(text);
    alert("Session ID copied on the clipboard");
  }

  function newSessionID() {
    setEmail("");
    setName("");
    const newSessionID = uuidv4();
    Cookies.set("sessionID", newSessionID, { expires: 9 });
    setSessionID(newSessionID);
  }

  async function handleChange() {
    setloginMdoe(!loginMdoe);
    if (!loginMdoe) {
      console.log("we r in here");
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "allSessions"
        );
        setAllSessions(response.data.data.reverse());
      } catch (error) {
        console.log("error is:", error);
        alert(error.message);
      }
    }
    if (loginMdoe) {
      newSessionID();
    }
  }

  async function checkSession(sessionID) {
    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL, {
        session: sessionID,
      });
      const { data } = response.data;
      Cookies.set("sessionID", data.sessionID, { expires: 9 });
      setSessionID(data.sessionID);
      setEmail(data.email);
      setName(data.name);
      setloginMdoe(false);
    } catch (error) {
      console.log("Error is:", error);
      alert(error.message);
    }
  }

  return (
    <>
      <div className="prev-session">
        <button
          onClick={() => handleChange()}
          className="button-92"
          role="button"
        >
          {loginMdoe
            ? "A new User Click here!"
            : "If you have Session click Here!"}
        </button>
      </div>
      <div className="App">
        {loginMdoe ? (
          <>
            {/* <div className="form-group">
              <span>Session ID:</span>
              <input
                value={prevSession}
                onChange={(e) => setPrevSession(e.target.value)}
                className="form-field"
                type="text"
                placeholder="19f05b0d-bd82-41c5-828e-2c346ae4032b"
                name="session"
              />
            </div>
            <button onClick={submitSession} className="button-86" role="button">
              Submit
            </button> */}
            <p>
              All sessions are listed here to test and retrieve data please
              click on one of the them
            </p>
          </>
        ) : (
          <>
            <div className="form-group">
              <span>Name:</span>
              <input
                value={name}
                onChange={(e) => updateInput(e)}
                className="form-field"
                type="text"
                placeholder="Name"
                name="name"
              />
            </div>
            <div className="form-group">
              <input
                value={email}
                onChange={(e) => updateInput(e)}
                name="email"
                className="form-field"
                type="email"
                placeholder="Email"
              />
              <span>@gmail.com</span>
            </div>
          </>
        )}
        {loginMdoe ? (
          <></>
        ) : (
          <section className="copy-btn">
            <span ref={spanRef}>{sessionID}</span>
            <div className="er">
              {/* <button
                onClick={copyToClipboard}
                className="button-86"
                role="button"
              >
                Copy Session
              </button> */}
              <button
                onClick={newSessionID}
                className="button-86"
                role="button"
              >
                New Session
              </button>
            </div>
          </section>
        )}
        {/* <button onClick={sendData}>
        <h3>send message</h3>
      </button> */}
        {loginMdoe && allSessions ? (
          <>
            <table className="zigzag">
              <thead>
                <tr>
                  <th className="header">Name</th>
                  <th className="header">Email</th>
                  <th className="header">Session</th>
                </tr>
              </thead>
              <tbody>
                {allSessions.map((el) => {
                  return (
                    <tr
                      key={uuidv4()}
                      onClick={() => checkSession(el.sessionID)}
                    >
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.sessionID}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : null}
      </div>
    </>
  );
}

export default App;
