import { reqRegisterPhoneCode, reqRegisterUser, reqUserLogin, reqUserInfo, reqLoginOut } from '@/api/index.js'
// 登录预注册模块的小仓库
const state = {
  code: '',
  loginToken: sessionStorage.getItem('TOKEN'),
  userInfo: {}
}
const mutations = {
  geePhoneCode(state, code) {
    state.code = code
  },
  getloginToken(state, loginTOken) {
    state.loginToken = loginTOken
  },
  getuserlogin(state, userInfo) {
    state.userInfo = userInfo
  },
  clear(state) {
    state.loginToken = ''
    state.userInfo = ''
  }
}
const actions = {
  // 获取验证码
  async getphoneCode({ commit }, phone) {
    const res = await reqRegisterPhoneCode(phone)
    // console.log(res)
    if (res.code === 200) {
      commit('geePhoneCode', res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取验证码失败!'))
    }
  },
  // 注册账号
  async getRegisterUser({ commit }, data) {
    const res = await reqRegisterUser(data)
    console.log(res)
    if (res.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('注册账号失败!'))
    }
  },
  // 用户登录
  async getUserLigin({ commit }, data) {
    const res = await reqUserLogin(data)
    // console.log(res)
    if (res.code === 200) {
      commit('getloginToken', res.data.token)
      sessionStorage.setItem('TOKEN', res.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('登录失败!'))
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    const res = await reqUserInfo()
    // console.log(res)
    if (res.code === 200) {
      commit('getuserlogin', res.data)
    }
  },
  // 退出登录
  async getLoginOut({ commit }) {
    const res = await reqLoginOut()
    console.log(res)
    if (res.code === 200) {
      sessionStorage.removeItem('TOKEN')
      commit('clear')
      return 'ok'
    } else {
      return Promise.reject(new Error('退出失败!'))
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
