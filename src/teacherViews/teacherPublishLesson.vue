<template>
    <div class="teacherPublishLesson">
        <view-box ref="viewBox">
            <group title="课程名称" label-width="4.5em" label-margin-right="2em" :class="isBorder?'borderL':''">
                <x-input :max="20" :is-type='nickname' v-model="valueTitle" placeholder="请填写您的课程名称" @on-blur="changeBorder(1)" @on-focus="changeBorder(2)"></x-input>
                <!-- <cell v-for="(item,index) in studentList" :key="'ss'+index" :title="item.name"  is-link link="/myName?type=nickname">
                          <div class="mr10 colorRed">{{item.sign?item.sign:'请签到'}}</div>
                      </cell> -->
                <!-- <selector v-for="(item,index) in studentList" :key="'ss'+index" :title="item.name" :value-map="['idValue', 'idLabel']" :options="optionsL" placeholder="请签到"
                      v-model="item.sign"  direction="rtl" @on-change="onChange" :class="['mr10',item.sign?'':'colorRed']"></selector> -->
                <!-- <cell title="姓名"  is-link link="/myName">
                          <div class="mr10">{{this.getMyInfo.name}}</div>
                      </cell>
                      <selector title="性别" :options="['男', '女']" v-model="value2"  direction="rtl" @on-change="onChange"></selector>
                       <cell title="生日"  is-link link="/myBir">
                          <div class="mr10">{{this.getMyInfo.birthday}}</div>
                      </cell>
                       <cell title="地址"  is-link link="/myAdd">
                          <div class="mr10">{{this.getMyInfo.address}}</div>
                      </cell>
                       <cell title="手机"  is-link link="/myCell">
                          <div class="mr10">{{this.getMyInfo.cell}}</div>
                      </cell> -->
            </group>
            <group title="课程类型" label-width="4.5em" label-margin-right="2em" id="noborderBottom">
                <tab custom-bar-width="60px" @touchmove.native="touchmove" active-color="#31a2cf">
                    <tab-item @on-item-click="changeLesson('SINGLE')" selected>
                        <div class="classType">
                            <div>单课</div>
                            <div>(1节课)</div>
                        </div>
                    </tab-item>
                    <tab-item @on-item-click="changeLesson('SUIT')">
                        <div class="classType">
                            <div>套课</div>
                            <div>(多节课,2小时/节课)</div>
                        </div>
                    </tab-item>
                </tab>
                <popup-picker title="时长" :data="list1" v-model="value" @on-show="onShow" @on-hide="onHide" @on-change="onChange" :columns="1"></popup-picker>
                <!-- <selector title="时长" :value-map="['idValue', 'idLabel']" :options="optionsL" v-model="value"  direction="rtl" @on-change="onChange"></selector> -->
            </group>
            <group title="课程详情" label-width="4.5em" label-margin-right="2em">
                <popup-picker title="课程人数" show-name :data="list2" v-model="value1" @on-show="onShow" @on-hide="onHide" @on-change="onChange" :columns="1"></popup-picker>
                <popup-picker title="课程种类" show-name :data="list3" v-model="value2" @on-show="onShow" @on-hide="onHide" @on-change="onChange" :columns="1"></popup-picker>
                <popup-picker title="适用对象" show-name :data="list4" v-model="value3" @on-show="onShow" @on-hide="onHide" @on-change="onChange" :columns="1"></popup-picker>
                <cell title="课程介绍" is-link link="/teacherAddClassIntro">
                    <div class="mr10">已填写</div>
                </cell>
            </group>
            <group title=" " label-width="4.5em" label-margin-right="2em">
                <vux-upload :class="images.length!=0?'':'plusIcon'" url="" :headers="headers" :data="data" :images="images" :readonly="false" :max="9" :withCredentials="false" :span="3" :preview="true" @success="onSuccess" @error="onError" @remove="onRemove">
                </vux-upload>
            </group>
            <div class="footerBtn">
                <x-button type="primary" action-type="button" @click.native="saveInfo" :show-loading="isloading" :disabled="isloading">下一步</x-button>
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
                    name: '1人',
                    value: '1'
                }, {
                    name: '2人',
                    value: '2',
                }, {
                    name: '3人',
                    value: '3',
                }, ],
                list3: [{
                    name: '书法',
                    value: '1'
                }, {
                    name: '国画',
                    value: '2',
                }, {
                    name: '创意绘画',
                    value: '3',
                }, ],
                list4: [{
                    name: '1-3岁',
                    value: '1'
                }, {
                    name: '3-6岁',
                    value: '2',
                }, {
                    name: '6-12岁',
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
                isBorder: false,
                value: [],
                value1: [],
                value2: [],
                value3: [],
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
            onSuccess(data){
                // console.log(data)
                var reads = new FileReader();
                let f = data;
                reads.readAsDataURL(f);
                reads.onload = (e) => {
                    // this.$emit('getImages',e.target.result)
                    this.images.push({src:e.target.result})
                    // this.Asrc=e.target.result;
                    // console.log(e.target.result)
                };
            },
            changeBorder(type) {
                if (type == 1 && this.valueTitle) {
                    this.isBorder = true;
                } else {
                    this.isBorder = false;
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
            document.title = "创建新的课程内容"
            console.log(this.getMyInfo)
            // this.value2 = this.getMyInfo.sex
        },
        mounted() {}
    }
</script>
<style lang="less">
    .teacherPublishLesson {
        height: 100%;
        .weui-uploader__input-box {
            border: 1px dashed #D9D9D9;
        }
        .borderL .weui-cell {
            border-left: 5px solid #00a6e7;
            padding-left: 10px;
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
