import axios from 'axios'

const defaultURL = 'https://diplom-cinema.onrender.com'

export const getUserList = () => {
  return axios.get(`${defaultURL}/userList`)
}

export const patchUser = (data) => {
  return axios.patch(`${defaultURL}/userUpdate` , data)
}

export const setUser = (data) => {
  return axios.post(`${defaultURL}/user` , {data})
}

export const loginUser = (data) => {
  return axios.post(`${defaultURL}/login` , data)
}

export const registerUser = (data) => {
  return axios.post(`${defaultURL}/register` , data)
}

export const getCurrentUser = () => {
  return axios.get(`${defaultURL}/me`)
}