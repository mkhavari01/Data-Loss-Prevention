import axios from "axios";
import Cookies from "js-cookie";

async function submitSession(
  session,
  prevSession,
  setName,
  setEmail,
  setSessionID,
  newSessionID,
  setLoginMode,
  setPrevSession
) {
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
      newSessionID(setEmail, setName, setSessionID);
    }
  } catch (error) {
    console.log("error is:", error);
    // alert(error.message);
  } finally {
    setLoginMode(false);
    setPrevSession("");
  }
}

export { submitSession };
