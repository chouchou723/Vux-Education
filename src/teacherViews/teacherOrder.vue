<template>
    <div class="teacherOrder">
        <view-box ref="viewBox">
            <tab custom-bar-width="60px" active-color="#00a6e7">
                <tab-item selected>
                    <span style="padding:0 32px;border-right:1px solid gainsboro">全部</span>
                </tab-item>
                <tab-item>
                    <span style="padding:0 .6rem;border-right:1px solid gainsboro">待上课</span>
                </tab-item>
                <tab-item>
                    <span style="padding:0 .6rem;border-right:1px solid gainsboro">已上课</span>
                </tab-item>
                <tab-item>已退款</tab-item>
            </tab>
            <!-- 列表 -->
            <group style="margin-top:-0.2rem" v-for="(item,index) in lessonList" :key="index">
                <cell-box is-link>
                    <div class="lessonListAll">
                        <div class="lessonTitleC">
                            <div class="lessonTitleNo">订单号:K283</div>
                            <div class="lessonTitleStatus" :style="item.status=='待上课'?'color:#f76967':item.status=='已上课'?'color:#04be02':'color:#8a8e93'">{{item.status}}</div>
                        </div>
                        <div class="lessonTitle">
                            <x-img :default-src="dsrc" :src="asrc" width="80" height="80" alt="" :offset="700" container="#vux_view_box_body"></x-img>
                            <div class="lessonDetail">
                                <div class="lessonList">
                                    <div class="lessonName">{{item.name}}</div>
                                </div>
                                <!-- <div class="lessonContent">{{item.content}}</div> -->
                                <div class="lessonPrice">总价:{{item.price}}元</div>
                            </div>
                        </div>
                        <div class="lessonFoot">
                            <div v-if="item.status=='待付款'" class="pay" @click="goToPay">付款</div>
                            <div v-if="item.status=='待付款'" class="notPay">取消</div>
                            <div v-if="item.status=='已付款'" class="notPay">申请退款</div>
                            <!-- <div v-if="item.status=='已退款'" class="notPay">删除</div> -->
                        </div>
                    </div>
                    <!-- anything -->
                </cell-box>
            </group>
        </view-box>
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
    export default {
        components: {
            Group,
            Tab,
            TabItem,
            CellBox,
            ViewBox,
            XImg
        },
        data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
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
                        status: '待上课'
                    },
                    {
                        id: 2,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: 5,
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '待上课'
                    },
                    {
                        id: 2,
                        ishot: false,
                        name: '创意绘画单课',
                        total: 8,
                        hasJoin: 5,
                        content: '1节课-2课时|4-8岁儿童|满5人开课',
                        price: 120,
                        status: '已上课'
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
        },
        created() {
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {},
        computed: {},
    }
</script>

<style lang="less">
    .teacherOrder {
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
            font-size: 16px;
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
            background: #00a6e7;
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
            border: 1px solid #31a2cf;
            color: #31a2cf;
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
