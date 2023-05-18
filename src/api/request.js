import axios from 'axios'

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 拿到仓库中存贮的uuid临时游客身份
import store from '@/store/index.js'
// console.log(nprogress)

const requests = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use((config) => {
  nprogress.start()
  // 请求头添加一个字段
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 携带token给服务器
  if (store.state.loginANdregister.loginToken) {
    config.headers.token = store.state.loginANdregister.loginToken
  }
  // console.log(store)
  return config
})

// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    nprogress.done()
    return res.data
  },
  // eslint-disable-next-line node/handle-callback-err
  (error) => {
    return Promise.reject(new Error('faile'))
  }
)

export default requests
