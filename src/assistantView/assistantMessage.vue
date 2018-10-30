<template>
  <div class="assistantMessage">
       <view-box ref="viewBox">
     <group v-for="(item,index) in pointDetail" :key="index" v-if="pointDetail.length!==0">
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
    <div v-if="pointDetail.length===0" class="noData">
暂无通知
    </div>
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
      pointDetail:[],
    }
  },
  methods:{
  },
  created(){
            this.setTitle('消息通知')
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
    .noData{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: .4rem;
        color:#999;
    }
}
</style>
