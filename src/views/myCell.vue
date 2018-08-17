<template>
  <div class="myCell">
      
    <group title=" " label-width="4.5em" label-margin-right="2em">
      <x-input  mask="99999999999" type='tel' v-model="value"></x-input>
    </group>
    <div class="footerBtn">
     <x-button type="primary" action-type="button" :disabled="value.length==0">确定</x-button>

    </div>
  </div>
</template>

<script>
  import { XButton, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch } from 'vux'

  export default {
    components: {
      Group,
      XButton,
      Cell,
      XInput,
      Selector,
      PopupPicker,
      XAddress,
      Datetime,
      XNumber,
      XTextarea,
      XSwitch
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
    },
    methods:{
    }
  }
</script>
<style lang="less">
.myCell{
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
