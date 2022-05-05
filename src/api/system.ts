import request from '@/utils/request'
import { IStateResp } from './types/systemModel'

// 登录接口
export function stateApi () {
  return request<IStateResp>({
    url: '/goblog/v1/system/state',
    method: 'GET'
  })
}
