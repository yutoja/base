import axios from 'axios'
import https from './url'


const instance = axios.create({
  baseURL: https,
  method: "GET",
});
// axios.defaults.timeout = 3000
// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // const a = localStorage.getItem('co')
    // if (a) {
    //   config.url = config.url + `&cookie=${a}`
    //
    // }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
export default instance