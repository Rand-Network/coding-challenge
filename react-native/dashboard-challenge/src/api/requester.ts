import axios from "axios"
import { Config } from "../models/config"

export const ApiRequester = axios.create({
  baseURL: Config.api.baseUrl
})

ApiRequester.interceptors.request.use(
  async axiosRequestConfig => {
    // Uncoment to delay the requests 3s
    /*
      await new Promise(resolve =>
        setTimeout(resolve, Math.floor(Math.random() * 3000))
      )
    */
    return axiosRequestConfig
  },
  error => Promise.reject(error)
)