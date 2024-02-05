import { api, requestConfig } from "../utils/config"

// Register an user
const register = async (data) => {

  const config = requestConfig("POST", data);

  try {
    const response = await fetch(`${api}/users/register`, config)
      .then((response) => response.json())
      .catch((error) => error);

    if (response) {
      localStorage.setItem("user", JSON.stringify(response));
    }

    return response;
  } catch (error) {
    console.error(error);
  }
}

const authService = {
  register
}

export default authService