<template>
    <div class="teacherPublishHome">
        <view-box ref="viewBox">
            <group title="选择课程名称" label-width="4.5em" label-margin-right="2em">
                <div class="publishDiv">
                    <div class="publishIcon" @click="goToChoose(1)">
                        <img src="../assets/publishNew.png" alt="">
                        <div class="publishText">创建新的课程内容</div>
                    </div>
                    <div class="publishIcon" @click="goToChoose(2)">
                        <img src="../assets/publishChoose.png" alt="">
                        <div class="publishText">选择已有课程内容</div>
                    </div>
                </div>
            </group>
            <group title="课程名称" label-margin-right="2em" v-if="classTitle">
                <cell class="classTitle">
                    <div slot="title">{{classTitle}}</div>
                </cell>
            </group>
            <group title="补充课程内容" label-margin-right="2em">
                <popup-picker title="上课场馆" show-name :data="list2" v-model="value1" @on-show="onShow" @on-hide="onHide" @on-change="onChange" :columns="1"></popup-picker>
                <popup-picker title="上课时间段" show-name :data="list3" v-model="value2" @on-show="onShow" @on-hide="onHide" @on-change="onChange" :columns="1"></popup-picker>
                <datetime v-model="value3" @on-change="change" title="上课起始日期" @on-cancel="log('cancel')" @on-confirm="onConfirm"></datetime>
                <datetime v-model="value4" @on-change="change" title="上课结束日期" @on-cancel="log('cancel')" @on-confirm="onConfirm"></datetime>
                <popup-picker title="上课教室" show-name :data="list4" v-model="value5" @on-show="onShow" @on-hide="onHide" @on-change="onChange" :columns="1"></popup-picker>
                <popup-picker title="每个几天上一次课" show-name :data="list5" v-model="value6" @on-show="onShow" @on-hide="onHide" @on-change="onChange" :columns="1"></popup-picker>
            </group>
            <div class="footerBtn">
                <x-button type="primary" action-type="button" @click.native="saveInfo" :disabled="isloading">下一步</x-button>
            </div>
        </view-box>
    </div>
</template>

<script>
    import {
        XButton,
        Group,
        Cell,
        Selector,
        ViewBox,
        XInput,
        Tab,
        PopupPicker,
        TabItem,
        Datetime
    } from 'vux'
    import SimpleCropper from '@/components/SimpleCrop'
    import VuxUpload from '../components/Upload'
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    export default {
        components: {
            Group,
            XButton,
            Cell,
            Selector,
            SimpleCropper,
            ViewBox,
            VuxUpload,
            XInput,
            Tab,
            TabItem,
            PopupPicker,
            Datetime
        },
        data() {
            return {
                list1: [{
                    name: '0.5小时',
                    value: '1',
                }, {
                    name: '1小时',
                    value: '2',
                }, {
                    name: '1.5小时',
                    value: '3',
                }, ],
                list2: [{
                    name: '中华艺术宫',
                    value: '1'
                }, {
                    name: '新天地',
                    value: '2',
                }, {
                    name: '万象城',
                    value: '3',
                }, ],
                list3: [{
                    name: '上午10:00 - 12:00',
                    value: '1'
                }, {
                    name: '下午14:00 - 16:00',
                    value: '2',
                }, {
                    name: '下午16:30 - 18:30',
                    value: '3',
                }, ],
                list4: [{
                    name: 'A教室',
                    value: '1'
                }, {
                    name: 'B教室',
                    value: '2',
                }, {
                    name: 'C教室',
                    value: '3',
                }, ],
                list5: [{
                    name: '1天',
                    value: '1'
                }, {
                    name: '2天',
                    value: '2',
                }, {
                    name: '3天',
                    value: '3',
                }, ],
                // optionsL: [{
                //     idValue: 1,
                //     idLabel: '0.5小时'
                // }, {
                //     idValue: 2,
                //     idLabel: '1小时'
                // }, {
                //     idValue: 3,
                //     idLabel: '1.5小时'
                // }],
                images: [{
                    src: require('../assets/0e3a716cf47f1eb695e5b62597dec807.jpg')
                }, ],
                studentList: [{
                        name: '张三',
                        sign: '',
                        comm: '请点评',
                        pic: '请上传'
                    }, {
                        name: '张三',
                        sign: '',
                        comm: '请点评',
                        pic: '请上传'
                    },
                    {
                        name: '张三',
                        sign: '',
                        comm: '请点评',
                        pic: '请上传'
                    }, {
                        name: '张三',
                        sign: '',
                        comm: '请点评',
                        pic: '请上传'
                    }
                ],
                Asrc: '',
                value: [],
                value1: [],
                value2: [],
                value3: '',
                value4: '',
                value5: [],
                value6: [],
                classTitle: '',
                isloading: false,
                uploadParam: {
                    fileType: 'recruit', // 其他上传参数 
                    uploadURL: this.$dataURL + 'uploadAction/qcloudImg', // 上传地址 
                    scale: 4 // 相对手机屏幕放大的倍数: 4倍 
                },
                userImg: require('../assets/0e3a716cf47f1eb695e5b62597dec807.jpg'),
            }
        },
        methods: {
            goToChoose(num) {
                if (num == 1) {
                    this.$router.push('/teacherPublishLesson')
                } else {
                    this.$router.push('/teacherChooseLesson')
                }
            },
            ...mapActions([
                'setMyInfo'
            ]),
            openFile() {
                this.$refs.file.click();
            },
            fileChange() {
                var reads = new FileReader();
                let f = this.$refs.file.files[0];
                reads.readAsDataURL(f);
                reads.onload = (e) => {
                    this.setMyInfo({
                        img: e.target.result
                    })
                    // this.Asrc=e.target.result;
                    // console.log(e.target.result)
                };
            },
            onChange() {
                this.setMyInfo({
                    sex: this.value2
                })
            },
            saveInfo() {
                // this.isloading = true;
                // console.log(this.getMyInfo)
                // this.$vux.toast.show({
                //     text: '保存成功'
                // })
                // localStorage.setItem('info', JSON.stringify(this.getMyInfo))
                // setTimeout(() => {
                //     this.isloading = false;
                // }, 1000)
                this.$router.push({
                    path: '/teacherPublishTime'
                })
            },
            upload() {
                this.$refs['cropper'].upload()
            },
            // 上传头像成功回调 
            uploadHandle(data) {
                this.setMyInfo({
                    img: data
                })
                if (data.state === 'SUCCESS') {
                    // this.userImg  = data
                }
            }
        },
        computed: {
            ...mapGetters([
                'getMyInfo'
                // ...
            ]),
        },
        created() {
            document.title = "创建新的课程内容"
            this.classTitle = this.$route.query.title || ''
            console.log(this.getMyInfo)
            // this.value2 = this.getMyInfo.sex
        },
        mounted() {}
    }
</script>
<style lang="less">
    .teacherPublishHome {
        height: 100%;
        .weui-uploader__input-box {
            border: 1px dashed #D9D9D9;
        }
        .weui-btn_disabled.weui-btn_primary {
            background-color: #e1e1e1;
            color: black;
        }
        .weui-btn_primary {
            background-color: #00a6e7;
        }
        .weui-cells__title {
            margin-top: 0;
            padding-top: .2rem;
            padding-bottom: .1rem;
            font-size: .4rem;
        }
        .vux-tab-wrap {
            padding-top: 65px;
            .vux-tab-container,
            .vux-tab {
                height: 65px;
            }
            .vux-tab-item {
                line-height: 22px
            }
        }
        #noborderBottom .vux-cell-box:before {
            border-top: none;
        }
        .classTitle {
            border-left: 5px solid #00a6e7;
            padding-left: 10px;
        }
        .myAvatar {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            margin-right: 10px;
        }
        .vux-upload .vux-flexbox-item .vux-upload-bg .vux-upload-content {
            background-position: center;
        }
        .vux-upload .vux-flexbox-item .vux-upload-bg {
            width: 82%;
            margin: 4% 0 0 9%;
        }
        .mr10 {
            margin-right: 10px;
            font-size: 15px;
        }
        .publishDiv {
            width: 100%;
            height: 4rem;
            background: white;
            display: flex;
            box-sizing: border-box;
            padding: .7rem 0;
            .publishIcon:first-child {
                border-right: 1px solid gainsboro;
            }
            .publishIcon {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                img {
                    width: 1.5rem;
                }
                .publishText {
                    font-size: .4rem;
                    color: #00a6e7;
                    margin-top: .3rem;
                }
            }
        }
        .classType {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-top: 10px;
        }
        .weui-select {
            color: #999999
        }
        .footerBtn {
            width: 90%;
            margin: 1rem auto 0;
            text-align: center;
        }
    }
</style>
