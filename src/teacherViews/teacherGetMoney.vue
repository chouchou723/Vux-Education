<template>
    <div class="teacherGetMoney">
        <group title="提现金额">
            <x-input title="￥"  mask="9999999999999" v-model="value" :show-clear='false' :max="13" @on-blur="checkMoney"></x-input>
            <cell>
                <div slot="title" style="color:#999999;font-size:14px">可提现金额:{{total}}元</div>
                <div style="color:#00a6e7;font-size:14px" @click="getAll">全部提现</div>
            </cell>
            <!-- <span class="transferPoint">{{value?value*10:0}}积分</span> -->
        </group>
        <group title="到账帐户">
            <cell>
                <img slot="icon" src="../assets/wechatPay.png" alt="" class="payImg">
                <div slot="title" class="payTitle">
                    <div style="margin-bottom:.1rem">{{name}}</div>
                    <div style="color:#999999;font-size:.3rem;">5个工作日到账</div>
                </div>
                <!-- <img src="../assets/payCheck.png" alt="" class="paycheck"> -->
            </cell>
        </group>
        <div class="payButton">
            <x-button :type="value==0?'':'primary'" action-type="button" @click.native="payOrder" :disabled="value==0">立即提现</x-button>
        </div>
    </div>
</template>

<script>
    import {
        Group,
        Cell,
        XButton,
        XInput
    } from 'vux'
    import {
        doWithDraw
    } from '../api/api'
    import apiHost from '../../config/prod.env'
    export default {
        components: {
            Group,
            Cell,
            XButton,
            XInput
        },
        data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                value: '',
                total: '',
                false: false,
                maxV: 12,
                name:'',
            }
        },
        methods: {
            checkMoney(val, $event) {
                if(typeof (val-0) === 'number'){
                   if (val - 0 > this.total) {
                    this.value = this.total;
                }else{
                     let a = val.match(/(\d)+(\.\d{1,2})?/)[0]
                    this.value = a-0;
                }
                }else{
                    this.value = '';
                }
            },
            getAll() {
                this.value = this.total;
            },
            payOrder() {
                let para = {
                    price: this.value
                }
                doWithDraw(para).then(res => {
                    if(res.code==0){
                        this.$vux.toast.show({
                            text:'申请成功'
                        })
                        localStorage.removeItem('withDraw')
                        this.$router.replace('/teacherMoneyList')
                    }
                    // console.log(res)
                })
            }
        },
        created() {
            this.setTitle('金额提现')
            this.total = localStorage.getItem('withDraw')
            this.name = JSON.parse(localStorage.getItem('teacherInfo')).realName
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {},
        computed: {},
    }
</script>

<style lang="less">
    .teacherGetMoney {
        .weui-input {
            color: #fb6804;
        }
        .weui-btn_disabled {
            color: grey;
        }
        .weui-cells__title {
            margin-top: 0;
            padding-top: .2rem;
            padding-bottom: .1rem;
            font-size: .4rem;
        }
        .weui-btn_primary,.weui-btn_primary:not(.weui-btn_disabled):active {
            background-color: #00a6e7;
        }
        .payImg {
            width: 1rem;
        }
        .payTitle {
            margin-left: .5rem;
        }
        .paycheck {
            width: .8rem;
        }
        .payButton {
            width: 90%;
            margin: 1rem auto 0;
        }
        .transferPoint {
            position: absolute;
            right: 5%;
            top: 27%;
            font-size: 16px;
            color: #999999;
        }
    }
</style>
