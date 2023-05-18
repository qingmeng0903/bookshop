// store
import Vue from 'vue'
import Vuex from 'vuex'

import home from './home'
import login from './login'
import search from './search'
import register from './register'
import detail from './detail'
import goodscat from './goodsCat'
import loginANdregister from './loginAndRegister'
import trande from './trande'

Vue.use(Vuex)

// 对外暴露store类的一个实例
export default new Vuex.Store({
  // 实现Vuex仓库实现模块式开发存贮数据
  modules: {
    home,
    login,
    search,
    register,
    detail,
    goodscat,
    loginANdregister,
    trande
  }
})
