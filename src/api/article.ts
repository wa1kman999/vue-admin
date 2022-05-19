import request from '@/utils/request'
import { IArticleListReq, IArticleListResp } from './types/articleModel'

// 获取分类列表
export function getArticleList (data: IArticleListReq) {
  return request<IArticleListResp>({
    url: '/goblog/v1/article/list',
    method: 'POST',
    data
  })
}
