import { reqUserAdress, reqOrderInfo } from '@/api/index.js'
// trande模块的小仓库
const state = {
  adress: [],
  orderInfo: {}
}
const mutations = {
  getUserAdress(state, adress) {
    state.adress = adress
  },
  getOrderInfos(state, orderInfo) {
    state.orderInfo = orderInfo
  }
}
const actions = {
  // 获取用户地址
  async getUserAdress({ commit }) {
    const res = await reqUserAdress()
    // console.log(res)
    if (res.code === 200) {
      commit('getUserAdress', res.data)
    }
  },
  // 获取订单交易信息
  async getOrderInfo({ commit }) {
    const res = await reqOrderInfo()
    // console.log(res)
    if (res.code === 200) {
      commit('getOrderInfos', res.data)
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
