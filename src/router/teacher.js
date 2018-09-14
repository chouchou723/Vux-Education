// import Vue from 'vue'
// import Router from 'vue-router'
// import store from '../vuex/store'
// Vue.use(Router)
const applyFirst = () => import('@/teacherViews/applyFirst')
const teachTime = () => import('@/teacherViews/teachTime')
const mySkill = () => import('@/teacherViews/mySkill')
const teacherName = () => import('@/teacherViews/teacherName')
const myIntro = () => import('@/teacherViews/myIntro')
const myEdu = () => import('@/teacherViews/myEdu')
const myTeachExp = () => import('@/teacherViews/myTeachExp')

const teacherHome = () => import('@/teacherViews/teacherHome')
const teacherPersonal = () => import('@/teacherViews/teacherPersonal')
const myTeacherInfo = () => import('@/teacherViews/myTeacherInfo')


// const router = new Router({
//   routes: [
//     {path:'/test',
//     component: test,
//   },
//   ],
//   // scrollBehavior (to, from, savedPosition) {
//   //   return { x: 0, y: 0 }
//   // }

// })
export const TeacherRoutes=[
    {
    path: '/teacher',
    component: teacherHome,
    children: [
        {
                path: '/teacherPersonal',
                component:teacherPersonal
            },
    //     {
    //     path: '/',
    //     component:lecture
    // },{
    //     path: '/teacherPersonal',
    //     component:teacherPersonal
    // },{
    //     path: '/myLesson',
    //     component:myLesson
    // }
    ]
    },
    {
    path:'/applyFirst',
    component: applyFirst,
    },
    {
    path:'/teachTime',
    component: teachTime,
    },
    {
    path:'/mySkill',
    component: mySkill,
    },
    {
    path:'/teacherName',
    component: teacherName,
    },
    {
    path:'/myIntro',
    component: myIntro,
    },
    {
    path:'/myEdu',
    component: myEdu,
    },
    {
    path:'/myTeachExp',
    component: myTeachExp,
    },
    {
        path:'/myTeacherInfo',
        component: myTeacherInfo,
        },
    ]
