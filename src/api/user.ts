import request from '@/utils/request'
import { ILoginReq, ILoginResp, IUserListReq, IUserListResp } from './types/userModel'

// 登录接口
export function loginApi (data: ILoginReq) {
  return request<ILoginResp>({
    url: '/login',
    method: 'POST',
    data
  })
}

// 获取用户列表
export function getUserList (data: IUserListReq) {
  return request<IUserListResp>({
    url: '/goblog/v1/user/list',
    method: 'POST',
    data
  })
}
