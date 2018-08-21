<template>
  <div class="lecture">
      <view-box ref="viewBox">
      <search
      slot="header"
      v-model="value"
      position="absolute"
      auto-scroll-to-top
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"></search>
       <tab  custom-bar-width="40px" slot="header">
      <tab-item >兴趣体验</tab-item>
      <tab-item  selected>系统学习</tab-item>
    </tab>
    <div class="chooseDiv" slot="header">
        <div class="chooseTitle" :style="!chooseT?'':'color:#04BE02'" @click="chooseSelect('time')">上课时间
            <img src="../assets/tri.png" alt="" style="width:.25rem;margin-left:.1rem" v-if="!chooseT">
            <img src="../assets/triS.png" alt="" style="width:.25rem;margin-left:.1rem" v-else>
        </div>
        <div class="chooseTitle" :style="!chooseA?'':'color:#04BE02'" @click="chooseSelect('add')">上课地点
            <img src="../assets/tri.png" alt="" style="width:.25rem;margin-left:.1rem" v-if="!chooseA">
            <img src="../assets/triS.png" alt="" style="width:.25rem;margin-left:.1rem" v-else></div>
        <div class="chooseTitle" :style="!chooseS?'':'color:#04BE02'" @click="chooseSelect('select')">筛选条件
            <img src="../assets/tri.png" alt="" style="width:.25rem;margin-left:.1rem" v-if="!chooseS">
            <img src="../assets/triS.png" alt="" style="width:.25rem;margin-left:.1rem" v-else></div>
        <div class="modalTime" v-if="chooseT">
            {{nowTime}}
        </div>
        <!-- 选择地点 -->
         <div class="modalAdd" v-if="chooseA">
           <div class="addList">
               <div v-for="(item,index) in addList" :key="index" :class="chooseItemList.includes(item.id)?'selectItem':'addItem'" @click="chooseItem(item.id)">{{item.name}}</div>
           </div>
           <div class='addfooter'>
               <div style="color:grey" @click="cancelAddSelect">取消</div>
               <div  @click="confirmAddSelect">确定</div>
           </div>
        </div>
        <!-- 筛选条件 -->
         <div class="modalSelect" v-if="chooseS">
              
             <div class="selectTwo">
                    <div class="selectTwoFirst">
                    <div :class="['selectKind',typeKind==index?'typeChoose':'']" v-for="(item,index) in typekind" :key="index" @click="changeType(index)">
                        {{item}}
                    </div>
                    </div>
                    <div class="addListS">
                        <div v-for="(item,index) in selectList" :key="index" :class="chooseItemList.includes(item.id)?'selectItem':'addItem'" @click="chooseItem(item.id)">{{item.name}}</div>
                    </div>
             </div>
           <div class='addfooter'>
               <div style="color:grey" @click="cancelsSelect">取消</div>
               <div  @click="confirmsSelect">确定</div>
           </div>
            
        </div>
      
    </div>
    <!-- 列表 -->
    <group style="margin-top:-0.2rem">
         <loading :show="show2" text=""></loading>
    <cell-box is-link v-for="(item,index) in lessonList" :key="index" :link="`/courseDetails/?id=${item.id}`">
        <div class="lessonList">
            <img src="../assets/0e3a716cf47f1eb695e5b62597dec807.jpg" width="65" height="65" alt="">
            <div class="lessonDetail">
                <div class="lessonList">
                    <div class="hot" v-if="item.ishot">热门</div>
                    <div class="lessonName">{{item.name}}</div>
                    <div class="lessonStatus">{{item.total}}人-已报{{item.hasJoin}}人</div>
                </div>
                <div class="lessonContent">{{item.content}}</div>
                <div class="lessonPrice">{{item.price}}元</div>
            </div>
        </div>
      <!-- anything -->
    </cell-box>
  </group>
    <group class="modalG" v-if="chooseT">
        <datetime v-model="value7"  @on-confirm="changeDate" :show="chooseT" @on-cancel="chooseSelect('time')">
        </datetime>
    </group>
    <!-- 蒙版 -->
    <div class="normalModal" v-if="chooseA||chooseS">

    </div>
      </view-box>
  </div>
</template>

<script>
import {ViewBox,Group,Tab, TabItem,Cell, Search,Datetime,CellBox,Loading   } from 'vux'
import {pushHimOnWall} from '../api/api'
import apiHost from '../../config/prod.env'
export default {
  components: {
  ViewBox,Group, Tab, TabItem,Cell,Search ,Datetime,CellBox ,Loading
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
      show2:false,
      chooseT:false,
      chooseA:false,
      chooseS:false,
      typeKind:0,
      chooseItemList:[],
      nowTime:`${new Date().getFullYear()}年${new Date().getMonth()+1}月${new Date().getDate()}日`,
      selectList:[],
      addList:[{id:'1',name:'世博园场馆'},{id:'2',name:'东方明珠'},{id:'3',name:'世博园场馆'},{id:'23',name:'东方明珠'},{id:'12',name:'世博园场馆'},{id:'22',name:'东方明珠'},{id:'33',name:'世博园场馆'},{id:'231',name:'东方明珠'},{id:'112',name:'世博园场馆'},{id:'232',name:'东方明珠'}],
      selectList0:[{id:'1',name:'少儿'},{id:'2',name:'动漫'}],
      selectList1:[{id:'1',name:'1-3岁'},{id:'2',name:'4-6岁'},{id:'3',name:'世博园场馆'},{id:'23',name:'东方明珠'},{id:'11',name:'世博园场馆'},{id:'22',name:'东方明珠'}],
    typekind:['课程种类','适用对象',],
    lessonList:[{id:1,ishot:true,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120},
    {id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120},
    {id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120},
    {id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120},
    {id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120},
    {id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120},
    {id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120},
    {id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120},
    {id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120},
    {id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120},
    {id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120}]
    }
  },
  methods:{
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
    },
}
</script>

<style lang="less">
.lecture{
    height: 100%;
    .chooseDiv{
    width: 100%;
    display: flex;
    position: relative;
}
.chooseTitle{
    font-size: 12px;
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
    bottom:-1.3rem;
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
    top:1.6rem;
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
    padding: 0 0.2rem;
    height: .7rem;
    line-height: .7rem;
    border: 1px solid gainsboro;
    margin-right: .2rem;
    margin-bottom: .2rem;
}
.selectItem{
     padding: 0 0.2rem;
     height: .7rem;
      line-height: .7rem;
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
    top:1.6rem;
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
    padding: 0 .3rem .3rem 0;

}
.selectTwoFirst{
    flex: 0 0 2.5rem; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    // padding:0 .4rem 0 0;
    border-right: 1px solid gainsboro;
    min-height: 3rem;
}
.selectKind{
    // padding: .3rem .1rem .3rem .3rem;
    // flex:auto;
    width: 100%;
    text-align: center;
    height: 1.2rem;
    line-height: 1.2rem;
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
    left:0;
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
    font-size: 12px;
    padding: 0 .1rem;
    background-color: #f76260;
    color: white;
    border-radius: .07rem;
    margin-right:.2rem;
}
.lessonName{
    padding: 0 .2rem 0 0;
}
.lessonStatus{
    font-size: 12px;
    color: #fa9b9a;
    border: 1px solid #fa9b9a;
    border-radius: .3rem;
    padding: 0 .2rem;
}
.lessonContent{
     font-size: 12px;
     color: #b6b6b6;
}
.lessonPrice{
    color: #fb6804;
}
}
</style>
