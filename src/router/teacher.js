// import Vue from 'vue'
// import Router from 'vue-router'
// import store from '../vuex/store'
// Vue.use(Router)
const applyFirst = () =>
  import('@/teacherViews/applyFirst')
const teachTime = () =>
  import('@/teacherViews/teachTime')
const mySkill = () =>
  import('@/teacherViews/mySkill')
const teacherName = () =>
  import('@/teacherViews/teacherName')
const myIntro = () =>
  import('@/teacherViews/myIntro')
const myEdu = () =>
  import('@/teacherViews/myEdu')
const myTeachExp = () =>
  import('@/teacherViews/myTeachExp')

const teacherHome = () =>
  import('@/teacherViews/teacherHome')
const teacherPersonal = () =>
  import('@/teacherViews/teacherPersonal')
const myTeacherInfo = () =>
  import('@/teacherViews/myTeacherInfo')
const teacherOrder = () =>
  import('@/teacherViews/teacherOrder')
const teacherBir = () =>
  import('@/teacherViews/teacherBir')
const teacherAdd = () =>
  import('@/teacherViews/teacherAdd')
const teacherCell = () =>
  import('@/teacherViews/teacherCell')
const teacherFeedback = () =>
  import('@/teacherViews/teacherFeedback')
const teacherFinancial = () =>
  import('@/teacherViews/teacherFinancial')
const teacherGetMoney = () =>
  import('@/teacherViews/teacherGetMoney')
const teacherMoneyResult = () =>
  import('@/teacherViews/teacherMoneyResult')
const teacherMoneyList = () =>
  import('@/teacherViews/teacherMoneyList')
const teacherClass = () =>
  import('@/teacherViews/teacherClass')
const teacherLessonDetail = () =>
  import('@/teacherViews/teacherLessonDetail')
const teacherDoSingleDetail = () =>
  import('@/teacherViews/teacherDoSingleDetail')
const teacherCommentStudent = () =>
  import('@/teacherViews/teacherCommentStudent')
const teacherUploadPic = () =>
  import('@/teacherViews/teacherUploadPic')
const teacherPicComment = () =>
  import('@/teacherViews/teacherPicComment')
const teacherPublishLesson = () =>
  import('@/teacherViews/teacherPublishLesson')
const teacherAddClassIntro = () =>
  import('@/teacherViews/teacherAddClassIntro')
const teacherPublishHome = () =>
  import('@/teacherViews/teacherPublishHome')
const teacherPublishTime = () =>
  import('@/teacherViews/teacherPublishTime')
const teacherChangeClassTime = () =>
  import('@/teacherViews/teacherChangeClassTime')
const teacherChooseLesson = () =>
  import('@/teacherViews/teacherChooseLesson')
const teacherChooseLessonDetail = () =>
  import('@/teacherViews/teacherChooseLessonDetail')




export const TeacherRoutes = [{
    path: '/teacher',
    meta: {
      type: 'teacher'
    },
    component: teacherHome,
    children: [{
        path: '/teacherPersonal',
        meta: {
          type: 'teacher'
        },
        component: teacherPersonal
      },
      {
        path: '/',
        meta: {
          type: 'teacher'
        },
        component: teacherClass,
        beforeEnter: (to, from, next) => {
          console.log(1)
          let inf = JSON.parse(localStorage.getItem('teacherInfo'))
          if (inf.status.name !== 'PASS') {
          next({
            path:'/applyFirst',
            replace:true
          })
        }
          next()
        
        }
      },
      {
        path: '/teacherPublishHome',
        meta: {
          type: 'teacher'
        },
        component: teacherPublishHome,
      },
    ]
  },
  {
    path: '/applyFirst',
    meta: {
      type: 'teacher'
    },
    component: applyFirst,
  },
  {
    path: '/teachTime',
    meta: {
      type: 'teacher'
    },
    component: teachTime,
  },
  {
    path: '/mySkill',
    meta: {
      type: 'teacher'
    },
    component: mySkill,
  },
  {
    path: '/teacherName',
    meta: {
      type: 'teacher'
    },
    component: teacherName,
  },
  {
    path: '/myIntro',
    meta: {
      type: 'teacher'
    },
    component: myIntro,
  },
  {
    path: '/myEdu',
    meta: {
      type: 'teacher'
    },
    component: myEdu,
  },
  {
    path: '/myTeachExp',
    meta: {
      type: 'teacher'
    },
    component: myTeachExp,
  },
  {
    path: '/myTeacherInfo',
    meta: {
      type: 'teacher'
    },
    component: myTeacherInfo,
  },
  {
    path: '/teacherOrder',
    meta: {
      type: 'teacher'
    },
    component: teacherOrder,
  },
  {
    path: '/teacherBir',
    meta: {
      type: 'teacher'
    },
    component: teacherBir,
  },
  {
    path: '/teacherAdd',
    meta: {
      type: 'teacher'
    },
    component: teacherAdd,
  },
  {
    path: '/teacherCell',
    meta: {
      type: 'teacher'
    },
    component: teacherCell,
  },
  {
    path: '/teacherFeedback',
    meta: {
      type: 'teacher'
    },
    component: teacherFeedback,
  },
  {
    path: '/teacherFinancial',
    meta: {
      type: 'teacher'
    },
    component: teacherFinancial,
  },
  {
    path: '/teacherGetMoney',
    meta: {
      type: 'teacher'
    },
    component: teacherGetMoney,
  },
  {
    path: '/teacherMoneyResult',
    meta: {
      type: 'teacher'
    },
    component: teacherMoneyResult,
  },
  {
    path: '/teacherMoneyList',
    meta: {
      type: 'teacher'
    },
    component: teacherMoneyList,
  },
  {
    path: '/teacherLessonDetail',
    meta: {
      type: 'teacher'
    },
    component: teacherLessonDetail,
  },
  {
    path: '/teacherDoSingleDetail',
    meta: {
      type: 'teacher'
    },
    component: teacherDoSingleDetail,
  },
  {
    path: '/teacherCommentStudent',
    meta: {
      type: 'teacher'
    },
    component: teacherCommentStudent,
  },
  {
    path: '/teacherUploadPic',
    meta: {
      type: 'teacher'
    },
    component: teacherUploadPic,
  },
  {
    path: '/teacherPicComment',
    meta: {
      type: 'teacher'
    },
    component: teacherPicComment,
  },
  {
    path: '/teacherPublishLesson',
    meta: {
      type: 'teacher'
    },
    component: teacherPublishLesson,
  },
  {
    path: '/teacherAddClassIntro',
    meta: {
      type: 'teacher'
    },
    component: teacherAddClassIntro,
  },
  {
    path: '/teacherPublishTime',
    meta: {
      type: 'teacher'
    },
    component: teacherPublishTime,
  },
  {
    path: '/teacherChangeClassTime',
    meta: {
      type: 'teacher'
    },
    component: teacherChangeClassTime,
  },
  {
    path: '/teacherChooseLesson',
    meta: {
      type: 'teacher'
    },
    component: teacherChooseLesson,
  },
  {
    path: '/teacherChooseLessonDetail',
    meta: {
      type: 'teacher'
    },
    component: teacherChooseLessonDetail,
  },



]
