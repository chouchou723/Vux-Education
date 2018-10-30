<template>
    <div class="assistantDoSingleDetail">
        <view-box ref="viewBox">
            <group title="课程签到" label-width="4.5em" label-margin-right="2em">
                <selector v-for="(item,index) in signList" :key="'ss'+index" :title="item.stuName" :value-map="['idValue', 'idLabel']" 
                :options="optionsL" placeholder="请签到" v-model="item.signStr" direction="rtl" @click.native="isChange" @on-change="onChange(item)" :class="['mr10',item.signStr?'':'colorRed']"></selector>
       
            </group>
            <group title="学生点评" label-width="4.5em" label-margin-right="2em">
                <cell v-for="(item,index) in evaluatesList" :key="'ss'+index"  is-link :link="`/assistantCommentStudent?id=${$route.query.id}&sid=${item.stuId}`">
                    <div class="mr10" slot="title">{{item.stuName}}</div>
                    <div class="mr10">{{item.status.label}}</div>
                </cell>
            </group>
            <group title="作品上传" label-width="4.5em" label-margin-right="2em">
                <cell v-for="(item,index) in studentList" :key="'ss'+index" is-link :link="`/assistantUploadPic?id=${$route.query.id}&sid=${item.stuId}`">
                    <div class="mr10" slot="title">{{item.stuName}}</div>
                    <div class="mr10">{{item.status.label}}</div>
                </cell>
            </group>
            <group title=" " label-width="4.5em" label-margin-right="2em">
                <vux-upload url="" :images="images" :readonly="true" :max="9" :withCredentials="false" :span="3" :preview="true" >
                </vux-upload>
            </group>
            <group title="作品点评" label-margin-right="2em">
                <cell is-link :link="`/assistantPicComment?id=${$route.query.id}`">
                    <div slot="title" style="color:#cacaca;font-size:15px;padding-bottom:60px">{{evaluate?evaluate:'请点评作品'}}</div>
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
    import {getTeacherLessonDetailList,doSign} from '../api/api'
    import VuxUpload from '../components/Upload'
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
                images: [
                ],
                evaluate:'',
                signList:[
                    {
                        stuName:'',
                        stuId:'',
                        status:{},
                        signStr:'',
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
                        stuName: '张三',
                        status: {label:''},
                        stuId: ''
                    },
                ],
                isChangeA:0,
            }
        },
        methods: {
            isChange(){
                this.isChangeA++;
            },
            onChange(item) {
                if(this.isChangeA){
                    let para = {
                        stuId:item.stuId,
                        status:item.signStr
                    }
                    let id = this.$route.query.id
                    doSign(para,id).then(res=>{
                        if(res.code==0){
                            this.$vux.toast.show({
                                text:'签到成功'
                            })
                        }
                    })

                }
            },
            fetchData(){
                let id = this.$route.query.id;
                getTeacherLessonDetailList(id).then(res=>{
                    console.log(res)
                    let data =res.data;
                    this.signList = data.signs
                    this.evaluatesList = data.evaluates;
                    this.studentList = data.workUploads
                    this.images = data.picIds.map(item=>{
                        return {src:`${this.apiUrl}/attach/img/${item.id}`}
                    })
                    this.evaluate = data.evaluate;
                })
            }
        },
        computed: {
        },
        created() {
            let index = this.$route.query.num;
            this.setTitle(`第${index}节课`)
            this.fetchData()
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
    .assistantDoSingleDetail {
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
