<template>
    <div class="teacherFinancial">
        <view-box ref="viewBox">
            <group title="总余额">
                <cell>
                    <div slot="title" class="payTitle">
                        <div style="margin-bottom:.1rem">金额:<span style="color:#fb6804;margin-left:.2rem">{{total}}元</span></div>
                        <!-- <div style="color:#999999;font-size:.3rem;">积分充值规则: 1元=10积分</div> -->
                    </div>
                    <x-button mini type="primary" :disabled="total<=0" @click.native="gotoBuyP">提现</x-button>
                </cell>
            </group>
            <group title="收支明细">
                <cell v-for="(item,index) in pointDetail" :key="index">
                    <div class="coinBg" slot="title">
                        <div class="coinTitle">
                            <div>{{item.orderTime}}</div>
                            <div style="color:black;font-size:16px">{{item.target}}</div>
                        </div>
                        <div class="coinContent">
                            <div :style="item.type.name==='BUSINESS'?'color:#04be02':'color:#f76260'">{{item.type.name==='BUSINESS'?'+'+item.price:'-'+item.price}}元</div>
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
        getTeacherBuz
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
                total: '',
                pointDetail: [
                ],
            }
        },
        methods: {
            gotoBuyP() {
                localStorage.setItem('withDraw',this.total)
                this.$router.push('/teacherGetMoney')
            },
            fetchData(){
                let para ={}
                getTeacherBuz(para).then(res=>{
                    this.total = res.data.total;
                    this.pointDetail = res.data.orders;
                    console.log(res)
                })
            }
        },
        created() {
            this.setTitle('财务记录')
            this.fetchData()
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
        .weui-btn_primary,.weui-btn_disabled.weui-btn_primary {
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
