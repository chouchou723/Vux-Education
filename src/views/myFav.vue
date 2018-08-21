<template>
  <div class="myFav">
   <view-box ref="viewBox">
    <group  style="margin-top:-0.2rem" >
    <cell-box is-link v-for="(item,index) in lessonList" :key="index">
        
        <div class="lessonListAll">
        <div class="lessonTitle">

            <img src="../assets/0e3a716cf47f1eb695e5b62597dec807.jpg" width="74" height="74" alt="">
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
   </view-box>
  </div>
</template>

<script>
import {Group,CellBox ,ViewBox  } from 'vux'
import {pushHimOnWall} from '../api/api'
import apiHost from '../../config/prod.env'
export default {
  components: {
  Group,CellBox ,ViewBox
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
    // console.log(this.getMyF,apiHost.API_ROOT)
  },
  mounted(){
  },
  computed: {
    },
}
</script>

<style lang="less">
.myFav{
height: 100%;

    .lessonListAll{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .lessonTitle{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: .2rem 0;
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
        padding: .1rem 0;
    }
    .lessonPrice{
        color: #fb6804;
    }

    .weui-cell_access.vux-cell-box:after{
        width: .3rem;
        height: .3rem;
        top:50%;
    }
}

</style>
