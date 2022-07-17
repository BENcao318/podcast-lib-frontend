import axios from 'axios'

const serverAPI = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  withCredentials: true,
})

export default serverAPI
