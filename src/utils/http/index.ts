import Request from './request'
import { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

import type { RequestConfig } from './request/types'

export interface YWZResponse<T> {
  code: number
  msg: string
  data: T
}

// 重写返回类型
interface YWZRequestConfig<T, R> extends RequestConfig<YWZResponse<R>> {
  data?: T
}

const request = new Request({
  baseURL: import.meta.env.VITE_API_BASEURL,
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: config => config,
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse) => {
      console.log('打印axios的返回值')
      return result
    },
    // 响应错误处理
    responseInterceptorsCatch: (error: any) => {
      ElMessage.error('网络错误')
      return Promise.reject(error)
    }
  }
})

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {YWZRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const ywzRequest = <D = any, T = any>(config: YWZRequestConfig<D, T>) => {
  const { method = 'GET' } = config
  if (method === 'get' || method === 'GET') {
    config.params = config.data
  }
  return request.request<YWZResponse<T>>(config)
}
// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url)
}
// 取消全部请求
export const cancelAllRequest = () => {
  return request.cancelAllRequest()
}

export default ywzRequest
