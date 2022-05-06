export interface IServerListResp {
  pagination:IPagination
  data: IServerInfo[]
}

interface IPagination {
  page: number
  pageSize: number
  total: number
}

export interface IServerInfo {
  id: string
  name: string
  ip: string
  mark:string
}

export interface IListReq {
  page: number
  pageSize: number
}
