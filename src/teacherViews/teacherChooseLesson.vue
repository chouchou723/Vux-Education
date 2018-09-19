<template>
    <div class="teacherChooseLesson">
        <!-- <view-box ref="viewBox">  -->
        <!-- <scroller delegate-id="myScroller" :on-refresh="refresh" :pageW="pageW" :on-infinite="loadMore" ref='my_scroller' v-if="lessonList1.length!=0"> -->
        <!-- 列表 -->
        <group title=" ">
            <cell-box is-link v-for="(item,index) in lessonList1" :key="index" @click.native="changeIndex(index,$event)">
                <div class="lessonList">
                    <div class="imgModal">
                        <img :src="ccsrc" width="15" height="15" alt="" v-if="index===chooseIndex">
                        <img :src="ddsrc" width="15" height="15" alt="" v-else>
                    </div>
                    <x-img :default-src="dsrc" :src="asrc" width="65" height="65" alt="" container="#picContent" :offset="700" :delay="50"></x-img>
                    <div class="lessonDetail">
                        <div class="lessonList">
                            <!-- <div class="hot" v-if="item.ishot">热门</div> -->
                            <div class="lessonName">{{item.name}}</div>
                        </div>
                        <div class="lessonContent">{{item.content}}</div>
                    </div>
                </div>
                <!-- anything -->
            </cell-box>
        </group>
        <div style="height:1.4rem;background:#f4f4f4"></div>
        <!-- </scroller> -->
        <div :class="['footB',chooseIndex!==''?'hasChoosen':'noChoosen']" @click="goToPublish">
            {{chooseIndex!==''?'确定':'请选择一门课程'}}
        </div>
        <!-- </view-box> -->
    </div>
</template>

<script>
    import {
        Group,
        Tab,
        TabItem,
        CellBox,
        ViewBox,
        XImg,
        XButton
    } from 'vux'
    import {
        pushHimOnWall
    } from '../api/api'
    import apiHost from '../../config/prod.env'
    import Scroller from '../components/Scroller'
    export default {
        components: {
            Group,
            Tab,
            TabItem,
            CellBox,
            ViewBox,
            XImg,
            Scroller,
            XButton
        },
        data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                dsrc: require('../assets/picload.png'),
                asrc: require("../assets/0e3a716cf47f1eb695e5b62597dec807.jpg"),
                ccsrc: require('../assets/chooseicon.png'),
                ddsrc: require('../assets/noicon.png'),
                value: '',
                value7: '',
                pageW: 'tc',
                false: false,
                chooseT: false,
                chooseA: false,
                chooseS: false,
                typeKind: 0,
                chooseIndex: '',
                chooseItemList: [],
                lessonList: [],
                lessonList1: [{
                        id: 1,
                        ishot: true,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: '已开课',
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '待上课'
                    },
                    {
                        id: 2,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: '已开课',
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '待上课'
                    },
                    {
                        id: 3,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: '已开课',
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已上课'
                    },
                    {
                        id: 4,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: '已开课',
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已退款'
                    },
                    {
                        id: 5,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: '已开课',
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已退款'
                    },
                    {
                        id: 6,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: '待开课',
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已退款'
                    },
                    {
                        id: 7,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: '待开课',
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已退款'
                    },
                    {
                        id: 8,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: '待开课',
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已退款'
                    },
                    {
                        id: 9,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: '待审核',
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已退款'
                    },
                    {
                        id: 10,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: '待开课',
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已退款'
                    },
                    {
                        id: 11,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: '已结课',
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已退款'
                    },
                    {
                        id: 12,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: '待开课',
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已退款'
                    },
                    {
                        id: 13,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: '待审核',
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已退款'
                    },
                    {
                        id: 14,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: '待开课',
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已退款'
                    },
                    {
                        id: 15,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: '已结课',
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已退款'
                    }
                ]
            }
        },
        methods: {
            changeIndex(i, $event) {
                console.log($event)
                let cn = $event.target.parentNode.className;
                let dn = $event.target.className;
                if (cn.indexOf('imgModal') > -1 || dn.indexOf('imgModal') > -1) {
                    if (this.chooseIndex === i) {
                        this.chooseIndex = '';
                    } else {
                        this.chooseIndex = i;
                    }
                } else {
                    this.$router.push({
                        path: '/teacherChooseLessonDetail'
                    })
                }
            },
            goToPublish() {
                if (this.chooseIndex !== '') {
                    this.$router.push({
                        path: '/teacherPublishHome',
                        query: {
                            title: '创意课程'
                        }
                    })
                }
            },
            refresh() {},
            loadMore() {
                console.log(1)
                setTimeout(() => {
                    this.$refs.my_scroller.finishInfinite(2)
                }, 2000)
            },
            goToPay() {
                this.$router.push('/paying')
            },
        },
        created() {
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {
            console.log(123)
        },
        computed: {},
    }
</script>

<style lang="less">
    .teacherChooseLesson {
        height: 100%;
        .weui-cells__title {
            margin-top: 0;
            padding-top: .2rem;
            padding-bottom: .1rem;
            font-size: .4rem;
        }
        .lessonList {
            width: 100%;
            display: flex;
            align-items: flex-start;
            padding: .1rem 0;
            position: relative;
        }
        .lessonDetail {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding-left: .4rem;
            font-size: 16px;
        }
        .lessonName {
            padding: 0 .2rem 0 0;
        }
        .lessonPrice {
            color: #fb6804;
            padding: .1rem 0;
            font-size: 12px;
        }
        .lessonContent {
            font-size: 12px;
            color: #b6b6b6;
            padding: .1rem 0;
        }
        .imgModal {
            width: 1rem;
            height: 65px;
            display: flex;
            justify-content: center;
            align-items: center;
            align-self: center;
            box-sizing: border-box;
            padding-right: .3rem; // position: absolute;
            // top: .1rem;
            // left: 0;
        }
        .footB {
            width: 100%;
            height: 1.5rem;
            line-height: 1.5rem;
            text-align: center;
            position: fixed;
            left: 0;
            bottom: 0;
            font-size: 17px;
        }
        .hasChoosen {
            background: #00a6e7;
            color: white;
        }
        .noChoosen {
            background-color: #e1e1e1;
            color: #484141;
        }
    }
</style>
