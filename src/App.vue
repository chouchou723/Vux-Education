<template>
  <div id="app" @touchstart="touchstart" @touchmove="touchmove">
     <transition >
    <router-view></router-view>
     </transition>
     <loading v-model="isLoading"></loading>
       <alert v-model="show2" title="离开" content="离开咯"></alert>
  </div>
</template>

<script>
import { Loading,Alert } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'app',
  components: {
    Loading,Alert
  },
  data(){
    return {
      clientX:0,
      show2:false,
    }
  },
  methods:{
    touchstart($event){
      this.clientX = $event.touches[0].clientX;
    },
    touchmove($event){
      if(this.clientX<20){
        let r = confirm('是否要关闭当前页面')
        if(r==true){
           this.$wechat.closeWindow();
        }else{
        }
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
#app{
  width: 100%;
  height: 100%;
  background-color: #F4F4F4;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
