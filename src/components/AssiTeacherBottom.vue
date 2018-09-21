<template>
  <div class="AssiTeacherBottom">
     <tabbar @on-index-change='indexChange' v-model="index">
      <tabbar-item  @on-item-click="saveIndex"  link="/assistantTeacher">
        <img slot="icon" src="../assets/bi2.png">
        <img slot="icon-active" src="../assets/bi2B.png">
        <span slot="label">课程列表</span>
      </tabbar-item>
      <tabbar-item  @on-item-click="saveIndex"  link="/assistantMessage">
        <!-- <img slot="icon" src="../assets/demo/icon_nav_msg.png"> -->
         <img slot="icon" src="../assets/message.png">
        <img slot="icon-active" src="../assets/messageB.png">
        <span slot="label">消息通知</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem} from 'vux'
import {
    mapActions,mapGetters
} from 'vuex';
export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data () {
    return {
        show:false,
        one:true,
        two:false,
        three:false,
        index:0,
        saveI:0,
    }
  },
  methods:{
      saveIndex(){
          this.saveI = this.index;
      },
      onCancel(){
          this.index=this.saveI;
      },
      onConfirm(){
      },
      onShow(){
            document.querySelector(".weui-dialog__ft a").setAttribute('href','tel:4001720748');
      },
    ...mapActions([
                'setMyF'
            ]),
    indexChange(index){
        switch (index) {
            case 0:
                break;
            case 1:
                break;
            default:
                break;
        }
    },
    tabIndex(){
 let path = this.$route.path;
      if(path=='/assistantTeacher'){
          this.index = 0
      }else if(path=='/assistantMessage'){
          this.index = 1
      }
    }
  },
  created(){
     this.tabIndex()
  },
  mounted(){
  
  },
  computed: {
        ...mapGetters([
            'getMyF'
            // ...
        ]),
    },
    watch:{
        '$route': 'tabIndex'
    }
}
</script>

<style>
#bottomConfirm .weui-dialog{
    border-radius: 10px;
}
#bottomConfirm .weui-dialog__btn_default,#bottomConfirm .weui-dialog__btn_primary{
    color: #007AFF;
}
.AssiTeacherBottom .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
    color:#00a6e7
}
</style>
