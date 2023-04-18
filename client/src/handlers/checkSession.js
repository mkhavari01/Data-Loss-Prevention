import axios from "axios";
import Cookies from "js-cookie";

async function checkSession(
  session,
  setSession,
  setEmail,
  setName,
  setLoginMode
) {
  try {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL, {
      session: session,
    });
    const { data } = response.data;
    Cookies.set("session", data.session, { expires: 9 });
    setSession(data.session);
    setEmail(data.email);
    setName(data.name);
    setLoginMode(false);
  } catch (error) {
    console.log("Error is:", error);
    alert(error.message);
  }
}

export { checkSession };
