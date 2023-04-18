import axios from "axios";
import Cookies from "js-cookie";

async function submitSession(
  session,
  prevSession,
  setName,
  setEmail,
  setSession,
  newSession,
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
      setSession(res.data.data.session);
      Cookies.set("session", res.data.data.session, { expires: 9 });
    } else {
      newSession(setEmail, setName, setSession);
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
