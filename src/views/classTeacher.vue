<template>
    <div class="classTeacher">
        <view-box ref="viewBox">
            <div class="personalBg">
                <div class="personalInfo">
                    <img :src="`${apiUrl}/attach/img/${teacher.picId}`" alt="" class="personalImg">
                    <img :src="teacher.sex=='MALE'?require('../assets/sex1.png'):require('../assets/sex2.png')" alt="" class="sexPos">
                    <div class="personalDetail">
                        <div class="personalName">
                            <span style="margin-right:.2rem;">{{teacher.realName}}</span>
                            <!-- <img src="../assets/tlevel.png" width="38" alt="" style="vertical-align: middle;"> -->
                            <span class="teacherLevel">LV {{teacher.level}}</span></div>
                        <div class="personalLesson">
                            <span class="op5">授课时长</span>
                            <span class="mgr4">{{teacher.classNum}}节课</span>
                            <span class="op5">老师教龄</span>
                            <span>{{teacher.experience.label}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <group>
                <cell class="fz15">
                    <div slot="title" style="color:#999999"><span>擅长</span>
                        <span v-for="(item,index) in goodAt" :key="index" class="goodAt" v-if="item">{{item}}</span></div>
                </cell>
            </group>
            <group>
                <cell class="fz15">
                    <div slot="title" style="color:#999999">个人介绍</div>
                </cell>
                <cell class="fz15" primary="content" value-align="left">
                    <div style="color:black;line-height:1.5;padding:3px 0">{{teacher.description}}</div>
                </cell>
            </group>
            <group>
                <cell class="fz15">
                    <div slot="title" style="color:#999999">教育经历</div>
                </cell>
                <cell class="fz15" primary="content" value-align="left" v-for="(edu,index) in teacher.edus" :key="'e'+index">
                    <div style="color:#999999;margin-bottom:.2rem">{{edu.beginDate.split(' ')[0].replace(/\-/g,'/')}}-{{edu.endDate.split(' ')[0].replace(/\-/g,'/')}}</div>
                    <div style="color:black;">{{edu.school}}, {{edu.degree.label}}, {{edu.subject}}专业</div>
                </cell>
            </group>
            <group>
                <cell class="fz15">
                    <div slot="title" style="color:#999999">教学经验</div>
                </cell>
                <cell class="fz15" primary="content" value-align="left" v-for="(exp,index) in teacher.exps" :key="'e'+index">
                    <div style="color:#999999;margin-bottom:.2rem">{{exp.beginDate.split(' ')[0].replace(/\-/g,'/')}}-{{exp.endDate.split(' ')[0].replace(/\-/g,'/')}}</div>
                    <div style="color:black;">{{exp.description}}</div>
                </cell>
            </group>
            <group>
                <cell class="fz15">
                    <div slot="title" style="color:#999999">证书展示</div>
                </cell>
                <cell class="fz15" primary="content" value-align="left" v-if="pics.length!==0">
                    <swiper :options="swiperOption" class="swiperOption">
                        <swiper-slide class="slide-1" v-for="(item,index) in pics" :key="index">
                            <img :src="item.src" alt="" class="slideImg">
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                </cell>
                 <cell class="fz15 fcenter" v-if="pics.length===0">
                    <div slot="title" style="width:100%;height:80px;display:flex;justify-content:center;align-items:center;color:rgb(153, 153, 153);">暂无证书</div>
                </cell>
            </group>
        </view-box>
    </div>
</template>

<script>
    import {
        Group,
        Cell,
        ViewBox
    } from 'vux'
    import {
        getTeacherInfo
    } from '../api/api'
    import apiHost from '../../config/prod.env'
    import 'swiper/dist/css/swiper.css'
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper'
    export default {
        components: {
            Group,
            Cell,
            ViewBox,
            swiper,
            swiperSlide
        },
        data() {
            return {
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    loop: true
                },
                pics: [
                ],
                teacher: {
                    realName: '',
                    classNum: '',
                    experience: {label:''},
                    picId: '',
                    description: '',
                    edus: [],
                    exps: [],
                    sex: 'MALE',
                    level:0
                },
                tt: 20,
                name: '时间',
                ops: [{
                    id: 1,
                    name: '时间'
                }, {
                    id: 12,
                    name: '金钱'
                }, {
                    id: 13,
                    name: '地位'
                }],
                haha: require("../assets/0e3a716cf47f1eb695e5b62597dec807.jpg"),
                value: '',
                value1: '',
                true1: true,
                msg: 'Hello World!',
                options: [1, 2, 3],
                goodAt: []
            }
        },
        methods: {
            fetchData() {
                let id = this.$route.query.id;
                getTeacherInfo(id).then(res => {
                    // console.log(res)
                    let data = res.data
                    this.teacher = {
                        realName: data.realName,
                        classNum: data.classNum,
                        experience: data.experience?data.experience:{label:'1年'},
                        picId: data.picId,
                        description: data.description,
                        edus: data.edus,
                        exps: data.exps,
                        sex: data.gender.name,
                        level:data.level.label
                    }
                    this.goodAt = data.skill.split(',')
                    if(data.cerIds){
                        this.pics = data.cerIds.split(',').map(item=>{
                            return {src:`${this.apiUrl}/attach/img/${item}`}
                        })
                    }
                })
            }
        },
        created() {
            this.setTitle('授课老师')
            this.fetchData()
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {},
        computed: {},
    }
</script>

<style lang="less">
    .classTeacher {
        height: 100%;
        .vux-no-group-title {
            margin-top: .2rem;
        }
        .personalBg {
            width: 100%;
            height: 3.306667rem;
            background: url('../assets/tpb.png') no-repeat 100%/100%;
            display: flex;
            /* justify-content: center; */
            align-items: center;
        }
        .personalInfo {
            width: 100%;
            padding: 0 5.1%;
            display: flex;
            position: relative;
        }
        .sexPos {
            position: absolute;
            top: 1.5rem;
            left: 2rem;
            width: .5rem;
        }
        .personalImg {
            width: 1.973333rem;
            height: 1.973333rem;
            border: 1px solid white;
            border-radius: 50%;
            margin-right: 3.2%;
        }
        .personalDetail {
            padding: .2rem 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .personalName {
            font-size: .48rem;
            color: white;
            position: relative;
            display: flex;
            align-items: center;
            /* margin-bottom: .3rem; */
        }
        .personalLesson {
            color: white;
            font-size: .373333rem;
        }
        .op5 {
            opacity: 0.5;
            margin-right: .1rem;
        }
        .mgr4 {
            margin-right: .4rem;
        }
        .swiperOption {
            width: 9.2rem;
            height: 5rem;
            padding-bottom: 1rem;
        }
        .slide-1 {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .slideImg {
            max-width: 100%; //   padding-top:20%;
            max-height: 100%;
        }
        .swiper-pagination .swiper-pagination-bullet-active {
            background: #04BE02;
            width: .4rem;
            border-radius: .3rem;
        }
        .teacherLevel {
            background: url('../assets/tlevel.png');
            background-size: cover;
            color: white;
            font-size: 12px;
            width: 38px;
            text-align: center;
            // position: absolute;
            // top: 0.16rem;
            // left: 1.73rem;
        }
        .goodAt {
            display: inline-block; //   width: 59px;
            padding: 0 5px;
            height: 22px;
            line-height: 22px;
            text-align: center;
            color: #04BE02;
            border: 1px solid #04BE02;
            border-radius: 3px;
            margin-left: .2rem;
            margin-right: .1rem;
        }
        #vux_view_box_body {
            padding-bottom: 0;
        }
        .fz15 {
            font-size: 15px;
        }
        .fcenter{
            p{
                text-align: center;
            }
        }
    }
</style>
