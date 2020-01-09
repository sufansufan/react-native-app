import request from  '../../http'

export const getSystemNotice = (data) => (
  request({
    url: '/notices',
    params: data,
    method: 'get'
  })
)

export const upgrade = (data) => (
  request({
    url: '/systems/upgrade',
    data,
    method: 'post'
  })
)

export const pushDeviceToken = (data) => {
  request({
    url: '/users/set_device_token',
    data,
    method: 'post'
  })

}
