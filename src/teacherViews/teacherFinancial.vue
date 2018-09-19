<template>
    <div class="teacherFinancial">
        <view-box ref="viewBox">
            <group title="总余额">
                <cell>
                    <div slot="title" class="payTitle">
                        <div style="margin-bottom:.1rem">金额:<span style="color:#fb6804;margin-left:.2rem">20000元</span></div>
                        <!-- <div style="color:#999999;font-size:.3rem;">积分充值规则: 1元=10积分</div> -->
                    </div>
                    <x-button mini type="primary" @click.native="gotoBuyP">提现</x-button>
                </cell>
            </group>
            <group title="收支明细">
                <cell v-for="(item,index) in pointDetail" :key="index">
                    <div class="coinBg" slot="title">
                        <div class="coinTitle">
                            <div>{{item.date}}</div>
                            <div style="color:black;font-size:16px">{{item.content}}</div>
                        </div>
                        <div class="coinContent">
                            <div :style="item.point>0?'color:#04be02':'color:#f76260'">{{item.point>0?'+'+item.point:item.point}}元</div>
                        </div>
                    </div>
                </cell>
            </group>
        </view-box>
    </div>
</template>

<script>
    import {
        XButton,
        Group,
        Cell,
        ViewBox
    } from 'vux'
    import {
        pushHimOnWall
    } from '../api/api'
    import apiHost from '../../config/prod.env'
    export default {
        components: {
            XButton,
            Group,
            Cell,
            ViewBox
        },
        data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                value: '',
                pointDetail: [{
                        date: '2018-03-11 10:52:01',
                        point: 20000,
                        content: '充值20000积分',
                        remain: 20000
                    },
                    {
                        date: '2018-03-11 10:52:01',
                        content: '订单D282,消耗10000积分',
                        point: -10000,
                        remain: 0
                    },
                    {
                        date: '2018-03-11 10:52:01',
                        content: '订单D282,消耗10000积分',
                        point: -10000,
                        remain: 0
                    },
                    {
                        date: '2018-03-11 10:52:01',
                        content: '订单D282,消耗10000积分',
                        point: -10000,
                        remain: 0
                    },
                    {
                        date: '2018-03-11 10:52:01',
                        content: '订单D282,消耗10000积分',
                        point: -10000,
                        remain: 0
                    },
                    {
                        date: '2018-03-11 10:52:01',
                        content: '订单D282,消耗10000积分',
                        point: -10000,
                        remain: 0
                    },
                    {
                        date: '2018-03-11 10:52:01',
                        content: '订单D282,消耗10000积分',
                        point: -10000,
                        remain: 0
                    },
                    {
                        date: '2018-03-11 10:52:01',
                        content: '订单D282,消耗10000积分',
                        point: -10000,
                        remain: 0
                    },
                    {
                        date: '2018-03-11 10:52:01',
                        content: '订单D282,消耗10000积分',
                        point: -10000,
                        remain: 0
                    },
                    {
                        date: '2018-03-11 10:52:01',
                        content: '订单D282,消耗10000积分',
                        point: -10000,
                        remain: 0
                    },
                ],
            }
        },
        methods: {
            gotoBuyP() {
                this.$router.push('/teacherGetMoney')
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
    .teacherFinancial {
        height: 100%;
        .weui-cells__title {
            margin-top: 0;
            padding-top: .2rem;
            padding-bottom: .2rem;
            font-size: .4rem;
        }
        .weui-btn_primary {
            background-color: #00a6e7;
        }
        .weui-cell_access.vux-cell-box:after {
            display: none;
        }
        .coinBg {
            width: 9rem; // height: 2rem;
            // padding: 0 .2rem;
            position: relative;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
        }
        .coinTitle {
            font-size: 13px;
            color: #999999;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex: 0 0 70%;
            div {
                padding: .1rem 0;
            }
        }
        .coinContent {
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>
