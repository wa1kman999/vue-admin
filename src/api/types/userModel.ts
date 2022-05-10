import { IPaginationReq, IPaginationResp } from './common'

// 登录参数
export interface ILoginReq {
  userName: string
  passWord: string
}
// 用户信息
export interface IUserInfo {
  id: number
  username: string
  role: number
}

// 登录返回
export interface ILoginResp {
  user: IUserInfo
  token: string
}

// 用户列表参数
export interface IUserListReq extends IPaginationReq{
  userName: string
}

// 用户列表返回
export interface IUserListResp extends IPaginationResp{
  data: IUserInfo[]
}
