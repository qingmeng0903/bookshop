// detail模块的小仓库
import { reqDetailList, reqGoodCat } from '@/api/index'
import { getUUId } from '@/utils/utils_token.js'

const state = {
  detailList: {},
  uuid_token: getUUId()
}
const mutations = {
  getdetail(state, detailList) {
    state.detailList = detailList
  }
}
const actions = {
  async getDetailList({ commit }, skuId) {
    const res = await reqDetailList(skuId)
    if (res.code === 200) {
      commit('getdetail', res.data)
    }
    // console.log(res)
  },
  // 添加购物车 发起添加请求
  async getaddGoodsCat({ commit }, { skuId, skuNum }) {
    const res = await reqGoodCat(skuId, skuNum)
    // console.log(res)
    if (res.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const getters = {
  // 导航栏/面包屑
  categoryView(state) {
    return state.detailList.categoryView || {}
  },
  // 简化产品信息数据
  skuInfo(state) {
    return state.detailList.skuInfo || {}
    // console.log()
  },
  // 产品售卖属性的简化
  spuSaleAttrList(state) {
    return state.detailList.spuSaleAttrList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
