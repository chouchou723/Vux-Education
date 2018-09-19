<template>
    <div class="applyFirst">
        <view-box ref="viewBox">
            <div class="stepTitle">
                <div class="stepOne">
                    <img src="../assets/bindCell.png" alt="">
                    <div :style="step1>=1?'color:#00a6e7':'color:grey'">绑定手机号</div>
                </div>
                <div :class="['stepTwo',step1>=2?'stepTwoAct':'']">
                    <img src="../assets/submitB.png" alt="" v-if="step1>=2">
                    <img src="../assets/submitG.png" alt="" v-else>
                    <div :style="step1>=2?'color:#00a6e7':'color:grey'">提交资料</div>
                </div>
                <div :class="['stepThree',step1>=3?'stepThreeAct':'']">
                    <img src="../assets/waitB.png" alt="" v-if="step1>=3&applyStaus==''">
                    <img src="../assets/pass.png" alt="" v-if="step1>=3&applyStaus=='pass'">
                    <img src="../assets/fail.png" alt="" v-if="step1>=3&applyStaus=='fail'">
                    <img src="../assets/waitG.png" alt="" v-if="step1<3">
                    <div :style="step1<3?'color:grey':applyStaus=='fail'?'color:#e64340':'color:#00a6e7'">
                        {{step1 ==3&&applyStaus=='' ? '等待审核':applyStaus=='fail'?'审核未过':'审核通过'}}
                    </div>
                </div>
            </div>
            <group title=" " label-width="4.5em" label-margin-right="2em" v-if="step1==1">
                <x-input placeholder="请输入手机号" type='tel' v-model="value" :max="11">
                    <img slot="label" style="padding-right:10px;display:block;" src="../assets/inputCell.png" width="20" height="20">
                </x-input>
                <x-input placeholder="请输入短信验证码" class="weui-vcode">
                    <img slot="label" style="padding-right:10px;display:block;" src="../assets/key.png" width="20" height="20">
                    <x-button slot="right" type="primary" :class="['getCode',count?'colorg':'']" @click.native="getCode">{{getCodeContent}}</x-button>
                </x-input>
            </group>
            <!-- <group title=" " label-width="4.5em" label-margin-right="2em" v-if="step1==2"> -->
            <teacherInfo v-if="step1==2"></teacherInfo>
            <!-- </group> -->
            <group title=" " label-width="4.5em" label-margin-right="2em" v-if="step1==3">
                <div class="stepThreeNoti" v-if="applyStaus==''">
                    <div class="notiOne">资料已提交,请等待审核</div>
                    <div class="notiTwo">审核结果我们将会尽快通知您</div>
                    <div class="notiTwo">收到审核结果后再进行后续操作</div>
                </div>
                <div class="stepThreeNoti" v-if="applyStaus=='pass'">
                    <div class="notiOne">资料审核已通过</div>
                    <div class="notiTwo">恭喜您成为我们的老师</div>
                </div>
                <div class="stepThreeNoti" v-if="applyStaus=='fail'">
                    <div class="notiOne">资料审核未通过</div>
                    <div class="notiTwo">原因:XXXXXXXXXX</div>
                </div>
                <div class="plzCall">
                    如有问题,请咨询电话<a class="linkA" href="tel:400172074">400-1720-748</a>
                </div>
            </group>
            <div class="footerBtn">
                <x-button type="primary" action-type="button" @click.native="confireName" v-if="step1<3">下一步</x-button>
                <x-button type="primary" action-type="button" @click.native="confireName" v-else>我知道了</x-button>
            </div>
        </view-box>
    </div>
</template>

<script>
    import {
        Step,
        StepItem,
        XButton,
        Group,
        XInput,
        ViewBox
    } from 'vux'
    import teacherInfo from './teacherInfo'
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    export default {
        components: {
            Group,
            XButton,
            XInput,
            Step,
            StepItem,
            teacherInfo,
            ViewBox
        },
        data() {
            return {
                applyStaus: 'pass',
                countTime: 10,
                step1: 3,
                value: '',
                count: false,
                nickname: function(value) {
                    return {
                        valid: (/^[\u4e00-\u9fa5a-zA-Z0-9]+$/).test(value),
                        msg: '不能输入符号'
                    }
                },
                type: '',
                countStart: {},
            }
        },
        created() {
            document.title = '姓名'
        },
        methods: {
            getCode() {
                this.count = true;
                if (this.countTime == 10) {
                    this.countStart = setInterval(() => {
                        if (this.countTime == 1) {
                            clearInterval(this.countStart)
                            this.countTime = 10;
                            this.count = false;
                        } else {
                            this.countTime--
                        }
                    }, 1000)
                }
            },
            ...mapActions([
                'setMyInfo'
            ]),
            confireName() {
                if (this.type) {
                    this.setMyInfo({
                        nickname: this.value
                    })
                } else {
                    this.setMyInfo({
                        name: this.value
                    })
                }
                this.$router.push('/myInfo')
            },
        },
        computed: {
            ...mapGetters([
                'getMyInfo'
                // ...
            ]),
            getCodeContent() {
                if (this.count) {
                    return `重新获取(${this.countTime}s)`
                } else {
                    return '获取验证码'
                }
            }
        },
    }
</script>
<style lang="less">
    .applyFirst {
        height: 100%;
         ::-webkit-input-placeholder {
            color: #dbdbdb;
        }
        .weui-cells__title {
            margin-top: 0;
            padding-top: .2rem;
            padding-bottom: .1rem;
            font-size: .4rem;
        }
        .stepTitle {
            width: 100%;
            height: 4rem;
            background: white;
            padding: .8rem;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between
        }
        .stepOne {
            width: 2rem;
            height: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            img {
                width: 90%;
            }
            div {
                font-size: 15px;
                padding-top: .3rem;
            }
            &::after {
                content: '';
                position: absolute;
                width: .6rem;
                top: 27%;
                right: -.6rem;
                border-bottom: .07rem solid #00a6e7
            }
        }
        .stepTwo {
            width: 2rem;
            height: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            img {
                width: 90%;
            }
            div {
                padding-top: .3rem;
                font-size: 15px;
            }
            &::before {
                content: '';
                position: absolute;
                width: .6rem;
                top: 27%;
                left: -.6rem;
                border-bottom: .07rem solid gainsboro;
            }
            &::after {
                content: '';
                position: absolute;
                width: .6rem;
                top: 27%;
                right: -.6rem;
                border-bottom: .07rem solid gainsboro;
            }
        }
        .stepTwoAct {
            &::before {
                content: '';
                position: absolute;
                width: .6rem;
                top: 27%;
                left: -.6rem;
                border-bottom: .07rem solid #00a6e7;
            }
            &::after {
                content: '';
                position: absolute;
                width: .6rem;
                top: 27%;
                right: -.6rem;
                border-bottom: .07rem solid #00a6e7;
            }
        }
        .stepThree {
            width: 2rem;
            height: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            img {
                width: 90%;
            }
            div {
                padding-top: .3rem;
                font-size: 15px;
            }
            &::before {
                content: '';
                position: absolute;
                width: .6rem;
                top: 27%;
                left: -.6rem;
                border-bottom: .07rem solid gainsboro;
            }
        }
        .stepThreeAct {
            &::before {
                content: '';
                position: absolute;
                width: .6rem;
                top: 27%;
                left: -.6rem;
                border-bottom: .07rem solid #00a6e7;
            }
        }
        .getCode {
            font-size: 15px; // padding-left:30px;
            width: 125px;
            border: none;
            border-left: 1px solid gainsboro;
            border-radius: 0;
            background: transparent;
            color: #00a6e7;
        }
        .colorg {
            color: #afa8a8;
        }
        .weui-btn:after {
            border: none;
        }
        .weui-btn_disabled.weui-btn_primary {
            background-color: #e1e1e1;
            color: black;
        }
        .weui-vcode {
            .weui-cell__ft {
                display: flex;
                align-items: center;
            }
        }
        .stepThreeNoti {
            height: 4.2rem;
            width: 100%;
            box-sizing: border-box;
            background-color: #fff;
            border-bottom: 1px solid gainsboro;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .notiOne {
                font-size: 20px;
                font-weight: 600;
                margin-bottom: .3rem;
            }
            .notiTwo {
                color: #a09a9a;
                font-size: 15px;
            }
        }
        .plzCall {
            padding: 15px;
            color: #6f5f5f;
            font-size: 14px;
            text-align: center;
        }
        .linkA {
            text-decoration: underline;
            color: #6ecaef;
            margin-left: .2rem;
        }
        .footerBtn {
            width: 90%;
            margin: 1rem auto 0;
            text-align: center;
            .weui-btn_primary {
                background-color: #00a6e7;
            }
        }
    }
</style>
