<template>
    <div class="myPaying">
        <group title="付款信息">
            <cell>
                <span slot="title"><span style="vertical-align:middle;">支付金额</span></span>
                <span style="color:#fb6601">{{value}}元</span>
            </cell>
        </group>
        <group title="付款方式">
            <cell>
                <img slot="icon" src="../assets/wechatPay.png" alt="" class="payImg">
                <div slot="title" class="payTitle">
                    <div style="margin-bottom:.1rem">微信支付</div>
                    <div style="color:#999999;font-size:.3rem;">推荐安装微信5.0及以上版本使用</div>
                </div>
                <img src="../assets/payCheck.png" alt="" class="paycheck">
            </cell>
        </group>
        <div class="payButton">
            <x-button type="primary" action-type="button" @click.native="payOrder">立即付款</x-button>
        </div>
    </div>
</template>

<script>
    import {
        Group,
        Cell,
        XButton
    } from 'vux'
    import {
        getNewWxPay,
        getNewWxConfig
    } from '../api/api'
    import apiHost from '../../config/prod.env'
    export default {
        components: {
            Group,
            Cell,
            XButton
        },
        data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                value: '',
                id:''
            }
        },
        methods: {
            payOrder() {//调接口获取sign
                // console.log(1);
                let para = {
                    orderId:JSON.parse(localStorage.getItem('payment')).id
                }
                getNewWxPay(para).then(res=>{
                    console.log(res)
                //     // this.wechatPay(res.data.data)
                    // this.$router.replace('/payResult')
                })
            },
            wechatPay(config) {
                let $this = this
                this.$wechat.chooseWXPay({
                    timestamp: config.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: config.nonceStr, // 支付签名随机串，不长于 32 位
                    package: config.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: config.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: config.paySign, // 支付签名
                    success: function(response) {
                        // 支付成功后的回调函数
                        $this.$vux.toast.show('支付成功!')
                    },
                    cancel: function(re) {
                        $this.$vux.toast.show({
                            text: '支付已取消',
                            type: 'cancel'
                        })
                    }
                });
            },
            wechatConfig() {//create获取config
                let url = location.href.split('#')[0]
                getNewWxConfig({url:url}).then((response) => {
                    console.log(response)
                        // this.$wechat.config(JSON.parse(response.data.data))
                        //api调接口之后配置
                        //    this.$wechat.config({
                        //   debug: true,
                        //   appId: '', // 必填，公众号的唯一标识
                        //   timestamp: '', // 必填，生成签名的时间戳
                        //   nonceStr: '', // 必填，生成签名的随机串
                        //   signature: '', // 必填，微信签名
                        //   jsApiList: [
                        //     'chooseWXPay'
                        //   ] // 必填，需要使用的JS接口列表
                        // });
                   
                }).catch(() => {
                    // this.$vux.loading.hide()
                })
            },
        },
        created() {
            let payment = JSON.parse(localStorage.getItem('payment'))
            this.value = payment.price;
            this.id = payment.id;
            this.wechatConfig();
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {},
        computed: {},
    }
</script>

<style lang="less">
    .myPaying {
        .weui-cells__title {
            margin-top: 0;
            padding-top: .2rem;
            padding-bottom: .2rem;
            font-size: .4rem;
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
    }
</style>
