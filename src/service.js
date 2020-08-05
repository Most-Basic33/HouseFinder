import http from "../src/http-common";


const getAll = () => {
  return  http.get("/homes");
};
const getUser=()=>{
  return http.get('/users')
};


const get = id => {
  return http.get(`/homes/${id}`);
};

const checkedLogged =() =>{
console.log( `sometimes you just get good service`)
return http.get(`/me`)
};

const email=(data)=>{
console.log('emailing like a pimp')
return http.post(`/email`, data)
};

const logout=()=>{
  console.log('loggin out')
  return http.get('/logout')
}

const create = data => {
  console.log(data, "make things happen captian!")
  return http.post("/homes", data);
};

const createUser = data => {
  console.log(data, "Dis how you get good service!")
  return http.post("/register", data);
};

const login = data => {
  console.log( "nice to see you again player player")
  return http.post(`/login`, data)
};

const updatePrice = (id, data) =>{
  console.log(data, 'dis service pimpin!!')
return http.put(`/rent/${id}`,{ price: data})
};

const update = (id, data) => {
  return http.put(`/update/${id}`, data); };

const remove = id => {
  return http.delete(`/homes/${id}`);
};

const removeUser=id=>{
return http.delete(`/users/${id}`)
};

const removeAll = () => {
  return http.delete(`/homes`);
};

const findByTitle = name => {
  return http.get(`/homes?name=${name}`);
};

const findHouseByName = name => {
  return http.get(`/homes/${name}`)
};

const findUserByName = name => {
  return http.get(`users/${name}`)
};


export default {
  //sign,
  getAll,
  get,
  create,
  createUser,
  checkedLogged,
  login,
  update,
  remove,
  removeAll,
  findByTitle,
  logout,
  getUser,
  removeUser,
  findUserByName,
  findHouseByName,
  email,
  updatePrice
};