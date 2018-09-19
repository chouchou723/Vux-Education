<template>
  <div class="assistantMessage">
       <view-box ref="viewBox">
     <group v-for="(item,index) in pointDetail" :key="index">
          <cell >
        <div slot="title" style="color:#999999;font-size:14px">场馆确认</div>
        <div style="color:#999999;font-size:14px">2018-3-11 10:52:01</div>
      </cell>
      <cell>
            <div class="coinBg" slot="title">
                场馆确认,地址:博城路上南路世博园2区行动力空间
            </div>
      </cell>
    </group>
       </view-box>
  </div>
</template>

<script>
import {Group,Cell,ViewBox   } from 'vux'
import {pushHimOnWall} from '../api/api'
import apiHost from '../../config/prod.env'
export default {
  components: {
   Group,Cell,ViewBox
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      value:'',
      pointDetail:[{date:'2018-03-11 10:52:01',point:20000,content:'充值20000积分',remain:20000},
      {date:'2018-03-11 10:52:01',content:'订单D282,消耗10000积分',point:-10000,remain:0},
      {date:'2018-03-11 10:52:01',content:'订单D282,消耗10000积分',point:-10000,remain:0},
      {date:'2018-03-11 10:52:01',content:'订单D282,消耗10000积分',point:-10000,remain:0},
      {date:'2018-03-11 10:52:01',content:'订单D282,消耗10000积分',point:-10000,remain:0},
      {date:'2018-03-11 10:52:01',content:'订单D282,消耗10000积分',point:-10000,remain:0},
      {date:'2018-03-11 10:52:01',content:'订单D282,消耗10000积分',point:-10000,remain:0},
      {date:'2018-03-11 10:52:01',content:'订单D282,消耗10000积分',point:-10000,remain:0},
      {date:'2018-03-11 10:52:01',content:'订单D282,消耗10000积分',point:-10000,remain:0},
      {date:'2018-03-11 10:52:01',content:'订单D282,消耗10000积分',point:-10000,remain:0},],
    }
  },
  methods:{
            gotoBuyP(){
                 this.$router.push('/buyPoints')
            },
            goTo(){
                console.log(1);
                if(this.buyStatus){

                    this.$router.push('/myLesson')
                }else{
                    this.$router.push('/paying')

                }
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
    // console.log(this.getMyF,apiHost.API_ROOT)
  },
  mounted(){
  },
  computed: {
    },
}
</script>

<style lang="less">
.assistantMessage{
    height: 100%;
    .weui-cells{
        margin-top:0.5em;
    }
    .coinBg{
        font-size: 15px;
        padding-bottom:10px
    }
}
</style>
