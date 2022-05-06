import request from '@/utils/request'
import { IListReq, IServerListResp } from './types/serverModel'

// 登录接口
export function getServerList (data: IListReq) {
  return request<IServerListResp>({
    url: '/devops/v1/serverList',
    method: 'POST',
    data
  })
}
