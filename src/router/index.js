import Vue from 'vue'
import Router from 'vue-router'
import admin from  '@/page/admin'
import userInfo from  '@/page/userInfo'
import notfound from '@/page/notfound'
import RegisterPage from '@/page/register'
import LoginPage from '@/page/login'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'admin',
      component: admin,
      meta:{
        isLogin:true
      },
      redirect:'/userInfo',
      children:[
        {
          path: 'userInfo',
          name: 'userInfo',
          component: userInfo,
        },
      ]
    },
    {
      path:'/login',
      name:'LoginPage',
      component:LoginPage
    },
    {
      path:'/register',
      name:'RegisterPage',
      component:RegisterPage
    },
    {
      path:'/404.html',
      name:'notfound',
      component:notfound
    },
    {
      path: '*',
      redirect:'/404.html'
    }
  ]
})
