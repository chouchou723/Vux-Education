<template>
  <div class="teacherBottom">
     <tabbar @on-index-change='indexChange' v-model="index">
      <tabbar-item  @on-item-click="saveIndex"  link="/index">
        <img slot="icon" src="../assets/bi2.png">
        <img slot="icon-active" src="../assets/bi2B.png">
        <span slot="label">我的课程</span>
      </tabbar-item>
      <tabbar-item  @on-item-click="saveIndex"  >
        <!-- <img slot="icon" src="../assets/demo/icon_nav_msg.png"> -->
         <img slot="icon" src="../assets/publish.png">
        <img slot="icon-active" src="../assets/publishB.png">
        <span slot="label">发布课程</span>
      </tabbar-item>
      <tabbar-item  link="/teacherPersonal"  @on-item-click="saveIndex">
        <!-- <img slot="icon" src="../assets/demo/icon_nav_article.png"> -->
         <img slot="icon" src="../assets/bi3.png">
        <img slot="icon-active" src="../assets/bi3B.png">
        <span slot="label">个人中心</span>
      </tabbar-item>
      <tabbar-item >
        <!-- <img slot="icon" src="../assets/demo/icon_nav_cell.png"> -->
         <img slot="icon" src="../assets/bi4.png">
        <img slot="icon-active" src="../assets/bi4.png">
        <span slot="label" style="color:#999999">客服电话</span>
      </tabbar-item>
    </tabbar>
      <div v-transfer-dom>
      <confirm id="bottomConfirm" v-model="show"
      title="客服电话"
      content="确定拨打电话400-172-0748吗?"
      confirm-text='取消'
      cancel-text="确定"
      @on-cancel="onConfirm"
      @on-confirm="onCancel"
       @on-show="onShow">
        <p style="text-align:center;color:black;padding-top:.6rem;padding-bottom:1rem">确定拨打电话 400-172-0748吗?</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Confirm ,TransferDomDirective as TransferDom} from 'vux'
import {
    mapActions,mapGetters
} from 'vuex';
export default {
     directives: {
    TransferDom
        },
  components: {
    Tabbar,
    TabbarItem,Confirm
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
            case 2:
                break; 
            case 3:
                this.show = true;
                break;
            default:
                break;
        }
    },
  },
  created(){
      let path = this.$route.path;
      if(path=='/lecture'){
          this.index = 0
      }else if(path=='/myLesson'){
          this.index = 1
      }else if(path=='/teacherPersonal'){
          this.index = 2
      }
  },
  mounted(){
  
  },
  computed: {
        ...mapGetters([
            'getMyF'
            // ...
        ])
    },
}
</script>

<style>
#bottomConfirm .weui-dialog{
    border-radius: 10px;
}
#bottomConfirm .weui-dialog__btn_default,#bottomConfirm .weui-dialog__btn_primary{
    color: #007AFF;
}
.teacherBottom .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
    color:#00a6e7
}
</style>
