<template>
    <div class="classSetting">
        <view-box ref="viewBox">
            <group title="课程金额" label-width="4.5em" label-margin-right="2em">
                <x-input :max="20" title="金额"  v-model="valueTitle" placeholder="请设置该课程的金额" text-align="right" ></x-input>
            </group>
            <group title="满几人开课" label-width="4.5em" label-margin-right="2em">
                <popup-picker title="人数" show-name :data="list2" v-model="value1" @on-show="onShow" @on-hide="onHide" @on-change="onChange" :columns="1"></popup-picker>
            </group>
            <div class="footerBtn">
                <x-button type="primary" action-type="button" @click.native="saveInfo" :show-loading="isloading" :disabled="isloading">提交</x-button>
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
        },
        data() {
            return {
                valueTitle: '',
                list2: [{
                    name: '1人',
                    value: '1'
                }, {
                    name: '2人',
                    value: '2',
                }, {
                    name: '3人',
                    value: '3',
                }, ],
                Asrc: '',
                isBorder: false,
                value: [],
                value1: [],
                value2: [],
                value3: [],
                isloading: false,
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
                // console.log(this.getMyInfo)
                // this.$vux.toast.show({
                //     text: '保存成功'
                // })
                // localStorage.setItem('info', JSON.stringify(this.getMyInfo))
                setTimeout(() => {
                    this.isloading = false;
                }, 1000)
                this.$router.push({
                    path: '/teacherPublishHome',
                    query: {
                        title: this.valueTitle
                    }
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
            document.title = "审核通过"
            console.log(this.getMyInfo)
            // this.value2 = this.getMyInfo.sex
        },
        mounted() {}
    }
</script>
<style lang="less">
    .classSetting {
        height: 100%;
        ::-webkit-input-placeholder{
            color:gainsboro
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
        .footerBtn {
            width: 90%;
            margin: 1rem auto 0;
            text-align: center;
        }
    }
</style>
