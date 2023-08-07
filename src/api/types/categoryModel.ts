import { IPaginationReq, IPaginationResp } from './common'

// 分类信息信息
export interface ICategoryInfo {
  ID: number
  name: string
}

// 分类列表参数
export interface ICategoryListReq extends IPaginationReq{
  name?: string
}

// 分类列表返回
export interface ICategoryListResp extends IPaginationResp{
  data: ICategoryInfo[]
}

// 分类测试参数
export interface ICategoryTestReq{
  name?: string
}

// 分类列表返回
export interface ICategoryTestResp{
  res?: string
}
