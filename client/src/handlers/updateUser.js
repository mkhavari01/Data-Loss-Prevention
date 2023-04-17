import axios from "axios";

function updateUser(obj) {
  return new Promise((resolve, reject) => {
    axios
      .put(process.env.REACT_APP_BACKEND_URL + "updateUser", obj)
      .then((response) => {
        resolve(response);
        console.log("response updateUser is", response);
      })
      .catch((error) => {
        console.log("Error is:", error);
        alert(error.message);
        reject(error);
      });
  });
}

export { updateUser };
