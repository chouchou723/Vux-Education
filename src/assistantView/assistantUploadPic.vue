<template>
    <div class="assistantUploadPic">
        <view-box ref="viewBox">
            <group :title="studentName" label-width="4.5em" label-margin-right="2em">
                <vux-upload :class="images.length!=0?'':'plusIcon'" url=""  :images="images" :readonly="false" :max="9" :withCredentials="false" :span="4" :preview="true" @success="onSuccess" @error="onError" @remove="onRemove">
                </vux-upload>
            </group>
            <div class="footerBtn">
                <x-button type="primary" action-type="button" @click.native="saveInfo" :show-loading="isloading" :disabled="isloading">确定</x-button>
            </div>
            <group title="已上传作品" label-width="4.5em" label-margin-right="2em" class="secondGroup">
                <vux-upload class="secondeUpload" key="second" url="" :images="images1" :readonly="true" :withCredentials="false" :span="3" :preview="true">
                </vux-upload>
            </group>
        </view-box>
    </div>
</template>

<script>
    import {
        XButton,
        Group,
        ViewBox
    } from 'vux'
    import {
        getTeacherLessonDetailList,
        doStudentPicUpload
    } from '../api/api'
    import VuxUpload from '../components/Upload'
    export default {
        components: {
            Group,
            XButton,
            ViewBox,
            VuxUpload
        },
        data() {
            return {
                studentName: '',
                images: [],
                images1: [],
                isloading: false,
                pics: []
            }
        },
        methods: {
            onSuccess(id, data) {
                this.pics.push(id);
                var reads = new FileReader();
                reads.readAsDataURL(data);
                reads.onload = (e) => {
                    this.images = [...this.images, {
                        src: e.target.result
                    }]
                };
            },
            onError() {},
            onRemove(d) {
                this.images.splice(d, 1);
                this.pics.splice(d, 1)
            },
            saveInfo() {
                if (!this.isloading && this.images.length !== 0) {
                    this.isloading = true;
                    let para = {
                        stuId: this.$route.query.sid,
                        picIds: this.pics.join(',')
                    }
                    let id = this.$route.query.id
                    doStudentPicUpload(para, id).then(res => {
                        if (res.code == 0) {
                            this.$vux.toast.show({
                                text: '上传成功'
                            })
                            this.isloading = false;
                        }
                    }).then(() => {
                        this.$router.go(-1)
                    })
                }
            },
            fetchData() {
                let id = this.$route.query.id;
                getTeacherLessonDetailList(id).then(res => {
                    console.log(res)
                    let data = res.data;
                    let arr = data.workUploads.filter(item => {
                        return item.stuId == this.$route.query.sid
                    })
                    this.studentName = arr[0].stuName
                    this.images = arr[0].attachments.map(item => {
                        this.pics.push(item.id)
                        return {
                            src: `${this.apiUrl}/attach/img/${item.id}`
                        }
                    })
                    this.images1 = data.picIds.map(item => {
                        return {
                            src: `${this.apiUrl}/attach/img/${item.id}`
                        }
                    })
                })
            }
        },
        computed: {},
        created() {
            this.setTitle('上传作品')
            this.fetchData()
        },
        mounted() {}
    }
</script>
<style lang="less">
    .assistantUploadPic {
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
            width: 88%;
            margin: 4% 0 0 5%;
        }
        .weui-uploader__input-box {
            border: 1px dashed #D9D9D9;
        }
        .weui-btn_disabled.weui-btn_primary {
            background-color: #e1e1e1;
            color: black;
        }
        .weui-btn_primary,.weui-btn_loading.weui-btn_primary,.weui-btn_primary:not(.weui-btn_disabled):active {
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
