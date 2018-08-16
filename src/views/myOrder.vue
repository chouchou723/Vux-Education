<template>
  <div class="myOrder">
       <view-box ref="viewBox">
       <tab custom-bar-width="60px">
      <tab-item selected>全部</tab-item>
      <tab-item>待付款</tab-item>
      <tab-item>已付款</tab-item>
      <tab-item>退款</tab-item>
    </tab>
    <!-- 列表 -->
    <group style="margin-top:-0.2rem" v-for="(item,index) in lessonList" :key="index">
    <cell-box is-link >
        
        <div class="lessonListAll">
            <div class="lessonTitleC">
                <div class="lessonTitleNo">订单号:K283</div>
                <div class="lessonTitleStatus" :style="item.status=='待付款'?'color:#f76967':'color:#04be02'">{{item.status}}</div>
            </div>
        <div class="lessonTitle">

            <img src="../assets/0e3a716cf47f1eb695e5b62597dec807.jpg" width="70" height="70" alt="">
            <div class="lessonDetail">
                <div class="lessonList">
                    <div class="lessonName">{{item.name}}</div>
                </div>
                <div class="lessonContent">{{item.content}}</div>
                <div class="lessonPrice">{{item.price}}元</div>
            </div>
        </div>
        <div class="lessonFoot">
            <div v-if="item.status=='待付款'" class="pay" @click="goToPay">付款</div>
            <div v-if="item.status=='待付款'" class="notPay">取消</div>
            <div v-if="item.status=='已付款'" class="notPay">申请退款</div>
            <div v-if="item.status=='已退款'" class="notPay">删除</div>
        </div>
        </div>
      <!-- anything -->
    </cell-box>
  </group>
       </view-box>
  </div>
</template>

<script>
import {Group,Tab, TabItem,Cell, Search,Datetime,CellBox,ViewBox   } from 'vux'
import {pushHimOnWall} from '../api/api'
import apiHost from '../../config/prod.env'
import {
    mapActions,mapGetters
} from 'vuex';
export default {
  components: {
  Group, Tab, TabItem,Cell,Search ,Datetime,CellBox,ViewBox 
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      value:'',
      value7:'',
      false:false,
      chooseT:false,
      chooseA:false,
      chooseS:false,
      typeKind:0,
      chooseItemList:[],
    lessonList:[{id:1,ishot:true,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120,status:'待付款'},
    {id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120,status:'待付款'},
    {id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120,status:'已付款'},
    {id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120,status:'已退款'},
    {id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120,status:'已退款'},
    {id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120,status:'已退款'},
    {id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120,status:'已退款'},
    {id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120,status:'已退款'},
    {id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120,status:'已退款'},
    {id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120,status:'已退款'},
    {id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120,status:'已退款'}]
    }
  },
  methods:{
    ...mapActions([
                'setMyF'
            ]),
            goToPay(){
                this.$router.push('/paying')
            },
            changeType(type){
                this.typeKind = type;
                this.selectList = this['selectList'+type]
            },
            cancelAddSelect(){
                this.chooseSelect('add')
            },
            confirmAddSelect(){
                 this.chooseSelect('add')
            },
             cancelsSelect(){
                this.chooseSelect('select')
            },
            confirmsSelect(){
                 this.chooseSelect('select')
            },
            chooseItem(id){
                if( this.chooseItemList.includes(id)){
                    this.chooseItemList = this.chooseItemList.filter(item=>{
                        return item != id;
                    })
                }else{   
                   this.chooseItemList.push(id)
                }
            },
            changeDate(value){
                this.nowTime = value.split('-')[0]+'年'+value.split('-')[1]+'月'+value.split('-')[2]+'日';
                this.chooseSelect('time')
                // console.log(value)
            },
            onSubmit(){},
            onCancel(){},
            chooseSelect(type){
                if(type=='time'){
                    this.chooseA = false;
                    this.chooseS = false;
                    this.chooseT? this.chooseT= false: this.chooseT= true;
                }else if(type=='add'){
                     this.chooseT = false;
                     this.chooseS = false;
                     this.chooseItemList=[];
                    this.chooseA? this.chooseA= false: this.chooseA= true;
                }else{
                    this.chooseT = false;
                     this.chooseA = false;
                    this.chooseS? this.chooseS= false: this.chooseS= true;
                }
            },
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
.myOrder{
    height:100%;
.chooseDiv{
    width: 100%;
    display: flex;
    position: relative;
}
.chooseTitle{
    font-size: .2rem;
    flex: auto;
    padding: .4rem .3rem;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
.modalTime{
    width: 100%;
    position: absolute;
    bottom:-1.4rem;
    height: 1rem;
    background-color: white;
    display: flex;
    align-items: center;
    padding-left:.7rem;
    z-index: 1;
}
.modalAdd{
     width: 100%;
    position: absolute;
    top:1.7rem;
    min-height: 3rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding:.3rem 0 0;
    z-index: 1001;
}
.addList{
    /* width: 100%; */
    display: flex;
    padding:0 .7rem .3rem;
    justify-content: flex-start;
    flex-wrap: wrap;
    min-height: 2rem;
}
.addItem{
    padding: 0 .2rem;
    height: .7rem;
    line-height: .7rem;
    border: 1px solid gainsboro;
    margin-right: .2rem;
    margin-bottom: .2rem;
}
.selectItem{
     padding: .2rem;
    border: 1px solid #04be02;
    background-color: #04be02;
    color: white;
    margin-right: .2rem;
    margin-bottom: .2rem;
}
.addfooter{
    display: flex;
    justify-content: space-between;
    padding:0.3rem .7rem;
    font-size: .4rem;
    border-top: 1px solid gainsboro;
}
.modalSelect{
      width: 100%;
    position: absolute;
    top:1.7rem;
    /* min-height: 5rem; */
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1001;
    /* padding:.3rem 0 0; */
}
.selectTwo{
    display: flex;
    padding: 0 .3rem .3rem;

}
.selectTwoFirst{
    flex: 0 0 1.5rem; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding:0 .4rem 0 .2rem;
    border-right: 1px solid gainsboro;
    min-height: 3rem;
}
.selectKind{
    padding: .3rem .1rem .3rem;
}
.addListS{
    display: flex;
    padding:.3rem 0 0 .4rem;
    justify-content: flex-start;
    flex-wrap: wrap;
    /* height: 2rem; */
    align-items: flex-start;
    align-self: flex-start;
}
.typeChoose{
    color: #04be02;
    position: relative;
}
.typeChoose::after{
    content: '';
    position: absolute;
    width: .15rem;
    height: 100%;
    background: #04be02;
    top:0rem;
    left:-0.5rem;
}
.normalModal{
    width: 100%;
    position: absolute;
    bottom:0;
    height: 10rem;
    background-color: rgba(0,0,0,0.5);
    z-index: 1000;
}
.modalG{
    position: absolute;
    bottom:-1.4rem;
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
    padding: 0 .2rem;
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
     padding: .1rem 0;
}
.lessonPrice{
    color: #fb6804;
     padding: .1rem 0;

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
.lessonTitleNo::before{
    content:'';
    position: absolute;
    width: .25rem;
    height: 1.2rem;
    background: #04be02;
    top:-.3rem;
    left:-0.5rem;
}
.lessonFoot{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-top: .25rem;
    border-top: 1px solid gainsboro;
    margin-top: .35rem;

}
.pay{
    font-size: .4rem;
    width: 2.3rem;
    height: .9rem;
    line-height: .9rem;
    text-align: center;
    border: 1px solid #04be02;
    color: #04be02;
    border-radius: .1rem;
    margin-right: .3rem;
}
.notPay{
    font-size: .4rem;
     width: 2.3rem;
    height: .9rem;
    line-height: .9rem;
    text-align: center;
    border: 1px solid black;
    border-radius: .1rem;
}
}
</style>
