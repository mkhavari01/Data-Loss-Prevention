import axios from "axios";

async function handleChange(
  setLoginMode,
  loginMode,
  setAllSessions,
  newSession,
  setEmail,
  setName,
  setSession
) {
  setLoginMode(!loginMode);
  if (!loginMode) {
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
  if (loginMode) {
    newSession(setEmail, setName, setSession);
  }
}

export { handleChange };
