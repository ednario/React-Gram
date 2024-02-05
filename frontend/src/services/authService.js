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

// Logout an user
const logout = () => {
  localStorage.removeItem("user");
}

const authService = {
  register,
  logout
}

export default authService