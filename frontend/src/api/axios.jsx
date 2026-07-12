import axios from "axios";

export default axios.create({
  baseURL: "https://studenthub-0fzz.onrender.com/api",
  withCredentials: true
});
