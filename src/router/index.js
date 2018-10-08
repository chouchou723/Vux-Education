import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import {TeacherRoutes} from './teacher'
import {StudentRoutes} from './student'
import {AssistantRoutes} from './assistant'
Vue.use(Router)
const index = () =>
  import('@/views/index')
const router = new Router({
  routes: [
    {
      path:'/',
      component:index
      // redirect: '/student'
    },
    {
      path:'/index',
    },
  ...StudentRoutes,
  ...TeacherRoutes,
  ...AssistantRoutes
  ],
  // scrollBehavior (to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // }

})

router.beforeEach(function (to, from, next) {
  if(to.meta.type==='student'){
    localStorage.setItem('role','student')
  }else if(to.meta.type==='teacher'){
    localStorage.setItem('role','teacher')
  }
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})
export default router
