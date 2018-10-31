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
                        {{applyStaus=='' ? '等待审核':applyStaus=='fail'?'审核未过':'审核通过'}}
                    </div>
                </div>
            </div>
            <group title=" " label-width="4.5em" label-margin-right="2em" v-if="step1==1">
                <x-input placeholder="请输入手机号" type='tel' v-model="value" :max="11">
                    <img slot="label" style="padding-right:10px;display:block;" src="../assets/inputCell.png" width="20" height="20">
                </x-input>
                <x-input placeholder="请输入短信验证码" class="weui-vcode" v-model="value1" :max="4">
                    <img slot="label" style="padding-right:10px;display:block;" src="../assets/key.png" width="20" height="20">
                    <x-button slot="right" type="primary" :class="['getCode',count?'colorg':'']" @click.native="getCode">{{getCodeContent}}</x-button>
                </x-input>
            </group>
            <!-- <group title=" " label-width="4.5em" label-margin-right="2em" v-if="step1==2"> -->
            <teacherInfo v-if="step1==2" :images='images' @getImages="getImages" @removeImg="removeImg"></teacherInfo>
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
                    <div class="notiTwo">原因:{{rejectReason}}</div>
                </div>
                <div class="plzCall">
                    如有问题,请咨询电话<a class="linkA" href="tel:400172074">400-1720-748</a>
                </div>
            </group>
            <div class="footerBtn">
                <x-button type="primary" action-type="button" @click.native="nextStep" :disabled="!(value.length===11&&value1.length===4)" v-if="step1===1">
                    下一步</x-button>
                <x-button type="primary" action-type="button" @click.native="submitInfo" :disabled="valid" :show-loading='isLoading' v-if="step1===2">
                    提交审核</x-button>
                <x-button type="primary" action-type="button" @click.native="closePage" v-if="step1===3">
                    我知道了</x-button>
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
        getSmsCode,
        submitSmsCode,
        editTeacherInfo,
        editTeacherEdu,
        editTeacherExp
    } from '../api/api'
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
                canClick: false,
                isLoading: false,
                applyStaus: '',
                countTime: 60,
                step1: 1,
                value: '',
                value1: '',
                count: false,
                rejectReason: '',
                images: [],
                nickname: function(value) {
                    return {
                        valid: (/^[\u4e00-\u9fa5a-zA-Z0-9]+$/).test(value),
                        msg: '不能输入符号'
                    }
                },
                type: '',
                countStart: {},
                cerIdArr: []
            }
        },
        created() {
            this.setTitle('申请成为老师')
            let status = JSON.parse(localStorage.getItem('teacherInfo')).status;
            if (status.name === 'PRE') {
                this.step1 = this.getStep || 1;
            } else if (status.name === 'WAIT') {
                this.step1 = 3;
                this.applyStaus = ''
            } else if (status.name === 'REJECT') {
                this.step1 = 3;
                this.applyStaus = 'fail'
                this.rejectReason = JSON.parse(localStorage.getItem('teacherInfo')).rejectReason
            } else if (status.name === 'PASS') {
                this.step1 = 3;
                this.applyStaus = 'pass'
            }
            if (this.getTeacherInfo.cerIds) {
                this.cerIdArr = this.getTeacherInfo.cerIds.split(',')
                this.images = this.cerIdArr.map(item => {
                    return {
                        src: `${this.apiUrl}/attach/img/${item}/SQUARE`
                    }
                })
            }
        },
        mounted() {
            history.pushState(null, null, location.href);
            window.addEventListener("popstate", () => {
                if (this.$route.path == '/applyFirst') {
                    history.go(1) //this.$router.push('/applyFirst')
                    // if (this.step1 == 2) {
                    //     clearInterval(this.countStart)
                    //     this.countTime = 60;
                    //     this.count = false;
                    //     this.value = '';
                    //     this.value1 = '';
                    //     this.step1 = 1;
                    //     this.setStep(this.step1)
                    // }
                }
            }, false);
        },
        methods: {
            closePage() {
                if (this.applyStaus === 'pass') {
                    this.$router.replace('/teacher')
                } else {
                    this.$wechat.closeWindow();
                }
            },
            removeImg(index) {
                this.cerIdArr.splice(index, 1)
                this.images.splice(index, 1)
                this.setTeacherInfo({
                    cerIds: this.cerIdArr.join(',')
                })
            },
            getImages(data) {
                this.cerIdArr.push(data)
                this.images.push({
                    src: `${this.apiUrl}/attach/img/${data}/SQUARE`
                })
                // console.log(data)
                this.setTeacherInfo({
                    cerIds: this.cerIdArr.join(',')
                })
                // console.log(data)
            },
            nextStep() {
                if (!this.canClick) {
                    let para = {
                        captcha: this.value1,
                        mobile: this.value
                    }
                    this.canClick = true;
                    submitSmsCode(para).then(res => {
                        let data = res.data;
                        this.canClick = false;
                        if (data.status.name === 'PRE') {
                            this.step1 = 2;
                            this.setStep(this.step1);
                        } else if (data.status.name === 'PASS') {
                            // console.log(1)
                            this.$vux.toast.show({
                                text: '恭喜,您已是老师',
                                width: 'auto',
                                type: 'text',
                                position: 'middle'
                            })
                            this.getTeacher(data, data.status.name);
                        } else if (data.status.name === 'REJECT' || data.status.name === 'WAIT') {
                            // console.log(1)
                            this.$vux.toast.show({
                                text: '您已提交过申请',
                                width: 'auto',
                                type: 'text',
                                position: 'middle'
                            })
                            this.getTeacher(data, data.status.name);
                        }
                    }).catch(() => {
                        this.canClick = false
                    })
                }
            },
            getTeacher(data, type) {
                // console.log(data)
                let inf = {
                    id: data.id,
                    img: data.picId ? data.picId : '',
                    experience: data.experience ? data.experience : {
                        label: '',
                        name: ''
                    },
                    skill: data.skill ? data.skill.split(',') : [],
                    realName: data.realName ? data.realName : '',
                    gender: data.gender ? data.gender.name : '',
                    // birthday: data.birthday ? data.birthday : '',
                    // address: data.address ? data.address : '',
                    // mobilePhone: data.mobilePhone ? data.mobilePhone : '',
                    description: data.description ? data.description : '',
                    edus: data.edus ? data.edus : [],
                    exps: data.exps ? data.exps : [],
                    cerIds: data.cerIds ? data.cerIds : '',
                    status: data.status,
                    rejectReason: data.rejectReason ? data.rejectReason : '资料审核未通过'
                }
                localStorage.setItem('teacherInfo', JSON.stringify(inf))
                this.setTeacherInfo('changeTeacherInfo', { ...inf
                })
                if (type === 'PASS') {
                    setTimeout(() => {
                        this.$router.replace('/teacher')
                    }, 500)
                } else if (type === 'REJECT') {
                    this.step1 = 3;
                    this.applyStaus = 'fail'
                    this.rejectReason = inf.rejectReason
                } else if (type === 'WAIT') {
                    this.step1 = 3;
                    this.applyStaus = ''
                }
            },
            submitInfo() {
                if (!this.isLoading) {
                    this.isLoading = true;
                    let para = {
                        realName: this.getTeacherInfo.realName,
                        skill: this.getTeacherInfo.skill.join(','),
                        experience: this.getTeacherInfo.experience.name,
                        cerIds: this.getTeacherInfo.cerIds,
                        description: this.getTeacherInfo.description,
                        gender: this.getTeacherInfo.gender,
                        id: this.getTeacherInfo.id,
                        picId: this.getTeacherInfo.img,
                    };
                    let edus = this.getTeacherInfo.edus
                    let edu = edus.map(item => {
                        return {
                            id: item.id ? item.id : '',
                            school: item.school,
                            subject: item.subject,
                            beginDate: item.beginDateStr,
                            endDate: item.endDateStr,
                            degree: item.degree.name,
                        }
                    })
                    let exps = this.getTeacherInfo.exps
                    let exp = exps.map(item => {
                        return {
                            id: item.id ? item.id : '',
                            beginDate: item.beginDateStr,
                            endDate: item.endDateStr,
                            description: item.description,
                        }
                    })
                    Promise.all([editTeacherInfo(para), editTeacherEdu(edu), editTeacherExp(exp)]).then((values) => {
                        let isSuccess = values.every(item => {
                            return item.code == 0
                        })
                        if (isSuccess) {
                            this.isLoading = false;
                            // localStorage.removeItem('backTwo')
                            this.$vux.toast.show({
                                text: '提交成功'
                            })
                            // console.log(this.getTeacherInfo)
                            localStorage.setItem('teacherInfo', JSON.stringify(this.getTeacherInfo))
                            this.step1 = 3;
                            this.setStep(this.step1)
                        }
                    });
                }
            },
            getCode() {
                if (this.countTime === 60) {
                    if (this.value.length === 11) {
                        let para = {
                            mobile: this.value
                        }
                        getSmsCode(para).then(res => {
                            // console.log(res)
                        }).then(() => {
                            this.count = true;
                            this.countStart = setInterval(() => {
                                if (this.countTime == 1) {
                                    clearInterval(this.countStart)
                                    this.countTime = 60;
                                    this.count = false;
                                } else {
                                    this.countTime--
                                }
                            }, 1000)
                        })
                    } else if (this.value.length < 11) {
                        this.$vux.toast.show({
                            text: '请填写正确的手机号',
                            type: 'text',
                            width: 'auto'
                        })
                    } else {
                        this.$vux.toast.show({
                            text: '请先填写手机号',
                            type: 'text',
                            width: 'auto'
                        })
                    }
                }
            },
            ...mapActions([
                'setStep', 'setTeacherInfo'
            ]),
        },
        computed: {
            ...mapGetters([
                'getStep', 'getTeacherInfo'
                // ...
            ]),
            getCodeContent() {
                if (this.count) {
                    return `重新获取(${this.countTime}s)`
                } else {
                    return '获取验证码'
                }
            },
            valid() {
                let arr = Object.values(this.getTeacherInfo);
                // console.log(arr)  
                if (arr.every(item => {
                        return item != ''
                    })) {
                    return false
                } else {
                    return true
                }
            }
        },
        watch: {
            step1(newV, oldV) {
                if (newV == 2) {
                    console.log(1)
                    localStorage.setItem('backTwo', 'true')
                }else{
                    console.log(2)
                    localStorage.removeItem('backTwo')
                }
            }
        }
    }
</script>
<style lang="less">
    .applyFirst {
        height: 100%;
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
            width: 2.5rem;
            height: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            img {
                width: 70%;
            }
            div {
                font-size: 15px;
                padding-top: .3rem;
            }
            &::after {
                content: '';
                position: absolute;
                width: .7rem;
                top: 27%;
                right: -.4rem;
                border-bottom: .07rem solid #00a6e7
            }
        }
        .stepTwo {
            width: 2.5rem;
            height: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            img {
                width: 70%;
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
                left: -.3rem;
                border-bottom: .07rem solid gainsboro;
            }
            &::after {
                content: '';
                position: absolute;
                width: .7rem;
                top: 27%;
                right: -.4rem;
                border-bottom: .07rem solid gainsboro;
            }
        }
        .stepTwoAct {
            &::before {
                content: '';
                position: absolute;
                width: .6rem;
                top: 27%;
                left: -.3rem;
                border-bottom: .07rem solid #00a6e7;
            }
            &::after {
                content: '';
                position: absolute;
                width: .7rem;
                top: 27%;
                right: -.4rem;
                border-bottom: .07rem solid #00a6e7;
            }
        }
        .stepThree {
            width: 2.5rem;
            height: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            img {
                width: 70%;
            }
            div {
                padding-top: .3rem;
                font-size: 15px;
            }
            &::before {
                content: '';
                position: absolute;
                width: .5rem;
                top: 27%;
                left: -.2rem;
                border-bottom: .07rem solid gainsboro;
            }
        }
        .stepThreeAct {
            &::before {
                content: '';
                position: absolute;
                width: .5rem;
                top: 27%;
                left: -.2rem;
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
        .getCode.weui-btn_primary:not(.weui-btn_disabled):active {
            border: none;
            border-left: 1px solid gainsboro;
            background: transparent;
        }
        .colorg {
            color: #afa8a8;
        }
        .getCode.weui-btn:after {
            border: none;
        }
        .footerBtn .weui-btn_disabled.weui-btn_primary {
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
            .weui-btn_primary,
            .weui-btn_primary:not(.weui-btn_disabled):active {
                background-color: #00a6e7;
            }
        }
    }
</style>
