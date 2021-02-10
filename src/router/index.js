import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path : '',
    redirect : '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/home'),
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('../views/category/category')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/shoppingcart/shoppingcart')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/profile/profile')
  },
  {
    path : '/detail/:iid',
    name : 'detail',
    component : ()=> import('../views/detail/detail')

  }
]

const router = new VueRouter({
  routes,
  mode : 'history'
})

export default router
