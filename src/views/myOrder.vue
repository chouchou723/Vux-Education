<template>
    <div class="myOrder">
        <tab custom-bar-width="60px">
            <tab-item selected @on-item-click='changeItem(1)'>
                <span style="padding:0 32px;border-right:1px solid gainsboro">全部</span>
            </tab-item>
            <tab-item @on-item-click='changeItem(2)'>
                <span style="padding:0 .6rem;border-right:1px solid gainsboro">待付款</span>
            </tab-item>
            <tab-item @on-item-click='changeItem(3)'>
                <span style="padding:0 .6rem;border-right:1px solid gainsboro">已付款</span>
            </tab-item>
            <tab-item @on-item-click='changeItem(4)'>退款</tab-item>
        </tab>
        <!-- <view-box ref="viewBox"> -->
        <scroller delegate-id="myScroller" :on-infinite="loadMore" ref='my_scroller'>
            <!-- 列表 -->
            <group style="margin-top:-0.2rem" v-for="(item,index) in lessonList" :key="index">
                <cell-box is-link>
                    <div class="lessonListAll">
                        <div class="lessonTitleC">
                            <div class="lessonTitleNo">订单号:K283</div>
                            <div class="lessonTitleStatus" :style="item.status=='待付款'?'color:#f76967':'color:#04be02'">{{item.status}}</div>
                        </div>
                        <div class="lessonTitle">
                            <x-img :default-src="dsrc" :src="asrc" width="75" height="75" alt="" :offset="2000*page" container="#vux_view_box_body"></x-img>
                            <div class="lessonDetail">
                                <div class="lessonList">
                                    <div class="lessonName">{{item.name}}</div>
                                </div>
                                <div class="lessonContent">{{item.content}}</div>
                                <div class="lessonPrice">{{item.price}}元</div>
                            </div>
                        </div>
                        <div class="lessonFoot">
                            <div v-if="item.status=='待付款'" class="pay" @click="goToPay">付款</div>
                            <div v-if="item.status=='待付款'" class="notPay">取消</div>
                            <div v-if="item.status=='已付款'" class="notPay">申请退款</div>
                            <div v-if="item.status=='已退款'" class="notPay">删除</div>
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
                page: 1,
                pageW: 'tc',
                dsrc: require('../assets/picload.png'),
                asrc: require("../assets/0e3a716cf47f1eb695e5b62597dec807.jpg"),
                value: '',
                value7: '',
                false: false,
                chooseT: false,
                chooseA: false,
                chooseS: false,
                typeKind: 0,
                chooseItemList: [],
                lessonList: [{
                        id: 1,
                        ishot: true,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: 5,
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '待付款'
                    },
                    {
                        id: 2,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: 5,
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '待付款'
                    },
                    {
                        id: 2,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: 5,
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已付款'
                    },
                    {
                        id: 2,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: 5,
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已退款'
                    },
                    {
                        id: 2,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: 5,
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已退款'
                    },
                    {
                        id: 2,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: 5,
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已退款'
                    },
                    {
                        id: 2,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: 5,
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已退款'
                    },
                    {
                        id: 2,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: 5,
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已退款'
                    },
                    {
                        id: 2,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: 5,
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已退款'
                    },
                    {
                        id: 2,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: 5,
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已退款'
                    },
                    {
                        id: 2,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: 5,
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已退款'
                    }
                ]
            }
        },
        methods: {
            goToPay() {
                this.$router.push('/paying')
            },
            loadMore() {
                console.log(1)
                setTimeout(() => {
                    this.$refs.my_scroller.finishInfinite(2)
                }, 2000)
            },
            changeItem(num) {
                console.log(num)
            }
        },
        created() {
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {},
        computed: {},
    }
</script>

<style lang="less">
    .myOrder {
        height: 100%;
        .lessonListAll {
            width: 100%;
            display: flex;
            flex-direction: column;
        }
        .lessonTitle {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: .2rem 0 0;
        }
        .lessonTitleC {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: .1rem 0 .3rem;
            border-bottom: 1px solid gainsboro;
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
        .lessonName {
            padding: 0 .2rem 0 0;
        }
        .lessonContent {
            font-size: .16rem;
            color: #b6b6b6;
            padding: .1rem 0;
        }
        .lessonPrice {
            color: #fb6804;
            padding: .1rem 0;
        }
        .lessonTitleNo {
            color: #8a8e93;
            font-size: .4rem;
            position: relative;
        }
        .lessonTitleStatus {
            font-size: .4rem;
        }
        .weui-cell_access.vux-cell-box:after {
            display: none;
        }
        .lessonTitleNo::before {
            content: '';
            position: absolute;
            width: .25rem;
            height: 1.2rem;
            background: #04be02;
            top: -.3rem;
            left: -0.5rem;
        }
        .lessonFoot {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            padding-top: .25rem;
            border-top: 1px solid gainsboro;
            margin-top: .35rem;
        }
        .pay {
            font-size: .4rem;
            width: 2.3rem;
            height: .9rem;
            line-height: .9rem;
            text-align: center;
            border: 1px solid #04be02;
            color: #04be02;
            border-radius: .1rem;
            margin-right: .3rem;
        }
        .notPay {
            font-size: .4rem;
            width: 2.3rem;
            height: .9rem;
            line-height: .9rem;
            text-align: center;
            border: 1px solid black;
            border-radius: .1rem;
        }
    }
</style>
