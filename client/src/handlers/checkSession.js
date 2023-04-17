import axios from "axios";
import Cookies from "js-cookie";

async function checkSession(
  sessionID,
  setSessionID,
  setEmail,
  setName,
  setLoginMode
) {
  try {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL, {
      session: sessionID,
    });
    const { data } = response.data;
    Cookies.set("sessionID", data.sessionID, { expires: 9 });
    setSessionID(data.sessionID);
    setEmail(data.email);
    setName(data.name);
    setLoginMode(false);
  } catch (error) {
    console.log("Error is:", error);
    alert(error.message);
  }
}

export { checkSession };
