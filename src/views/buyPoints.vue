<template>
    <div class="buyPoints">
        <group title="充值金额">
            <x-input title="￥" type="tel" mask="9999999999999" v-model="value" :show-clear='false' :max="13"></x-input>
            <span class="transferPoint">{{value?value*10:0}}积分</span>
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
            <x-button :type="value==0?'':'primary'" action-type="button" ref="buyp" @click.native="payOrder" :disabled="value==0">立即充值</x-button>
        </div>
        <loading :show="show1" :text="text1"></loading>
    </div>
</template>

<script>
    import {
        Group,
        Cell,
        XButton,
        XInput,
        Loading
    } from 'vux'
    import {
        getPointPay,
        getNewWxPay,
        getNewWxConfig
    } from '../api/api'
    import apiHost from '../../config/prod.env'
    export default {
        components: {
            Group,
            Cell,
            XButton,
            XInput,
            Loading
        },
        data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                value: '',
                false: false,
                maxV: 12,
                text1: '订单创建中',
                show1: false,
                id: ''
            }
        },
        methods: {
            payOrder() {
                let para = {
                    price: this.value
                }
                this.show1 = true;
                getPointPay(para).then(res => {
                    this.id = res.data.id
                    let p = {
                        orderId: res.data.id
                    }
                    // localStorage.setItem('point', this.value)
                    this.show1 = false;
                    getNewWxPay(p).then(res => {
                        this.wechatPay(res.data)
                        //     // this.wechatPay(res.data.data)
                    })
                }).catch(() => {
                    this.show1 = false;
                })
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
                        localStorage.removeItem('point')
                        setTimeout(() => {
                            self.$router.replace(`/payResult?type=coin&buyStatus=pass&id=${self.id}`)
                        }, 1000)
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
                            self.$router.replace(`/payResult?type=coin&buyStatus=fail&id=${self.id}`)
                        }, 1000)
                    }
                });
            },
        },
        created() {
            this.setTitle('积分充值')
            this.wechatConfig();
            // let point = localStorage.getItem('point')
            // if(point){
            //     this.value = point-0;
            //     this.$refs.buyp.click();
            // }
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {},
        computed: {},
    }
</script>

<style lang="less">
    .buyPoints {
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
