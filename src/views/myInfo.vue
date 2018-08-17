<template>
  <div class="myInfo">
      
    <group title=" " label-width="4.5em" label-margin-right="2em">
      <cell title="头像" is-link>
          <img :src="Asrc" class="myAvatar" alt="" @click.native="openFile">
           <input type="file" @change="fileChange()" style="display: none" ref="file" accept="image/png,image/jpeg,image/gif">
      </cell>
      <cell title="昵称"  is-link link="/myName?type=nickname">
          <div class="mr10">张佳乐</div>
      </cell>
       <cell title="姓名"  is-link link="/myName">
          <div class="mr10">张佳乐</div>
      </cell>
      <selector title="性别" :options="['男', '女']" v-model="value2"  direction="rtl"></selector>
       <cell title="生日"  is-link link="/myBir">
          <div class="mr10">1995年10月10日</div>
      </cell>
       <cell title="地址"  is-link link="/myAdd">
          <div class="mr10">上海市世博园</div>
      </cell>
       <cell title="手机"  is-link link="/myCell">
          <div class="mr10">15444449586</div>
      </cell>
    </group>
    <div class="footerBtn">
     <x-button type="primary" action-type="button">保存</x-button>

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
        addressData: ChinaAddressData,
        addressValue: ['广东省', '深圳市', '南山区'],
        value1: '张三',
        value2: '女',
        value3: '',
        value7: '',
        value8: '',
        value4: '',
        time1: '2017-06-01',
        value5: ['男'],
        value6: [],
        list: [['男', '女']],
        numberValue: 0,
        Asrc:require('@/assets/0e3a716cf47f1eb695e5b62597dec807.jpg')
      }
    },
    methods:{
        openFile(){
                this.$refs.file.click();
            },
            fileChange(){

                 var reads= new FileReader();
        let f= this.$refs.file.files[0];
        reads.readAsDataURL(f);
        reads.onload= (e)=> {
            this.Asrc=e.target.result;
                // console.log(e.target.result)
        };
            }
    }
  }
</script>
<style lang="less">
.myInfo{
    .weui-cells__title{
    margin-top: 0;
    padding-top:.2rem; 
    padding-bottom:.1rem;
    font-size: .4rem;
}
.myAvatar{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-right: 10px;
}
.mr10{
    margin-right: 10px;
}
.weui-select{
    color:#999999
}
.footerBtn{
    width: 90%;
    margin:1rem auto 0;
    text-align: center;
}
}
</style>
