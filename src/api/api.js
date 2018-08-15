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
let base = 'http://pandatest.dfth.com';
// let base = 'http://panda.dfth.com';



//参展
export const  pushHimOnWall = (params,token) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.post(`${base}/api/v1/active/pushHimOnWall`, params).then(res => res.data);
};
//导出二维码
export const  onWallCode = (params, token) => {
    // axios.defaults.headers.common['Authorization'] = token.Authorization;
    return AjaxPlugin.$http.get(`${base}/api/v1/active/onWallCode`, { params: params }).then(res => res.data);
};

