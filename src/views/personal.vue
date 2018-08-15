<template>
  <div>
      <div class="personalBg">
          <div class="personalInfo">
              <img src="../assets/0e3a716cf47f1eb695e5b62597dec807.jpg" alt="" class="personalImg">
              <div class="personalDetail">
                  <div class="personalName">张佳乐</div>
                  <div class="personalLesson">
                      <span class="op5">上课时长</span>
                      <span class="mgr4">8节课</span>
                      <span class="op5">作品数量</span>
                      <span>10件</span>
                  </div>
              </div>
          </div>
      </div>
       <group>
      <cell is-link >
          <span slot="title" style="color:#595959;">我的订单</span>
           <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/order.png">
      </cell>
       <cell is-link >
            <span slot="title" style="color:#595959;">我的积分</span>
           <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/coin.png">
      </cell>
       <cell is-link>
            <span slot="title" style="color:#595959;">消费记录</span>
           <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/fn.png">
      </cell>
      </group>
       <group>
       <cell is-link>
            <span slot="title" style="color:#595959;">我的资料</span>
           <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/myinfo.png">
      </cell>
       <cell is-link>
            <span slot="title" style="color:#595959;">我的作品</span>
           <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/mylec.png">
      </cell>
       <cell is-link>
            <span slot="title" style="color:#595959;">我的收藏</span>
           <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/fav.png">
      </cell>
      </group>
       <group>
       <cell is-link>
            <span slot="title" style="color:#595959;">常见问题</span>
           <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/que.png">
      </cell>
       <cell is-link>
            <span slot="title" style="color:#595959;">意见反馈</span>
           <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/feedback.png">
      </cell>
    </group>
  </div>
</template>

<script>
import {Calendar,Group,Datetime,InlineCalendar,Selector,Cell    } from 'vux'
import OpSelect from '../components/OpSelect'
import {pushHimOnWall} from '../api/api'
import apiHost from '../../config/prod.env'
import {
    mapActions,mapGetters
} from 'vuex';
export default {
  components: {
    Calendar, Group, Datetime, InlineCalendar, Selector ,OpSelect,Cell
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      tt:20,
      name:'时间',
      ops:[{id:1,name:'时间'},{id:12,name:'金钱'},{id:13,name:'地位'}],
      haha:require("../assets/0e3a716cf47f1eb695e5b62597dec807.jpg"),
      value:'',
      value1:'',
      true1:true,
      msg: 'Hello World!',
      options:[1,2,3]
    }
  },
  methods:{
    ...mapActions([
                'setMyF'
            ]),
  },
  created(){
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
.personalBg{
    width: 100%;
    height: 3.306667rem;
    background: url('../assets/pb.png');
    display: flex;
    /* justify-content: center; */
    align-items: center; 
}
.personalInfo{
    width: 100%;
    padding: 0 5.1%;
    display: flex;
}
.personalImg{
    width: 1.973333rem;
    height: 1.973333rem;
    border: 1px solid white;
    border-radius: 50%;
    margin-right: 3.2%;
}
.personalDetail{
    padding: 1.5% 0;
}
.personalName{
    font-size: .48rem;
    color: white;
    margin-bottom: .3rem;
}
.personalLesson{
    color: white;
    font-size: .373333rem;
}
.op5{
    opacity: 0.5;
    margin-right: .1rem;
}
.mgr4{
    margin-right: .4rem;
}
</style>
