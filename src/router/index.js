import Vue from 'vue'
import VueRouter from 'vue-router'
//  导入组件
import routes from '@/router/routes.js'
import store from '@/store/index.js'
Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    //  始终滚动到顶部
    return { y: 0 }
  }
})
// --------------------------------------------------------------------
//  路由导航守卫 前置守卫
router.beforeEach(async (to, from, next) => {
  const token = store.state.loginANdregister.loginToken
  const hasNickName = store.state.loginANdregister.nickName
  // next()
  // 如果已经登录
  if (token) {
    // 已经登录不允许再跳到登录与注册页面
    if (to.path === '/login' || to.path === '/register') {
      next('/home')
    } else {
      // 已经登录去其他页面 // 用户登陆了,而且还有用户信息【去的并非是login】
      if (hasNickName) {
        next()
      } else {
        // 用户登陆了,但是没有用户信息
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // 用户没有信息，还携带token发请求获取用户信息【失败】
          // token【学生证失效了】
          // token失效:本地清空数据、服务器的token通知服务器清除
          await store.dispatch('getLoginOut')
          next('/login')
        }
      }
    }
  } else {
    // 未登录  用户未登录:不能进入/trade、/pay、/paysuccess、/center、/center/myorder
    const toPath = to.path
    if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center') !== -1) {
      next('/login?redirect=' + toPath)
    } else {
      next()
    }
  }
})

export default router

// 全局前置守卫
// router.beforeEach(async (to, from, next) => {
//   // to:去的那个路由的信息
//   // from:从那个路由而来的信息
//   // next:放行函数!!!!!!
//   // 第一种：next(),放行函数，放行到它想去的路由！！！
//   // 第二种:next(path),守卫指定放行到那个路由去?

//   // 用户是否登录:取决于仓库里面是否有token！！！
//   // 每一次路由跳转之前需要用有用户信息在跳转,没有发请求获取用户信息在跳转！！！！
//   // token
//   // const hasToken = store.state.user.token
//   const hasToken = store.state.loginANdregister.loginToken

//   // 用户信息
//   const hasNickName = store.state.loginANdregister.nickName
//   // 用户登录
//   if (hasToken) {
//     // 用户登录了,不能去login
//     if (to.path === '/login') {
//       next('/home')
//     } else {
//       // 用户登陆了,而且还有用户信息【去的并非是login】
//       if (hasNickName) {
//         next()
//       } else {
//         // 用户登陆了,但是没有用户信息
//         try {
//           // 发请求获取用户信息以后在放行
//           await store.dispatch('getUserInfo')
//           next()
//         } catch (error) {
//           // 用户没有信息，还携带token发请求获取用户信息【失败】
//           // token【学生证失效了】
//           // token失效:本地清空数据、服务器的token通知服务器清除
//           await store.dispatch('logout')
//           // 回到登录页，重新获取一个新的学生证
//           next('/login')
//         }
//       }
//     }
//   } else {
//     // 用户未登录||目前的判断都是放行.将来这里会'回手掏'增加一些判断
//     // 用户未登录:不能进入/trade、/pay、/paysuccess、/center、/center/myorder  /center/teamorder
//     const toPath = to.path
//     if (toPath.indexOf('trade') !== -1 || toPath.indexOf('pay') !== -1 || toPath.indexOf('center') !== -1) {
//       next('/login?redirect=' + toPath)
//     } else {
//       next()
//     }
//   }
// })
