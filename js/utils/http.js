import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

const baseUrl = 'http://47.103.42.218:9233/api'
// axios实例化
const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 100000,
  validateStatus: (status) => {
    return status >= 200 && status <= 500; // 默认的
  },
  withCredentials: true,
  maxContentLength: 2000
});
axiosInstance.interceptors.request.use(async (config) => {
  config.headers['Content-Type'] =  'application/json'
  const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'))
  if(userInfo && userInfo.authtoken) {
    config.headers['authtoken'] = userInfo.authtoken;
  }
  // //headers中配置serialize为true开启序列化
  // if (config.method === 'post' && meta.isSerialize === true) {
  // }
  return config
}, error => {
    return Promise.reject(error)
});

//HTTPresponse拦截
axiosInstance.interceptors.response.use(res => {
  const status = res.status
  switch (status) {
    case 200:
      return Promise.resolve(res.data)
    case 400:
      return Promise.reject(new Error('参数问题'))
    case 404:
      return Promise.reject(new Error('路径问题'))
    default:
      return Promise.reject(new Error('网络请求出错'))
  }
  // return res.data;
}, error => {
  return Promise.reject(new Error(error));
})

export default axiosInstance
