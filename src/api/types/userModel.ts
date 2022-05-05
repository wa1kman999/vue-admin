// 登录参数
export interface ILoginReq {
  userName: string
  passWord: string
}
// 用户信息
export interface IUserInfo {
  ID: number
  username: string
  role: number
  UpdatedAt?: string
  CreatedAt?: string
  DeletedAt?: string
}

// 登录返回
export interface ILoginResp {
  user: IUserInfo
  token: string
}

export interface IUserListReq {
  userName: string
  role: number
}
