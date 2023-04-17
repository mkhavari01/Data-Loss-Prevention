/* eslint-disable jsx-a11y/no-redundant-roles */
import "./App.css";
import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

// handlers
import { updateUser } from "./handlers/updateUser";
import { checkSession } from "./handlers/checkSession";
import { handleChange } from "./handlers/handleChange";
import { submitSession } from "./handlers/submitSession";

const socket = io.connect(process.env.REACT_APP_BACKEND_URL);

function App() {
  const spanRef = useRef(null);
  const [sessionID, setSessionID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [prevSession, setPrevSession] = useState("");
  const [loginMode, setLoginMode] = useState(false);
  const [allSessions, setAllSessions] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [updateType, setUpdateType] = useState("realTime"); // realTime or interval or perChar

  useEffect(() => {
    const existingSessionID = Cookies.get("sessionID");

    if (existingSessionID) {
      submitSession(
        existingSessionID,
        prevSession,
        setName,
        setEmail,
        setSessionID,
        newSessionID,
        setLoginMode,
        setPrevSession
      );
    } else {
      newSessionID(setEmail, setName, setSessionID);
    }
  }, []);

  useEffect(() => {
    if (updateType === "interval") {
      const interval = setInterval(() => {
        updateUser({ sessionID, name, email });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [name, email, updateType, sessionID]);

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

    if (updateType === "realTime") {
      console.log("obj is", obj);
      socket.emit("send_message", obj);
    }

    if (updateType === "perChar") {
      if (obj.name.length % 5 === 0 && obj.name.length !== 0) {
        console.log("we send the request using per char");
        updateUser(obj);
      }
      if (obj.email.length % 5 === 0 && obj.email.length !== 0) {
        console.log("we send the request using per char");
        updateUser(obj);
      }
    }

    return obj;
  }

  function updateTypeHandler() {
    const types = ["realTime", "interval", "perChar"];
    const updatedClickCount = clickCount + 1;
    const updatedType = types[updatedClickCount % types.length];

    setUpdateType(updatedType);
    setClickCount(updatedClickCount);
  }

  function newSessionID() {
    console.log("here");
    setEmail("");
    setName("");
    const newSessionID = uuidv4();
    Cookies.set("sessionID", newSessionID, { expires: 9 });
    setSessionID(newSessionID);
  }

  return (
    <>
      {!loginMode && (
        <section className="update-type" id="test">
          <button
            onClick={() => updateTypeHandler()}
            className="button-40"
            role="button"
          >
            Change update mode
          </button>

          <h1>{updateType}</h1>
        </section>
      )}

      <div className="prev-session">
        <button
          id="changeLoginMode"
          onClick={() =>
            handleChange(
              setLoginMode,
              loginMode,
              setAllSessions,
              newSessionID,
              setEmail,
              setName,
              setSessionID
            )
          }
          className="button-92"
          role="button"
        >
          {loginMode
            ? "A new User Click here!"
            : "If you have Session click Here!"}
        </button>
      </div>
      <div className="App">
        {loginMode ? (
          <>
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
                id="test2"
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
        {loginMode ? (
          <></>
        ) : (
          <section className="copy-btn">
            <span ref={spanRef}>{sessionID}</span>
            <div className="er">
              <button
                onClick={() => newSessionID()}
                className="button-86"
                role="button"
              >
                New Session
              </button>
            </div>
          </section>
        )}
        {loginMode && allSessions ? (
          <>
            <div className="table-wrapper">
              <table className="zigzag table">
                <tbody>
                  <div className="tbody-wrapper">
                    {allSessions.map((el) => {
                      return (
                        <tr
                          key={uuidv4()}
                          onClick={() =>
                            checkSession(
                              el.sessionID,
                              setSessionID,
                              setEmail,
                              setName,
                              setLoginMode
                            )
                          }
                        >
                          <td>{el.name}</td>
                          <td>{el.email}</td>
                          <td>{el.sessionID}</td>
                        </tr>
                      );
                    })}
                  </div>
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default App;
