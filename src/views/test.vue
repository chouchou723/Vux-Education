<template>
  <div>
     <group>
    <calendar title="开课日期" v-model="value" class='fz3'></calendar>
  </group>
  <div class="ss">

  </div>
  <!-- <img src="../assets/0e3a716cf47f1eb695e5b62597dec807.jpg" alt="">
  <img :src="haha" alt=""> -->
  <group>
     <datetime title="开课日期" v-model="value1"></datetime>
  </group>
  <inlineCalendar :hide-header="true1" :render-function="sss" ></inlineCalendar>
  <group>
    <selector placeholder="sss" v-model="value" :options="options"></selector>
  </group>
  </div>
</template>

<script>
import {Calendar,Group,Datetime,InlineCalendar,Selector   } from 'vux'
import {pushHimOnWall} from '../api/api'
import apiHost from '../../config/prod.env'
import {
    mapActions,mapGetters
} from 'vuex';
export default {
  components: {
    Calendar, Group, Datetime, InlineCalendar, Selector 
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
    sss(a,b,c){
      if(c.formatedDate=='2018-07-29'){
        return '<span class="circle"></span>'
      }
        // console.log(c)
    },
    ss1($event){
     
      return false;
    }
  },
  created(){
    // console.log(this.getMyF,apiHost.API_ROOT)
  },
  mounted(){
    let a = document.querySelector('tbody');
    a.className +=" notClick"
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
.fz3{
  font-size: .2rem;
}
.notClick{
  pointer-events: none;
}
.circle{
  position: absolute;
  bottom:10%;
  left:50%;
  width: .133333rem;
  height: .133333rem;
  background-color: red;
  border-radius: 50%;
}
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
.ss{
    width: 8rem;
    height: 8rem;
    background: url('../assets/0e3a716cf47f1eb695e5b62597dec807.jpg')
}
</style>
