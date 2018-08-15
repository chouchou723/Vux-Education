import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const test = () => import('@/views/test') 
const home = () => import('@/views/home') 
const personal = () => import('@/views/personal') 
const lecture = () => import('@/views/lecture') 

export default new Router({
  routes: [
    {path:'/',
    redirect: '/index'
  },
    {
      path: '/index',
      component: home,
      children: [{
        path: '/',
        component:lecture
      },{
        path: '/personal',
        component:personal
      }]
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
