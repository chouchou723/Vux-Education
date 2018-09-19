<template>
    <div class="teacherPublishTime">
        <view-box ref="viewBox">
            <group label-margin-right="2em" v-if="classTitle">
                <cell class="classTitle">
                    <div slot="title">{{classTitle}}</div>
                </cell>
                <cell>
                    <div slot="title">
                        <div style="font-size:14px;color:grey">
                            场馆:世博园
                        </div>
                        <div style="font-size:14px;color:grey;margin-top:5px;">
                            地址:博城路上南路世博园2区行动力空间
                        </div>
                    </div>
                </cell>
            </group>
            <group style="margin-top:1em">
                <cell v-for="(item,index) in classList" :key="'c'+index" is-link link="/teacherChangeClassTime">
                    <div slot="title" style="font-size:15px">
                        <div v-if="item.room">第{{index+1}}节课: {{item.room}}, {{item.date}}, {{item.time}}
                        </div>
                        <div v-else style="color:#f72121">
                            第{{index+1}}节课: 请选择教室, 日期和时间段
                        </div>
                    </div>
                </cell>
            </group>
            <div class="footerBtn">
                <x-button type="primary" action-type="button" @click.native="saveInfo" :disabled="isloading">确定并发布</x-button>
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
                classList: [{
                        room: 'A教室',
                        date: '2018/07/02',
                        time: '上午9:30-11:30'
                    }, {
                        room: '',
                        date: '2018/07/02',
                        time: '上午9:30-11:30'
                    },
                    {
                        room: 'A教室',
                        date: '2018/12/22',
                        time: '上午9:30-11:30'
                    }, {
                        room: 'A教室',
                        date: '2018/07/02',
                        time: '上午9:30-11:30'
                    }, {
                        room: 'A教室',
                        date: '2018/07/02',
                        time: '上午9:30-11:30'
                    }
                ],
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
                    path: '/teacherClass'
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
            this.classTitle = this.$route.query.title || '创意课程'
            console.log(this.getMyInfo)
            // this.value2 = this.getMyInfo.sex
        },
        mounted() {}
    }
</script>
<style lang="less">
    .teacherPublishTime {
        height: 100%;
        .vux-no-group-title {
            margin-top: 0;
        }
        .weui-uploader__input-box {
            border: 1px dashed #D9D9D9;
        }
        .plusIcon .vux-flexbox-item .vux-upload-bg .weui-uploader__input-box::before {
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            background: url('../assets/upload.png') no-repeat center/cover;
        }
        .plusIcon .weui-uploader__input-box {
            border: none;
        }
        .plusIcon .weui-uploader__input-box:after {
            width: 0;
            height: 0;
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
