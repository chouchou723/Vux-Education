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
const teacherOrder = () => import('@/teacherViews/teacherOrder')
const teacherBir = () => import('@/teacherViews/teacherBir')
const teacherAdd = () => import('@/teacherViews/teacherAdd')
const teacherCell = () => import('@/teacherViews/teacherCell')
const teacherFeedback = () => import('@/teacherViews/teacherFeedback')
const teacherFinancial = () => import('@/teacherViews/teacherFinancial')
const teacherGetMoney = () => import('@/teacherViews/teacherGetMoney')
const teacherMoneyResult = () => import('@/teacherViews/teacherMoneyResult')
const teacherMoneyList = () => import('@/teacherViews/teacherMoneyList')
const teacherClass = () => import('@/teacherViews/teacherClass')
const teacherLessonDetail = () => import('@/teacherViews/teacherLessonDetail')
const teacherDoSingleDetail = () => import('@/teacherViews/teacherDoSingleDetail')
const teacherCommentStudent = () => import('@/teacherViews/teacherCommentStudent')





export const TeacherRoutes=[
    {
    path: '/teacher',
    component: teacherHome,
    children: [
        {
                path: '/teacherPersonal',
                component:teacherPersonal
            },
        {
        path: '/teacherClass',
        component:teacherClass
    },
    // {
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
        {
            path:'/teacherOrder',
            component: teacherOrder,
            },
            {
                path:'/teacherBir',
                component: teacherBir,
                },
                {
                    path:'/teacherAdd',
                    component: teacherAdd,
                    },
                    {
                        path:'/teacherCell',
                        component: teacherCell,
                        },
                        {
                            path:'/teacherFeedback',
                            component: teacherFeedback,
                            },
                            {
                                path:'/teacherFinancial',
                                component: teacherFinancial,
                                },
                                {
                                    path:'/teacherGetMoney',
                                    component: teacherGetMoney,
                                    },
                                    {
                                        path:'/teacherMoneyResult',
                                        component: teacherMoneyResult,
                                        },
                                        {
                                            path:'/teacherMoneyList',
                                            component: teacherMoneyList,
                                            },
                                            {
                                                path:'/teacherLessonDetail',
                                                component: teacherLessonDetail,
                                                },
                                                {
                                                    path:'/teacherDoSingleDetail',
                                                    component: teacherDoSingleDetail,
                                                    },
                                                    {
                                                        path:'/teacherCommentStudent',
                                                        component: teacherCommentStudent,
                                                        },
                        
                    
                
    ]
