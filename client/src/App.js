/* eslint-disable jsx-a11y/no-redundant-roles */
import "./App.css";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import Cookies from "js-cookie";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

// handlers
import { updateUser } from "./handlers/updateUser";
import { checkSession } from "./handlers/checkSession";
import { handleChange } from "./handlers/handleChange";
import { submitSession } from "./handlers/submitSession";
import { debounce } from "./handlers/debounce";

const socket = io.connect(process.env.REACT_APP_BACKEND_URL);

function App() {
  const spanRef = useRef(null);
  const [session, setSession] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [prevSession, setPrevSession] = useState("");
  const [loginMode, setLoginMode] = useState(false);
  const [allSessions, setAllSessions] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [updateType, setUpdateType] = useState("debounce"); // realTime or realTimeHttp or interval or perChar

  useEffect(() => {
    const existingSession = Cookies.get("session");

    if (existingSession) {
      submitSession(
        existingSession,
        prevSession,
        setName,
        setEmail,
        setSession,
        newSession,
        setLoginMode,
        setPrevSession
      );
    } else {
      newSession(setEmail, setName, setSession);
    }
  }, []);

  useEffect(() => {
    if (updateType === "interval" && !loginMode) {
      const interval = setInterval(() => {
        updateUser({ session, name, email });
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [name, email, updateType, session, loginMode]);

  async function updateInput({ target }) {
    let obj = {};
    let prevStates = { email, name };
    target.name === "email" ? setEmail(target.value) : setName(target.value);

    target.name === "email"
      ? (obj.email = target.value)
      : (obj.name = target.value);
    Object.keys(obj).includes("email")
      ? (obj.name = name)
      : (obj.email = email);
    obj.session = session;

    if (updateType === "realTime") {
      console.log("Websocket connection");
      socket.emit("send_message", obj);

      socket.on("ErrorUpdate", (data) => {
        alert("Error occured while we were trying to sync", data.message);
        setEmail(prevStates.email);
        setName(prevStates.name);
      });
    }

    if (updateType === "realTimeHttp") {
      handleApiResponse(obj, prevStates);
    }

    if (updateType === "perChar") {
      if (
        (obj.name.length % 5 === 0 && obj.name.length !== 0) ||
        (obj.email.length % 5 === 0 && obj.email.length !== 0)
      ) {
        console.log("we send the request using per char");
        handleApiResponse(obj, prevStates);
      }
    }

    if (updateType === "debounce") {
      optimizedVersion(obj, prevStates);
    }

    return obj;
  }

  const handleDebounce = (obj, prevStates) => {
    console.log("debounce func called", obj);
    handleApiResponse(obj, prevStates);
  };

  const optimizedVersion = useCallback(debounce(handleDebounce), []);

  async function handleApiResponse(obj, prevStates) {
    try {
      await updateUser(obj);
    } catch (error) {
      console.log("error is :", error.message);
      setEmail(prevStates.email);
      setName(prevStates.name);
    }
  }

  function updateTypeHandler() {
    const types = [
      "debounce",
      "realTime",
      "realTimeHttp",
      "interval",
      "perChar",
    ];
    const updatedClickCount = clickCount + 1;
    const updatedType = types[updatedClickCount % types.length];

    setUpdateType(updatedType);
    setClickCount(updatedClickCount);
  }

  function newSession() {
    setEmail("");
    setName("");
    const newSession2 = uuidv4();
    Cookies.set("session", newSession2, { expires: 9 });
    setSession(newSession2);
  }

  const description = useMemo(() => {
    const types = [
      "Debounce delays the execution of a function until after a certain amount of time has passed without that function being called again.",
      "Real-time updates using a websocket connection after each letter is typed.",
      "Real-time updates using an HTTP connection and a REST API after each letter is typed.",
      "Updates using an HTTP connection and a REST API at fixed intervals of 2.5 seconds.",
      "Updates using an HTTP connection and a REST API after 5 letters are typed.",
    ];
    return types[clickCount % types.length];
  }, [clickCount]);

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

          <h1>{description}</h1>
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
              newSession,
              setEmail,
              setName,
              setSession
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
            <span ref={spanRef}>{session}</span>
            <div className="er">
              <button
                onClick={() => newSession()}
                className="button-86"
                role="button"
                id="newSession"
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
                              el.session,
                              setSession,
                              setEmail,
                              setName,
                              setLoginMode
                            )
                          }
                        >
                          <td>{el.name}</td>
                          <td>{el.email}</td>
                          <td>{el.session}</td>
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
