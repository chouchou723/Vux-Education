<template>
  <div class="purchaseHistory">
       <view-box ref="viewBox">
     <group title="近半年消费总计:4880元">
      <cell v-for="(item,index) in pointDetail" :key="index">
            <div style="color:#fb6804">
                2880元
            </div>
            <div class="coinBg" slot="title">
                <div class="coinTitle">
                    <div>{{item.date}}</div>
                    </div>
                <div class="coinContent">
                    <div>{{item.content}}
                    </div>
                    </div>
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
.purchaseHistory{
    height: 100%;
    .weui-cells__title{
    margin-top: 0;
    padding-top:.2rem; 
    padding-bottom:.2rem;
    font-size: .4rem;
    }
    .coinBg{
        max-width: 7rem;
        // height: 2rem;
        padding: 0 .2rem;
        position: relative;
        box-sizing: border-box;
    }
    .coinTitle{
        font-size: 13px;
        color: #999999; 
        display: flex;
        justify-content: space-between;
        margin-bottom:.2rem;
    }
    .coinContent{
        font-size: 16px;
        display: flex;
        justify-content: space-between;
    }
}
</style>
