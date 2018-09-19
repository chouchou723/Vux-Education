<template>
    <div class="commentDetail">
        <view-box ref="viewBox">
            <group style="margin-top:0">
                <cell>
                    <div slot="title" class="commentTitle">
                        <img src="../assets/0e3a716cf47f1eb695e5b62597dec807.jpg" alt="" class="simpleImg">
                        <div class="commentContent">
                            <div class="commentName">
                                <span>
                            Kino的天空
                            </span>
                                <span style="color:#7F8389">
                                4月17日 22:05
                            </span>
                            </div>
                            <div>
                                <span style="margin-right:3px;font-size:12px;color:#7F8389">总体</span>
                                <img src="../assets/star.png" alt="" v-for="(item,index) in rank" :key="index+'a'" class="star"><img src="../assets/starg.png" alt="" v-for="(item,index) in (5-rank)" :key="index+'b'" v-if="item" class="star">
                            </div>
                            <div>
                                <span style="margin-right:3px;font-size:12px;color:#7F8389">老师</span>
                                <img src="../assets/star.png" alt="" v-for="(item,index) in rank" :key="index+'c'" class="star"><img src="../assets/starg.png" alt="" v-for="(item,index) in (5-rank)" :key="index+'d'" v-if="item" class="star">
                            </div>
                            <div>
                                <span style="margin-right:3px;font-size:12px;color:#7F8389">课程</span>
                                <img src="../assets/star.png" alt="" v-for="(item,index) in rank" :key="index+'e'" class="star"><img src="../assets/starg.png" alt="" v-for="(item,index) in (5-rank)" :key="index+'f'" v-if="item" class="star">
                            </div>
                            <div>
                                <span style="margin-right:3px;font-size:12px;color:#7F8389">场馆</span>
                                <img src="../assets/star.png" alt="" v-for="(item,index) in rank" :key="index+'g'" class="star"><img src="../assets/starg.png" alt="" v-for="(item,index) in (5-rank)" :key="index+'h'" v-if="item" class="star">
                            </div>
                            <div class="commentWord">
                                我参加了周六上午的国画课，小朋友年纪小，希望从小培养，上课过程很开心！我参加了周六上午的国画课，小朋友年纪小，希望从小培养，上课过程很开心！
                            </div>
                            <vux-upload url="" :images="images" :readonly="true" :max="9" :withCredentials="false" :span="4" :preview="true" @success="onSuccess" @error="onError" @remove="onRemove">
                            </vux-upload>
                            <div class="commentName">
                                <span style="color:#7F8389;font-size:12px">
                                浏览 3300
                            </span>
                                <span>
                                <img src="../assets/good.png" alt="" width="10" v-if="isGood">
                                <img src="../assets/goodn.png" alt="" width="10" v-else>
                                <span :style="isGood?'color:#1aad19':'color:#7F8389'">9</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </cell>
            </group>
            <group title=" ">
                <cell>
                    <span slot="title" style="font-size:14px;color:#a5a3a3">评论( 3 )</span>
                </cell>
                <cell v-for="(comment,index) in commentlist" :key="comment+index">
                    <div slot="title" class="commentTitle">
                        <img src="../assets/0e3a716cf47f1eb695e5b62597dec807.jpg" alt="" class="simpleImgCom">
                        <div class="commentContent">
                            <div class="commentName">{{comment.name}}
                            </div>
                            <div style="color:#7F8389;font-size:12px">{{comment.time}}
                            </div>
                            <div class="commentWordCom">
                                {{comment.commentWord.slice(0,25)+'...'}}
                            </div>
                            <div style="color:#1aad19;font-size:12px;" v-if="comment.commentWord.length>25">全文</div>
                        </div>
                    </div>
                </cell>
            </group>
            <div class="footer" slot="bottom">
                <div class="footTexa">
                    <x-textarea placeholder="评论" v-model="comm" :show-counter="false" :rows="1" autosize @on-focus='onFocus' @on-blur="onBlur" @on-change="onChange"></x-textarea>
                </div>
                <div class="footerBtn">发送
                </div>
            </div>
            <div class="footerFixed">
            </div>
            <div class="modal" v-if="showM"></div>
        </view-box>
    </div>
</template>

<script>
    import {
        Group,
        Cell,
        ViewBox,
        XTextarea
    } from 'vux'
    // import SimpleCropper from '@/components/SimpleCrop' 
    // import VuxUpload from 'vux-upload'
    import VuxUpload from '../components/Upload'
    export default {
        components: {
            Group,
            Cell,
            ViewBox,
            XTextarea,
            VuxUpload,
            //   SimpleCropper
        },
        data() {
            return {
                //   uploadParam: {
                //                 fileType: 'recruit', // 其他上传参数 
                //                 uploadURL: this.$dataURL + 'uploadAction/qcloudImg', // 上传地址 
                //                 scale: 4 // 相对手机屏幕放大的倍数: 4倍 
                //                 }, 
                // userImg: require('../assets/0e3a716cf47f1eb695e5b62597dec807.jpg'),
                varmax: 9,
                commentlist: [{
                        name: 'Kino的天空',
                        time: '4月17日 22:05',
                        commentWord: '我参加了周六上午的国画课，小朋友年纪小，希望从小培养，上课过程很开心！我参加了周六上午的国画课，小朋友年纪小，希望从小培养，上课过程很开心！'
                    },
                    {
                        name: 'chou的天空',
                        time: '4月17日 22:05',
                        commentWord: '希望从小培养，上课过程很开心！'
                    },
                    {
                        name: '七月的天空',
                        time: '4月17日 22:05',
                        commentWord: '加了周六上午的国画课，小朋友年纪小，希望从小培养，上课过程,希望从小培养，上课过程很开心！'
                    }
                ],
                commentWord: '我参加了周六上午的国画课，小朋友年纪小，希望从小培养，上课过程很开心！我参加了周六上午的国画课，小朋友年纪小，希望从小培养，上课过程很开心！',
                rank: 3,
                images: [{
                        src: require('../assets/ee.png')
                    }, {
                        src: require('../assets/ff.png')
                    }, {
                        src: require('../assets/ff.png')
                    },
                    {
                        src: require('../assets/0e3a716cf47f1eb695e5b62597dec807.jpg')
                    }, {
                        src: require('../assets/ff.png')
                    }, {
                        src: require('../assets/ff.png')
                    }
                ],
                uploadUrl: '',
                params: {},
                data3: 5,
                value: '',
                isGood: false,
                clientHeight: 0,
                focusElem: '',
                showM: false,
                comm: ''
            }
        },
        created() {
            let type = this.$route.query.type;
            if (type) {
                document.title = '昵称'
            } else {
                document.title = '姓名'
            }
        },
        mounted() {
            //获取页面高度
            // this.clientHeight = document.body.clientHeight//+document.documentElement.clientHeight;
            //设置监听窗口变化时间
            // window.addEventListener("resize", ()=> {
            //     // alert(document.body.clientHeight)
            //     if(this.focusElem && document.body.clientHeight < clientHeight) {
            //         //使用scrollIntoView方法来控制输入框
            //         this.focusElem.scrollIntoView(false);
            //     }
            // });
        },
        methods: {
            onChange() {},
            onFocus() {
                this.showM = true;
                document.querySelector(".footer").style.cssText += "bottom:1rem"
                // setTimeout(()=>{
                //      this.$refs.xinput.scrollIntoView(false);
                // },1000)
            },
            onBlur() {
                this.showM = false
                document.querySelector(".footer").style.cssText += "bottom:0"
            },
            //         upload () {
            //   this.$refs['cropper'].upload() 
            //  }, 
            //  // 上传头像成功回调 
            //  uploadHandle (data) {
            //   if (data.state === 'SUCCESS') { 
            //   this.userImg = this.form.headImgUrl = data.fileId 
            //   } 
            //  }
            onSuccess() {},
            onError() {},
            onRemove() {},
        }
    }
</script>
<style lang="less">
    .commentDetail {
        height: 100%;
        .vux-no-group-title {
            margin-top: 0; // padding-top:.2rem; 
            padding-bottom: .1rem; // font-size: .4rem;
        }
        .star {
            width: 12px;
            height: 12px;
            margin-right: .1rem;
        }
        .commentContent {
            width: 100%;
            flex: auto; // margin-left:.4rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
        }
        .commentTitle {
            display: flex;
            width: 9.2rem;
        }
        .commentName {
            width: 100%;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .commentWord {
            font-size: 14px;
            margin-top: .2rem;
            line-height: 1.5;
        }
        .commentWordCom {
            font-size: 14px;
            margin: .2rem 0;
            line-height: 1.5;
        }
        .simpleImg {
            flex-shrink: 0;
            width: 59px;
            height: 59px;
            border-radius: 50%;
            margin-right: .4rem;
        }
        .simpleImgCom {
            flex-shrink: 0;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            margin-right: .4rem;
        }
        .vux-upload .vux-flexbox-item .vux-upload-bg .vux-upload-content {
            background-position: center;
        }
        .vux-upload .vux-flexbox-item .vux-upload-bg {
            width: 93%;
            margin: 4% 0 0 0;
        }
        .footer {
            position: absolute;
            width: 100%;
            min-height: 1.306667rem;
            left: 0;
            bottom: 0;
            background: #F9F9F9;
            display: flex;
            z-index: 100;
        }
        .footerFixed {
            position: fixed;
            width: 100%;
            min-height: 1.306667rem;
            left: 0;
            bottom: 0;
            background: white;
            display: flex;
            z-index: 100;
        }
        .footTexa {
            flex: auto;
            .weui-cell {
                margin: 7px auto;
                padding: 3px 15px;
            }
        }
        .footerBtn {
            background: #1AAD19;
            font-size: 18px;
            color: white;
            line-height: 1.306667rem;
            text-align: center;
            flex: 0 0 2.4rem;
        }
        .vux-x-textarea {
            width: 78%;
            background-color: white; // padding:10px 5px;
            border: 1px solid #E5E5E5;
            border-radius: 10px;
            font-size: 16px;
            margin: 0 auto;
        }
        .modal {
            width: 100%;
            height: 100%;
            background: black;
            opacity: .5;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 99;
        }
    }
</style>
