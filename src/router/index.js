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
const confirmOrder = () => import('@/views/confirmOrder') 
const myPoints = () => import('@/views/myPoints') 
const buyPoints = () => import('@/views/buyPoints') 

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
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: confirmOrder
    },
    {
      path: '/paying',
      name: 'paying',
      component: paying
    },{
      path: '/payResult',
      name: 'payResult',
      component: payResult
    },{
      path: '/myPoints',
      name: 'myPoints',
      component: myPoints
    },{
      path: '/buyPoints',
      name: 'buyPoints',
      component: buyPoints
    }
  ]
})
