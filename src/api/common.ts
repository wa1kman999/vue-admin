import request from '@/utils/request'
import { ILoginInfo } from './types/common'

// export const getLoginInfo = () => {
//   // return request({
//   //   method: 'GET',
//   //   url: '/ready'
//   // })
//   return request.get('/login')
// }

export const getLoginInfo = () => {
  return request<ILoginInfo>({
    method: 'GET',
    url: '/ready'
  })
}
