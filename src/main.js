import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入vuex全局状态管理工具实例仓库store
// import store from './store'
import store from './store'
// 导入mock文件执行一次
import '@/mock/mockServe.js'

// 引入swiper样式
// import 'swiper/swiper.min.css'
import 'swiper/css/swiper.css'

// 导入电梯导航栏注册为全局组件
import TypeNav from './components/TypeNav/TypeNav.vue'
import MyCarsouse from '@/components/Carsouse/MyCarsouse.vue'
import PagiNation from '@/components/Pagination/pagiNation.vue'

// 导入所有接口api到API中
import * as API from '@/api'

// 导入element-ui组件
import { Button, MessageBox, Form, FormItem, Input, CheckboxGroup, Checkbox } from 'element-ui'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/images/111.gif'

Vue.use(VueLazyload, {
  // 默认加载的图片
  loading: atm
})

// 注册element为全局组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
// 封装全局组件
Vue.component('MyCarsouse', MyCarsouse)
Vue.component('TypeNav', TypeNav)
Vue.component('PagiNation', PagiNation)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
}).$mount('#app')
