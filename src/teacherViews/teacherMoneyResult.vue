<template>
    <div class="teacherMoneyResult">
        <div class="iconBg">
            <flow orientation="vertical" style="height:130px;">
                <img src="../assets/getMoneyStart.png" width="40" alt="" class="getMoneyStart" v-if="step==1">
                <img src="../assets/getMoneyProcess.png" width="40" alt="" class="getMoneyPro" v-if="step==2">
                <img src="../assets/getMoneyStart.png" width="40" alt="" class="getMoneySuccess" v-if="step==3&&getStatus=='success'">
                <img src="../assets/getMoneyFail.png" width="40" alt="" class="getMoneySuccess" v-if="step==3&&getStatus=='fail'">
                <flow-state :is-done="step>=1">
                    <div slot="title" class="stepFirst" v-if="step==1">
                        <div style="font-size:17px">发起提现申请</div>
                        <div style="color:#999999;font-size:14px">提现到账帐户:代芳芳</div>
                    </div>
                    <div v-else slot="title" style="margin-left:10px;color:#999999;font-size:16px">
                        发起提现申请
                    </div>
                </flow-state>
                <flow-line :is-done="step>=2" tip=" " :line-span="step==2?40:40">
                </flow-line>
                <flow-state :is-done="step>=2">
                    <div slot="title" class="stepSecond" v-if="step==2">
                        <div style="font-size:17px">系统处理中</div>
                        <div style="color:#999999;font-size:14px">预计5个工作日到账</div>
                    </div>
                    <div v-else slot="title" style="margin-left:10px;color:#999999;font-size:16px">
                        系统处理中
                    </div>
                </flow-state>
                <flow-line :is-done="step>=3" :tip="step==2?' ':''" :line-span="30"></flow-line>
                <flow-state :is-done="step==3">
                    <div slot="title" class="stepFail" v-if="getStatus=='fail'">
                        <div style="font-size:17px">到账失败</div>
                        <div style="color:#999999;font-size:12px"> 如有问题,请咨询电话<a class="linkA" href="tel:400172074">400-1720-748</a></div>
                    </div>
                    <div v-else slot="title" style="margin-left:10px;font-size:16px">
                        到账成功
                    </div>
                </flow-state>
            </flow>
        </div>
        <div class="coinBg">
            <div class="coinTitle">
                <div>
                    2018-03-11 10:52:01
                </div>
                <div style="color:black;font-size:16px">
                    提现
                </div>
            </div>
            <div class="coinContent">
                -100元
            </div>
        </div>
        <div class="payButton">
            <x-button type="primary" action-type="button" @click.native="goTo">我知道了</x-button>
        </div>
    </div>
</template>

<script>
    import {
        XButton,
        Group,
        CellBox,
        Flow,
        FlowState,
        FlowLine
    } from 'vux'
    import {
        pushHimOnWall
    } from '../api/api'
    import apiHost from '../../config/prod.env'
    export default {
        components: {
            XButton,
            Group,
            CellBox,
            Flow,
            FlowState,
            FlowLine
        },
        data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                value: '',
                step: 3,
                getStatus: 'fail',
                type: 'coin', //coin
                item: {
                    id: 1,
                    ishot: true,
                    name: '创意绘画单课',
                    total: 8,
                    hasJoin: 5,
                    content: '1节课-2课时|4-8岁儿童|满5人开课',
                    price: 120,
                    status: '待上课'
                }
            }
        },
        methods: {
            goTo() {
                console.log(1);
                this.$router.push('/teacherFinancial')
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
    .teacherMoneyResult {
        .iconBg {
            width: 100%;
            height: 5rem;
            background-color: #fff;
            display: flex; // flex-direction: column;
            justify-content: flex-start;
            align-items: center;
        }
        .iconBg .weui-wepay-flow__info-left,
        .weui-wepay-flow__info-left:after {
            display: none;
        }
        .weui-wepay-flow__li_done .weui-wepay-flow__state,
        .weui-wepay-flow__process {
            background-color: #00a6e7;
        }
        .weui-btn_primary,.weui-btn_primary:not(.weui-btn_disabled):active {
            background-color: #00a6e7;
        }
        .weui-wepay-flow {
            padding: 20px 40px;
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
        .getMoneyStart {
            position: absolute;
            top: 14px;
            left: 27px;
            z-index: 4;
        }
        .getMoneyPro {
            position: absolute;
            top: 70px;
            left: 27px;
            z-index: 4;
        }
        .getMoneySuccess {
            position: absolute;
            top: 137px;
            left: 27px;
            z-index: 4;
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
            padding: .15rem 0;
        }
        .linkA {
            text-decoration: underline;
            color: #00a6e7;
            margin-left: .2rem;
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
        .buyBg {
            position: relative;
        }
        .buyBg::before {
            content: '';
            position: absolute;
            width: .15rem;
            height: 1.2rem;
            background: #00a6e7;
            top: 0;
            left: 0;
            z-index: 1;
        }
        .payButton {
            width: 90%;
            margin: .7rem auto 0;
        }
        .coinBg {
            width: 100%;
            height: 2rem;
            background-color: #fff;
            margin-top: .5rem;
            padding: .3rem .3rem .3rem .7rem;
            position: relative;
            box-sizing: border-box;
            display: flex;
        }
        .coinBg::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: .15rem;
            height: 100%;
            background-color: #00a6e7;
        }
        .coinTitle {
            font-size: 13px;
            color: #999999;
            display: flex;
            justify-content: space-between; // margin-bottom:.2rem;
            flex-direction: column;
            flex: 0 0 80%;
        }
        .stepFirst {
            display: flex;
            flex-direction: column;
            margin-top: -6px;
            margin-left: 10px;
        }
        .stepSecond {
            display: flex;
            flex-direction: column;
            margin-top: -17px;
            margin-left: 10px;
        }
        .stepFail {
            display: flex;
            flex-direction: column;
            margin-top: 5px;
            margin-left: 10px;
        }
        .coinContent {
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #fb6804;
        }
    }
</style>
