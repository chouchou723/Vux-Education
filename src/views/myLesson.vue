<template>
  <div class="myLesson">
    <!-- 列表 -->
    <group style="margin-top:-0.2rem" class="groupC" v-for="(item,index) in lessonList" :key="index">
    <cell-box is-link link="/courseInfo">
        
        <div class="lessonListAll">
            <div class="lessonTitleC">
                <div class="lessonTitleNo">课程号:K283</div>
                <div class="lessonTitleStatus" :style="item.status=='待上课'?'color:#f76967':'color:#04be02'">{{item.status}}</div>
            </div>
        <div class="lessonTitle">

            <x-img :default-src="dsrc" :src="asrc" width="75" height="75" alt="" :offset="700" container="#vux_view_box_body"></x-img>
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
  </div>
</template>

<script>
import {Group,CellBox,XImg  } from 'vux'
import {pushHimOnWall} from '../api/api'
import apiHost from '../../config/prod.env'
export default {
  components: {
  Group,CellBox,XImg
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      dsrc:require('../assets/picload.png'),
      asrc:require('../assets/0e3a716cf47f1eb695e5b62597dec807.jpg'),
      value:'',
      value7:'',
      false:false,
      chooseT:false,
      chooseA:false,
      chooseS:false,
      typeKind:0,
      chooseItemList:[],
    lessonList:[{id:1,ishot:true,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120,status:'待上课'},
    {id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120,status:'上课中'},
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
  },
  created(){
      document.title="我的课程"
    // console.log(this.getMyF,apiHost.API_ROOT)
  },
  mounted(){
  },
  computed: {
    },
}
</script>

<style lang="less">
.myLesson{

    .lessonListAll{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .lessonTitle{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0.3rem 0 0.2rem;
    }
    .lessonTitleC{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: .1rem 0 .3rem;
        border-bottom: 1px solid gainsboro;
        position: relative;
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
    .lessonName{
        padding: 0 .2rem 0 0;
    }
    .lessonContent{
        font-size: 12px;
        color: #b6b6b6;
        padding:.1rem 0;
    }
    .lessonPrice{
        color: #fb6804;
    }

    .lessonTitleStatus{
        font-size: .4rem;
    }
    .weui-cell_access.vux-cell-box:after{
        width: .3rem;
        height: .3rem;
        top:65%;
    }
    .lessonTitleNo{
        color: #8a8e93;
        font-size: .4rem;
        position: relative;
    }
    .groupC{
        position: relative;
    }
    .groupC::before{
        content:'';
        position: absolute;
        width: .15rem;
        height: 1.2rem;
        background: #04be02;
        top:0;
        left:0;
        z-index: 1;
    }
}

</style>
