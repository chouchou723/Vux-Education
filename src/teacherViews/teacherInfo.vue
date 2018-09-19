<template>
    <div class="teacherInfo">
        <group title=" " label-width="4.5em" label-margin-right="2em">
            <cell title="头像" is-link>
                <simple-cropper :initParam="uploadParam" :successCallback="uploadHandle" ref="cropper">
                    <img :src="this.getMyInfo.img" @touchend="upload" class="myAvatar">
                </simple-cropper>
                <!-- <img :src="this.getMyInfo.img" class="myAvatar" alt="" @touchend="openFile"> -->
                <!-- <input type="file" @change="fileChange()" style="display: none" ref="file" accept="image/png,image/jpeg,image/gif"> -->
            </cell>
            <cell title="姓名" is-link link="/teacherName">
                <div class="mr10">{{this.getMyInfo.name}}</div>
            </cell>
            <selector title="性别" :options="['男', '女']" v-model="value2" direction="rtl" @on-change="onChange"></selector>
            <cell title="教龄" is-link link="/teachTime">
                <div class="mr10">{{this.getMyInfo.name}}</div>
            </cell>
            <cell title="擅长" is-link link="/mySkill">
                <div class="mr10">{{this.getMyInfo.name}}</div>
            </cell>
            <cell title="生日" is-link link="/teacherBir">
                <div class="mr10">{{this.getMyInfo.birthday}}</div>
            </cell>
            <cell title="地址" is-link link="/teacherAdd">
                <div class="mr10">{{this.getMyInfo.address}}</div>
            </cell>
            <cell title="手机" is-link link="/teacherCell">
                <div class="mr10">{{this.getMyInfo.cell}}</div>
            </cell>
        </group>
        <group title=" " label-width="4.5em" label-margin-right="2em">
            <cell title="个人介绍" is-link link="/myIntro">
                <div class="mr10">{{this.getMyInfo.name}}</div>
            </cell>
            <cell title="教育经历" is-link link="/myEdu">
                <div class="mr10">{{this.getMyInfo.name}}</div>
            </cell>
            <cell title="教学经验" is-link link="/myTeachExp">
                <div class="mr10">{{this.getMyInfo.name}}</div>
            </cell>
        </group>
        <group title=" " label-width="4.5em" label-margin-right="2em">
            <cell title="证书图片"></cell>
            <group title=" ">
                <vux-upload url="" :headers="headers" :data="data" :images="images" :readonly="false" :max="9" :withCredentials="false" :span="3" :preview="true" @success="onSuccess" @error="onError" @remove="onRemove">
                </vux-upload>
            </group>
        </group>
        <!-- <div class="footerBtn">
         <x-button type="primary" action-type="button" @click.native="saveInfo" :show-loading="isloading" :disabled="isloading">保存</x-button>
        </div> -->
    </div>
</template>

<script>
    import {
        XButton,
        Group,
        Cell,
        Selector
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
            VuxUpload
        },
        data() {
            return {
                images: [{
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
    }
</script>
<style lang="less">
    .teacherInfo {
        .weui-cells__title {
            margin-top: 0;
            padding-top: 0;
            padding-bottom: 0;
            font-size: .4rem;
        }
        .myAvatar {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            margin-right: 10px;
        }
        .mr10 {
            margin-right: 10px;
        }
        .weui-select {
            color: #999999
        }
        .vux-upload .vux-flexbox-item .vux-upload-bg .vux-upload-content {
            background-position: center;
        }
        .vux-upload .vux-flexbox-item .vux-upload-bg {
            width: 82%;
            margin: 4% 0 0 9%;
        }
        .weui-uploader__input-box {
            border: none;
        }
        .vux-upload .vux-flexbox-item .vux-upload-bg .weui-uploader__input-box::before {
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            background: url('../assets/upload.png') no-repeat center/cover;
        }
        .weui-uploader__input-box:after {
            display: none;
        }
        .footerBtn {
            width: 90%;
            margin: 1rem auto 0;
            text-align: center;
        }
    }
</style>
