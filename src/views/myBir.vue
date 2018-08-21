<template>
  <div class="myBir">
      
    <group title=" " label-width="4.5em" label-margin-right="2em">
      <x-input title="日期" v-model="value"  @click.native="showPopup = true" text-align="right"></x-input>
      <div v-transfer-dom>
      <popup v-model="showPopup">
        <datetime-view v-model="value" format="YYYY年MM月DD日"></datetime-view>
      </popup>
    </div>
    </group>
    <div class="footerBtn">
     <x-button type="primary" action-type="button" :disabled="value.length==0">确定</x-button>

    </div>
  </div>
</template>

<script>
  import { XButton, XInput,Group, DatetimeView, Popup, TransferDom } from 'vux'

  export default {
    components: {
      Group,
      XButton,
      DatetimeView,
      Popup,
      XInput,
      TransferDom
    },
    directives: {
    TransferDom
  },
    data () {
      return {
        value: '',
        showPopup:false,
        nickname: function (value) {
        return {
          valid: (/^[\u4e00-\u9fa5a-zA-Z0-9]+$/).test(value),
          msg: '不能输入符号'
        }
      },
      }
    },
    created(){
        let type = this.$route.query.type;
        if(type){
            document.title = '昵称'
        }else{
            document.title = '姓名'
        }
    },
    methods:{
    }
  }
</script>
<style lang="less">
.myBir{
    .weui-cells__title{
    margin-top: 0;
    padding-top:.2rem; 
    padding-bottom:.1rem;
    font-size: .4rem;
}
.footerBtn{
    width: 90%;
    margin:1rem auto 0;
    text-align: center;
}
}
</style>
