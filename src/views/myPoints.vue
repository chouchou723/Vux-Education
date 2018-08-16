<template>
  <div class="myPoints">
      <group title="总余额">
      <cell >
        <div slot="title" class="payTitle">
            <div style="margin-bottom:.1rem">积分:<span style="color:#fb6804;margin-left:.2rem">20000</span></div>
            <div style="color:#999999;font-size:.3rem;">积分充值规则: 1元=10积分</div>
        </div>
        <x-button mini type="primary" @click.native="gotoBuyP">充值</x-button>

      </cell>
    </group>
     <group title="积分明细">
      <cell v-for="(item,index) in pointDetail" :key="index">
            <div class="coinBg" slot="title">
                <div class="coinTitle">
                    <div>{{item.date}}</div>
                    <div :style="item.point>0?'color:#04be02':'color:#f76260'">{{item.point>0?'+'+item.point:item.point}}积分</div>
                    </div>
                <div class="coinContent">
                    <div>{{item.content}}
                    </div>
                    <div style="color:#999999" >剩余{{item.remain}}分
                    </div>
                    </div>
            </div>
      </cell>
    </group>
  </div>
</template>

<script>
import {XButton,Group,CellBox,Cell    } from 'vux'
import {pushHimOnWall} from '../api/api'
import apiHost from '../../config/prod.env'
import {
    mapActions,mapGetters
} from 'vuex';
export default {
  components: {
  XButton ,Group,CellBox,Cell
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
    ...mapActions([
                'setMyF'
            ]),
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

<style lang="less">
.myPoints{
    .weui-cells__title{
    margin-top: 0;
    padding-top:.2rem; 
    padding-bottom:.2rem;
    font-size: .4rem;
}
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
    font-size: 17px;
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
    padding: .3rem 0 .2rem;
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
     padding:.15rem 0;
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
 .weui-cell_access.vux-cell-box:after{
    display: none;
}
.buyBgS,.buyBg{
    position: relative;
}
.buyBgS::before{
    content:'';
    position: absolute;
    width: .15rem;
    height: 1.2rem;
    background: #04be02;
    top:0;
    left:0;
    z-index: 1;
}
.buyBg::before{
    content:'';
    position: absolute;
    width: .15rem;
    height: 1.2rem;
    background: #f76260;
    top:0;
    left:0;
    z-index: 1;
}
.payButton{
    width: 90%;
    margin:.7rem auto 0;
}
.coinBg{
    width: 9rem;
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
