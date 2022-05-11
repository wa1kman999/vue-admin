import { IPaginationResp } from './common'

export interface IServerListResp {
  pagination:IPaginationResp
  data: IServerInfo[]
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

// 获取文件夹req
export interface IGetDirReq {
  id: string
  path: string
}

export interface IDirInfo {
  id: number
  name: string
  size: number
  modTime: string
  isDir: boolean
}
