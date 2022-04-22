import axios from 'axios'

const request = axios.create({
  baseURL: 'http://127.0.0.1:9090'

})

// Add a request interceptor
request.interceptors.request.use(function (config) {
  // 统一设置用户身份 token
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
request.interceptors.response.use(function (response) {
  // 统一处理接口响应错误，比如token 过期无效，服务端异常等
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default request
