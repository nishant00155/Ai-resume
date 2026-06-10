import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  withCredentials: true,
});

export async function registor({ username, email, password }) {
  try {
    const response = await api.post("auth/registor", {
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
    const response = await api.post("auth/login", {
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
    const response = await api.get("auth/login");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function profile() {
  try {
    const response = await api.post("auth/profile");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
