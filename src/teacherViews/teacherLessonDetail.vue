<template>
	<div class="teacherLessonDetail">
		<view-box ref="viewBox">
			<!-- <div class="banner">
							<img src="../assets/banner.jpg" alt="" class="courseBanner">
						</div> -->
			<div class="courseBar">
				<div class="course">
					<div class="tit">{{detail.name}}</div>
					<div class="price" v-if="detail.status.name=='PROCESS'">
						{{detail.courseNum}}节课 - {{detail.totalTime}}课时 | 已报名{{detail.stuNum}}人
					</div>
					<div class="price" v-if="detail.status.name=='PASS'">
						根据您的情况该课程费用约为{{detail.price}}元 | 已报名{{detail.stuNum}}人
					</div>
					<div class="price" v-if="detail.status.name=='FAIL'||detail.status.name=='CANCEL'">
						取消原因:{{detail.reason}}
					</div>
				</div>
				<div class="favorite">
					<span :style="detail.status.name=='PROCESS'?'color:#04be02':detail.status.name=='PASS'?'color:#e42b2b':detail.status.name=='WAIT'?'color:#aaadb1':'color:#bdb9b9'">
								{{detail.status.name=='FAIL'?'已取消':detail.status.label}}</span>
				</div>
			</div>
			<!-- 已开课的列表 -->
			<group title=" " label-width="4.5em" v-if="detail.status.name=='PROCESS'">
				<cell v-for="(item,index) in lessonL" :key="index" :title="`第${index+1}节课`" is-link style="font-size:16px" :link="`/teacherDoSingleDetail?id=${item.id}&num=${index+1}`">
				</cell>
			</group>
			<!-- 其他情况 -->
			<group class="courseBox" v-if="detail.status.name!=='PROCESS'">
				<cell class="tit" title="课程信息"></cell>
				<CellBox>
					<div class="info_lf">
						{{detail.courseNum}}节课, 共{{detail.totalTime}}课时, 满{{detail.minStuNum||0}}人开课
					</div>
				</CellBox>
			</group>
			<!-- <group class="courseBox">
						    <cell class="tit" title="课程地点"></cell>		    
						    <CellBox>博成路上南路世博源二区L1层星动力空间</CellBox>
						</group> -->
			<group class="courseBox" v-if="detail.status.name!=='PROCESS'">
				<cell class="tit" title="课程时间"></cell>
				<div v-for="(item,index) in lessonList" :key="'lesson'+index" v-if="isMore?(index>=0):(index<=2)" class="weui-cell vux-cell-box">
					第{{item.classNum}}节课: {{item.date.substring(0,4)}}年{{item.date.substring(5,7)}}月{{item.date.substring(8,10)}}日, {{item.week}}, {{item.beginTimeStr.split(':')[0]>12?'下午':'上午'}}{{item.beginTimeStr}}-{{item.endTimeStr}}
				</div>
				<CellBox v-if="lessonList.length>3">
					<div class="more" @click="changeMore"><span>{{isMore?'点击隐藏':'点击查看更多'}}</span><i :class="['ico_arr', isMore?'rotate90':'']"></i></div>
				</CellBox>
			</group>
			<group class="courseBox" v-if="detail.status.name!=='PROCESS'">
				<cell class="tit" title="适用对象"></cell>
				<CellBox>{{detail.age}}{{detail.age=='成人'?'':'儿童'}}</CellBox>
			</group>
			<!-- <group class="courseBox">
						    <cell class="tit" title="授课老师"></cell>		    
						    <cell-box is-link link="/classTeacher">
					        	<div class="teacher">
					        		<div class="pho"><img src="../assets/pho.jpg" alt=""></div>
					        		<div class="info">
					        			<div class="name">代方方</div>
					        			<div class="schoolAge">6年教齡</div>
					        			<p>上海大学美术学院油画硕士</p>
					        		</div>
					        	</div>
					      	</cell-box>
						</group> -->
			<group class="courseBox" v-if="detail.status.name!=='PROCESS'">
				<cell class="tit" title="课程介绍"></cell>
				<CellBox>
					<div :class="['introduce',isMoreContent?'h390':'lite']">
						<video v-if="detail.videoId" preload='auto' ref="video" width="100%" height="200px" x5-video-player-type="h5" x5-video-player-fullscreen="true" :src="`${apiUrl}/attach/video/${detail.videoId}`"></video>
						<img src="../assets/play.png" alt="" class="playIcon" @click="playVideo" v-if="showM&&detail.videoId">
						<div class="playModal" v-if="showM&&detail.videoId"></div>
						<div v-html="detail.description"></div>
						<div class="desImg" v-if="detail.attachments.length!==0">
                            <img v-for="(item,index) in detail.attachments" :key="'i'+index" :src="`${apiUrl}/attach/img/${item.id}`" alt="" style="max-width:100%">
                        </div>
					</div>
				</CellBox>
				<CellBox v-if="isOh">
					<div class="more" @click="changeMoreContent"><span>{{isMoreContent?'点击隐藏':'点击查看更多'}}</span><i :class="['ico_arr', isMoreContent?'rotate90':'']"></i></div>
				</CellBox>
			</group>
			<!-- <group class="courseBox">
						    <cell class="tit" title="课程评价">
						    	<div class="moreEval" @click="gotoMoveComment">更多评价（288条）</div>
						    </cell>		   
						    <CellBox link="/commentDetail">
						    	<div class="assess">
						    		<div class="pho"><img src="../assets/pho.jpg" alt=""></div>
						    		<div class="info">
						    			<div class="hd">
						    				<div class="name">Kino的天空</div>
									    	<div class="data">4月17日 </div>
									    </div>
						    			<div class="rater">
						    				<span style="vertical-align: top;">总体</span>
			                    <img src="../assets/star.png" alt="" v-for="(item,index) in data42" :key="index+'a'" class="star"><img src="../assets/starg.png" alt="" v-for="(item,index) in (5-data42)" :key="index+'b'" v-if="item" class="star">
											
									    </div>
						    			<p>我参加了周六上午的国画课，小朋友年纪小，希望从小培养，上课过程很开心！</p>
						    			<div class="imgList">
						    				<div class="each"><img src="../assets/pho.jpg" alt="" class="img"></div>
						    				<div class="each"><img src="../assets/pho.jpg" alt="" class="img"></div>
						    				<div class="each"><img src="../assets/pho.jpg" alt="" class="img"></div>
						    				<div class="allPic">
						    					<i class="picMin"></i>8
						    				</div>
						    			</div>
						    			<div class="bd">
						    				<div class="browse">浏览 3300</div>
						    				<div class="other">
						    					<span class="zan"><i class="ico_zan"></i>3</span>
						    					<span class="reply"><i class="ico_reply"></i>1</span>
						    				</div>
						    			</div>
						    		</div>
						    	</div>
						    </CellBox>
						</group> -->
			<!-- <toast v-model="show7" type="text" :text="toastWord" position='middle'></toast> -->
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
		lessonDetail,
		getMyLessonSituation
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
				isOh: false,
				detail: {
					name: '',
					price: '',
					courseNum: '',
					minStuNum: '',
					stuNum: '',
					// address: '',
					age: '',
					status: {
						name: '',
						label: ''
					},
					reason: '',
					attachments:[]
				},
				oh: '',
				lessonL: 0,
				data42: 4,
				videoPoster: require('../assets/0e3a716cf47f1eb695e5b62597dec807.jpg'),
				isFav: false,
				show7: false,
				content: '待开课',
				toastWord: '',
				lessonList: [],
				isMore: false,
				isMoreContent: false,
				// showM:true,
			}
		},
		methods: {
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
			getList() {
				let para = {
					id: this.$route.query.id
				}
				getMyLessonSituation(para).then(res => {
					// console.log(res)
					this.lessonL = res.data.details;
				})
			},
			fetchData() {
				let id = this.$route.query.id;
				lessonDetail(id).then(res => {
					console.log(res)
					let data = res.data;
					this.lessonList = data.schedules
					this.detail = {
						name: data.name,
						price: data.price,
						courseNum: data.courseNum,
						totalTime: data.totalTime,
						minStuNum: data.minStuNum,
						stuNum: data.stuNum,
						// address: data.address,
						status: data.status,
						age: data.applyAge.label,
						description: data.description,
						videoId: data.video ? data.video.filePath : '',
						reason: data.reason,
                        attachments:data.attachments?data.attachments:[]
					}
					if (this.detail.status.name == 'PROCESS') {
						this.getList()
					}
				})
			}
		},
		created() {
			this.setTitle('课程详情')
			this.fetchData()
			// this.lessonListT = this.lessonListAll.slice(0,3);
		},
		mounted() {
			//  document.querySelector(".tabBar2 .call").setAttribute('href','tel:4001720748');
			window.onresize = function() {
				if (this.$refs.video) {
					this.$refs.video.style.width = window.innerWidth + "px";
					this.$refs.video.style.height = window.innerHeight + "px";
				}
			}
			setTimeout(() => {
				if (this.detail.status.name !== 'PROCESS') {
					this.oh = document.getElementsByClassName('introduce')[0].offsetHeight;
					if (this.oh < 390) {
						this.isMoreContent = true;
						this.isOh = false
					} else {
						this.isMoreContent = false;
						this.isOh = true
					}
				}
			}, 1000);
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
					if (this.oh > 390) {
						document.getElementsByClassName('introduce')[0].style.cssText += 'height:390px'
					}
				}
			}
		}
	}
</script>

<style lang="less">
	p {
		padding: 0;
		margin: 0;
	}
	.teacherLessonDetail {
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
				padding: .2rem .2rem 0 0;
				.tit {
					font-size: 0.426666rem;
					padding-bottom: .1rem;
				}
				.price {
					color: #FB6600;
					font-size: 12px;
					padding: .1rem 0 .3rem;
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
					font-size: 15px;
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
				&.h390{
                    height: auto;
                    }
				&.lite {
                    height: 390px;
					// height: 11rem;
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
	}
</style>