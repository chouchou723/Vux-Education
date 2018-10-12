<template>
    <div class="totalComment">
        <!-- <view-box ref="viewBox"> -->
        <scroller delegate-id="myScroller" :on-infinite="loadMore" ref='my_scroller'>
            <group v-for="(comment,index) in commentlist" :key="comment+index" :class="index===0?'firstGroup':''">
                <cell @click.native="gotoDetail(comment.id,$event)">
                    <div slot="title" class="commentTitle">
                        <img :src="`${apiUrl}/attach/img/${comment.photo}`" alt="" class="simpleImg">
                        <div class="commentContent">
                            <div class="commentName">
                                <span>{{comment.nickname}}</span>
                                <span style="color:#7F8389;font-size:12px;">{{comment.date.substring(5,7)}}月{{comment.date.substring(8,10)}}日</span>
                            </div>
                            <div>
                                <span style="margin-right:3px;font-size:12px;color:#7F8389">总体</span>
                                <img src="../assets/star.png" alt="" v-for="(item,index) in comment.overallScore" :key="index+'a'" class="star"><img src="../assets/starg.png" alt="" v-for="(item,index) in (5-comment.overallScore)" :key="index+'b'" v-if="item"
                                    class="star">
                            </div>
                            <div class="commentWord"> {{comment.content.slice(0,30)}}{{comment.content.length>30?'...':''}}
                            </div>
                            <div class="allContent" v-if="comment.content.length>30">全文</div>
                            <!-- <vux-upload v-if="images.length>0" url="" :images="images" :readonly="true" :max="3" :withCredentials="false" :span="4" :preview="true" >
                                </vux-upload> -->
                            <div class="imgList" v-if="comment.attachments.length>0">
                                <div class="each" v-for="(pic,indexs) in comment.attachments" :key="'p'+indexs" @click="show(indexs,index)">
                                    <img :src="`${apiUrl}/attach/img/${pic.id}/SQUARE`" alt="" class="img" v-if="indexs<3">
                                </div>
                            </div>
                            <div class="allPic" v-if="comment.attachments.length>3">
                                <i class="picMin"></i>{{comment.attachments.length}}
                            </div>
                            <!-- <div class="moreImg" v-if="comment.number>3">
                                    <img src="../assets/picicon.png" class="picIcon" alt="">
                                    <span style="color:white;font-size:12px">8</span>
                                </div> -->
                            <div class="commentName">
                                <span style="color:#7F8389;font-size:12px">
                                    浏览 {{comment.browseNum}}
                                </span>
                                <div>
                                    <span style="margin-right:.4rem" class="hasLik" @click="doLike(comment)">
                                    <img :src="comment.hasLiked?require('../assets/good.png'):require('../assets/goodn.png')" class="hasLik" alt="" width="12">
                                    <span :style="comment.hasLiked?'color:#1aad19':'color:#7F8389'" class="hasLik">{{comment.likeNum}}</span>
                                    </span>
                                    <span>
                                    <img src="../assets/comment.png" alt="" width="12" >
                                    <span style="color:#7F8389">{{comment.commentNum}}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </cell>
            </group>
            <div v-transfer-dom>
                <previewer :list="pics" ref="previewer"></previewer>
            </div>
        </scroller>
        <!-- </view-box> -->
    </div>
</template>

<script>
    import {
        Group,
        Cell,
        ViewBox,
        Previewer,
        TransferDom,
    } from 'vux'
    // import SimpleCropper from '@/components/SimpleCrop' 
    // import VuxUpload from 'vux-upload'
    // import VuxUpload from '../components/Upload'
    import Scroller from '../components/Scroller'
    import {
        getAllComment,postCommentLike
    } from '../api/api'
    export default {
        directives: {
            TransferDom
        },
        components: {
            Group,
            Cell,
            ViewBox,
            // VuxUpload,
            Scroller,
            Previewer,
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
                    nickname: '',
                    date: '',
                    content: '',
                    photo: '',
                    overallScore: 5,
                    attachments: [],
                    browseNum: 0,
                    likeNum: 0,
                    commentNum: 0,
                    id: '',
                    hasLiked:false
                }],
                pics: [{
                    id: ''
                }],
                // images: [{
                //     src: require('../assets/0e3a716cf47f1eb695e5b62597dec807.jpg')
                // }, {
                //     src: require('../assets/0e3a716cf47f1eb695e5b62597dec807.jpg')
                // }, {
                //     src: require('../assets/0e3a716cf47f1eb695e5b62597dec807.jpg')
                // }],
                uploadUrl: '',
                params: {},
                data3: 5,
                value: '',
                isGood: false,
                clientHeight: 0,
                focusElem: '',
                showM: false,
                comm: '',
                page: 0,
                totalPages:0
            }
        },
        methods: {
            doLike(data) {
                let id = data.id
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
            show(indexs, index) {
                console.log(indexs)
                this.pics = this.commentlist[index].attachments.map(item => {
                    return {
                        src: `${this.apiUrl}/attach/img/${item.id}`
                    }
                })
                setTimeout(() => {
                    this.$refs.previewer.show(indexs)
                }, 1)
            },
            loadMore() {
                // if (this.totalPages > this.page + 1) {
                    this.page++;
                    this.fetchData()
                //     setTimeout(() => {
                //         this.$refs.my_scroller.finishInfinite(2)
                //     }, 2000)
                // } else {
                //     this.$refs.my_scroller.finishInfinite(2)
                // }
            },
            gotoDetail(id, $event) {
                console.log($event);
                if ($event.target.className !== 'img' && $event.target.className !== 'hasLik' && $event.target.className !== "allContent") {
                    this.$router.push(`/commentDetail?id=${id}`)
                }
            },
            fetchData(page = this.page) {
                let para = {
                    courseId: this.$route.query.id,
                    // page: this.page,
                    size: 15*(page+1),
                    sort: 'desc'
                }
                getAllComment(para).then(res => {
                    this.commentlist = res.data.content
                    this.totalPages = res.data.totalElements;

                    // console.log( this.pics)
                }).then(res => {
                    if (this.totalPages <= 15*(this.page + 1)) {
                        this.$refs.my_scroller.finishInfinite(2)
                        this.page =Math.floor (this.totalPages/15)

                    }
                })
            },
        },
        created() {
            this.setTitle('所有评价');
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
    .totalComment {
        height: 100%;
        .vux-no-group-title {
            // padding-top:.2rem; 
            margin-top: .3rem;
            padding-bottom: .1rem; // font-size: .4rem;
        }
        .firstGroup .vux-no-group-title {
            margin-top: 0;
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
            padding-top: .2rem;
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
            margin: .2rem 0;
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
            border: 1px solid gainsboro;
        }
        .allContent {
            color: #1aad19;
            font-size: 12px;
            padding: 0 0 .3rem;
        }
        .vux-upload .vux-flexbox-item {
            padding-top: 0;
        }
        .vux-upload .vux-flexbox-item .vux-upload-bg .vux-upload-content {
            background-position: center;
        }
        .vux-upload .vux-flexbox-item .vux-upload-bg {
            width: 93%;
            margin: 0;
        }
        .weui-cell_access .weui-cell__ft:after {
            display: none;
        }
        .imgList {
            display: flex;
            margin: 0 -5px;
            position: relative;
            height: 2.4rem;
            .each {
                width: 2.2rem; // flex: 1;
                margin: 5px;
                img {
                    display: block;
                    max-width: 100%;
                }
            }
        }
        .allPic {
            position: absolute;
            bottom: 1.1rem;
            right: 0.7rem;
            width: 1rem;
            height: 0.533333rem;
            line-height: 0.533333rem;
            background-color: rgba(0, 0, 0, 0.6);
            border-radius: 0.533333rem;
            color: #fff;
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding: 0 0.17rem;
            .picMin {
                width: 0.293333rem;
                height: 0.293333rem;
                background: url(../assets/picMin.png) no-repeat 100%/cover;
            }
        }
    }
</style>
