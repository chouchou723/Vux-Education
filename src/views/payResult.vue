<template>
  <div class="payResult">
      <div class="iconBg">
          <img src="../assets/buySuccess.png" alt="" class="buySuccess">
          <div class="buySuccessFont">购买成功</div>
      </div>
       <group style="margin-top:-0.2rem"  :key="index">
            <cell-box is-link >
                
                <div class="lessonListAll">
                    <div class="lessonTitleC">
                        <div class="lessonTitleNo">订单号:K283</div>
                    </div>
                <div class="lessonTitle">

                    <img src="../assets/0e3a716cf47f1eb695e5b62597dec807.jpg" width="65" height="65" alt="">
                    <div class="lessonDetail">
                        <div class="lessonList">
                            <div class="lessonName">{{item.name}}</div>
                        </div>
                        <div class="lessonContent">{{item.content}}</div>
                        <div class="lessonPrice">{{item.price}}元</div>
                    </div>
                </div>
                </div>
            <!-- anything -->
            </cell-box>
        </group>
     <div class="payButton">
     <x-button type="primary" action-type="button" @click.native="goTo">我知道了</x-button>

    </div>
  </div>
</template>

<script>
import {XButton,Group,CellBox    } from 'vux'
import {pushHimOnWall} from '../api/api'
import apiHost from '../../config/prod.env'
import {
    mapActions,mapGetters
} from 'vuex';
export default {
  components: {
  XButton ,Group,CellBox
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      value:'',
      item:{id:1,ishot:true,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120,status:'待上课'}
    }
  },
  methods:{
    ...mapActions([
                'setMyF'
            ]),
            goTo(){
                console.log(1);
                this.$router.push('/myLesson')
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
      this.selectList = this.selectList0;
    // console.log(this.getMyF,apiHost.API_ROOT)
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
.iconBg{
    width: 100%;
    height: 5rem;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.buySuccess{
    width: 2rem;
}
.buySuccessFont{
    font-size: .5rem;
    margin-top: .5rem;
}
.lessonListAll{
     width: 100%;
    display: flex;
    flex-direction: column;
}
.lessonTitle{
     display: flex;
    flex-direction: row;
    align-items: center;
    padding: .2rem 0 0;
}
.lessonTitleC{
     display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: .1rem 0 .3rem;
    border-bottom: 1px solid gainsboro;
}
.lessonList{
    width: 100%;
    display: flex;
    align-items: center;
    padding: .1rem 0;
}
.lessonDetail{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: .4rem;
}
.hot{
    font-size: .16rem;
    padding: 0 .1rem;
    background-color: #f76260;
    color: white;
    border-radius: .07rem;
}
.lessonName{
    padding: 0 .2rem 0 0;
}
.lessonStatus{
    font-size: .16rem;
    color: #fa9b9a;
    border: 1px solid #fa9b9a;
    border-radius: .3rem;
    padding: 0 .2rem;
}
.lessonContent{
     font-size: .16rem;
     color: #b6b6b6;
}
.lessonPrice{
    color: #fb6804;
}
.lessonTitleNo{
    color: #8a8e93;
    font-size: .4rem;
    position: relative;
}
.lessonTitleStatus{
    font-size: .4rem;
}
.payResult .weui-cell_access.vux-cell-box:after{
    display: none;
}
.lessonTitleNo::before{
    content:'';
    position: absolute;
    width: .25rem;
    height: calc(100% + .6rem);
    background: #04be02;
    top:-.3rem;
    left:-0.5rem;
}
.payButton{
    width: 90%;
    margin:.7rem auto 0;
}
</style>
