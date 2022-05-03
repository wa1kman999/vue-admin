import request from '@/utils/request'
import { ILoginReq, ILoginResp } from './types/userModel'

// 登录接口
// export function loginApi (parames: ILoginReq) {
//   return request<ILoginReq, ILoginResp>({
//     url: '/login',
//     method: 'POST',
//     data: parames
//   })
// }

// 登录接口
export function loginApi (data: ILoginReq) {
  return request<ILoginResp>({
    url: '/login',
    method: 'POST',
    data
  })
}
