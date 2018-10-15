import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import {getInfoTeacherF,getStudentInfoF} from './fn'
import {
  TeacherRoutes
} from './teacher'
import {
  StudentRoutes
} from './student'
import {
  AssistantRoutes
} from './assistant'
import {
  getAT,
  getStudentInfo,
  getInfoTeacher
} from '../api/api'
Vue.use(Router)
const index = () =>
  import('@/views/index')
const router = new Router({
  routes: [{
      path: '/',
      component: index
      // redirect: '/student'
    },
    {
      path: '/index',
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
  store.commit('updateLoadingStatus', {
    isLoading: true
  })
  if (from.path === '/') {
    getAT(to.meta.type, {
      login_role: to.meta.type
    })
    // .then(res => {
    //   console.log(res, 123)
    // })
    // .then(() => {
    if (to.meta.type == 'teacher') {
      getInfoTeacherF(next,to,getInfoTeacher,store)
    } else if (to.meta.type == 'student') {
      getStudentInfoF(next,getStudentInfo,store)
    }else{
      next()
    }


    // })
  }else{
    next()
  }
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {
    isLoading: false
  })
})
export default router
