import request from  '../../http'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export const getHandleCompany = (data) => (
  request({
    url: '/disposal_companies',
    params: data,
    method: 'get'
  })
)

export const addOrder = (data) => (
  request({
    url: '/orders',
    data,
    method: 'post',
  })
)

export const getOrderList = (data) => (
  request({
    url: '/orders',
    params: data,
    method: 'get',
  })
)
export const getOrderDetails = (data) => (
  request({
    url: '/orders/' + data,
    method: 'get',
  })
)

export const cancelTransport = (data) => (
  request({
    url: `/orders/${data}/cancel`,
    method: 'post',
  })
)

export const getDrivers = () => (
  request({
    url: `/drivers`,
    method: 'get',
  })
)

export const getCars = () => (
  request({
    url: `/cars`,
    method: 'get',
  })
)

export const submitDrivers = (id, data) => (
  request({
    url: '/orders/' + id + '/set_transport',
    data,
    method: 'post',
  })
)

export const startDriver = (id) => (
  request({
    url: '/orders/' + id + '/driver_start',
    method: 'post',
  })
)

export const finishDriver = (id) => (
  request({
    url: '/orders/' + id + '/driver_finish',
    method: 'post',
  })
)

export const signOrder = (id, data) => (
  request({
    url: '/orders/' + id + '/confirm',
    data,
    method: 'post',
  })
)


export const getUploadImage = async (params, url) => {
  const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'))
  let formData= new FormData();
  let allUrl = 'http://47.103.42.218:9233/api' + url
  formData.append('image', params)
  return axios.post(allUrl,formData, {
    headers: {
      'Content-Type':'multipart/form-data',
      'authtoken': userInfo.authtoken
    }
  })
}
