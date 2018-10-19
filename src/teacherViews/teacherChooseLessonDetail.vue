<template>
    <div class="teacherChooseLessonDetail">
        <view-box ref="viewBox">
            <div class="banner">
                <img :src="`${apiUrl}/attach/img/${detail.picId}`" alt="" class="courseBanner">
            </div>
            <div class="courseBar">
                <div class="course">
                    <div class="tit">{{detail.name}}</div>
                </div>
            </div>
            <group class="courseBox">
                <cell class="tit" title="课程信息"></cell>
                <CellBox>
                    <div class="info_lf">
                        {{detail.courseNum}}节课, 共{{detail.totalTime}}课时, 满{{detail.minStuNum}}人开课
                    </div>
                </CellBox>
            </group>
            <!-- <group class="courseBox">
        			    <cell class="tit" title="课程地点"></cell>		    
        			    <CellBox>博成路上南路世博源二区L1层星动力空间</CellBox>
        			</group> -->
            <!-- <group class="courseBox" >
        			    <cell class="tit" title="课程时间"></cell>		    
        			    <div v-for="(item,index) in lessonList" :key="'lesson'+index" v-if="isMore?(index>=0):(index<=2)" class="weui-cell vux-cell-box">{{item}}</div>
        			    <CellBox><div class="more"  @click="changeMore"><span>{{isMore?'点击隐藏':'点击查看更多'}}</span><i :class="['ico_arr', isMore?'rotate90':'']"></i></div></CellBox>
        			</group> -->
            <group class="courseBox">
                <cell class="tit" title="适用对象"></cell>
                <CellBox>{{detail.age}}{{detail.age=='成人'?'':'儿童'}}</CellBox>
            </group>
            <group class="courseBox mb2">
                <cell class="tit" title="课程介绍"></cell>
                <CellBox>
                    <foldable height="290" :async='true'>
					<div class="introduce" >
						<video v-if="detail.videoId" preload='auto' ref="video" width="100%" height="200px" x5-video-player-type="h5" x5-video-player-fullscreen="true" :src="`${apiUrl}/attach/video/${detail.videoId}`"></video>
						<img src="../assets/play.png" alt="" class="playIcon" @click="playVideo" v-if="showM&&detail.videoId">
						<div class="playModal" v-if="showM&&detail.videoId"></div>
						<div v-html="detail.description"></div>
                        <div class="desImg" v-if="detail.attachments.length!==0">
                            <img v-for="(item,index) in detail.attachments" :key="'i'+index" :src="`${apiUrl}/attach/img/${item.id}`" alt="" style="max-width:100%">
                        </div>
					</div>
                    </foldable>
				</CellBox>
				<!-- <CellBox v-if="isOh">
					<div class="more" @click="changeMoreContent"><span>{{isMoreContent?'点击隐藏':'点击查看更多'}}</span><i :class="['ico_arr', isMoreContent?'rotate90':'']"></i></div>
				</CellBox> -->
            </group>
            <!-- <div style="height:2.4rem;background:#f4f4f4"></div> -->
            <!-- </scroller> -->
        </view-box>
            <div class="footB hasChoosen" @click="goToEdit">
                编辑
            </div>
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
        getTeacherLessonDetail
    } from '../api/api'
    import foldable from '../components/foldable'
    export default {
        components: {
            ViewBox,
            Group,
            Cell,
            CellBox,
            foldable
        },
        data() {
            return {
                detail: {
                    picId:'',
					name: '',
					courseNum: '',
					minStuNum: '',
                    age: '',
                    applyAge:{
                        label:''
                    },
					status:{
						name:'',
						label:''
                    },
                    type:{
                        name:'',
                    },
                    attachments:[]
                },
                oh:'',
				isOh:false,                
                videoPoster: require('../assets/0e3a716cf47f1eb695e5b62597dec807.jpg'),
                show7: false,
                content: '已开课',
                isMore: false,
                isMoreContent: false,
                // showM:true,
            }
        },
        methods: {
            goToEdit() {
                this.$router.push({
                    path:`/teacherPublishHome?id=${this.$route.query.id}`,
                    query:{
                        title:this.detail.name,
                        type:this.detail.type.name
                    }
                })
            },
            playVideo() {
                // this.showM = false;
                this.$refs.video.play();
            },
            // changeMore() {
            //     if (this.isMore) {
            //         this.isMore = false;
            //         // this.lessonList = [...this.lessonListT];
            //     } else {
            //         this.isMore = true;
            //         // this.lessonList = [...this.lessonListAll]
            //     }
            // },
            changeMoreContent() {
                if (this.isMoreContent) {
                    this.isMoreContent = false;
                    // this.lessonList = this.lessonListAll.slice(0,3);
                } else {
                    this.isMoreContent = true;
                    // this.lessonList = this.lessonListAll
                }
            },
            fetchData(){
				let id = this.$route.query.id;
				getTeacherLessonDetail(id).then(res=>{
					let data = res.data;
					this.detail = {
                        picId:data.picId,
						name: data.name,
						courseNum: data.courseNum,
						totalTime: data.totalTime||0,
						minStuNum: data.minStuNum||0,
						age: data.applyAge.label,
						description: data.description,
                        videoId: data.video ? data.video.filePath : '',
                        type:data.type?data.type:{name:''},
                        attachments:data.attachments?data.attachments:[]
					}
				})
			}
        },
        created() {
            this.setTitle('课程内容详情')
            this.fetchData();
        },
        mounted() {
            //  document.querySelector(".tabBar2 .call").setAttribute('href','tel:4001720748');
            window.onresize = function() {
                this.$refs.video.style.width = window.innerWidth + "px";
                this.$refs.video.style.height = window.innerHeight + "px";
            }
            setTimeout(() => {
				this.oh = document.getElementsByClassName('introduce')[0].offsetHeight;
				if (this.oh <= 390) {
                    this.isMoreContent = true;
					this.isOh = false
                    
				} else {
                    this.isMoreContent = false;
					this.isOh = true
                    
				}
			}, 3000);
        },
        computed: {
            showM() {
                if (this.$refs.video && this.$refs.video.paused) {
                    return false
                } else {
                    return true
                }
            }
        },
        watch: {
			isMoreContent(curVal, oldVal) {
				if (curVal) {
					if (this.oh > 390) {
						document.getElementsByClassName('introduce')[0].style.cssText += 'height:auto'
					}
				} else {
					console.log(458)
					if (this.oh > 390) {
						document.getElementsByClassName('introduce')[0].style.cssText += 'height:390px'
					}
				}
            },
		}
    }
</script>

<style lang="less">
    p {
        padding: 0;
        margin: 0;
    }
    .teacherChooseLessonDetail {
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
            padding-left: 8px;
            align-items: center;
            .course {
                flex: 0 0 80%;
                padding: .2rem .2rem 0.1rem 0;
                .tit {
                    font-size: 0.426666rem;
                    padding-bottom: .1rem;
                }
            }
        }
        .mb2{
            margin-bottom:2rem;
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
            .tips {
                font-size: 0.293333rem;
                color: #7F8389;
                margin: 0 0.4rem 10px;
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
                    width: 0.213333rem;
                    height: 0.133333rem;
                    background: url(../assets/triB.png) no-repeat;
                    background-size: 100% 100%;
                    transform-origin: center center; // transform: rotate(360deg);
                }
                .rotate90 {
                    transform: rotate(180deg);
                }
            }
            .introduce {
                position: relative;
                &.h390{
                    height: auto;
                    }
                &.lite {
                    height: 390px;
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
                    top: 5px;
                    left: 0;
                    background: rgba(0, 0, 0, 0.4)
                }
                .playIcon {
                    width: 2rem;
                    height: 2rem;
                    position: absolute;
                    top: 2rem;
                    left: 0;
                    right: 0;
                    margin: auto;
                    z-index: 1;
                }
                .desImg{
                    width: 100%;
                }
            }
        }
        .footB {
            width: 100%;
            height: 1.3rem;
            line-height: 1.3rem;
            text-align: center;
            position: fixed;
            left: 0;
            bottom: 0;
            font-size: 17px;
            z-index: 10;
        }
        .hasChoosen {
            background: #00a6e7;
            color: white;
        }
    }
</style>