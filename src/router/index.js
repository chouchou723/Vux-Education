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
const purchaseHistory = () => import('@/views/purchaseHistory') 
const myInfo = () => import('@/views/myInfo') 
const myName = () => import('@/views/myName') 
const myBir = () => import('@/views/myBir') 
const myAdd = () => import('@/views/myAdd') 
const myPic = () => import('@/views/myPic') 
const picDetail = () => import('@/views/picDetail') 
const myFav = () => import('@/views/myFav') 
const feedback = () => import('@/views/feedback') 
const myCell = () => import('@/views/myCell') 
const commentDetail = () => import('@/views/commentDetail') 
const classSituation = () => import('@/views/classSituation') 
const classSituationDetail = () => import('@/views/classSituationDetail') 
const classTeacher = () => import('@/views/classTeacher') 

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
    },{
      path: '/purchaseHistory',
      name: 'purchaseHistory',
      component: purchaseHistory
    },{
      path: '/myInfo',
      name: 'myInfo',
      component: myInfo
    },{
      path: '/myName',
      name: 'myName',
      component: myName
    },{
      path: '/myBir',
      name: 'myBir',
      component: myBir
    },{
      path: '/myAdd',
      name: 'myAdd',
      component: myAdd
    },{
      path: '/myCell',
      name: 'myCell',
      component: myCell
    },{
      path: '/myPic',
      name: 'myPic',
      component: myPic
    },{
      path: '/picDetail',
      name: 'picDetail',
      component: picDetail
    },{
      path: '/myFav',
      name: 'myFav',
      component: myFav
    },{
      path: '/feedback',
      name: 'feedback',
      component: feedback
    },{
      path: '/commentDetail',//未写
      name: 'commentDetail',
      component: commentDetail
    },{
      path: '/classSituation',
      name: 'classSituation',
      component: classSituation
    },{
      path: '/classSituationDetail',
      name: 'classSituationDetail',
      component: classSituationDetail
    },{
      path: '/classTeacher',
      name: 'classTeacher',
      component: classTeacher
    }
  ]
})
