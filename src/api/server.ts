import request from '@/utils/request'
import { IDirInfo, IGetDirReq, IListReq, IServerListResp } from './types/serverModel'

// 登录接口
export function getServerList (data: IListReq) {
  return request<IServerListResp>({
    url: '/devops/v1/serverList',
    method: 'POST',
    data
  })
}

// 上传文件
export function uploadFile (data: {
  id: string
  path: string
  file: File
}) {
  const fd = new FormData()
  fd.append('id', data.id)
  fd.append('path', data.path)
  fd.append('file', data.file)
  return request<{}>({
    url: '/devops/v1/upload',
    method: 'POST',
    data: fd
  })
}

// 获取当前路径
export function pwd (data: {id: string}) {
  return request<{path: string}>({
    url: '/devops/v1/pwd',
    method: 'POST',
    data
  })
}

// 获取当前文件夹
export function getDir (data: IGetDirReq) {
  return request<IDirInfo[]>({
    url: '/devops/v1/getDir',
    method: 'POST',
    data
  })
}
