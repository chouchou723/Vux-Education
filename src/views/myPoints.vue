<template>
    <div class="myPoints">
        <view-box ref="viewBox">
            <group title="总余额">
                <cell>
                    <div slot="title" class="payTitle">
                        <div style="margin-bottom:.1rem">积分:<span style="color:#fb6804;margin-left:.2rem">{{total}}</span></div>
                        <div style="color:#999999;font-size:.3rem;">积分充值规则: 1元=10积分</div>
                    </div>
                    <x-button mini type="primary" @click.native="gotoBuyP">充值</x-button>
                </cell>
            </group>
            <group title="积分明细" v-if="pointDetail.length!==0">
                <cell v-for="(item,index) in pointDetail" :key="index">
                    <div class="coinBg" slot="title">
                        <div class="coinTitle">
                            <div>{{item.changeTime}}</div>
                            <div :style="item.type.name==='ADD'?'color:#04be02':'color:#f76260'">{{item.type.name==='ADD'?'+'+item.changeNum:'-'+item.changeNum}}积分</div>
                        </div>
                        <div class="coinContent">
                            <div style="flex:0 0 60%">{{item.content}}
                            </div>
                            <div style="color:#999999;text-align:right">剩余{{item.remainNum}}分
                            </div>
                        </div>
                    </div>
                </cell>
            </group>
             <div v-if="pointDetail.length===0" style="width:100%;height:80%;display:flex;justify-content:center;align-items:center;color:#999999;font-size:0.4rem;">
                    暂无积分明细
                </div>
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
        getMyPoint
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
                total:0,
                pointDetail: [
                ],
            }
        },
        methods: {
            gotoBuyP() {
                this.$router.push('/buyPoints')
            },
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
            },
            fetchData(){
                let para = {

                }
                getMyPoint(para).then(res=>{
                    this.total = res.data.total;
                    this.pointDetail = res.data.detail
                    console.log(res)
                })
            }
        },
        created() {
            this.setTitle('我的积分')
            this.fetchData()
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {},
        computed: {},
    }
</script>

<style lang="less">
    .myPoints {
        height: 100%;
        .weui-cells__title {
            margin-top: 0;
            padding-top: .2rem;
            padding-bottom: .2rem;
            font-size: .4rem;
        }
        .weui-cell_access.vux-cell-box:after {
            display: none;
        }
        .coinBg {
            width: 100%; // height: 2rem;
            padding: 0 .2rem;
            position: relative;
            box-sizing: border-box;
        }
        .coinTitle {
            font-size: 13px;
            color: #999999;
            display: flex;
            justify-content: space-between;
            margin-bottom: .2rem;
            width: 100%;
        }
        .coinContent {
            width: 100%;
            font-size: 16px;
            display: flex;
            justify-content: space-between;
        }
    }
</style>
