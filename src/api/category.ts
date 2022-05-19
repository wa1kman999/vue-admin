import request from '@/utils/request'
import { ICategoryListReq, ICategoryListResp } from './types/categoryModel'

// 获取分类列表
export function getCategoryList (data: ICategoryListReq) {
  return request<ICategoryListResp>({
    url: '/goblog/v1/category/list',
    method: 'POST',
    data
  })
}
