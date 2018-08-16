import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const test = () => import('@/views/test') 
const home = () => import('@/views/home') 
const personal = () => import('@/views/personal') 
const lecture = () => import('@/views/lecture') 
const myLesson = () => import('@/views/myLesson') 
const myOrder = () => import('@/views/myOrder') 
const paying = () => import('@/views/paying') 
const payResult = () => import('@/views/payResult') 

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
      },,{
        path: '/myLesson',
        component:myLesson
      }]
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: myOrder
    },
    {
      path: '/paying',
      name: 'paying',
      component: paying
    },{
      path: '/payResult',
      name: 'payResult',
      component: payResult
    }
  ]
})
