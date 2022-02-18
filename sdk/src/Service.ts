import axios, { AxiosResponse } from "axios"
import { handleAxiosResponseError, handleAxiosResponseSuccess } from "./utils"

const Http = axios.create()

export class Service {
    protected static Http = Http
    protected static getData = getData
}

function getData<T>(response: AxiosResponse<T>) {
    return response.data
}

Http.defaults.baseURL = 'http://localhost:8080'

Http.interceptors.response.use(
    handleAxiosResponseSuccess,
    handleAxiosResponseError
)
