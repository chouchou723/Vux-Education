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
  const assistantDoSingleDetail = () =>
  import('@/assistantView/assistantDoSingleDetail')
  const assistantCommentStudent = () =>
  import('@/assistantView/assistantCommentStudent')
  const assistantUploadPic = () =>
  import('@/assistantView/assistantUploadPic')
  const assistantPicComment = () =>
  import('@/assistantView/assistantPicComment')
  



export const AssistantRoutes = [{
    path: '/assistantTeacher',
    meta: {
      type: 'assistant'
    },
    component: assistantHome,
    children: [{
        path: '/',
        meta: {
          type: 'assistant'
        },
        component: assistantClass
      },
      {
        path: '/assistantMessage',
        meta: {
          type: 'assistant'
        },
        component: assistantMessage
      }
    ]
  },
  {
    path: '/assistantLessonDetail',
    meta: {
      type: 'assistant'
    },
    component: assistantLessonDetail
  },
  {
    path: '/failReason',
    meta: {
      type: 'assistant'
    },
    component: failReason
  },
  {
    path: '/classSetting',
    meta: {
      type: 'assistant'
    },
    component: classSetting
  },
  {
    path: '/assistantDoSingleDetail',
    meta: {
      type: 'assistant'
    },
    component: assistantDoSingleDetail
  },
  {
    path: '/assistantCommentStudent',
    meta: {
      type: 'assistant'
    },
    component: assistantCommentStudent
  },
  {
    path: '/assistantUploadPic',
    meta: {
      type: 'assistant'
    },
    component: assistantUploadPic
  },
  {
    path: '/assistantPicComment',
    meta: {
      type: 'assistant'
    },
    component: assistantPicComment
  }
  
  
  
]
