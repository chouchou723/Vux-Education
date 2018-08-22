<template>
  <div class="myBir">
      
    <group title=" " label-width="4.5em" label-margin-right="2em">
      <!-- <x-input title="日期" v-model="value"  @click.native="showPopup = true" text-align="right"></x-input>
      <div v-transfer-dom>
      <popup v-model="showPopup">
        <datetime-view v-model="value" format="YYYY年MM月DD日"></datetime-view>
      </popup>
    </div> -->
     <datetime
     :min-year="1910"
     :end-date="endDate"
        v-model="value"
        title="日期"></datetime>
    </group>
    <div class="footerBtn">
     <x-button type="primary" action-type="button" :disabled="value.length==0" @click.native="confirm">确定</x-button>

    </div>
  </div>
</template>

<script>
  import { XButton, XInput,Group, Datetime, Popup, TransferDom } from 'vux'
import {
    mapActions,mapGetters
} from 'vuex';
  export default {
    components: {
      Group,
      XButton,
      Datetime,
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
        endDate:'',//new Date().toLocaleDateString().replace('/','-'),
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
            document.title = '生日';
            this.value = this.getMyInfo.birthday
            let date = new Date();
            let month = ('0'+(date.getMonth()+1)).slice(-2);
            let day = ('0'+date.getDate()).slice(-2)
            this.endDate = date.getFullYear()+'-'+month+'-'+day
    },
    methods:{
      ...mapActions([
                'setMyInfo'
            ]),
      confirm(){
        this.setMyInfo({birthday:this.value})
        this.$router.push('/myInfo')
      }
    },
    computed: {
        ...mapGetters([
            'getMyInfo'
            // ...
        ]),
    },
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
