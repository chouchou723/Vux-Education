<template>
    <div class="confirmOrder">
        <group title="消费信息">
            <cell>
                <div slot="title">
                    <div style="font-size:16px">创意绘画课程</div>
                    <div style="font-size:12px;color:#999999">24节课</div>
                </div>
                <span style="color:#fb6601">{{money*value}}元</span>
            </cell>
            <cell title="数量">
                <inline-x-number v-model="value" style="display:block;" :min="1" width="50px" button-style="round"></inline-x-number>
            </cell>
            <x-switch :title="getT()" prevent-default v-model="value2" @on-click="onClick">
            </x-switch>
        </group>
        <div class="confirmFooter">
            <span class="footerSpan">还需支付:<span style="color:#fb6804;margin-left:.2rem">{{money*value}}元</span></span>
            <span class="footerSpanC" @click="gotoPay">提交订单</span>
        </div>
    </div>
</template>

<script>
    import {
        Group,
        Cell,
        InlineXNumber,
        XSwitch
    } from 'vux'
    import {
        pushHimOnWall
    } from '../api/api'
    import apiHost from '../../config/prod.env'
    export default {
        components: {
            Group,
            Cell,
            InlineXNumber,
            XSwitch
        },
        data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                money: 123,
                value: 1,
                value2: true,
                tip: require('@/assets/tip.png'),
            }
        },
        methods: {
            gotoPay() {
                this.$router.push(`/paying/?m=${this.money*this.value}`)
            },
            getT() {
                let score = 20000;
                return ` <div style="width:7rem;">
                    <span>积分:</span> <span style="font-size:12px;color:#999999;margin-right:.2rem">可用${score}积分,抵扣${score/10}元</span><img src=${this.tip} width="13" style="vertical-align:middle" /></div>`
            },
            onClick() {
                this.value2 ? this.value2 = false : this.value2 = true;
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
