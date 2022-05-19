import { ICategoryInfo } from './categoryModel'
import { IPaginationReq, IPaginationResp } from './common'

// 分类信息信息
export interface IArticleInfo {
  id: number
  title: string
  img: string
  desc: string
  category: ICategoryInfo
}

// 文章列表参数
export interface IArticleListReq extends IPaginationReq{
  title: string
}

// 分类列表返回
export interface IArticleListResp extends IPaginationResp{
  data: IArticleInfo[]
}
// 上传图片返回
export interface pathInfo {
  path: string

}
