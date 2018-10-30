// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
// import VueRouter from 'vue-router'
import router from './router';
import App from './App'
import 'lib-flexible/flexible.js'
import store from './vuex/store'

import { WechatPlugin,ToastPlugin } from 'vux'
Vue.use(WechatPlugin)
Vue.use(ToastPlugin)
// console.log(Vue.wechat)
Vue.mixin({
  data(){
    return {
      apiUrl:'http://eduweixin.test.artreedu.com',
      // apiUrl:''
    }
  },
  methods:{
    scrollT(){
      document.getElementById("vux_view_box_body")&&(document.getElementById("vux_view_box_body").scrollTop=0)
    },
    setTitle(title){
      document.title = title
    }
  },
  beforeCreate () {
    let inf = JSON.parse(localStorage.getItem('teacherInfo'))
    let route = this.$route.meta;
    if(route.type==='teacher'){
      if (inf&&inf.status.name !== 'PASS') {
      this.$router.replace({
        path:`/applyFirst`,
      })
    }

    }
  }
  })

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
