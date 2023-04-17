import axios from "axios";

async function updateUser(obj) {
  try {
    const response = await axios.put(
      process.env.REACT_APP_BACKEND_URL + "updateUser",
      obj
    );
    console.log("response is ", response);
  } catch (error) {
    console.log("Error is:", error);
    alert(error.message);
  }
}

export { updateUser };
