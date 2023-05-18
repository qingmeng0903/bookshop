// home模块的小仓库
import { reqCategoryList, reqListContainer, reqFloorList } from '@/api/index.js'
const state = {
  castList: [],
  bannerlist: [],
  foolList: []
}
const mutations = {
  getcatelist(state, catelist) {
    state.castList = catelist
  },
  reqBannerList(state, bannerlist) {
    state.bannerlist = bannerlist
  },
  getFool(state, foolList) {
    state.foolList = foolList
  }
}
const actions = {
  // 导航栏
  async getcate({ commit }) {
    // 通过Api里面的接口函数向服务器发起请求获取数据据
    const result = await reqCategoryList()
    if (result.code === 200) {
      commit('getcatelist', result.data)
    }
  },
  // 轮播图
  async getListContainer({ commit }) {
    const result = await reqListContainer()
    if (result.code === 200) {
      commit('reqBannerList', result.data)
    }
  },
  // floor底部轮播图
  async getFloorList({ commit }) {
    const res = await reqFloorList()
    // console.log(res.data)
    commit('getFool', res.data)
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
