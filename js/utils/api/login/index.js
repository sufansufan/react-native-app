import request from  '../../http'
// import axios from 'axios'

export const loginByUsername = (data) => (
   request({
    url: '/sessions',
    data,
    method: 'post'
  })
)




// export const loginByUsername = (data) => {
//   let formData= new FormData();
//   let allUrl = 'http://47.103.42.218:9233/api/sessions'
//   formData.append('username', data.username)
//   formData.append('password', data.password)
//   return axios.post(allUrl,formData, {
//     headers: {
//       'Content-Type':'multipart/form-data',
//       // 'authtoken': userInfo.authtoken
//     }
//   })
// }
