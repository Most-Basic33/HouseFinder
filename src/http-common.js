import axios from "axios";
//switch back to localhost in developement
// export default axios.create({
//   //baseURL:"http://64.227.104.65:6969/api",
//   baseURL:process.env.REACT_APP_URL + "/api",
//   //baseURL: baseURL: REACT_NODE_ENV === production ? '/api' : 'http://localhost:6969/api',
//   headers: {
//     "Content-type": "application/json"
//   },
// withCredentials: true
// });

export default axios.create({
  baseURL: process.env.REACT_NODE_ENV === 'production' ? '/api' : 'http://localhost:6969/api',
  headers: {
    "Content-type": "application/json"
  },
withCredentials: true
});
