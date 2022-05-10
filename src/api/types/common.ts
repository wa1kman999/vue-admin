export interface ILoginInfo {
  msg: string
}

// 分页参数
export interface IPaginationReq {
  page: number
  pageSize: number
}

export interface IPaginationResp {
  page: number
  pageSize: number
  total: number
}
