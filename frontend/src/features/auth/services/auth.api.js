import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-resume-44y9.onrender.com/api/auth",
  withCredentials: true,
});

export async function register({ username, email, password }) {
  try {
    const response = await api.post("/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function login({ email, password }) {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function logout() {
  try {
    const response = await api.get("/logout");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function profile() {
  try {
    const response = await api.get("/profile");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
