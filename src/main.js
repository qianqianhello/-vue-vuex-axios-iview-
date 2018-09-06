// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.prototype.$http = axios

//导入iview组件
import Iview from 'iview'
// 导入iview的css
import 'iview/dist/styles/iview.css'
// 使用iview

Vue.use(Iview)

router.beforeEach((to, from, next) => {
  //判断是否有登陆
  console.log(to.meta.isLogin)
 if(to.meta.isLogin){
   if(store.state.account.account){
     next()
   }else{
     next('./login')
   }
 }else{}

  next()
})



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render:h =>h(App)
})
