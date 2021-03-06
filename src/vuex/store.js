import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
Vue.use(Vuex)
// 应用初始状态
// let inf = {
//     img:require('@/assets/0e3a716cf47f1eb695e5b62597dec807.jpg'),
//     nickname:'张佳乐哈哈哈',
//     name:'张佳乐',
//     sex:'男',
//     birthday:'1995年9月10日',
//     address:'上海市世博园空间',
//     cell:'25444449586'
// }
// localStorage.setItem('info',JSON.stringify(inf))

const state = {
  // count: 0,
  myF: '123',
  isLoading: false,
  myInfo: {
    img: '',
    nickname: '',
    name: '',
    sex: '男',
    birthday: '',
    address: '',
    cell: '',
    id:''
  },
  step:1,
  teacherInfo: {
    id:'',
    img: require('@/assets/bi3.png'),
    experience: {label:'',name:''},
    skill: [],
    realName: '',
    gender: 'MALE',
    // birthday: '',
    // address: '',
    // mobilePhone: '',
    description: '',
    edus: [],
    exps: [],
    cerIds:'',
    rejectReason:'',
    status:{
      label:'',
      name:''
    }
  }

}

// 定义所需的 mutations
const mutations = {
  SENDMYF(state, data) {
    state.myF = data;
  },
  changeStep(state, data) {
    state.step = data;
  },
  updateLoadingStatus(state, payload) {
    state.isLoading = payload.isLoading
  },
  changeInfo(state, data) {
    state.myInfo = { ...state.myInfo,
      ...data
    };
  },
  changeTeacherInfo(state, data) {
    state.teacherInfo = { ...state.teacherInfo,
      ...data
    };
  },
  // SENDRESOURCEID(state,uid){
  //     state.u_id = uid.u_id;
  //     state.u_status = uid.u_status;
  //     state.u_resource = uid.u_resource
  // },
}

// 创建 store 实例
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
