<template>
    <div class="assistantLessonDetail">
        <view-box ref="viewBox">
            <div class="banner" v-if="content!=='已开课'">
                <img src="../assets/banner.jpg" alt="" class="courseBanner">
            </div>
            <div class="courseBar">
                <div class="course">
                    <div class="tit">创意绘画单课</div>
                    <div class="price" v-if="content=='已开课'">12节课-48课时|已报名5人</div>
                </div>
                <div class="favorite">
                    <span :style="content=='已开课'?'color:#04be02':content=='待开课'?'color:#e42b2b':content=='待审核'?'color:#7F8389':'color:#bdb9b9'">{{content}}</span>
                </div>
            </div>
            <group title=" " label-width="4.5em" v-if="content=='已开课'">
                <cell v-for="(item,index) in lessonL" :key="index" :title="`第${item}节课`" is-link style="font-size:16px" link="/teacherDoSingleDetail">
                </cell>
            </group>
            <group class="courseBox" v-if="content!=='已开课'">
                <cell class="tit" title="课程信息"></cell>
                <CellBox>
                    <div class="info_lf">
                        24节课，共48课时，满5人开课
                    </div>
                </CellBox>
            </group>
            <!-- <group class="courseBox">
        			    <cell class="tit" title="课程地点"></cell>		    
        			    <CellBox>博成路上南路世博源二区L1层星动力空间</CellBox>
        			</group> -->
            <group class="courseBox" v-if="content!=='已开课'">
                <cell class="tit" title="课程时间"></cell>
                <div v-for="(item,index) in lessonList" :key="'lesson'+index" v-if="isMore?(index>=0):(index<=2)" class="weui-cell vux-cell-box">{{item}}</div>
                <CellBox>
                    <div class="more" @click="changeMore"><span>{{isMore?'点击隐藏':'点击查看更多'}}</span><i :class="['ico_arr', isMore?'rotate90':'']"></i></div>
                </CellBox>
            </group>
            <group class="courseBox" v-if="content!=='已开课'">
                <cell class="tit" title="适用对象"></cell>
                <CellBox>3-6岁儿童</CellBox>
            </group>
            <group class="courseBox" v-if="content!=='已开课'">
                <cell class="tit" title="课程介绍"></cell>
                <CellBox>
                    <div :class="['introduce',isMoreContent?'':'lite']">
                        <p>该旨在培养学龄前儿童对美术绘画的兴趣，增强色彩认知，快乐学习。</p>
                        <video :poster="videoPoster" preload='auto' ref="video" width="100%" height="200px" x5-video-player-type="h5" x5-video-player-fullscreen="true" src="http://yun.it7090.com/video/XHLaunchAd/video01.mp4"></video>
                        <img src="../assets/play.png" alt="" class="playIcon" @click="playVideo" v-if="showM">
                        <div class="playModal" v-if="showM"></div>
                        <img src="../assets/0e3a716cf47f1eb695e5b62597dec807.jpg" alt="">
                    </div>
                </CellBox>
                <CellBox>
                    <div class="more" @click="changeMoreContent"><span>{{isMoreContent?'点击隐藏':'点击查看更多'}}</span><i :class="['ico_arr', isMoreContent?'rotate90':'']"></i></div>
                </CellBox>
            </group>
            <div style="height:1.4rem;background:#f4f4f4" v-if="content!='已开课'"></div>
            <div class="footB" v-if="content!='已开课'">
                <div class="hasChoosen" @click="goToNext(1)">通过</div>
                <div class="notChoosen" @click="goToNext(2)">不通过</div>
            </div>
        </view-box>
    </div>
</template>

<script>
    import {
        ViewBox,
        Group,
        Cell,
        CellBox,
    } from 'vux'
    import {
        pushHimOnWall
    } from '../api/api'
    import apiHost from '../../config/prod.env'
    export default {
        components: {
            ViewBox,
            Group,
            Cell,
            CellBox,
        },
        data() {
            return {
                lessonL: 50,
                data42: 4,
                videoPoster: require('../assets/0e3a716cf47f1eb695e5b62597dec807.jpg'),
                isFav: false,
                show7: false,
                content: '待开课',
                toastWord: '',
                lessonList: [],
                lessonListT: [],
                lessonListAll: ['第1节课：2018年4月28日，周六，上午10:00 - 12:00', '第1节课：2018年4月28日，周六，上午10:00 - 12:00',
                    '第1节课：2018年4月28日，周六，上午10:00 - 12:00', '第1节课：2018年4月28日，周六，上午10:00 - 12:00',
                    '第1节课：2018年4月28日，周六，上午10:00 - 12:00'
                ],
                isMore: false,
                isMoreContent: false,
                // showM:true,
            }
        },
        methods: {
            goToNext(type) {
                if (type == 1) {
                    this.$router.push('/classSetting')
                } else {
                    this.$router.push('/failReason')
                }
            },
            playVideo() {
                // this.showM = false;
                this.$refs.video.play();
            },
            changeMore() {
                if (this.isMore) {
                    this.isMore = false;
                    // this.lessonList = [...this.lessonListT];
                } else {
                    this.isMore = true;
                    // this.lessonList = [...this.lessonListAll]
                }
            },
            changeMoreContent() {
                if (this.isMoreContent) {
                    this.isMoreContent = false;
                    // this.lessonList = this.lessonListAll.slice(0,3);
                } else {
                    this.isMoreContent = true;
                    // this.lessonList = this.lessonListAll
                }
            },
        },
        created() {
            // this.lessonListT = this.lessonListAll.slice(0,3);
            this.lessonList = [...this.lessonListAll]
        },
        mounted() {
            //  document.querySelector(".tabBar2 .call").setAttribute('href','tel:4001720748');
            window.onresize = function() {
                this.$refs.video.style.width = window.innerWidth + "px";
                this.$refs.video.style.height = window.innerHeight + "px";
            }
        },
        computed: {
            showM() {
                if (this.$refs.video && this.$refs.video.paused) {
                    return false
                } else {
                    return true
                }
            }
        }
    }
</script>

<style lang="less">
    .assistantLessonDetail {
        // background: #F4F4F4;
        height: 100%;
        .weui-tab__panel {
            padding-bottom: 10px;
        }
        .courseBanner {
            width: 100%;
            height: 5.333333rem;
            display: block;
        }
        .courseBar {
            display: flex; // height: 1.733333rem;
            background: #fff;
            border-left: 7px solid #00a6e7;
            padding-left: 0.493333rem;
            align-items: center;
            .course {
                flex: 0 0 80%;
                padding: .2rem .2rem 0.1rem 0;
                .tit {
                    font-size: 0.426666rem;
                    padding-bottom: .1rem;
                }
                .price {
                    color: #FB6600;
                    font-size: 0.373333rem;
                    padding: .1rem 0;
                    line-height: 1.3;
                }
            }
            .favorite {
                width: 1.533333rem;
                height: 1.066666rem;
                display: flex;
                align-items: center;
                justify-content: center;
                span {
                    font-size: 14px;
                }
            }
        }
        .courseBox {
            .vux-no-group-title {
                .tit {
                    color: #7F8389;
                    font-size: 0.346666rem;
                }
                .moreEval {
                    color: #F76260;
                }
            }
            .weui-cells {
                margin-top: .77em;
            }
            .vux-cell-box {
                overflow: hidden;
                font-size: 0.346666rem;
                justify-content: space-between;
                .info_lf {
                    flex: 1;
                }
                .info_rt {
                    text-align: right;
                    color: #F76260;
                }
            }
            .more {
                font-size: 0.293333rem;
                color: #00a6e7;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                i {
                    display: inline-block;
                    margin: 0 3px;
                    width: 10px;
                    height: 5px;
                    background: url(../assets/triB.png) no-repeat;
                    background-size: 100% 100%;
                    transform-origin: center center;
                    transform: rotate(0);
                }
                .rotate90 {
                    transform: rotate(180deg);
                }
            }
            .introduce {
                position: relative;
                &.lite {
                    height: 11rem;
                    position: relative;
                    overflow: hidden;
                    &::after {
                        content: '';
                        position: absolute;
                        bottom: -10px;
                        width: 100%;
                        padding-top: 1rem;
                        background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0)), color-stop(70%, #fff));
                        background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 70%);
                    }
                }
                p {
                    margin: 5px 0;
                }
                video {
                    margin: 5px 0; // object-fit: cover;
                    // object-position: center center
                }
                img {
                    max-width: 100%;
                    display: block;
                    margin: 5px 0;
                }
                .playModal {
                    width: 100%;
                    height: 200px;
                    position: absolute;
                    top: 1.35rem;
                    left: 0;
                    background: rgba(0, 0, 0, 0.4)
                }
                .playIcon {
                    width: 2rem;
                    height: 2rem;
                    position: absolute;
                    top: 3rem;
                    left: 0;
                    right: 0;
                    margin: auto;
                    z-index: 1;
                }
            }
        }
        .footB {
            width: 100%;
            height: 1.3rem;
            position: fixed;
            left: 0;
            bottom: 0;
            font-size: 17px;
            z-index: 10;
            display: flex;
            div {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .hasChoosen {
            background: #00a6e7;
            color: white;
        }
        .notChoosen {
            background: #d2d2d2;
            color: #8a8383;
        }
    }
</style>