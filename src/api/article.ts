import request from '@/utils/request'
import { IArticleListReq, IArticleListResp, pathInfo } from './types/articleModel'

// 获取文章列表
export function getArticleList (data: IArticleListReq) {
  return request<IArticleListResp>({
    url: '/goblog/v1/article/list',
    method: 'POST',
    data
  })
}

// 上传文件
export function uploadFile (data: {file: File}) {
  const fd = new FormData()
  fd.append('file', data.file)
  return request<pathInfo>({
    url: '/goblog/v1/article/img',
    method: 'POST',
    data: fd
  })
}

// 新建文章
export function CreateArticle (data: {
  title: string,
  cid: number,
  desc: string,
  img: string,
  content: string}) {
  return request<{}>({
    url: '/goblog/v1/article',
    method: 'POST',
    data
  })
}
