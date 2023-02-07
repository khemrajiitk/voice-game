import Axios from "axios"
import { BASE_URL } from "../enum/common.enum"

export const useHttpIntercepter = () => {

    Axios.defaults.baseURL = BASE_URL

    Axios.interceptors.request.use(config => {
        return config
    })

    Axios.interceptors.response.use((response: any) => {
        return response
    }, error => {
        return Promise.reject(error)
    })
}