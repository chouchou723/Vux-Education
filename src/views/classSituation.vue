<template>
    <div class="classSituation">
        <view-box ref="viewBox">
            <div class="coinBgS">
                <div class="coinContent">创意绘画课程</div>
                <div class="coinTitle">24节课,共48课时</div>
            </div>
            <group title=" " label-width="4.5em">
                <cell v-for="(item,index) in lessonL" :key="index" :title="`第${item}节课`" is-link style="font-size:16px" link="/classSituationDetail">
                </cell>
            </group>
        </view-box>
    </div>
</template>

<script>
    import {
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
                buyStatus: false,
                type: 'coin', //coin
                lessonL: 50
            }
        },
        methods: {
            goTo() {
                console.log(1);
                if (this.buyStatus) {
                    this.$router.push('/myLesson')
                } else {
                    this.$router.push('/paying')
                }
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
    .classSituation {
        height: 100%;
        .coinBgS {
            width: 100%;
            height: 1.6rem;
            background-color: #fff;
            padding: 0.1rem .7rem 0;
            position: relative;
            box-sizing: border-box;
        }
        .coinBgS::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: .15rem;
            height: 100%;
            background-color: #04be02;
        }
        .coinTitle {
            font-size: 13px;
            color: #999999;
        }
        .coinContent {
            font-size: 16px;
            margin-bottom: .1rem;
        }
    }
</style>
