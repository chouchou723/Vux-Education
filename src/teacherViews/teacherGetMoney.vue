<template>
    <div class="teacherGetMoney">
        <group title="充值金额">
            <x-input title="￥" type="tel" mask="9999999999999" v-model="value" :show-clear='false' :max="13"></x-input>
            <cell>
                <div slot="title" style="color:#999999;font-size:14px">可提现金额:2780元</div>
                <div style="color:#00a6e7;font-size:14px">全部提现</div>
            </cell>
            <!-- <span class="transferPoint">{{value?value*10:0}}积分</span> -->
        </group>
        <group title="到账帐户">
            <cell>
                <img slot="icon" src="../assets/wechatPay.png" alt="" class="payImg">
                <div slot="title" class="payTitle">
                    <div style="margin-bottom:.1rem">代芳芳</div>
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
        pushHimOnWall
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
                false: false,
                maxV: 12
            }
        },
        methods: {
            payOrder() {
                console.log(1);
                this.$router.push('/teacherMoneyResult')
                //  this.$wechat.chooseWXPay({
                //                             timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                //                             nonceStr: '', // 支付签名随机串，不长于 32 位
                //                             package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                //                             signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                //                             paySign: '', // 支付签名
                //                             success: function (res) {
                //                             // 支付成功后的回调函数
                //                             }
                //                             });
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
        .weui-btn_primary {
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
