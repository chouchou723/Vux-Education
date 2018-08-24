<template>
  <div class="myPaying">
       <group title="付款信息">
      <cell >
        <span slot="title" ><span style="vertical-align:middle;">支付金额</span></span>
        <span style="color:#fb6601">{{value}}元</span>

      </cell>
    </group>
    <group title="付款方式">
      <cell >
         <img slot="icon" src="../assets/wechatPay.png" alt="" class="payImg">
        <div slot="title" class="payTitle">
            <div style="margin-bottom:.1rem">微信支付</div>
            <div style="color:#999999;font-size:.3rem;">推荐安装微信5.0及以上版本使用</div>
        </div>
       <img src="../assets/payCheck.png" alt="" class="paycheck">

      </cell>
    </group>
    <div class="payButton">
     <x-button type="primary" action-type="button" @click.native="payOrder">立即付款</x-button>

    </div>
  </div>
</template>

<script>
import {Group,Cell,XButton    } from 'vux'
import {pushHimOnWall} from '../api/api'
import apiHost from '../../config/prod.env'
export default {
  components: {
  Group,Cell,XButton 
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      value:'',
    }
  },
  methods:{
            payOrder(){
                console.log(1);
                this.$router.push('/payResult')
                //  this.$wechat.chooseWXPay({
                //                             timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                //                             nonceStr: '', // 支付签名随机串，不长于 32 位
                //                             package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                //                             signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                //                             paySign: '', // 支付签名
                //                             success: function (res) {
                //                             // 支付成功后的回调函数
                //                             }
                //                             });
            }
  },
  created(){
    this.value = this.$route.query.m;
    // console.log(this.getMyF,apiHost.API_ROOT)
  },
  mounted(){
  },
  computed: {
    },
}
</script>

<style lang="less">
.myPaying {
.weui-cells__title{
    margin-top: 0;
    padding-top:.2rem; 
    padding-bottom:.2rem;
    font-size: .4rem;
}
.payImg{
    width: 1rem;
}
.payTitle{
margin-left: .5rem;
}
.paycheck{
    width: .8rem;
}
.payButton{
    width: 90%;
    margin:1rem auto 0;

}
}
</style>
