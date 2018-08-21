import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
Vue.use(Vuex)
// 应用初始状态
const state = {
    // count: 0,
    myF:'123',
    isLoading: false
    
}

// 定义所需的 mutations
const mutations = {
    SENDMYF(state,data){
        state.myF = data;
    },
    updateLoadingStatus (state, payload) {
        state.isLoading = payload.isLoading
      }
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