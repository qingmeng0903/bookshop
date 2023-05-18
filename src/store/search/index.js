// search模块的小仓库
import { reqSearchList } from '@/api/index.js'
const state = {
  searchList: {}
}
const mutations = {
  getSearch(state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  async getSearchList({ commit }, params) {
    const res = await reqSearchList(params)
    // console.log(res)
    if (res.code === 200) {
      commit('getSearch', res.data)
    }
  }
}
const getters = {
  goodsList(state) {
    return state.searchList.goodsList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
