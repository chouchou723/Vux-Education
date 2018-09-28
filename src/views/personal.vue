<template>
    <div class="personal">
        <div class="personalBg">
            <div class="personalInfo">
                <img :src="`${apiUrl}/attach/img/${info.img}/SQUARE`" alt="" class="personalImg">
                <img :src="info.sex=='男'?require('../assets/sex1.png'):require('../assets/sex2.png')" alt="" class="sexPos">
                <div class="personalDetail">
                    <div class="personalName">{{info.name}}</div>
                    <div class="personalLesson">
                        <span class="op5">上课时长</span>
                        <span class="mgr4">{{info.courseHours}}节课</span>
                        <span class="op5">作品数量</span>
                        <span>{{info.workNum}}件</span>
                    </div>
                </div>
            </div>
        </div>
        <group>
            <cell is-link link="/myOrder">
                <span slot="title" class="fz15">我的订单</span>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/order.png">
            </cell>
            <cell is-link link="/myPoints">
                <span slot="title" class="fz15">我的积分</span>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/coin.png">
            </cell>
            <cell is-link link="/purchaseHistory">
                <span slot="title" class="fz15">消费记录</span>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/fn.png">
            </cell>
        </group>
        <group>
            <cell is-link link="/myInfo">
                <span slot="title" class="fz15">我的资料</span>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/myinfo.png">
            </cell>
            <cell is-link link="/myPic">
                <span slot="title" class="fz15">我的作品</span>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/mylec.png">
            </cell>
            <cell is-link link="/myFav">
                <span slot="title" class="fz15">我的收藏</span>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/fav.png">
            </cell>
        </group>
        <group>
            <cell is-link>
                <span slot="title" class="fz15">常见问题</span>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/que.png">
            </cell>
            <cell is-link link="/feedback">
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
        getStudentIndex
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
                info: {
                    img: '',
                    name: '',
                    sex: '',
                    courseHours: '',
                    workNum: 0
                }
            }
        },
        methods: {
            fetchData() {
                let data = JSON.parse(localStorage.getItem('info'));
                this.info.sex = data.sex;
                this.info.img = data.img;
                getStudentIndex().then(res => {
                    let data = res.data
                    this.info.name = data.name;
                    this.info.courseHours = data.courseHours;
                    this.info.workNum = data.workNum;
                })
            },
        },
        created() {
            this.setTitle("个人中心")
            this.fetchData()
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {},
        computed: {},
    }
</script>

<style lang="less">
    .personal {
        .weui-cell {
            padding: 12px 15px;
        }
        .personalBg {
            width: 100%;
            height: 3.306667rem;
            background: url('../assets/pb.png') no-repeat center/cover;
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
