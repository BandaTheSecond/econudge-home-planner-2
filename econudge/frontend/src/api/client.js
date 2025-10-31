import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:5555/api", // your Flask backend URL
});

export default client;
