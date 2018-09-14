import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import {TeacherRoutes} from './teacher'
import {StudentRoutes} from './student'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:'/',
      redirect: '/applyFirst'
    },
    {
      path:'/index',
    },
  ...StudentRoutes,
  ...TeacherRoutes
  ],
  // scrollBehavior (to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // }

})
router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})
export default router
