import request from '@/utils/request'

export const getLoginInfo = () => {
  // return request({
  //   method: 'GET',
  //   url: '/ready'
  // })
  return request.get('/login')
}
