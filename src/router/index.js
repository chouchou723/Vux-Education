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
    if (to.query.code) {
      getTokenInfo(to.meta.type, {
        code: to.query.code
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
    console.log(3)
    let inf = JSON.parse(localStorage.getItem('teacherInfo'))
    if(to.meta.type == 'teacher'&&inf&&inf.status.name !== 'PASS'){
    console.log(4)

    next(false)
    }else{
      next()

    }
  }
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {
    isLoading: false
  })
})
export default router
