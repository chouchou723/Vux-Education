<template>
    <div class="myInfo">
        <group title=" " label-width="4.5em" label-margin-right="2em">
            <cell title="头像" is-link>
                <simple-cropper :initParam="uploadParam" :successCallback="uploadHandle" ref="cropper">
                    <img :src="`${apiUrl}/attach/img/${getMyInfo.img}/SQUARE`" @touchend="upload" class="myAvatar">
                </simple-cropper>
                <!-- <img :src="this.getMyInfo.img" class="myAvatar" alt="" @touchend="openFile"> -->
                <!-- <input type="file" @change="fileChange()" style="display: none" ref="file" accept="image/png,image/jpeg,image/gif"> -->
            </cell>
            <cell title="昵称" is-link link="/myName?type=nickname">
                <div class="mr10">{{this.getMyInfo.nickname}}</div>
            </cell>
            <cell title="姓名" is-link link="/myName">
                <div class="mr10">{{this.getMyInfo.name}}</div>
            </cell>
            <selector title="性别" :options="['男', '女']" v-model="value2" direction="rtl" @on-change="onChange"></selector>
            <cell title="生日" is-link link="/myBir">
                <div class="mr10">{{this.getMyInfo.birthday}}</div>
            </cell>
            <cell title="地址" is-link link="/myAdd">
                <div class="mr10">{{this.getMyInfo.address}}</div>
            </cell>
            <cell title="手机" is-link link="/myCell">
                <div class="mr10">{{this.getMyInfo.cell}}</div>
            </cell>
        </group>
        <div class="footerBtn">
            <x-button type="primary" action-type="button" @click.native="saveInfo" :show-loading="isloading" :disabled="isloading">保存</x-button>
        </div>
    </div>
</template>

<script>
    import {
        XButton,
        Group,
        Cell,
        Selector
    } from 'vux'
    // import SimpleCropper from '../components/SimpleCrop'
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    import {postMyInfo} from '../api/api'
    export default {
        components: {
            Group,
            XButton,
            Cell,
            Selector,
            SimpleCropper
        },
        data() {
            return {
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
            // openFile() {
            //     this.$refs.file.click();
            // },
            // fileChange() {
            //     var reads = new FileReader();
            //     let f = this.$refs.file.files[0];
            //     reads.readAsDataURL(f);
            //     reads.onload = (e) => {
            //         this.setMyInfo({
            //             img: e.target.result
            //         })
            //         // this.Asrc=e.target.result;
            //         // console.log(e.target.result)
            //     };
            // },
            onChange() {
                this.setMyInfo({
                    sex: this.value2
                })
            },
            saveInfo() {
                this.isloading = true;
                let id = this.getMyInfo.id;
                let para = {
                      avatarId: this.getMyInfo.img,
              nickName: this.getMyInfo.nickname,
              realName: this.getMyInfo.name,
              gender: this.value2=='男'?'MALE':'FEMALE',
              birthday: this.getMyInfo.birthday,
              address: this.getMyInfo.address,
              mobilePhone: this.getMyInfo.cell,
                }
                postMyInfo(id,para).then(res=>{
                    console.log(res)
                    if(res.code==0){
                        this.$vux.toast.show({
                            text: '保存成功'
                        })
                localStorage.setItem('info', JSON.stringify(this.getMyInfo))

                    this.isloading = false;
                    }
                })
            },
            upload() {
                this.$refs['cropper'].upload()
            },
            // 上传头像成功回调 
            uploadHandle(id,data) {
                this.setMyInfo({
                    img: id
                })
                if (data.state === 'SUCCESS') {
                    console.log(123)
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
            this.setTitle('我的资料')
            console.log(this.getMyInfo)
            this.value2 = this.getMyInfo.sex
            // this.Asrc = this.getMyInfo.img
        },
    }
</script>
<style lang="less">
    .myInfo {
        .weui-cells__title {
            margin-top: 0;
            padding-top: .2rem;
            padding-bottom: .1rem;
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
        .footerBtn {
            width: 90%;
            margin: 1rem auto 0;
            text-align: center;
        }
    }
</style>
