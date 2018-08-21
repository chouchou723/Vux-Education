<template>
  <div class="classTeacher">
       <view-box ref="viewBox">
      <div class="personalBg">
          <div class="personalInfo">
              <img src="../assets/0e3a716cf47f1eb695e5b62597dec807.jpg" alt="" class="personalImg">
              <img src="../assets/sex1.png" alt="" class="sexPos">
              <div class="personalDetail">
                  <div class="personalName">
                      <span style="margin-right:.1  rem">张佳乐</span>
                      <img src="../assets/tlevel.png" width="38" alt="" style="vertical-align: middle;">
                      <span class="teacherLevel">LV 1</span></div>
                  <div class="personalLesson">
                      <span class="op5">授课时长</span>
                      <span class="mgr4">8节课</span>
                      <span class="op5">老师教龄</span>
                      <span>10年</span>
                  </div>
              </div>
          </div>
      </div>
      <group >
            <cell class="fz15">
                <div slot="title" style="color:#999999"><span>擅长</span>
                    <span v-for="(item,index) in goodAt" :key="index" class="goodAt">{{item}}</span></div>
            </cell>
        </group>
      <group >
            <cell class="fz15">
                <div slot="title" style="color:#999999">个人介绍</div>
            </cell>
            <cell class="fz15" primary="content" value-align="left">
                <div style="color:black;line-height:1.5;padding:3px 0">本节课很好,孩子表现很主动,了解了创意的基础知识,对创意绘画有了更深的认识</div>
            </cell>
        </group>
         <group >
            <cell class="fz15">
                <div slot="title" style="color:#999999">教育经历</div>
            </cell>
            <cell class="fz15" primary="content" value-align="left">
                <div style="color:#999999;margin-bottom:.2rem">2017/08-2018/09</div>
                <div style="color:black;">上海大学, 本科, 艺术专业</div>
            </cell>
             <cell class="fz15" primary="content" value-align="left">
                <div style="color:#999999;margin-bottom:.2rem">2017/08-2018/09</div>
                <div style="color:black;">上海大学, 本科, 艺术专业</div>
            </cell>
        </group>
        <group >
            <cell class="fz15">
                <div slot="title" style="color:#999999">教育经验</div>
            </cell>
            <cell class="fz15" primary="content" value-align="left">
                <div style="color:#999999;margin-bottom:.2rem">2017/08-2018/09</div>
                <div style="color:black;">本节课很好,孩子表现很主动,了解了创意的基专业,本节课很好,孩子表现很主动,了解了创意的基</div>
            </cell>
             <cell class="fz15" primary="content" value-align="left">
                <div style="color:#999999;margin-bottom:.2rem">2017/08-2018/09</div>
                <div style="color:black;">上本节课很好,孩子表现很主动,了解了创意的基,本节课很好,孩子表现很主动,了解了创意的基业</div>
            </cell>
        </group>
         <group >
            <cell class="fz15">
                <div slot="title" style="color:#999999">证书展示</div>
            </cell>
            <cell class="fz15" primary="content" value-align="left">
                <swiper :options="swiperOption" class="swiperOption">
                        <swiper-slide class="slide-1" v-for="(item,index) in pics" :key="index">
                            <img :src="item.src" alt="" class="slideImg">
                        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
            </cell>
        </group>
       </view-box>
  </div>
</template>

<script>
import {Group,Cell ,ViewBox   } from 'vux'
import {pushHimOnWall} from '../api/api'
import apiHost from '../../config/prod.env'
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    Group,Cell,ViewBox,swiper, swiperSlide
  },
  data () {
    return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination', 
          },
          loop:true
        },
          pics:[{src:require('../assets/ff.png')},{src:require('../assets/aa.jpg')},
          {src:require('../assets/bb.png')},{src:require('../assets/cc.jpg')},
          {src:require('../assets/dd.png')},{src:require('../assets/ee.png')},],

      tt:20,
      name:'时间',
      ops:[{id:1,name:'时间'},{id:12,name:'金钱'},{id:13,name:'地位'}],
      haha:require("../assets/0e3a716cf47f1eb695e5b62597dec807.jpg"),
      value:'',
      value1:'',
      true1:true,
      msg: 'Hello World!',
      options:[1,2,3],
      goodAt:['创意画','漫画']
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
.classTeacher{
    height: 100%;
    .vux-no-group-title{
        margin-top:.2rem;
    }
.personalBg{
    width: 100%;
    height: 3.306667rem;
    background: url('../assets/tpb.png') no-repeat 100%/100%;
    display: flex;
    /* justify-content: center; */
    align-items: center; 
}
.personalInfo{
    width: 100%;
    padding: 0 5.1%;
    display: flex;
    position: relative;
}
.sexPos{
    position: absolute;
    top:1.5rem;
    left: 2rem;
    width: .5rem;
}
.personalImg{
    width: 1.973333rem;
    height: 1.973333rem;
    border: 1px solid white;
    border-radius: 50%;
    margin-right: 3.2%;
}
.personalDetail{
    padding: .2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.personalName{
    font-size: .48rem;
    color: white;
    position: relative;
    /* margin-bottom: .3rem; */
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
.swiperOption{
    width: 9.2rem;
    height: 5rem;
    padding-bottom: 1rem;
}
.slide-1{
    width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
}
.slideImg{
      max-width:100%;
    //   padding-top:20%;
      max-height: 100%;
  }
  .swiper-pagination .swiper-pagination-bullet-active{
      background: #04BE02;
      width: .4rem;
      border-radius: .3rem;
  }
  .teacherLevel{
      color: white;
      font-size: 12px;
      position: absolute;
      top:0.16rem;
      left: 1.75rem;
  }
  .goodAt{
      display: inline-block;
    //   width: 59px;
    padding: 0 5px;
      height: 22px;
      line-height: 22px;
      text-align: center;
      color: #04BE02;
      border:1px solid #04BE02;
      border-radius: 3px;
      margin-left: .2rem;
      margin-right: .1rem;

  }
  #vux_view_box_body{
      padding-bottom: 0;
  }
  .fz15{
      font-size: 15px;
  }
}
</style>
