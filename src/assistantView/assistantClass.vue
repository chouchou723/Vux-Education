<template>
    <div class="assistantClass">
        <tab custom-bar-width="60px" active-color="#00a6e7">
            <tab-item selected>
                <span style="padding:0 32px;border-right:1px solid gainsboro">全部</span>
            </tab-item>
            <tab-item>
                <span style="padding:0 .6rem;border-right:1px solid gainsboro">已开课</span>
            </tab-item>
            <tab-item>
                <span style="padding:0 .6rem;border-right:1px solid gainsboro">未开课</span>
            </tab-item>
            <tab-item>已结课</tab-item>
        </tab>
        <div class="noLessonDiv" v-if="lessonList1.length==0">
            <img src="../assets/noLesson.png" alt="">
            <div>暂无课程</div>
        </div>
        <!-- <view-box ref="viewBox">  -->
        <scroller delegate-id="myScroller" :on-refresh="refresh" :pageW="pageW" :on-infinite="loadMore" ref='my_scroller' v-if="lessonList1.length!=0">
            <!-- 列表 -->
            <group style="margin-top:-0.2rem;height:100%" id="picContent">
                <cell-box is-link v-for="(item,index) in lessonList1" :key="index" :link="`/assistantLessonDetail/?id=${item.id}`">
                    <div class="lessonList">
                        <x-img :default-src="dsrc" :src="asrc" width="65" height="65" alt="" container="#vux_view_box_body" :offset="1500*page" :delay="50"></x-img>
                        <div class="lessonDetail">
                            <div class="lessonList">
                                <!-- <div class="hot" v-if="item.ishot">热门</div> -->
                                <div class="lessonName">{{item.name}}</div>
                                <div class="lessonStatus" :style="item.hasJoin=='已开课'?'color: #04be02;border: 1px solid #04be02;':
                                    item.hasJoin=='已结课'?'color: #b6b6b6;border: 1px solid #b6b6b6;':'color: #F76260;border: 1px solid;'">{{item.hasJoin}}</div>
                            </div>
                            <div class="lessonContent">{{item.content}}</div>
                            <div class="lessonPrice" v-if="item.hasJoin=='已开课'||item.hasJoin=='待开课'">根据你的情况该课程费用约为{{item.price}}元</div>
                            <div class="lessonPrice" v-if="item.hasJoin=='已结课'">课程费用为{{item.price}}元</div>
                        </div>
                    </div>
                    <!-- anything -->
                </cell-box>
            </group>
        </scroller>
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
        XImg
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
            Scroller
        },
        data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                dsrc: require('../assets/picload.png'),
                asrc: require("../assets/0e3a716cf47f1eb695e5b62597dec807.jpg"),
                pageW: 'tc',
                page: 1,
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
            refresh() {},
            loadMore() {
                this.page++;
                console.log(this.page)
                setTimeout(() => {
                    this.lessonList1 = [...this.lessonList1, ...this.lessonList1]
                    this.$refs.my_scroller.finishInfinite(1)
                    // this.$refs.my_scroller.finishInfinite(2)暂无数据时调用
                }, 2000)
            },
        },
        created() {
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {},
        computed: {},
    }
</script>

<style lang="less">
    .assistantClass {
        height: 100%;
        .noLessonDiv {
            width: 100%;
            margin-top: 4rem; // height: 4rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            img {
                width: 2rem;
            }
            div {
                font-size: .45rem;
                color: #8a8a8a
            }
        }
        .lessonName {
            padding: 0 .2rem 0 0;
        }
        .lessonPrice {
            color: #fb6804;
            padding: .1rem 0;
            font-size: 12px;
        }
        .lessonList {
            width: 100%;
            display: flex;
            align-items: center;
            padding: .1rem 0;
        }
        .lessonDetail {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding-left: .4rem;
        }
        .lessonStatus {
            font-size: 12px;
            border-radius: .3rem;
            padding: 0 .2rem;
        }
        .lessonContent {
            font-size: 12px;
            color: #b6b6b6;
            padding: .1rem 0;
        }
    }
</style>
