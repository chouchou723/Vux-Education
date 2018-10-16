// import axios from 'axios';
import Vue from 'vue'
import { AjaxPlugin,ToastPlugin  } from 'vux'
Vue.use(ToastPlugin)
// 或者umd方式
// 引入构建的js文件
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
AjaxPlugin.$http.interceptors.response.use(function (response) {
    // console.log(response.data,123)
    if(response.data.code==='0'){
        return response;
    }else{
        Vue.$vux.toast.show({
            text: response.data.msg,
            width:'auto',
            type:'text',
            position:'middle'
        })
    }
}, function (err) {
    // 处理统一的验证失效错误
    if (err && err.response) {
        switch (err.response.status) {
            case 401: 
                    Vue.$vux.toast.show({
                        text: '请稍后重试',
                        type:'text',
                        position:'middle'
                    });
                    break;
                    
            case 404: 
                    Vue.$vux.toast.show({
                        text: '请稍后重试',
                        type:'text',
                        position:'middle'
                    }); 
                    break;
            case 405:
                    Vue.$vux.toast.show({
                        text: '请稍后重试',
                        type:'text',
                        position:'middle'
                    });
                    break;
            case 500: 
                    Vue.$vux.toast.show({
                        text: '请稍后重试',
                        type:'text',
                        position:'middle'
                    }); 
                    break;
            default: 
                    Vue.$vux.toast.show({
                        text: '请稍后重试',
                        type:'text',
                        position:'middle'
                    });
        }
    }else{
        Vue.$vux.toast.show({
            text: '请稍后重试',
                        type:'text',
                        position:'middle'
        });
    }  
    return Promise.reject(err);
  });
// let base ='';
let base = 'http://eduweixin.test.artreedu.com';
// let base = 'http://panda.dfth.com';
// access_token  : 24680
// login_role  :  student
// unionId  :  ohzciv91EysSA6kUFOQ24LBsZBDw
//微信获取token
export const  getAT = (role,params) => {
    if(role==='student'){
        AjaxPlugin.$http.defaults.headers.common['login_role'] = role;
    //     AjaxPlugin.$http.defaults.headers.common['access_token'] = '24680';
    //    AjaxPlugin.$http.defaults.headers.common['unionId'] = 'ohzciv91EysSA6kUFOQ24LBsZBDw';

    }
    // else if(role==='assistant'){
    //     AjaxPlugin.$http.defaults.headers.common['login_role'] = 'teacher';
    //     AjaxPlugin.$http.defaults.headers.common['access_token'] = '13579';
    //     AjaxPlugin.$http.defaults.headers.common['unionId'] = 'ohzciv75r9gBnLM3Zs2z7V0WqFvU';
    // }
    else{
        AjaxPlugin.$http.defaults.headers.common['login_role'] = 'teacher';
        // AjaxPlugin.$http.defaults.headers.common['access_token'] = '13579';
        // AjaxPlugin.$http.defaults.headers.common['unionId'] = 'ohzciv75r9gBnLM3Zs2z7V0WqFvU';

        //pre
        //  AjaxPlugin.$http.defaults.headers.common['access_token'] = '11111';
        // AjaxPlugin.$http.defaults.headers.common['unionId'] = 'ohzciv75r9gBnLM3Zs2z7V0WqFv1';
// wait
        // AjaxPlugin.$http.defaults.headers.common['access_token'] = '22222';
        // AjaxPlugin.$http.defaults.headers.common['unionId'] = 'ohzciv75r9gBnLM3Zs2z7V0WqFv2';
//fail
        // AjaxPlugin.$http.defaults.headers.common['access_token'] = '33333';
        // AjaxPlugin.$http.defaults.headers.common['unionId'] = 'ohzciv75r9gBnLM3Zs2z7V0WqFv3';

    }
    return AjaxPlugin.$http.get(`${base}/api/auth/wechat`, { params: params }).then(res => {
        console.log(res)
        let para = {
            code : params.code
        }
        return getTokenInfo(para).then(res=>{
            return res.data
        })
    });
};
//查询学生信息
export const  getTokenInfo = (params1) => {
    return AjaxPlugin.$http.get(`${base}/api/auth/getInfo`, { params1: params1 }).then(res => res.data);
};

//查询学生信息
export const  getStudentInfo = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/stus`, { params: params }).then(res => res.data);
};
//查询学生信息 个人主页
export const  getStudentIndex = () => {
    return AjaxPlugin.$http.get(`${base}/api/stus/lit`).then(res => res.data);
};


//我要选课列表
export const  getLessonList = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/course`, { params: params }).then(res => res.data);
};
//获取所有场馆 
export const  getAllVenue = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/venue/all`, { params: params }).then(res => res.data);
};
//根据场馆获取教室 
export const  getClassrooms = (id) => {
    return AjaxPlugin.$http.get(`${base}/api/venue/${id}/classrooms`).then(res => res.data);
};
//获取课程种类 
export const  getCourseKind = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/course/kinds`, { params: params }).then(res => res.data);
};
//获取适用年龄 
export const  getApplyAge = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/course/applyAge`, { params: params }).then(res => res.data);
};

//我要选课 课程详情
export const  lessonDetail = (id) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.get(`${base}/api/course/${id}`).then(res => res.data);
};
//我要选课 点击收藏
export const  doCollect = (id,token) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/course/${id}/collect`).then(res => res.data);
};
//我的课程 课程日历
export const  lessonDateStatus = (id,params) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.get(`${base}/api/course/${id}/schedules`,{params :params }).then(res => res.data);
};


//我的课程列表
export const  getMyLessonList = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/course/stu`, { params: params }).then(res => res.data);
};
//我的课程 我要评价提交
export const  doComment = (id,params) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/course/comment?courseId=${id}`, params).then(res => res.data);
};
//我的课程 上课情况列表 
export const  getMyLessonSituation = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/course/class/stu/situation?courseId=${params.id}`).then(res => res.data);
};
//我的课程 上课情况 单节课具体的评价 
export const  getMyLessonSituationOne = (id, token) => {
    return AjaxPlugin.$http.get(`${base}/api/course/class/${id}/stu/situationDetail`).then(res => res.data);
};

//学生个人中心 我的订单列表
export const  getMyOrder = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/orders/stu`, { params: params }).then(res => res.data);
};
//学生个人中心 提交订单
export const  payMyOrder = (params) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/orders/course`, params).then(res => res.data);
};
//学生个人中心 付款获取wx jdk
export const  getWxPay = (params) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/orders/pay`, params).then(res => res.data);
};
//学生个人中心 取消订单 
export const  cancelMyOrder = (id,token) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/orders/${id}`).then(res => res.data);
};
//学生个人中心 申请退款 
export const  refundMyOrder = (id,token) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/orders/${id}/refund`).then(res => res.data);
};
//学生个人中心 删除
export const  deleteMyOrder = (id) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.delete(`${base}/api/orders/${id}`).then(res => res.data);
};
//学生个人中心 我的积分列表
export const  getMyPoint = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/orders/myPoint`, { params: params }).then(res => res.data);
};
//学生个人中心 积分充值 暂无
export const  payMyPoint = (params,token) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/course/class/${params}/evaluate/stu`, params).then(res => res.data);
};
//学生个人中心 消费记录列表
export const  getMyPurchase = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/orders/cost`, { params: params }).then(res => res.data);
};
//学生个人中心 我的作品列表
export const  getMyPicture = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/stus/myPics`, { params: params }).then(res => res.data);
};
//学生个人中心 我的收藏列表
export const  getMyCollect = (params, token) => {
    return AjaxPlugin.$http.get(`${base}/api/stus/myCollection`, { params: params }).then(res => res.data);
};


//学生个人中心 意见反馈提交
export const  postMyFeedback = (params, token) => {
    return AjaxPlugin.$http.post(`${base}/api/feedback`, params).then(res => res.data);
};
//学生个人中心 提交修改个人信息
export const  postMyInfo = (id, params) => {
    return AjaxPlugin.$http.post(`${base}/api/stus/${id}`, params).then(res => res.data);
};




//我要选课/我的课程 获取教师详情 
export const  getTeacherInfo = (id) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.get(`${base}/api/teachers/${id}`).then(res => res.data);
};
//所有评价 
export const  getAllComment = (params) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.get(`${base}/api/course/comment/all`,{params:params}).then(res => res.data);
};
//评价详情 
export const  getCommentDetail = (id) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.get(`${base}/api/course/comment/${id}`).then(res => res.data);
};
//回复评论
export const  postCommentD = (id,params) => {
    return AjaxPlugin.$http.post(`${base}/api/course/comment/${id}/reply`, params).then(res => res.data);
};
//点赞
export const  postCommentLike = (id,params) => {
    return AjaxPlugin.$http.post(`${base}/api/course/comment/${id}/like`, params).then(res => res.data);
};
//图片上传
export const  uploadPic = (params,config) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/attach/img/upload`,params,config).then(res => res.data);
};
//图片上传base64
export const  uploadPicBase = (params) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/attach/img/baseImg`,params).then(res => res.data);
};


//教师端
//获取验证码
export const  getSmsCode = (params) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/sms/captcha`,params).then(res => res.data);
};
//验证验证码
export const  submitSmsCode = (params) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/sms/bind`,params).then(res => res.data);
};


//教师获取自己信息 
export const  getInfoTeacher = (id) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.get(`${base}/api/teachers`).then(res => res.data);
};
//教师获取自己课程 
export const  getTeacherLesson = (params) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.get(`${base}/api/course/my/tea`,{params:params}).then(res => res.data);
};
//教师获取主页信息 
export const  getTeacherIndex = (params) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.get(`${base}/api/teachers/lit`,{params:params}).then(res => res.data);
};
//教师获取我的订单 
export const  getTeacherOrder = (params) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.get(`${base}/api/orders/teacher`,{params:params}).then(res => res.data);
};
//教师获取我的财务记录 
export const  getTeacherBuz = (params) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.get(`${base}/api/orders/teacher/buz`,{params:params}).then(res => res.data);
};
//教师获取我的提现记录 
export const  getTeacherWithdraw = (params) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.get(`${base}/api/orders/teacher/withdraw`,{params:params}).then(res => res.data);
};
//教师 创建课程时的课程内容 
export const  getTeacherLessonDetail = (id) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.get(`${base}/api/course/content/${id}`).then(res => res.data);
};
//教师 开课状态的 课程列表
export const  getTeacherLessonDetailList = (id) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.get(`${base}/api/course/class/${id}`).then(res => res.data);
};
//教师 申请提现
export const  doWithDraw = (params) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/orders/teacher/withdraw`,params).then(res => res.data);
};
//教师 获取学历
export const  getTeacherDegree = () => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.get(`${base}/api/teachers/enum/degree`).then(res => res.data);
};
//教师 获取教龄
export const  getTeacherExp = () => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.get(`${base}/api/teachers/enum/exp`).then(res => res.data);
};
//教师 提交资料
export const  editTeacherInfo = (params) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/teachers`,params).then(res => res.data);
};
//教师 提交教育经历
export const  editTeacherEdu = (params) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/teachers/edus`,params).then(res => res.data);
};
//教师 提交教学经验
export const  editTeacherExp = (params) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/teachers/exps`,params).then(res => res.data);
};
//教师 学生签到
export const  doSign = (params,id) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/course/class/${id}/sign`,params).then(res => res.data);
};
//教师 学生点评
export const  doStudentComment = (params,id) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/course/class/${id}/evaluate/stu`,params).then(res => res.data);
};
//教师 学生作品上传
export const  doStudentPicUpload = (params,id) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/course/class/${id}/uploadPics`,params).then(res => res.data);
};
//教师 学生作品点评
export const  doStudentPicComment = (params,id) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/course/class/${id}/evaluate`,params).then(res => res.data);
};
//教师 创建课程选择已有课程
export const  getTeacherAlreadyClass = (params) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.get(`${base}/api/course/content`,{params:params}).then(res => res.data);
};
//教师 创建课程下一步获取课程表
export const  getTeacherschedules = (params) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.get(`${base}/api/course/schedules`,{params:params}).then(res => res.data);
};
//教师 创建新的课程内容
export const  createNewContent = (params,id) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/course/content`,params).then(res => res.data);
};
//教师 最后确定发布课程
export const  publishClass = (params,id) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/course`,params).then(res => res.data);
};
//教师 修改单个课程时间
export const  editIndClassTime = (params) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/course/schedule/tmp/modify`,params).then(res => res.data);
};
//教师 根据tmpid获取时间表
export const  getTeacherschedulesByTmp = (params) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.get(`${base}/api/course/schedule/tmp`,{params:params}).then(res => res.data);
};

//助教 审核通过
export const  passTheClass = (params,id) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/course/${id}/pass`,params).then(res => res.data);
};
//助教 审核不通过
export const  rejectTheClass = (params,id) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/course/${id}/reject`,params).then(res => res.data);
};









