<template>
  <div class="classSituationDetail">
      <view-box ref="viewBox">
        <div class="coinBgS" >
            <div class="coinContent">第1节课</div>
            <div class="coinTitle">2018年10月10日,周六,上午10:00-12:00</div>
        </div>
    <group >
                <cell style="font-size:16px;">
                    <div slot="title" style="color:#999999">老师评语</div>
                </cell>
                <cell style="font-size:15px;" primary="content" value-align="left">
                    <div style="color:black;line-height:1.5">本节课很好,孩子表现很主动,了解了创意的基础知识,对创意绘画有了更深的认识</div>
                </cell>
    </group>
      <group >
                <cell style="font-size:16px">
                    <div slot="title" style="color:#999999">课程作品点评</div>
                </cell>
                <cell style="font-size:15px;" primary="content" value-align="left">
                    <div style="color:black;line-height:1.5">本节课很好,孩子表现很主动,了解了创意的基础知识,对创意绘画有了更深的认识</div>
                </cell>
                <cell  primary="content" value-align="left" >
                    <div class="detailImg6">
                        <div v-for="(item,index) in pics" :key="index" class="detailImg">
                        <span class="detailNo">{{index+1}}</span>
                        <img :src="item.src" alt="" class="img6">
                        </div>
                    </div>
                </cell>
    </group>
      </view-box>
  </div>
</template>

<script>
import {XButton,Group,Cell,ViewBox  } from 'vux'
import {pushHimOnWall} from '../api/api'
import apiHost from '../../config/prod.env'
import {
    mapActions,mapGetters
} from 'vuex';
export default {
  components: {
  XButton ,Group,Cell,ViewBox
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      value:'',
      buyStatus:false,
      type:'coin',//coin
      lessonL:50,
          pics:[{src:require('../assets/ff.png')},{src:require('../assets/aa.jpg')},
          {src:require('../assets/bb.png')},{src:require('../assets/cc.jpg')},{src:require('../assets/dd.png')},{src:require('../assets/ee.png')},],

    }
  },
  methods:{
    ...mapActions([
                'setMyF'
            ]),
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
.classSituationDetail{
    height: 100%;
.coinBgS{
    width: 100%;
    height: 1.6rem;
    background-color: #fff;
    padding: 0.1rem .7rem 0;
    position: relative;
    box-sizing: border-box;
}
.coinBgS::after{
    content:'';
    position: absolute;
    top:0;
    left: 0;
    width: .15rem;
    height: 100%;
    background-color: #04be02;
}
.coinTitle{
    font-size: 13px;
    color: #999999; 
}
.coinContent{
    font-size: 16px;
    margin-bottom:.1rem;
}
.detailImg6{
    display: flex;
    width: 9rem;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 auto;
}
.detailImg{
    flex:0 0 2.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: .3rem;
    position: relative;

}
.img6{
    width: 2.9rem;
    height: 2.9rem;
    position: relative;
}
.detailNo{
    position: absolute;;
    top: .09rem;
    left: .12rem;
    color: white;
    z-index: 1;
    font-size: 12px;
}
.detailImg::after{
    content:'';
    width:0;
    height:0;
    border-width:0 0 .9rem .9rem;
    border-style:solid;
    border-color:transparent transparent transparent #04be02;
    position: absolute;;
    top: 0;
    left: 0;
}
}
</style>
