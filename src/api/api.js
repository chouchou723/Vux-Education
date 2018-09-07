// import axios from 'axios';
import { AjaxPlugin } from 'vux'
// import {router} from '../router';
// axios.interceptors.request.use(config => {
//     // element ui Loading方法
//     // loadinginstace = Loading.service({ fullscreen: true })
//     console.log(config)
//     return config
//    }, error => {
//     loadinginstace.close()
//     Message.error({
//     message: '加载超时'
//     })
//     return Promise.reject(error)
//    })
// axios.interceptors.response.use(function (response) {
//     return response;
//   }, function (error) {
//     // 处理统一的验证失效错误
//     if(error.response.status==401){
//         Message.error('您的帐号已在其他地方登录,请重新登录');
//         router.push('/login')
//     }else if(error.response.status==405){
//             Message.error('请联系管理员确认您的权限')    
//         }else if(error.response.status==500){
//             Message.error('服务器内部错误,请联系管理员')        
//         }else{
//             Message.error('请联系管理员检查该问题')
//         }   
//     return Promise.reject(error);
//   });
// let base ='';
let base = 'http://eduweixin.test.artreedu.com';
// let base = 'http://panda.dfth.com';

AjaxPlugin.$http.defaults.headers.common['Authorization'] = '123';
//我要选课列表
export const  getLessonList = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/course`, { params: params }).then(res => res.data);
};
//我要选课 课程详情
export const  lessonDetail = (id) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.get(`${base}/api/course/${id}`).then(res => res.data);
};
//我要选课 点击收藏
export const  doCollect = (params,token) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/course/${params.id}/collect`, params).then(res => res.data);
};


//我的课程列表
export const  getMyLessonList = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/course/stu`, { params: params }).then(res => res.data);
};
//我的课程 课程详细
export const  getMyLessonDetail = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/course/{id}/info`, { params: params }).then(res => res.data);
};
//我的课程 我要评价提交
export const  doComment = (params,token) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/course/class/${params}/evaluate/stu`, params).then(res => res.data);
};
//我的课程 上课情况日历切换月份 暂无
export const  getMyLessonDate = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/course/{id}/info`, { params: params }).then(res => res.data);
};
//我的课程 上课情况列表 暂无
export const  getMyLessonSituation = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/course/{id}/info`, { params: params }).then(res => res.data);
};
//我的课程 上课情况 单节课具体的评价 暂无
export const  getMyLessonSituationOne = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/course/{id}/info`, { params: params }).then(res => res.data);
};

//学生个人中心 获取信息 
export const  getMyInfo = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/stu`, { params: params }).then(res => res.data);
};
//学生个人中心 我的订单列表
export const  getMyOrder = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/order/stu`, { params: params }).then(res => res.data);
};
//学生个人中心 付款 暂无
export const  payMyOrder = (params,token) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/course/class/${params}/evaluate/stu`, params).then(res => res.data);
};
//学生个人中心 取消 暂无
export const  cancelMyOrder = (params,token) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/course/class/${params}/evaluate/stu`, params).then(res => res.data);
};
//学生个人中心 申请退款 暂无
export const  refundMyOrder = (params,token) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/course/class/${params}/evaluate/stu`, params).then(res => res.data);
};
//学生个人中心 删除 暂无
export const  deleteMyOrder = (params,token) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/course/class/${params}/evaluate/stu`, params).then(res => res.data);
};
//学生个人中心 我的积分列表
export const  getMyPoint = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/order/myPoint`, { params: params }).then(res => res.data);
};
//学生个人中心 积分充值 暂无
export const  payMyPoint = (params,token) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/course/class/${params}/evaluate/stu`, params).then(res => res.data);
};
//学生个人中心 消费记录列表
export const  getMyPurchase = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/order/cost`, { params: params }).then(res => res.data);
};
//学生个人中心 我的作品列表
export const  getMyPicture = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/stu/myPics`, { params: params }).then(res => res.data);
};
//学生个人中心 我的收藏列表
export const  getMyCollect = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/stu/myCollection`, { params: params }).then(res => res.data);
};

//课程信息 提交订单 
export const  commitMyOrder = (params,token) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/order/course`, params).then(res => res.data);
};

//学生个人中心 意见反馈提交
export const  postMyFeedback = (params, token) => {
    return AjaxPlugin.$http.post(`${base}/api/feedback`, { params: params }).then(res => res.data);
};
//学生个人中心 提交修改个人信息
export const  postMyInfo = (params, token) => {
    return AjaxPlugin.$http.post(`${base}/api/stu/${params}`, { params: params }).then(res => res.data);
};




//我要选课/我的课程 获取教师详情 暂无
export const  getTeacherInfo = (id) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.get(`${base}/api/course/${id}`).then(res => res.data);
};
//所有评价 暂无
export const  getAllComment = (id) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.get(`${base}/api/course/${id}`).then(res => res.data);
};