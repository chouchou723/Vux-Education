const home = () =>
  import('@/views/home')
const personal = () =>
  import('@/views/personal')
const lecture = () =>
  import('@/views/lecture')
const myLesson = () =>
  import('@/views/myLesson')
const myOrder = () =>
  import('@/views/myOrder')
const paying = () =>
  import('@/views/paying')
const payResult = () =>
  import('@/views/payResult')
const confirmOrder = () =>
  import('@/views/confirmOrder')
const myPoints = () =>
  import('@/views/myPoints')
const buyPoints = () =>
  import('@/views/buyPoints')
const purchaseHistory = () =>
  import('@/views/purchaseHistory')
const myInfo = () =>
  import('@/views/myInfo')
const myName = () =>
  import('@/views/myName')
const myBir = () =>
  import('@/views/myBir')
const myAdd = () =>
  import('@/views/myAdd')
const myPic = () =>
  import('@/views/myPic')
const picDetail = () =>
  import('@/views/picDetail')
const myFav = () =>
  import('@/views/myFav')
const feedback = () =>
  import('@/views/feedback')
const myCell = () =>
  import('@/views/myCell')
const commentDetail = () =>
  import('@/views/commentDetail')
const classSituation = () =>
  import('@/views/classSituation')
const classSituationDetail = () =>
  import('@/views/classSituationDetail')
const classTeacher = () =>
  import('@/views/classTeacher')
const doComment = () =>
  import('@/views/doComment')
const totalComment = () =>
  import('@/views/totalComment')
const courseDetails = () =>
  import('@/views/courseDetails')
const courseInfo = () =>
  import('@/views/courseInfo')

export const StudentRoutes = [{
    path: '/student',
    meta: {
      type: 'student'
    },
    component: home,
    children: [{
      path: '/',
      meta: {
        type: 'student'
      },
      component: lecture
    }, {
      path: '/personal',
      meta: {
        type: 'student'
      },
      component: personal
    }, {
      path: '/myLesson',
      meta: {
        type: 'student'
      },
      component: myLesson
    }]
  },
  {
    path: '/myOrder',
    name: 'myOrder',
    meta: {
      type: 'student'
    },
    component: myOrder
  },
  {
    path: '/confirmOrder',
    name: 'confirmOrder',
    meta: {
      type: 'student'
    },
    component: confirmOrder
  },
  {
    path: '/paying',
    name: 'paying',
    meta: {
      type: 'student'
    },
    component: paying
  }, {
    path: '/payResult',
    name: 'payResult',
    meta: {
      type: 'student'
    },
    component: payResult
  }, {
    path: '/myPoints',
    name: 'myPoints',
    meta: {
      type: 'student'
    },
    component: myPoints
  }, {
    path: '/buyPoints',
    name: 'buyPoints',
    meta: {
      type: 'student'
    },
    component: buyPoints
  }, {
    path: '/purchaseHistory',
    name: 'purchaseHistory',
    meta: {
      type: 'student'
    },
    component: purchaseHistory
  }, {
    path: '/myInfo',
    name: 'myInfo',
    meta: {
      type: 'student'
    },
    component: myInfo
  }, {
    path: '/myName',
    name: 'myName',
    meta: {
      type: 'student'
    },
    component: myName
  }, {
    path: '/myBir',
    name: 'myBir',
    meta: {
      type: 'student'
    },
    component: myBir
  }, {
    path: '/myAdd',
    name: 'myAdd',
    meta: {
      type: 'student'
    },
    component: myAdd
  }, {
    path: '/myCell',
    name: 'myCell',
    meta: {
      type: 'student'
    },
    component: myCell
  }, {
    path: '/myPic',
    name: 'myPic',
    meta: {
      type: 'student'
    },
    component: myPic
  }, {
    path: '/picDetail',
    name: 'picDetail',
    meta: {
      type: 'student'
    },
    component: picDetail
  }, {
    path: '/myFav',
    name: 'myFav',
    meta: {
      type: 'student'
    },
    component: myFav
  }, {
    path: '/feedback',
    name: 'feedback',
    meta: {
      type: 'student'
    },
    component: feedback
  }, {
    path: '/commentDetail',
    name: 'commentDetail',
    meta: {
      type: 'student'
    },
    component: commentDetail
  }, {
    path: '/classSituation',
    name: 'classSituation',
    meta: {
      type: 'student'
    },
    component: classSituation
  }, {
    path: '/classSituationDetail',
    name: 'classSituationDetail',
    meta: {
      type: 'student'
    },
    component: classSituationDetail
  }, {
    path: '/classTeacher',
    name: 'classTeacher',
    meta: {
      type: 'student'
    },
    component: classTeacher
  }, {
    path: '/doComment',
    name: 'doComment',
    meta: {
      type: 'student'
    },
    component: doComment
  }, {
    path: '/totalComment',
    name: 'totalComment',
    meta: {
      type: 'student'
    },
    component: totalComment
  }, {
    path: '/courseDetails',
    name: 'courseDetails',
    meta: {
      type: 'student'
    },
    component: courseDetails
  },
  {
    path: '/courseInfo',
    name: 'courseInfo',
    meta: {
      type: 'student'
    },
    component: courseInfo
  },
]
// scrollBehavior (to, from, savedPosition) {
//   return { x: 0, y: 0 }
// }
