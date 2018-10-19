<template>
    <div class="payResult">
        <div class="iconBg">
            <img src="../assets/buySuccess.png" alt="" class="buySuccess" v-if="buyStatus">
            <img src="../assets/buyFail.png" alt="" class="buySuccess" v-else>
            <div class="buySuccessFont" v-if="buyStatus&&type=='buy'">购买成功</div>
            <div class="buySuccessFont" v-if="!buyStatus&&type=='buy'">购买失败</div>
            <div class="buySuccessFont" v-if="buyStatus&&type=='coin'">充值成功</div>
            <div class="buySuccessFont" v-if="!buyStatus&&type=='coin'">充值失败</div>
        </div>
        <group style="margin-top:-0.2rem" v-if="type=='buy'" :class="buyStatus?'buyBgS':'buyBg'">
            <cell-box is-link>
                <div class="lessonListAll">
                    <div class="lessonTitleC">
                        <div class="lessonTitleNo">订单号:{{item.order}}</div>
                    </div>
                    <div class="lessonTitle">
                        <img :src="`${apiUrl}/attach/img/${item.picId}`" width="75" height="75" alt="">
                        <div class="lessonDetail">
                            <div class="lessonList">
                                <div class="lessonName">{{item.name}}</div>
                            </div>
                            <div class="lessonContent">{{item.content}}</div>
                            <div class="lessonPrice">{{item.price}}元</div>
                        </div>
                    </div>
                </div>
                <!-- anything -->
            </cell-box>
        </group>
        <div :class="buyStatus?'coinBgS':'coinBg'" v-if="type=='coin'">
            <div class="coinTitle">
                <div>
                    2018-03-11 10:52:01
                </div>
                <div style="color:#04be02" v-if="buyStatus">
                    +20000积分
                </div>
            </div>
            <div class="coinContent">
                <div>
                    充值20000积分
                </div>
                <div style="color:#999999" v-if="buyStatus">
                    剩余20000分
                </div>
            </div>
        </div>
        <div class="payButton">
            <x-button type="primary" action-type="button" @click.native="goTo">{{buyStatus?'我知道了':'继续支付'}}</x-button>
        </div>
    </div>
</template>

<script>
    import {
        XButton,
        Group,
        CellBox
    } from 'vux'
    import {
        getPayResult
    } from '../api/api'
    import apiHost from '../../config/prod.env'
    export default {
        components: {
            XButton,
            Group,
            CellBox
        },
        data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                value: '',
                buyStatus: true,
                id: '',
                type: 'coin', //coin
                item: {
                    id: '',
                    order:'',
                    picId:'',
                    name: '',
                    content: '',
                    price: '',
                }
            }
        },
        methods: {
            goTo() {
                if (this.buyStatus) {
                    if (this.type === 'coin') {
                        this.$router.replace('/myPoints')
                    } else {
                        this.$router.replace('/myLesson')
                    }
                } else {
                    if (this.type === 'coin') {
                        this.$router.replace('/buyPoints')
                    } else {
                        this.$router.replace('/paying')
                    }
                }
            },
            fetchData() {
                getPayResult(this.id).then(res => {
                    let data = res.data
                   if(this.type==='coin'){

                   }else{
                       this.item = {
                           id:data.id,
                            order:data.code,
                            name:data.title,
                            price:data.price,
                            picId:data.course.picId,
                            content:`${data.course.courseNum}节课-${data.course.totalTime}课时`

                       }
                   }
                })
            }
        },
        created() {
            this.setTitle('支付结果')
            this.buyStatus = this.$route.query.buyStatus === 'pass' ? true : false;
            this.type = this.$route.query.type
            this.id = this.$route.query.id;
            this.fetchData()
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {},
        computed: {},
    }
</script>

<style lang="less">
    .payResult {
        .iconBg {
            width: 100%;
            height: 5rem;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .buySuccess {
            width: 2rem;
        }
        .buySuccessFont {
            font-size: 17px;
            margin-top: .5rem;
        }
        .lessonListAll {
            width: 100%;
            display: flex;
            flex-direction: column;
        }
        .lessonTitle {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: .3rem 0 .2rem;
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
            font-size: 12px;
            color: #b6b6b6;
            padding: .15rem 0;
        }
        .lessonPrice {
            color: #fb6804;
        }
        .lessonTitleNo {
            color: #8a8e93;
            font-size: .4rem;
            position: relative;
        }
        .weui-cell_access.vux-cell-box:after {
            display: none;
        }
        .buyBgS,
        .buyBg {
            position: relative;
        }
        .buyBgS::before {
            content: '';
            position: absolute;
            width: .15rem;
            height: 1.2rem;
            background: #04be02;
            top: 0;
            left: 0;
            z-index: 1;
        }
        .buyBg::before {
            content: '';
            position: absolute;
            width: .15rem;
            height: 1.2rem;
            background: #f76260;
            top: 0;
            left: 0;
            z-index: 1;
        }
        .payButton {
            width: 90%;
            margin: .7rem auto 0;
        }
        .coinBg,
        .coinBgS {
            width: 100%;
            height: 2rem;
            background-color: #fff;
            margin-top: .5rem;
            padding: .3rem .7rem;
            position: relative;
            box-sizing: border-box;
        }
        .coinBg::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: .15rem;
            height: 100%;
            background-color: #f76260;
        }
        .coinBgS::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: .15rem;
            height: 100%;
            background-color: #04be02;
        }
        .coinTitle {
            font-size: 13px;
            color: #999999;
            display: flex;
            justify-content: space-between;
            margin-bottom: .2rem;
        }
        .coinContent {
            font-size: 16px;
            display: flex;
            justify-content: space-between;
        }
    }
</style>
