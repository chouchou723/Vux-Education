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
        <loading :show="show1" :text="text1"></loading>
    </div>
</template>

<script>
    import {
        Group,
        Cell,
        XButton,
        Loading
    } from 'vux'
    import {
        getNewWxPay,
        getNewWxConfig,
        getZeroPay
    } from '../api/api'
    import apiHost from '../../config/prod.env'
    export default {
        components: {
            Group,
            Cell,
            XButton,
            Loading
        },
        data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                value: '',
                id: '',
                show1: false,
                text1: '付款中'
            }
        },
        methods: {
            payOrder() { //调接口获取sign
                // console.log(1);
                if (this.value === 0) {
                    let para = {
                        orderId: this.id
                    }
                    this.show1 = true;
                    getZeroPay(para, this.id).then(res => {
                        this.show1 = false;
                        this.$vux.toast.show('支付成功!')
                        setTimeout(() => {
                            this.$router.replace(`/payResult?type=buy&buyStatus=pass&id=${this.id}`)
                        }, 1000)
                        localStorage.removeItem('payment')
                    }).catch(() => {
                        this.show1 = false;
                        this.$router.go(-1)
                    })
                } else {
                    let para = {
                        orderId: this.id
                    }
                    this.show1 = true;
                    getNewWxPay(para).then(res => {
                        this.show1 = false;
                        this.wechatPay(res.data)
                    }).catch(() => {
                        this.show1 = false;
                        this.$router.go(-1)
                    })
                }
            },
            wechatPay(config) {
                let self = this;
                self.$wechat.chooseWXPay({
                    timestamp: config.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: config.nonceStr, // 支付签名随机串，不长于 32 位
                    package: config.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: config.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: config.paySign, // 支付签名
                    success: function(response) {
                        // 支付成功后的回调函数
                        self.$vux.toast.show('支付成功!')
                        setTimeout(() => {
                            self.$router.replace(`/payResult?type=buy&buyStatus=pass&id=${self.id}`)
                        }, 500)
                        localStorage.removeItem('payment')
                    },
                    cancel: function(re) {
                        self.$vux.toast.show({
                            text: '支付已取消',
                            type: 'cancel'
                        })
                        // setTimeout(() => {
                        //     self.$router.replace('/myOrder')
                        // }, 1000)
                    },
                    fail: function(r) {
                        self.$vux.toast.show({
                            text: '支付失败',
                            type: 'cancel'
                        })
                        setTimeout(() => {
                            self.$router.replace(`/payResult?type=buy&buyStatus=fail&id=${self.id}`)
                        }, 500)
                    }
                });
            },
            wechatConfig() { //create获取config
                let url = location.href.split('#')[0]
                getNewWxConfig({
                    url: url
                }).then((response) => {
                    // this.$wechat.config(JSON.parse(response.data.data))
                    //api调接口之后配置
                    let data = response.data;
                    this.$wechat.config({
                        debug: false,
                        appId: data.appId, // 必填，公众号的唯一标识
                        timestamp: data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.nonceStr, // 必填，生成签名的随机串
                        signature: data.signature, // 必填，微信签名
                        jsApiList: [
                            'chooseWXPay'
                        ] // 必填，需要使用的JS接口列表
                    });
                }).catch(() => {
                    // this.$vux.loading.hide()
                })
            },
        },
        created() {
            this.setTitle('确认付款')
            let payment = JSON.parse(localStorage.getItem('payment'))
            this.value = payment.price - 0;
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
