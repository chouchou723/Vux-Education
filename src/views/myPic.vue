<template>
  <div class="myPic">
    <!-- 列表 -->
    <group  v-for="(item,index) in lessonList" :key="index" @click.native="gotoPic">
    <cell-box >
        
        <div class="lessonListAll">
            <div class="lessonTitleC">
                <div class="lessonTitleNo">2018年11月10日</div>
            </div>
        <div class="lessonTitle">
            <div v-for="(pic,ind) in item.pics" :key="ind" class="picImg"> 
            <img src="../assets/0e3a716cf47f1eb695e5b62597dec807.jpg" width="100" height="100" alt="">
            </div>
        </div>
        </div>
      <!-- anything -->
    </cell-box>
  </group>
  </div>
</template>

<script>
import {Group,Tab, TabItem,Cell, Search,Datetime,CellBox   } from 'vux'
import {pushHimOnWall} from '../api/api'
import apiHost from '../../config/prod.env'
import {
    mapActions,mapGetters
} from 'vuex';
export default {
  components: {
  Group, Tab, TabItem,Cell,Search ,Datetime,CellBox 
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
    lessonList:[{pics:1,id:1,ishot:true,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120,status:'待上课'},
    {pics:4,id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120,status:'上课中'},
    {pics:2,id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120},
    {pics:3,id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120},
    {pics:3,id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120},
    {pics:3,id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120},
    {pics:3,id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120},
    {pics:3,id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120},
    {pics:3,id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120},
    {pics:3,id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120},
    {pics:3,id:2,ishot:false,name:'创意绘画单课',total:8,hasJoin:5,content:'1节课-2课时|4-8岁儿童|满5人开课',price:120}]
    }
  },
  methods:{
    ...mapActions([
                'setMyF'
            ]),
        gotoPic(){
            // console.log(1)
            this.$router.push('/picDetail')
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
.myPic{
div:first-child .weui-cells{
    margin-top:0
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
    flex-wrap: nowrap;
    overflow: hidden;
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
.lessonTitleNo{
    // color: #8a8e93;
    font-size: .4rem;
    position: relative;
}
.picImg{
    flex: 0 0 33.3333%;
    text-align: center;
}
// .picImg:nth-child(2){
//     margin:0 .2rem;
// }
}

</style>
