import request from '@/utils/request'
import { ICategoryListReq, ICategoryListResp, ICategoryTestReq, ICategoryTestResp } from './types/categoryModel'

// 获取分类列表
export function getCategoryList (data: ICategoryListReq) {
  return request<ICategoryListResp>({
    url: '/goblog/v1/category/list',
    method: 'POST',
    data
  })
}

// 获取分类测试
export function getCategoryTest (data: ICategoryTestReq) {
  return request<ICategoryTestResp>({
    url: '/goblog/v1/category/test',
    method: 'POST',
    data
  })
}
