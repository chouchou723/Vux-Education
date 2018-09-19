<template>
  <div id="app" @touchstart="touchstart" @touchmove="touchmove">
    <transition>
      <router-view></router-view>
    </transition>
    <loading v-model="isLoading"></loading>
    <alert v-model="show2" title="离开" content="离开咯"></alert>
  </div>
</template>

<script>
  import {
    Loading,
    Alert
  } from 'vux'
  import {
    mapState,
    mapActions
  } from 'vuex'
  import {
    getAT
  } from './api/api'
  export default {
    name: 'app',
    components: {
      Loading,
      Alert
    },
    data() {
      return {
        clientX: 0,
        show2: false,
      }
    },
    created() {
      let inf = {
        img: require('@/assets/0e3a716cf47f1eb695e5b62597dec807.jpg'),
        nickname: '张佳乐哈哈哈',
        name: '张佳乐',
        sex: '男',
        birthday: '1995年9月10日',
        address: '上海市世博园空间',
        cell: '13444444455'
      }
      localStorage.setItem('info', JSON.stringify(inf))
      this.setMyInfo({ ...inf
      })
      let para = {
        login_role: 'student'
      }
      getAT(para).then(res => {
        console.log(res)
      })
    },
    methods: {
      ...mapActions([
        'setMyInfo'
      ]),
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
  }
  // .fade-enter-active, .fade-leave-active {
  //   transition: opacity .2s;
  // }
  // .fade-enter, .fade-leave-to  {
  //   opacity: 0;
  // }
</style>
