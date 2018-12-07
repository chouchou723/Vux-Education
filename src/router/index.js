import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import {
  getInfoTeacherF,
  getStudentInfoF,
  setUuid
} from './fn'
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
  getInfoTeacher,
  getTokenInfo
} from '../api/api'
Vue.use(Router)
const index = () =>
  import('@/views/index')
const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      component: index
      // redirect: '/student'
    },
    {
      path: '/index',
    },
    ...StudentRoutes,//学生路由
    ...TeacherRoutes,
    ...AssistantRoutes
  ],
  // scrollBehavior (to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // }

})


router.beforeEach(function (to, from, next) {
  // let code =getParameter('code')
  if (from.path === '/') {
    if (to.query.code) {
      store.commit('updateLoadingStatus', {
        isLoading: true
      })
      getTokenInfo(to.meta.type, {
        code: to.query.code,
        state:to.query.state
      }).then(() => {
        if (to.meta.type == 'teacher') {
          getInfoTeacherF(next, to, getInfoTeacher, store, to.query.code)
        } else if (to.meta.type == 'student') {
          getStudentInfoF(next, getStudentInfo, store)
        } else {
          next()
        }
      })
    } else {
      localStorage.removeItem('teacherInfo')
      getAT({
        login_role: to.meta.type === 'student' ? 'student' : 'teacher',
        code: setUuid(),
        url: to.fullPath.slice(1)
      })
    }
  } else {
    store.commit('updateLoadingStatus', {
      isLoading: true
    })
      next()
  }
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {
    isLoading: false
  })
})
export default router
