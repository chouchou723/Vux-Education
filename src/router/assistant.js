const assistantHome = () =>
  import('@/assistantView/assistantHome')
const assistantMessage = () =>
  import('@/assistantView/assistantMessage')
const assistantClass = () =>
  import('@/assistantView/assistantClass')
const assistantLessonDetail = () =>
  import('@/assistantView/assistantLessonDetail')
const failReason = () =>
  import('@/assistantView/failReason')
const classSetting = () =>
  import('@/assistantView/classSetting')




export const AssistantRoutes = [{
    path: '/assistantTeacher',
    component: assistantHome,
    children: [{
        path: '/',
        component: assistantClass
      },
      {
        path: '/assistantMessage',
        component: assistantMessage
      }
    ]
  },
  {
    path: '/assistantLessonDetail',
    component: assistantLessonDetail
  },
  {
    path: '/failReason',
    component: failReason
  },
  {
    path: '/classSetting',
    component: classSetting
  }
]
