import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { handleAxiosResponseError, handleAxiosResponseSuccess } from './utils'

interface SetRequestInterceptorsProps {
  onFulfilled: (
    request: AxiosRequestConfig
  ) => AxiosRequestConfig | Promise<AxiosRequestConfig>
  onRejected?: (error: any) => any
}

interface SetResponseInterceptorsProps {
  onFulfilled: (
    response: AxiosResponse
  ) => AxiosResponse | Promise<AxiosResponse>
  onRejected?: (error: any) => any
}

const Http = axios.create()

export class Service {
  protected static Http = Http
  protected static getData = getData

  public static setRequestInterceptors({
    onFulfilled,
    onRejected,
  }: SetRequestInterceptorsProps) {
    Http.interceptors.request.use(onFulfilled, onRejected)
  }

  public static setResponseInterceptors({
    onFulfilled,
    onRejected,
  }: SetResponseInterceptorsProps) {
    Http.interceptors.response.use(onFulfilled, onRejected)
  }
}

function getData<T>(response: AxiosResponse<T>) {
  return response.data
}

Http.defaults.baseURL = 'http://localhost:8080'

Http.interceptors.response.use(
  handleAxiosResponseSuccess,
  handleAxiosResponseError
)
