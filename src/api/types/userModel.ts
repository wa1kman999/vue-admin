// 登录参数
export interface ILoginReq {
  userName: string
  passWord: string
}
// 用户信息
export interface IUserInfo {
  id: string
  username: string
  role: string
  nickName: string
}

// 登录返回
export interface ILoginResp {
  userInfo: IUserInfo
  token: string
}
