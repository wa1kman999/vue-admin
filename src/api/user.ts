import request from '@/utils/http'
import { ILoginReq, ILoginResp } from './types/userModel'

// 登录接口
export function loginApi (parames: ILoginReq) {
  return request<ILoginReq, ILoginResp>({
    url: '/v1/account/login',
    method: 'POST',
    data: parames
  })
}
