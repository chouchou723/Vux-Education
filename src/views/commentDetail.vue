<template>
    <div class="commentDetail">
        <view-box ref="viewBox">
            <group style="margin-top:0">
                <cell>
                    <div slot="title" class="commentTitle">
                        <img :src="`${apiUrl}/attach/img/${detail.photo}`" alt="" class="simpleImg">
                        <div class="commentContent">
                            <div class="commentName">
                                <span>{{detail.nickname}}
                                                    </span>
                                <span style="color:#7F8389;font-size:12px">
                                                        {{detail.date.substring(5,7)}}月{{detail.date.substring(8,10)}}日 {{detail.date.substring(11,16)}} 
                                                    </span>
                            </div>
                            <div>
                                <span style="margin-right:3px;font-size:12px;color:#7F8389">总体</span>
                                <img src="../assets/star.png" alt="" v-for="(item,index) in detail.overallScore" :key="index+'a'" class="star"><img src="../assets/starg.png" alt="" v-for="(item,index) in (5-detail.overallScore)" :key="index+'b'" v-if="item"
                                    class="star">
                            </div>
                            <div>
                                <span style="margin-right:3px;font-size:12px;color:#7F8389">老师</span>
                                <img src="../assets/star.png" alt="" v-for="(item,index) in detail.teacherScore" :key="index+'c'" class="star"><img src="../assets/starg.png" alt="" v-for="(item,index) in (5-detail.teacherScore)" :key="index+'d'" v-if="item"
                                    class="star">
                            </div>
                            <div>
                                <span style="margin-right:3px;font-size:12px;color:#7F8389">课程</span>
                                <img src="../assets/star.png" alt="" v-for="(item,index) in detail.courseScore" :key="index+'e'" class="star"><img src="../assets/starg.png" alt="" v-for="(item,index) in (5-detail.courseScore)" :key="index+'f'" v-if="item"
                                    class="star">
                            </div>
                            <div>
                                <span style="margin-right:3px;font-size:12px;color:#7F8389">场馆</span>
                                <img src="../assets/star.png" alt="" v-for="(item,index) in detail.venueScore" :key="index+'g'" class="star"><img src="../assets/starg.png" alt="" v-for="(item,index) in (5-detail.venueScore)" :key="index+'h'" v-if="item" class="star">
                            </div>
                            <div class="commentWord">
                                {{detail.content}}
                            </div>
                            <vux-upload url="" :images="images" :readonly="true" :max="9" :withCredentials="false" :span="4" :preview="true" @success="onSuccess" @error="onError" @remove="onRemove">
                            </vux-upload>
                            <div class="commentName">
                                <span style="color:#7F8389;font-size:12px">
                                                        浏览 {{detail.browseNum}}
                                                    </span>
                                <span @click="doLike(detail)">
                                                <img :src="detail.hasLiked?require('../assets/good.png'):require('../assets/goodn.png')" alt="" width="12">
                                                        <span :style="detail.hasLiked?'color:#1aad19':'color:#7F8389'">{{detail.likeNum}}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </cell>
            </group>
            <group title=" ">
                <cell>
                    <span slot="title" style="font-size:14px;color:#a5a3a3">评论( {{detail.replyNum}} )</span>
                </cell>
                <cell v-for="(comment,index) in commentlist" :key="'comment'+index" v-if="commentlist.length!==0">
                    <div slot="title" class="commentTitle">
                        <img :src="`${apiUrl}/attach/img/${comment.picId}`" alt="" class="simpleImgCom">
                        <div class="commentContent">
                            <div class="commentName">{{comment.name}}
                            </div>
                            <div style="color:#7F8389;font-size:12px">{{comment.replyTime.substring(5,7)}}月{{comment.replyTime.substring(8,10)}}日 {{comment.replyTime.substring(11,16)}}
                            </div>
                            <div class="commentWordCom">
                                {{comment.content&&comment.content.length>25?comment.content.slice(0,25)+'...':comment.content}}
                            </div>
                            <div style="color:#1aad19;font-size:12px;" v-if="comment.content&&comment.content.length>25">全文</div>
                        </div>
                    </div>
                </cell>
                <cell v-if="commentlist.length==0" value-align="left">
                    <div style="font-size:14px;text-align:center;height:2rem;padding-top:.2rem">暂无评论</div>
                </cell>
            </group>
            <div class="footer" slot="bottom" @touchmove="touchmove">
                <div class="footTexa">
                    <x-textarea ref="xinput" placeholder="评论" v-model="comm" :show-counter="false" :rows="1" autosize @on-focus='onFocus' @on-blur="onBlur" @on-change="onChange"></x-textarea>
                </div>
                <div class="footerBtn" @click="sendComment">发送
                </div>
            </div>
            <div class="footerFixed" v-if="showM" @touchmove="touchmove">
            </div>
            <div class="modal" v-if="showM" @touchmove="touchmove"></div>
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
    import {
        getCommentDetail,
        postCommentD,
        postCommentLike
    } from '../api/api'
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
                detail: {
                    replyNum: 0,
                    browseNum: 0,
                    content: '',
                    courseScore: 5,
                    date: '',
                    hasLiked: false,
                    likeNum: 0,
                    nickname: '',
                    overallScore: 5,
                    photo: '',
                    replyNum: 0,
                    teacherScore: 5,
                    venueScore: 5,
                },
                varmax: 9,
                commentlist: [{
                    name: '',
                    content: '',
                    replyTime: ''
                }],
                rank: 3,
                images: [],
                uploadUrl: '',
                params: {},
                data3: 5,
                value: '',
                isGood: false,
                clientHeight: 0,
                focusElem: '',
                showM: false,
                comm: '',
                timer:''
            }
        },
        methods: {
            touchmove($event) {
                $event.preventDefault()
            },
            onChange() {},
            onFocus() { 
                this.timer = setInterval(function() {      
                    document.body.scrollTop = document.body.scrollHeight    
                }, 100)
                // this.showM = true;
                // document.querySelector(".footer").style.cssText += "bottom:1rem"
                // setTimeout(() => {
                //     this.$refs.xinput.scrollIntoView(true);
                // }, 200)
            },
            onBlur() {
                clearInterval(this.timer)
                // this.showM = false
                // document.querySelector(".footer").style.cssText += "bottom:0"
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
            doLike(data) {
                let id = this.$route.query.id
                postCommentLike(id).then(res => {
                    if (res.code == 0) {
                        if (data.hasLiked) {
                            data.hasLiked = false;
                            data.likeNum--;
                        } else {
                            data.hasLiked = true;
                            data.likeNum++;
                        }
                    }
                    console.log(res)
                })
            },
            sendComment() {
                if (this.comm !== '') {
                    let para = {
                        content: this.comm
                    }
                    postCommentD(this.$route.query.id, para).then(res => {
                        console.log(res)
                        if (res.code == 0) {
                            this.$vux.toast.show({
                                text: '评论成功',
                                type: 'text',
                                position: 'middle'
                            })
                            this.comm = '';
                            this.fetchData()
                        }
                    })
                } else {
                    this.$vux.toast.show({
                        text: '请填写评论内容',
                        type: 'text',
                        position: 'middle',
                        width: '5rem'
                    })
                }
            },
            fetchData() {
                let id = this.$route.query.id
                getCommentDetail(id).then(res => {
                    this.detail = res.data;
                    this.images = res.data.attachments.map(item => {
                        return {
                            src: `${this.apiUrl}/attach/img/${item.id}`
                        }
                    })
                    this.commentlist = res.data.replies
                    // console.log(res)
                })
            }
        },
        created() {
            this.setTitle('评价详情');
            this.fetchData()
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
            font-size: 16px;
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
            flex: 0 0 2.4rem;
            display: flex;
            justify-content: center;
            align-items: center;
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
