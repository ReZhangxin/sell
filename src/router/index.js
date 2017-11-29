import Vue from 'vue'
import Router from 'vue-router'
// import Header from '@/components/header/header'
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import Seller from '@/components/seller/seller'
import Error from '@/components/Error'

Vue.use(Router)

export default new Router({
  // 表示没有 /#/
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path: '/seller',
      component: Seller
    },
    {
      path: '*',
      component: Error
    }
  ]
})
