<template>
    <div class="teacherPersonal">
        <div class="personalBg">
            <div class="personalInfo">
                <img :src="`${apiUrl}/attach/img/${teacher.picId}/SQUARE`" alt="" class="personalImg">
                 <img :src="teacher.sex=='男'?require('../assets/sex1.png'):require('../assets/sex2.png')" alt="" class="sexPos">
                <div class="personalDetail">
                    <div class="personalName">{{teacher.name}}</div>
                    <div class="personalLesson">
                        <span class="op5">授课时长</span>
                        <span class="mgr4">{{teacher.classNum}}节课</span>
                    </div>
                </div>
            </div>
        </div>
        <group>
            <cell is-link link="/myTeacherInfo">
                <span slot="title" class="fz15">我的资料</span>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/myinfo.png">
            </cell>
            <cell is-link link="/teacherOrder">
                <span slot="title" class="fz15">我的订单</span>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/order.png">
            </cell>
        </group>
        <group>
            <cell is-link link="/teacherFinancial">
                <span slot="title" class="fz15">财务记录</span>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/fn.png">
            </cell>
            <cell is-link link="/teacherMoneyList">
                <span slot="title" class="fz15">我的提现</span>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/withDraw.png">
            </cell>
        </group>
        <group>
            <cell is-link>
                <span slot="title" class="fz15">常见问题</span>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/que.png">
            </cell>
            <cell is-link link="/teacherFeedback">
                <span slot="title" class="fz15">意见反馈</span>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/feedback.png">
            </cell>
        </group>
    </div>
</template>

<script>
    import {
        Group,
        Cell
    } from 'vux'
    import {
        getTeacherIndex
    } from '../api/api'
    import apiHost from '../../config/prod.env'
    export default {
        components: {
            Group,
            Cell
        },
        data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                tt: 20,
                teacher:{
                    name:'',
                    picId:'',
                    sex:'男',
                    classNum:0
                }
            }
        },
        methods: {
            fetchData(){
                getTeacherIndex().then(res=>{
                    console.log(res)
                    let data = res.data;
                    let sex = JSON.parse(localStorage.getItem('teacherInfo')).sex
                    this.teacher.name = data.name
                    this.teacher.picId = data.picId
                    this.teacher.classNum = data.classNum
                    this.teacher.sex = sex
                })
            }
        },
        created() {
            this.setTitle("个人中心");
            this.fetchData()
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {},
        computed: {},
    }
</script>

<style lang="less">
    .teacherPersonal {
        .weui-cell {
            padding: 12px 15px;
        }
        .personalBg {
            width: 100%;
            height: 3.306667rem;
            background: url('../assets/teacherBg.png') no-repeat center/cover;
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
        .fz15 {
            font-size: 16px;
            color: #595959;
            padding: 3px 0;
        }
    }
</style>
