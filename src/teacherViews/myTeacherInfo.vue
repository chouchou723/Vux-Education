<template>
    <div class="applyFirst">
        <view-box ref="viewBox">
            <group title=" " label-width="4.5em" label-margin-right="2em" v-if="step1==1">
                <x-input placeholder="请输入手机号" type='tel' v-model="value" :max="11">
                    <img slot="label" style="padding-right:10px;display:block;" src="../assets/inputCell.png" width="20" height="20">
                </x-input>
                <x-input placeholder="请输入短信验证码" class="weui-vcode">
                    <img slot="label" style="padding-right:10px;display:block;" src="../assets/inputCell.png" width="20" height="20">
                    <x-button slot="right" type="primary" :class="['getCode',count?'colorg':'']" @click.native="getCode">{{getCodeContent}}</x-button>
                </x-input>
            </group>
            <!-- <group title=" " label-width="4.5em" label-margin-right="2em" v-if="step1==2"> -->
            <teacherInfo v-if="step1==2"></teacherInfo>
            <!-- </group> -->
            <div class="footerBtn">
                <x-button type="primary" action-type="button" disabled @click.native="confireName">取消修改</x-button>
                <x-button type="primary" action-type="button" @click.native="confireName">保存并提交审核</x-button>
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
                applyStaus: 'fail',
                countTime: 10,
                step1: 2,
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
        .weui-btn_primary {
            background-color: #00a6e7;
        }
        .weui-vcode {
            .weui-cell__ft {
                display: flex;
                align-items: center;
            }
        }
        .footerBtn {
            width: 92%;
            margin: 1rem auto 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            button {
                width: 44%;
                height: 1.3rem;
                font-size: 16px;
                margin-top: 0;
            }
        }
    }
</style>
