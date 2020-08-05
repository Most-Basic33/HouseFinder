import axios from "axios";
//switch back to localhost in developement
export default axios.create({
//  baseURL: "http://localhost:6969/api",
//baseURL:"http://64.227.104.65:6969/api",
baseURL:process.env.REACT_APP_URL + "/api",
  headers: {
    "Content-type": "application/json"
  },
withCredentials: true
});
