<template>
  <div class="myAdd">
      
    <group title=" " label-width="4.5em" label-margin-right="2em">
     <x-textarea :max="200" placeholder="请输入地址" :show-counter="false" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
    </group>
    <div class="footerBtn">
     <x-button type="primary" action-type="button" :disabled="value.length==0">确定</x-button>

    </div>
  </div>
</template>

<script>
  import { XButton, Group,XTextarea } from 'vux'

  export default {
    components: {
      Group,
      XButton,
      XTextarea
    },
    data () {
      return {
        value: '',
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
.myAdd{
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
