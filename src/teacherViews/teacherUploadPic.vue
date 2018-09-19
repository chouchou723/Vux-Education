<template>
    <div class="teacherUploadPic">
        <view-box ref="viewBox">
            <group title="张明霞" label-width="4.5em" label-margin-right="2em">
                <vux-upload :class="images.length!=0?'':'plusIcon'" url="" :headers="headers" :data="data" :images="images" :readonly="false" :max="9" :withCredentials="false" :span="4" :preview="true" @success="onSuccess" @error="onError" @remove="onRemove">
                </vux-upload>
            </group>
            <div class="footerBtn">
                <x-button type="primary" action-type="button" @click.native="saveInfo" :show-loading="isloading" :disabled="isloading">确定</x-button>
            </div>
            <group title="已上传作品" label-width="4.5em" label-margin-right="2em" class="secondGroup">
                <vux-upload class="secondeUpload" key="second" url="" :headers="headers" :data="data" :images="images1" :readonly="true" :max="9" :withCredentials="false" :span="3" :preview="true" @success="onSuccess" @error="onError" @remove="onRemove">
                </vux-upload>
            </group>
        </view-box>
    </div>
</template>

<script>
    import {
        XButton,
        Group,
        Cell,
        Selector,
        ViewBox
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
            VuxUpload
        },
        data() {
            return {
                optionsL: [{
                    idValue: 1,
                    idLabel: '已到'
                }, {
                    idValue: 2,
                    idLabel: '未到'
                }],
                images: [{
                    src: require('../assets/0e3a716cf47f1eb695e5b62597dec807.jpg')
                }, ],
                images1: [{
                        src: require('../assets/0e3a716cf47f1eb695e5b62597dec807.jpg')
                    }, {
                        src: require('../assets/ff.png')
                    },
                    {
                        src: require('../assets/ff.png')
                    }, {
                        src: require('../assets/ff.png')
                    }, {
                        src: require('../assets/ff.png')
                    }
                ],
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
                value2: '',
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
                this.isloading = true;
                console.log(this.getMyInfo)
                this.$vux.toast.show({
                    text: '保存成功'
                })
                localStorage.setItem('info', JSON.stringify(this.getMyInfo))
                setTimeout(() => {
                    this.isloading = false;
                }, 1000)
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
            console.log(this.getMyInfo)
            this.value2 = this.getMyInfo.sex
            this.Asrc = this.getMyInfo.img
        },
        mounted() {
            let a = document.getElementsByClassName('weui-select');
            [...a].map(item => {
                item.style.cssText += 'color:red';
            })
        }
    }
</script>
<style lang="less">
    .teacherUploadPic {
        height: 100%;
        .weui-cells__title {
            margin-top: 0;
            padding-top: .2rem;
            padding-bottom: .1rem;
            font-size: .4rem;
        }
        select option[value=''] {
            color: red
        }
        .myAvatar {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            margin-right: 10px;
        }
        .vux-upload {
            min-height: 4rem;
            display: flex;
            align-items: center;
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
        .weui-select {
            color: #999999
        }
        .vux-upload .vux-flexbox-item .vux-upload-bg .vux-upload-content {
            background-position: center;
        }
        .vux-upload .vux-flexbox-item .vux-upload-bg {
            width: 92%;
            margin: 4% 0 0 9%;
        }
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
        .secondeUpload {
            background: #f4f4f4;
            padding: 0 10px;
            box-sizing: border-box;
        }
        .secondGroup .weui-cells:after {
            border-bottom: none;
        }
        .footerBtn {
            width: 90%;
            margin: 1rem auto 0;
            text-align: center;
        }
    }
</style>
