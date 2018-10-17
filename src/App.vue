<template>
  <div id="app" @touchstart="touchstart" @touchmove="touchmove">
    <transition>
      <router-view></router-view>
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
    },
    methods: {
      touchstart($event) {
        this.clientX = $event.touches[0].clientX;
      },
      touchmove($event) {
        if (this.clientX < 20) {
          let r = confirm('是否要关闭当前页面')
          if (r == true) {
            this.$wechat.closeWindow();
          } else {}
        }
      }
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
  #app {
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
