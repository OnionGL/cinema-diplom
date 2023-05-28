import axios from 'axios'

const defaultURL = 'http://localhost:8080'

export const getUserList = () => {
  return axios.get(`${defaultURL}/userList`)
}

export const patchUser = (data) => {
  return axios.patch(`${defaultURL}/userUpdate` , data)
}

export const setUser = (data) => {
  return axios.post(`${defaultURL}/user` , {data})
}