import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(toast)//vue.use默认执行toast里面的obj.install函数

//解决移动端300ms延迟
FastClick.attach(document.body)

//图片懒加载
Vue.use(vueLazyLoad,{
  loading : require('assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
