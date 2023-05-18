import { reqgoodscat, reqDeleteGoodsCar, reqUpdateChecked } from '@/api/index'
// goodscat模块的小仓库
const state = {
  goodscatList: []
}
const mutations = {
  getshopcart(state, goodscatList) {
    state.goodscatList = goodscatList
  }
}
const actions = {
  // 获取购物车页面
  async getgoodscat({ commit }) {
    const res = await reqgoodscat()
    if (res.code === 200) {
      commit('getshopcart', res.data)
    }
    // console.log(res)
  },
  // 删除购物车里商品信息
  async getDeleteGoodscar({ commit }, skuId) {
    const res = await reqDeleteGoodsCar(skuId)
    if (res.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('删除数据失败!'))
    }
    // console.log(res)
  },
  // 购物车里复选框勾选状态
  async getUpdateChecked(commit, { skuId, isChecked }) {
    const res = await reqUpdateChecked(skuId, isChecked)
    // console.log(res)
    if (res.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('更改状态失败!'))
    }
  },
  // 删除已经选中的商品
  removeAllchecked({ dispatch, getters }) {
    const promiseAll = []
    // console.log(getters.goodscatList.cartInfoList)
    getters.goodscatList.cartInfoList.forEach((item) => {
      const promise = item.isChecked === 1 ? dispatch('getDeleteGoodscar', item.skuId) : ''
      promiseAll.push(promise)
    })
    // p1, p2 ,p3 ... 只要有一个失败就都返回失败的结果
    return Promise.all(promiseAll)
  },
  // 修改全选按钮状态
  addAllchecked({ dispatch, getters }, isChecked) {
    const promiseAll = []
    getters.goodscatList.cartInfoList.forEach((item) => {
      const promise = dispatch('getUpdateChecked', { skuId: item.skuId, isChecked })
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}
const getters = {
  goodscatList(state) {
    // return state.goodscatList[0].cartInfoList || {}
    return state.goodscatList[0] || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
