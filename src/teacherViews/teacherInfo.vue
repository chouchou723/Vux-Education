<template>
    <div class="teacherInfo">
        <group title=" " label-width="4.5em" label-margin-right="2em">
            <cell title="照片" is-link>
                <simple-cropper :initParam="uploadParam" :successCallback="uploadHandle" ref="cropper">
                    <img :src="`${apiUrl}/attach/img/${getTeacherInfo.img}/SQUARE`" @touchend="upload" class="myAvatar">
                </simple-cropper>
                <!-- <img :src="this.getTeacherInfo.img" class="myAvatar" alt="" @touchend="openFile"> -->
                <!-- <input type="file" @change="fileChange()" style="display: none" ref="file" accept="image/png,image/jpeg,image/gif"> -->
            </cell>
            <cell title="姓名" is-link link="/teacherName">
                <div class="mr10">{{this.getTeacherInfo.realName}}</div>
            </cell>
            <selector title="性别" :options="sexOption" :value-map="['name', 'label']" v-model="value2" direction="rtl" @on-change="onChange"></selector>
            <cell title="教龄" is-link link="/teachTime">
                <div class="mr10">{{this.getTeacherInfo.experience.label}}</div>
            </cell>
            <cell title="擅长" is-link link="/mySkill">
                <div class="mr10">{{this.getTeacherInfo.skill.length!==0?'已填写':''}}</div>
            </cell>
            <!-- <cell title="生日" is-link link="/teacherBir">
                <div class="mr10">{{this.getTeacherInfo.birthday}}</div>
            </cell>
            <cell title="地址" is-link link="/teacherAdd">
                <div class="mr10">{{this.getTeacherInfo.address}}</div>
            </cell>
            <cell title="手机" is-link link="/teacherCell">
                <div class="mr10">{{this.getTeacherInfo.mobilePhone}}</div>
            </cell> -->
        </group>
        <group title=" " label-width="4.5em" label-margin-right="2em">
            <cell title="个人介绍" is-link link="/myIntro">
                <div class="mr10">{{this.getTeacherInfo.description}}</div>
            </cell>
            <cell title="教育经历" is-link link="/myEdu">
                <div class="mr10">{{this.getTeacherInfo.edus.length!==0?'已填写':''}}</div>
            </cell>
            <cell title="教学经验" is-link link="/myTeachExp">
                <div class="mr10">{{this.getTeacherInfo.exps.length!==0?'已填写':''}}</div>
            </cell>
        </group>
        <group title=" " label-width="4.5em" label-margin-right="2em">
            <cell title="证书图片"></cell>
            <group title=" ">
                <vux-upload url="" :class="images.length!=0?'':'plusIcon'" :headers="headers" :data="data" :images="images" :readonly="false" :max="9" :withCredentials="false" :span="3" :preview="true" @success="onSuccess" @error="onError" @remove="onRemove">
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
    import SimpleCropper from '../components/SimpleCrop.vue'
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
        props: {
            images: Array
        },
        data() {
            return {
                sexOption: [{
                    name: 'MALE',
                    label: '男'
                }, {
                    name: 'FEMALE',
                    label: '女'
                }],
                data: {},
                headers: {},
                // images: [],
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
            onError() {},
            onRemove(index) {
                console.log(index)
                this.$emit('removeImg', index)
            },
            onSuccess(id, data) {
                //  var reads = new FileReader();
                //  reads.readAsDataURL(data);
                //  reads.onload = (e) => {
                this.$emit('getImages', id)
                //  }
            },
            ...mapActions([
                'setTeacherInfo'
            ]),
            // openFile() {
            //     this.$refs.file.click();
            // },
            // fileChange() {
            //     var reads = new FileReader();
            //     let f = this.$refs.file.files[0];
            //     reads.readAsDataURL(f);
            //     reads.onload = (e) => {
            //         this.setTeacherInfo({
            //             img: e.target.result
            //         })
            //         // this.Asrc=e.target.result;
            //         // console.log(e.target.result)
            //     };
            // },
            onChange() {
                this.setTeacherInfo({
                    gender: this.value2
                })
            },
            saveInfo() {
                this.isloading = true;
                console.log(this.getTeacherInfo)
                this.$vux.toast.show({
                    text: '保存成功'
                })
                localStorage.setItem('info', JSON.stringify(this.getTeacherInfo))
                setTimeout(() => {
                    this.isloading = false;
                }, 1000)
            },
            upload() {
                this.$refs['cropper'].upload()
            },
            // 上传头像成功回调 
            uploadHandle(data) {
                console.log(data)
                this.setTeacherInfo({
                    img: data
                })
                if (data.state === 'SUCCESS') {
                    // this.userImg  = data
                }
            },
        },
        computed: {
            ...mapGetters([
                'getTeacherInfo'
                // ...
            ]),
        },
        created() {
            console.log(12313)
            this.value2 = this.getTeacherInfo.gender
            // this.Asrc = this.getTeacherInfo.img
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
            border: 1px solid gainsboro;
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
        .plusIcon .weui-uploader__input-box {
            border: none;
        }
        .plusIcon .vux-flexbox-item .vux-upload-bg .weui-uploader__input-box::before {
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            background: url('../assets/upload.png') no-repeat center/cover;
        }
        .plusIcon .weui-uploader__input-box:after {
            display: none;
        }
        .weui-uploader__input-box {
            border: 1px dashed #D9D9D9;
        }
        .footerBtn {
            width: 90%;
            margin: 1rem auto 0;
            text-align: center;
        }
    }
</style>
