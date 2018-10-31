<template>
    <div class="myTeacherInfo">
        <view-box ref="viewBox">
            <!-- <group title=" " label-width="4.5em" label-margin-right="2em" v-if="step1==2"> -->
            <teacherInfo :images='images' @getImages="getImages" @removeImg="removeImg" rlink="myTeacherInfo"></teacherInfo>
            <!-- </group> -->
            <div class="footerBtn">
                <x-button action-type="button" @click.native="cancelEdit">取消修改</x-button>
                <x-button type="primary" action-type="button" :disabled="valid" :show-loading='isLoading' @click.native="confireName">
                    {{isLoading?'提交中':'保存并提交审核'}}</x-button>
            </div>
        </view-box>
    </div>
</template>

<script>
    import {
        XButton,
        ViewBox
    } from 'vux'
    import teacherInfo from './teacherInfo'
    import {
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
            XButton,
            teacherInfo,
            ViewBox
        },
        data() {
            return {
                images: [],
                cerIdArr: [],
                isLoading: false,
            }
        },
        created() {
            this.setTitle('我的资料');
            localStorage.removeItem('backTwo')
            if (this.getTeacherInfo.cerIds) {
                this.cerIdArr = this.getTeacherInfo.cerIds.split(',')
                this.images = this.cerIdArr.map(item => {
                    return {
                        src: `${this.apiUrl}/attach/img/${item}/SQUARE`
                    }
                })
            }
        },
        methods: {
            cancelEdit() {
                this.$router.push('/teacherPersonal')
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
            ...mapActions([
                'setTeacherInfo'
            ]),
            confireName() {
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
                            this.$vux.toast.show({
                                text: '提交成功'
                            })
                            console.log(this.getTeacherInfo)
                            localStorage.setItem('teacherInfo', JSON.stringify(this.getTeacherInfo))
                        }
                    });
                }
            },
        },
        computed: {
            ...mapGetters([
                'getTeacherInfo'
                // ...
            ]),
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
    }
</script>
<style lang="less">
    .myTeacherInfo {
        height: 100%;
        .weui-cells__title {
            margin-top: 0;
            padding-top: .2rem;
            padding-bottom: .1rem;
            font-size: .4rem;
        }
        .weui-btn_default {
            border: 1px solid gainsboro;
        }
        .weui-btn:after {
            border: none;
        }
        .weui-btn_disabled.weui-btn_primary {
            background-color: #e1e1e1;
            color: black;
        }
        .weui-btn_primary,
        .weui-btn_loading.weui-btn_primary,
        .weui-btn_primary:not(.weui-btn_disabled):active {
            background-color: #00a6e7;
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
