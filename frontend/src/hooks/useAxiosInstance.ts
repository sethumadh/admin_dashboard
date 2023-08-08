import axios, { AxiosInstance } from "axios"
import { persistor, useAppSelector } from "../redux/store"
import { useLocation, useNavigate } from "react-router-dom"
import { logoutSuccess } from "../helper/functions/functions"
const baseURL = "http://localhost:1337"

// Define a custom type for the return value of useAxiosInstance
type UseAxiosInstanceType = {
  axiosInstance: AxiosInstance
}

const useAxiosInstance = (): UseAxiosInstanceType => {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user)
  const handleLogout = () => {
    persistor.purge()
    navigate("/login", { state: { from: location }, replace: true })
  }
  const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: `application/json`,
      Authorization: `Bearer ${user.accessToken}`,
      "Access-Control-Allow-Origin": "*",
    },
  })
  console.log("Inside useAxiosInstance")

  // Set up request interceptor
  axiosInstance.interceptors.request.use(
    async (request) => {
      console.log("Request intercepted:", request)
      return request
    },
    async (error) => {
      console.log("Request error intercepted:", error)
      return Promise.reject(error)
    }
  )

  // Set up response interceptor
  axiosInstance.interceptors.response.use(
    async (response) => {
      console.log("Response intercepted:", response)
      return response
    },
    async (error) => {
      console.log("Response error intercepted:", error)
      if (error.response.data.message == "TokenExpired") {
        handleLogout()
        logoutSuccess("session expired , login again")
      }
      return Promise.reject(error)
    }
  )

  return { axiosInstance }
}

export default useAxiosInstance
