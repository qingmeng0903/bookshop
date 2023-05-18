import axios from 'axios'

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// console.log(nprogress)

const mockAxios = axios.create({
  baseURL: '/mock',
  timeout: 5000
})

// 请求拦截器
mockAxios.interceptors.request.use((config) => {
  nprogress.start()
  return config
})

// 响应拦截器
mockAxios.interceptors.response.use(
  (res) => {
    nprogress.done()
    return res.data
  },
  // eslint-disable-next-line node/handle-callback-err
  (error) => {
    return Promise.reject(new Error('faile'))
  }
)

export default mockAxios
