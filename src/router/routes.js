// import MyHome from '@/pages/Home/MyHome.vue'
// import MyLogin from '@/pages/Login/MyLogin.vue'
// import MyRegister from '@/pages/Register/MyRegister.vue'
// import MySearch from '@/pages/Search/MySearch.vue'
// import MyDetail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import GoodCar from '@/pages/ShopCart'
// import MyTrade from '@/pages/Trade'
// import MyPay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// import MyOrder from '@/pages/Center/MyOrder'
// import GroupOrder from '@/pages/Center/OrderCenter'

// [goodscar,trade,pay,paysuccess,center,myorder,grouporder]

export default [
  { path: '/', redirect: '/home' },
  { path: '/home', component: () => import('@/pages/Home/MyHome.vue'), meta: { show: true } },
  { path: '/login', component: () => import('@/pages/Login/MyLogin.vue'), meta: { show: false } },
  { path: '/register', component: () => import('@/pages/Register/MyRegister.vue'), meta: { show: false } },
  { name: 'search', path: '/search/:keyword?', component: () => import('@/pages/Search/MySearch.vue'), meta: { show: true } },
  { name: 'detail', path: '/detail/:skuId?', component: () => import('@/pages/Detail'), meta: { show: true } },
  { name: 'addcartsuccess', path: '/addcartsuccess', component: () => import('@/pages/AddCartSuccess'), meta: { show: true } },
  { name: 'goodscar', path: '/goodscar', component: () => import('@/pages/ShopCart'), meta: { show: true } },
  {
    name: 'mytrade',
    path: '/trade',
    component: () => import('@/pages/Trade'),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      // ... 路由独享守卫
      if (from.path === '/goodscar') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    name: 'mypay',
    path: '/pay',
    component: () => import('@/pages/Pay'),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      // ...
      if (from.path === '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    name: 'paysuccess',
    path: '/paysuccess',
    component: () => import('@/pages/PaySuccess'),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      // ...
      if (from.path === '/pay') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    name: 'center',
    path: '/center',
    component: () => import('@/pages/Center'),
    meta: { show: true },
    children: [
      {
        path: 'myorder',
        component: () => import('@/pages/Center/MyOrder')
      },
      {
        path: 'grouporder',
        component: () => import('@/pages/Center/OrderCenter')
      },
      {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  }

  // { name: 'search', path: '/search', component: MySearch, meta: { show: true } }
]
