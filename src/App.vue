<template>
  <div id="app">
    <transition>
      <div id="isApp">
      <router-view></router-view>
      </div>
    </transition>
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
  import {
    Loading,
  } from 'vux'
  import {
    mapState,
  } from 'vuex'
  export default {
    name: 'app',
    components: {
      Loading
    },
    data() {
      return {
        clientX: 0,
        show2: false,
        // inf: {
        //   img: require('@/assets/0e3a716cf47f1eb695e5b62597dec807.jpg'),
        //   nickname: '',
        //   name: '',
        //   sex: '男',
        //   birthday: '',
        //   address: '',
        //   cell: ''
        // },
        // teacherInf: {
        //   id: '',
        //   img: '',
        //   experience: {
        //     label: '',
        //     name: ''
        //   },
        //   skill: [],
        //   realName: '',
        //   gender: '',
        //   // birthday: data.birthday ? data.birthday : '',
        //   // address: data.address ? data.address : '',
        //   // mobilePhone: data.mobilePhone ? data.mobilePhone : '',
        //   description: '',
        //   edus: [],
        //   exps: [],
        //   cerIds: '',
        //   rejectReason:'',
        //   status:{
        //     label:'',
        //     name:''
        //   }
        // }
      }
    },
    created() {
      // window.confirm = function(name) {
      //   const iframe = document.createElement("IFRAME");
      //   iframe.style.display = "none";
      //   iframe.setAttribute("src", 'data:text/plain,');
      //   document.documentElement.appendChild(iframe);
      //   const result = window.frames[0].window.confirm(name);
      //   iframe.parentNode.removeChild(iframe);
      //   return result;
      // }
    },
    mounted(){
      window.alert = function (name) {
      var iframe = document.createElement("IFRAME");
      iframe.style.display = "none";
      iframe.setAttribute("src", 'data:text/plain,');
      document.documentElement.appendChild(iframe);
      window.frames[0].window.alert(name);
      iframe.parentNode.removeChild(iframe);
    }
    var count = sessionStorage.getItem('count') || 0;
    var setReload = setInterval(function () {
      var isA = document.getElementById('isApp');
      if(isA){
        var el = document.getElementById('isApp').children.length;
        if (!el && count === 0) {
          window.alert('页面重新加载')
          window.location.reload();
          sessionStorage.setItem('count', 1)
        } else {
          clearInterval(setReload)
        }
      }
    }, 2000)
    },
    methods: {
      // touchstart($event) {
      //   this.clientX = $event.touches[0].clientX;
      // },
      // touchmove($event) {
      //   if (this.clientX < 20) {
      //     let r = confirm('是否要关闭当前页面')
      //     if (r == true) {
      //       this.$wechat.closeWindow();
      //     } else {}
      //   }
      // }
    },
    computed: {
      ...mapState({
        isLoading: state => state.isLoading
      })
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  #app,#isApp {
    width: 100%;
    height: 100%;
    background-color: #F4F4F4;
     ::-webkit-input-placeholder {
      color: #B2B2B2;
    }
  } // .fade-enter-active, .fade-leave-active {
  //   transition: opacity .2s;
  // }
  // .fade-enter, .fade-leave-to  {
  //   opacity: 0;
  // }
</style>
