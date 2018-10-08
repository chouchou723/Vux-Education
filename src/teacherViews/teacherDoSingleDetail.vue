<template>
    <div class="teacherDoSingleDetail">
        <view-box ref="viewBox">
            <group title="课程签到" label-width="4.5em" label-margin-right="2em">
                <selector v-for="(item,index) in signList" :key="'ss'+index" :title="item.stuName" :value-map="['idValue', 'idLabel']" :options="optionsL" placeholder="请签到" v-model="item.status" direction="rtl" @on-change="onChange" :class="['mr10',item.status?'':'colorRed']"></selector>
       
            </group>
            <group title="学生点评" label-width="4.5em" label-margin-right="2em">
                <cell v-for="(item,index) in evaluatesList" :key="'ss'+index" :title="item.stuName" is-link link="/teacherCommentStudent?type=nickname">
                    <div class="mr10">{{item.status.label}}</div>
                </cell>
            </group>
            <group title="作品上传" label-width="4.5em" label-margin-right="2em">
                <cell v-for="(item,index) in studentList" :key="'ss'+index" :title="item.name" is-link link="/teacherUploadPic?type=nickname">
                    <div class="mr10">{{item.pic}}</div>
                </cell>
            </group>
            <group title=" " label-width="4.5em" label-margin-right="2em">
                <vux-upload url="" :headers="headers" :data="data" :images="images" :readonly="true" :max="9" :withCredentials="false" :span="3" :preview="true" @success="onSuccess" @error="onError" @remove="onRemove">
                </vux-upload>
            </group>
            <group title="作品点评" label-margin-right="2em">
                <cell is-link link="/teacherPicComment?type=nickname">
                    <div slot="title" style="color:#cacaca;font-size:15px;padding-bottom:60px">请点评作品</div>
                </cell>
            </group>
            <!-- <div class="footerBtn">
         <x-button type="primary" action-type="button" @click.native="saveInfo" :show-loading="isloading" :disabled="isloading">保存</x-button>
        </div> -->
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
    import {getTeacherLessonDetailList} from '../api/api'
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
            ViewBox,
            VuxUpload
        },
        data() {
            return {
                optionsL: [{
                    idValue: 'ATTEND',
                    idLabel: '已到'
                }, {
                    idValue: 'ABSENT',
                    idLabel: '未到'
                }],
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
                signList:[
                    {
                        stuName:'',
                        stuId:'',
                        status:'',
                    }
                ],
                evaluatesList:[
                     {
                        stuName:'',
                        stuId:'',
                        evaluate:'',
                        status:{
                            label:'请点评'
                        }
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
            },
            fetchData(){
                let id = this.$route.query.id;
                getTeacherLessonDetailList(id).then(res=>{
                    console.log(res)
                    let data =res.data;
                    this.signList = data.signs
                    this.evaluatesList = data.evaluates;
                })
            }
        },
        computed: {
            ...mapGetters([
                'getMyInfo'
                // ...
            ]),
        },
        created() {
            let index = this.$route.query.num;
            this.setTitle(`第${index}节课`)
            this.fetchData()
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
    .teacherDoSingleDetail {
        height: 100%;
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
        .footerBtn {
            width: 90%;
            margin: 1rem auto 0;
            text-align: center;
        }
    }
</style>
