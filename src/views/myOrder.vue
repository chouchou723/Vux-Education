<template>
    <div class="myOrder">
        <tab custom-bar-width="60px">
            <tab-item selected @on-item-click='changeItem("")'>
                <span style="padding:0 32px;border-right:1px solid gainsboro">全部</span>
            </tab-item>
            <tab-item @on-item-click='changeItem("WAIT")'>
                <span style="padding:0 .6rem;border-right:1px solid gainsboro">待付款</span>
            </tab-item>
            <tab-item @on-item-click='changeItem("PAID")'>
                <span style="padding:0 .6rem;border-right:1px solid gainsboro">已付款</span>
            </tab-item>
            <tab-item @on-item-click='changeItem("REFUND")'>退款</tab-item>
        </tab>
        <!-- <view-box ref="viewBox"> -->
        <scroller delegate-id="myScroller" :pageW="pageW" :on-infinite="loadMore" ref='my_scroller' v-if="lessonList.length!==0">
            <!-- 列表 -->
            <group style="margin-top:-0.2rem" v-for="(item,index) in lessonList" :key="index">
                <cell-box is-link>
                    <div class="lessonListAll">
                        <div class="lessonTitleC">
                            <div class="lessonTitleNo">订单号:{{item.code}}</div>
                            <div class="lessonTitleStatus" :style="item.status.label=='待付款'?'color:#f76967':item.status.label=='已付款'?'color:#04be02':'color:#8a8e93'">{{item.status.label}}</div>
                        </div>
                        <div class="lessonTitle">
                            <x-img :default-src="dsrc" :src="`${apiUrl}/attach/img/${item.picId}/SQUARE`" width="75" height="75" alt="" :offset="2000*(page+1)" container="#vux_view_box_body"></x-img>
                            <div class="lessonDetail">
                                <div class="lessonList">
                                    <div class="lessonName">{{item.course.name}}</div>
                                </div>
                                <div class="lessonContent">{{item.course.courseNum}}节课-{{item.course.hours}}课时</div>
                                <div class="lessonPrice">{{item.price}}元</div>
                            </div>
                        </div>
                        <div class="lessonFoot">
                            <div v-if="item.status.label=='待付款'" class="pay" @click="goToPay(item.price)">付款</div>
                            <div v-if="item.status.label=='待付款'" class="notPay" @click="cancelOrder(item.id)">取消</div>
                            <div v-if="item.status.label=='已付款'" class="notPay" @click="doRefund(item.id)">申请退款</div>
                            <div v-if="item.status.label=='已退款'||item.status.label=='已取消'" class="notPay" @click="deleteOrder(item.id)">删除</div>
                        </div>
                    </div>
                    <!-- anything -->
                </cell-box>
            </group>
        </scroller>
         <div v-if="lessonList.length===0" style="width:100%;height:80%;display:flex;justify-content:center;align-items:center;color:#999999;font-size:0.4rem;">
                    暂无订单
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
        XImg
    } from 'vux'
    import {
        getMyOrder,
        cancelMyOrder,
        refundMyOrder,
        deleteMyOrder
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
                page: 0,
                totalPages: 0,
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
                lessonList: [{course:{name:''},status:{label:''}}],
                status: '',
            }
        },
        methods: {
            deleteOrder(id) {
                deleteMyOrder(id).then(res => {
                    console.log(res)
                    if (res.code == 0) {
                        this.$vux.toast.show({
                            text: '删除成功'
                        })
                        this.page = 0;
                        this.fetchData(0)
                    }
                })
            },
            doRefund(id) {
                refundMyOrder(id).then(res => {
                    console.log(res)
                    if (res.code == 0) {
                        this.$vux.toast.show({
                            text: '申请成功'
                        })
                        this.page = 0;
                        this.fetchData(0)
                    }
                })
            },
            cancelOrder(id) {
                cancelMyOrder(id).then(res => {
                    console.log(res)
                    if (res.code == 0) {
                        this.$vux.toast.show({
                            text: '取消成功'
                        })
                        this.page = 0;
                        this.fetchData(0)
                    }
                })
            },
            goToPay(m) {
                let payment = m;
                localStorage.setItem('payment', m)
                this.$router.push(`/paying`)
            },
            loadMore() {
                    // console.log(this.page)

                //    if(this.totalPages>this.page+1){
                this.page++;
                this.fetchData()
                // }else{
                //     console.log(12213)
                //         this.$refs.my_scroller.finishInfinite(2)
                // }
            },
            changeItem(status) {
                this.status = status;
                this.page = 0;
                this.fetchData(this.page)
                // console.log(num)
            },
            fetchData(page = this.page) {
                let para = {
                    // page:page,
                    // size:15,
                    size: 15 * (page + 1),
                    status: this.status,
                    // sort:'asc'
                }
                getMyOrder(para).then(res => {
                    this.totalPages = res.data.totalElements;
                    this.lessonList = res.data.content;

                }).then(res => {
                    if (this.totalPages <= 15 * (this.page + 1)) {
                        this.page =Math.floor(this.totalPages/15)
                        this.$refs.my_scroller.finishInfinite(2)
                    }
                })
            },
        },
        created() {
            this.setTitle('我的订单')
            this.fetchData()
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
