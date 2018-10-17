<template>
    <div class="confirmOrder">
        <group title="消费信息">
            <cell>
                <div slot="title">
                    <div style="font-size:16px">{{detail.name}}</div>
                    <div style="font-size:12px;color:#999999">{{detail.courseNum}}节课</div>
                </div>
                <span style="color:#fb6601">{{detail.price*value}}元</span>
            </cell>
            <cell title="数量">
                <inline-x-number v-model="value" style="display:block;" :min="1" width="50px" button-style="round"></inline-x-number>
            </cell>
            <x-switch :title="getT()" prevent-default :disabled="scoreC==0" v-model="value2" @on-click="onClick">
            </x-switch>
        </group>
        <div class="confirmFooter">
            <span class="footerSpan">还需支付:<span style="color:#fb6804;margin-left:.2rem">{{remainPrice}}元</span></span>
            <span class="footerSpanC" @click="gotoPay">提交订单</span>
        </div>
        <loading :show="show1" :text="text1"></loading>
    </div>
</template>

<script>
    import {
        Group,
        Cell,
        InlineXNumber,
        XSwitch,
        Loading
    } from 'vux'
    import {
        getMyPoint,
        payMyOrder
    } from '../api/api'
    import apiHost from '../../config/prod.env'
    export default {
        components: {
            Group,
            Cell,
            InlineXNumber,
            XSwitch,
            Loading
        },
        data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                detail: {
                    name: '',
                    price: 0,
                    courseNum: 0,
                    id: ''
                },
                text1: '订单创建中',
                show1: false,
                value: 1,
                value2: false,
                score: 0,
                tip: require('@/assets/tip.png'),
            }
        },
        methods: {
            gotoPay() {
                let para = {
                    cost: this.remainPrice,
                    courseId: this.detail.id,
                    point: this.value2 ? this.scoreC : 0
                }
                this.show1 = true;
                payMyOrder(para).then(res => {
                    // console.log(res)
                    if (res.code == 0) {
                        this.show1 = false;
                        let id = res.data.id;
                        let payment = {price:this.detail.price*this.value,id:id}
                        localStorage.setItem('payment',JSON.stringify(payment))
                        this.$router.replace(`/paying`)
                    }
                })
            },
            getT() {
                let score = this.scoreC;
                return ` <div style="width:7rem;">
                                <span>积分:</span> <span style="font-size:12px;color:#999999;margin-right:.2rem">可用${score}积分,抵扣${score/10}元</span><img src=${this.tip} width="13" style="vertical-align:middle" /></div>`
            },
            onClick() {
                this.value2 ? this.value2 = false : this.value2 = true;
            },
            fetchData() {
                let para = {}
                getMyPoint(para).then(res => {
                    this.score = res.data.total;
                    // this.pointDetail = res.data.detail
                    // console.log(res)
                })
            }
        },
        created() {
            this.setTitle('确认订单')
            let detail = JSON.parse(localStorage.getItem('order'));
            this.detail = detail;
            this.fetchData()
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {},
        computed: {
            scoreC() {
                if (this.score / 10 < this.detail.price * this.value) {
                    return this.score;
                } else {
                    return this.detail.price * this.value * 10;
                }
            },
            remainPrice(){
                return (this.detail.price * this.value)- (this.scoreC/10)
            }
        },
    }
</script>

<style lang="less">
    .confirmOrder {
        .weui-cells__title {
            margin-top: 0;
            padding-top: .2rem;
            padding-bottom: .2rem;
            font-size: .4rem;
        }
        .confirmFooter {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1.4rem;
            display: flex;
        }
        .footerSpan {
            text-align: center;
            line-height: 1.4rem;
            flex: 0 0 40%;
            font-size: 16px;
            border-top: 1px solid gainsboro;
        }
        .footerSpanC {
            text-align: center;
            line-height: 1.4rem;
            flex: auto;
            background: #04be02;
            font-size: 18px;
            color: white;
        }
    }
</style>
