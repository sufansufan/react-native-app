import request from  '../../http'

export const getSystemNotice = (data) => (
  request({
    url: '/notices',
    params: data,
    method: 'get'
  })
)
