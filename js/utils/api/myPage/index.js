import request from  '../../http'

export const changePassword = (data) => (
  request({
    url: '/users/change_password',
    data,
    method: 'post'
  })
)
