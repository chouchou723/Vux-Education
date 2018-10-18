<template>
	<div class="courseInfo">
		<view-box ref="viewBox">
			<group class="courseBox2">
				<cell class="tit" title="课程信息"></cell>
				<CellBox class="courseBar">
					<div class="course">
						<div class="tit">{{detail.name}}</div>
						<div class="info">{{detail.courseNum}}节课，共{{detail.totalTime}}课时</div>
					</div>
					<x-button mini plain type="primary" :link="`/doComment?id=${$route.query.id}`">我要评价</x-button>
				</CellBox>
			</group>
			<group class="courseBox">
				<cell class="tit" title="时间地点"></cell>
				<CellBox>
					<div class="con">
						<p>时间：{{detail.beginTimeStr.split(':')[0]>12?'下午':'上午'}}{{detail.beginTimeStr}}-{{detail.endTimeStr}}</p>
						<p>地点：{{detail.address}}</p>
					</div>
				</CellBox>
			</group>
			<group class="courseBox">
				<cell class="tit" title="课程日历"></cell>
				<div class="calendarBox">
					<Calendar ref="Calendar" :sundayStart="true" :markDateMore="arr" :markDate="arr2" agoDayHide=1530115200 v-on:changeMonth="changeDate"></Calendar>
					<flexbox>
						<flexbox-item>
							<div class="flex-demo"><i class="circle_1"></i>已去上课</div>
						</flexbox-item>
						<flexbox-item>
							<div class="flex-demo"><i class="circle_2"></i>没去上课</div>
						</flexbox-item>
						<flexbox-item>
							<div class="flex-demo"><i class="circle_3"></i>即将上课</div>
						</flexbox-item>
					</flexbox>
				</div>
			</group>
			<group class="courseBox">
				<cell class="tit" title="上课情况"></cell>
				<CellBox is-link :link="`/classSituation?id=${$route.query.id}`">
					查看每节课的签到情况和老师评语
				</CellBox>
			</group>
			<group class="courseBox">
				<cell class="tit" title="授课老师"></cell>
				<cell-box is-link :link="`/classTeacher?id=${detail.teacherId}`">
					<div class="teacher">
						<div class="pho"><img :src="`${apiUrl}/attach/img/${detail.teacherPid}`" alt=""></div>
						<div class="info">
							<div class="name">{{detail.teacher}}</div>
							<div class="schoolAge">{{detail.experience}}年教齡</div>
							<p>{{detail.edu}}</p>
						</div>
					</div>
				</cell-box>
			</group>
			<group class="courseBox">
				<cell class="tit" title="课程介绍"></cell>
				<CellBox>
					<div :class="['introduce',isMoreContent?'':'lite']">
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
					<div class="more" @click="changeMoreContent">
						<span>{{isMoreContent?'点击隐藏':'点击查看更多'}}</span><i :class="['ico_arr', isMoreContent?'rotate90':'']"></i>
					</div>
				</CellBox>
			</group>
			<group class="courseBox">
				<cell class="tit" title="课程评价">
					<div class="moreEval" v-if="comment.commentNum>0" @click="gotoMoveComment">更多评价（{{comment.commentNum}}条）</div>
				</cell>
				<CellBox @click.native="gotoDetail" v-if="comment.commentNum>0">
					<div class="assess">
						<div class="pho"><img :src="`${apiUrl}/attach/img/${comment.photo}/SQUARE`" alt=""></div>
						<div class="info">
							<div class="hd">
								<div class="name">{{comment.name}}</div>
								<div class="data">{{comment.date.substring(5,7)}}月{{comment.date.substring(8,10)}}日</div>
							</div>
							<div class="rater">
								<span style="vertical-align: top;">总体</span>
								<img src="../assets/star.png" alt="" v-for="(item,index) in comment.overallScore" :key="index+'a'" class="star"><img src="../assets/starg.png" alt="" v-for="(item,index) in (5-comment.overallScore)" :key="index+'b'" v-if="item" class="star">
								<!-- <rater v-model="data42" active-color="#FFBE00" :font-size="15" disabled></rater> -->
							</div>
							<p style="padding:.1rem 0">{{comment.content}}</p>
							<div class="imgList" v-if="commentPic.length>0">
								<div class="each" v-for="(pic,index) in commentPic" :key="'p'+index" @click="show(index)" v-if="index<3">
									<img :src="`${apiUrl}/attach/img/${pic.id}/SQUARE`" alt="" class="img" >
								</div>
								<div class="allPic" v-if="commentPic.length>3">
									<i class="picMin"></i>{{commentPic.length}}
								</div>
							</div>
							<div class="bd">
								<div class="browse">浏览 {{comment.browseNum}}</div>
								<div class="other">
									<span class="zan"><i :class="['ico_zan',comment.hasLiked?'ico_zaned':'']"></i>{{comment.likeNum}}</span>
									<span class="reply"><i class="ico_reply"></i>{{comment.replyNum}}</span>
								</div>
							</div>
						</div>
					</div>
				</CellBox>
				<CellBox v-else>
					<div class="noComment">
						暂无评价
					</div>
				</CellBox>
			</group>
		</view-box>
		<div v-transfer-dom>
			<previewer :list="pics" ref="previewer"></previewer>
		</div>
	</div>
</template>

<script>
	import {
		XButton,
		Flexbox,
		FlexboxItem,
		ViewBox,
		Group,
		Cell,
		CellBox,
		Previewer,
		TransferDom,
	} from 'vux'
	import {
		lessonDetail,
		lessonDateStatus
	} from '../api/api'
	import Calendar from '../components/calendar';
	import apiHost from '../../config/prod.env'
	export default {
		directives: {
			TransferDom
		},
		components: {
			XButton,
			Calendar,
			Flexbox,
			FlexboxItem,
			ViewBox,
			Group,
			Cell,
			CellBox,
			Previewer
		},
		data() {
			return {
				detail: {
					name: '',
					price: '',
					courseNum: '',
					hours: '',
					minStuNum: '',
					stuNum: '',
					address: '',
					age: '',
					teacher: '',
					teacherPid: '',
					experience: '',
					edu: '',
					beginTimeStr: '',
					endTimeStr: '',
					teacherId: '',
					attachments:[]
				},
				comment: {
					content: '',
					name: '',
					photo: '',
					overallScore: 0,
					date: '',
					replyNum: 0,
					likeNum: 0,
					browseNum: 0,
					id: ''
				},
				pics: [],
				commentPic: [{
					id: ''
				}],
				data42: 3,
				isMoreContent: true,
				isOh:false,
				videoPoster: require('../assets/0e3a716cf47f1eb695e5b62597dec807.jpg'),
				arr2: [],
				arr: [],
				oh:''
			}
		},
		methods: {
			show(index) {
				this.$refs.previewer.show(index)
			},
			gotoDetail($e) {
				console.log($e);
				if ($e.target.className !== 'img') {
					this.$router.push(`/commentDetail?id=${this.comment.id}`)
				}
			},
			changeMoreContent() {
				if (this.isMoreContent) {
					this.isMoreContent = false;
					// this.lessonList = this.lessonListAll.slice(0, 3);
				} else {
					this.isMoreContent = true;
					// this.lessonList = this.lessonListAll
				}
			},
			gotoMoveComment() {
				this.$router.push(`/totalComment?id=${this.$route.query.id}`)
			},
			playVideo() {
				// console.log(this.$refs.video.paused)
				// this.showM = false;
				if(this.$refs.video.paused){
					this.$refs.video.play();
				}else{
					this.$refs.video.pause()
				}
			},
			clickDay(data) {
				//   console.log('选中了', data); //选中某天
				//   this.$toast('选中了' + data);
			},
			clickToday(data) {
				console.log('跳到了本月今天', data); //跳到了本月
			},
			changeDate(data) {
				let date = data.split('/')[1];
				this.lessonDateStatus(date);
				console.log('左右点击切换月份', data); //左右点击切换月份
			},
			format(date, day) {
				date = new Date(date);
				return `${date.getFullYear()}-${date.getMonth() + 1}-${day}`;
			},
			fetchData() {
				let id = this.$route.query.id
				lessonDetail(id).then(res => {
					let data = res.data;
					// this.banner = data.picId;
					// this.isFav = data.hasCollection;
					this.lessonList = data.schedules
					this.detail = {
						name: data.name,
						price: data.price,
						courseNum: data.courseNum,
						totalTime: data.totalTime,
						minStuNum: data.minStuNum,
						stuNum: data.stuNum,
						address: data.address,
						age: data.applyAge.label,
						teacher: data.teacher.name,
						teacherPid: data.teacher.picId,
						experience: data.teacher.experience,
						edu: data.teacher.edu,
						description: data.description,
						videoId: data.video ? data.video.filePath : '',
						beginTimeStr: data.schedules[0].beginTimeStr,
						endTimeStr: data.schedules[0].endTimeStr,
						teacherId: data.teacher.id,
                        attachments:data.attachments?data.attachments:[]
					}
					let commentData = data.comment;
					if (commentData) {
						this.comment = {
							content: commentData.content,
							name: commentData.nickname,
							photo: commentData.photo,
							overallScore: commentData.overallScore,
							date: commentData.date,
							replyNum: commentData.replyNum,
							likeNum: commentData.likeNum,
							browseNum: commentData.browseNum,
							id: commentData.id,
							commentNum: commentData.commentNum
						}
						this.commentPic = commentData.attachments
						this.pics = commentData.attachments.map(item => {
							return {
								src: `${this.apiUrl}/attach/img/${item.id}`
							}
						})
					}
					// console.log(para)
				})
			},
			lessonDateStatus(date) {
				let id = this.$route.query.id;
				let month = new Date(date).getMonth() + 1;
				lessonDateStatus(id, {
					month: month
				}).then(res => {
					if (res.data.length != 0) {
						this.arr = res.data.map(item => {
							return {
								date: item.date.substring(0, 10),
								className: item.status.name === 'ABSENT' ? 'mark3' : item.status.name === 'ATTEND' ? 'mark1' : 'mark2'
							}
						})
					}
				})
			}
		},
		mounted() {
			window.onresize = function() {
				if (this.$refs.video) {
					this.$refs.video.style.width = window.innerWidth + "px";
					this.$refs.video.style.height = window.innerHeight + "px";
				}
			}
			setTimeout(() => {
				this.oh = document.getElementsByClassName('introduce')[0].offsetHeight;
				if (this.oh < 390) {
					console.log(oh, 123)
					this.isMoreContent = true;
					this.isOh = false
				} else {
					this.isMoreContent = false;
					this.isOh = true
				}
			}, 500);
		},
		computed: {
			showM() {
				if (this.$refs.video && this.$refs.video.paused) {
					return true
				} else if(this.$refs.video && !this.$refs.video.paused){
					return false
				}else{
					return true
				}
			}
		},
		created() {
			this.setTitle("课程信息")
			this.fetchData()
			this.lessonDateStatus(new Date())
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
		margin: 0;
		padding: 0;
	}
	.courseInfo {
		height: 100%;
		.weui-tab__panel {
			padding: 0 !important;
		}
		.courseBox2 {
			.weui-cells {
				margin-top: 0;
				.tit {
					font-size: 0.346666rem;
					color: #7F8389;
				}
			}
			.weui-cell:before {
				left: 10px !important;
			}
		}
		.courseBar {
			display: flex;
			clear: both;
			height: 1.56rem;
			background: #fff;
			border-left: 5px solid #1AAD19;
			padding-left: 10px !important;
			align-items: center;
			justify-content: space-between;
			.course {
				flex: 1;
				.tit {
					color: #000;
					font-size: 0.346666rem;
				}
				.info {
					margin-top: 8px;
					color: #7F8389;
					font-size: 0.293333rem;
				}
			}
		}
		.courseBox {
			.noComment {
				width: 100%;
				height: 2rem;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 18px;
				color: #999;
			}
			.weui-cells {
				margin: .77em 0;
				.tit {
					font-size: 0.346666rem;
					color: #7F8389;
				}
				.moreEval {
					color: #F76260;
				}
				.vux-cell-box {
					font-size: 0.346666rem;
					.con {
						line-height: 2em;
					}
					.more {
						font-size: 0.293333rem;
						color: #1AAD19;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						i {
							display: inline-block;
							margin: 0 3px;
							width: 0.213333rem;
							height: 0.133333rem;
							background: url(../assets/triS.png) no-repeat;
							background-size: 100% 100%;
							transform-origin: center center;
							transform: rotate(180deg);
						}
						.rotate90 {
							transform: rotate(0deg);
						}
					}
				}
			}
			.teacher {
				display: flex;
				align-items: center;
				.pho {
					width: 1.84rem;
					height: 1.84rem;
					margin-right: 0.48rem;
					border-radius: 50%;
					border: 1px solid gainsboro;
					img {
						display: block;
						width: 100%;
					}
				}
				.info {
					font-size: 0.293333rem;
					line-height: 1.8em;
					.name {
						font-size: 0.346666rem;
						font-weight: bold;
					}
					.schoolAge {
						color: #7F8389;
					}
					p {
						margin: 0;
						color: #000;
					}
				}
			}
			.introduce {
				position: relative;
				&.lite {
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
					margin: 5px 0;
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
                    padding: 0 10px;
                }
			}
			.assess {
				width: 100%;
				display: flex;
				.pho {
					width: 1.84rem;
					height: 1.84rem;
					margin-right: 0.266666rem;
					flex:0 0 1.84rem;
					img {
						display: block;
						width: 100%;
						border-radius: 50%;
					}
				}
				.info {
					// width: 100%;
					flex:1;
					.hd {
						display: flex;
						justify-content: space-between;
						.data {
							color: #7F8389;
							font-size: 0.293333rem;
						}
					}
					.rater {
						color: #7F8389;
						font-size: 0.293333rem;
						margin: 0.133333rem 0;
					}
					.star {
						width: 12px;
						height: 12px;
						margin-right: .1rem;
					}
					.imgList {
						display: flex;
						margin: 0 -5px;
						position: relative;
						height: 2.4rem;
						.each {
							flex:0 0 2.2rem;
							width: 2.2rem; // flex: 1;
							margin: 5px;
							img {
								display: block;
								max-width: 100%;
							}
						}
						.allPic {
							position: absolute;
							right: 10px;
							bottom: 10px;
							width: 1rem;
							height: 0.533333rem;
							text-align: center;
							background-color: rgba(0, 0, 0, 0.6);
							border-radius: 0.533333rem;
							color: #fff;
							font-size: 12px;
							display: flex;
							justify-content: space-between;
							align-items: center;
							box-sizing: border-box;
							padding: 0 0.2rem;
							.picMin {
								display: inline-block;
								width: 0.293333rem;
								height: 0.293333rem;
								background: url(../assets/picMin.png) no-repeat;
								background-size: 100% 100%;
							}
						}
					}
					.bd {
						display: flex;
						justify-content: space-between;
						color: #7F8389;
						font-size: 0.293333rem;
						margin-top: .1rem;
						.zan {
							.ico_zan {
								display: inline-block;
								width: 0.266666rem;
								height: 0.293333rem;
								background: url(../assets/zan.png) no-repeat;
								background-size: 100% 100%;
								margin-right: 3px;
								vertical-align: middle;
								margin-top: -2px;
							}
						}
						.reply {
							margin-left: 10px;
							.ico_reply {
								display: inline-block;
								width: 0.266666rem;
								height: 0.293333rem;
								background: url(../assets/reply.png) no-repeat;
								background-size: 100% 100%;
								margin-right: 3px;
								vertical-align: middle;
								margin-top: -2px;
							}
						}
					}
				}
			}
		}
		.calendarBox {
			padding: 0 15px;
			.vux-flexbox {
				color: #7F8389;
				font-size: 0.293333rem;
				border-top: 1px solid #E5E5E5;
				padding: 15px 0;
				.circle_1 {
					display: inline-block;
					width: 0.28rem;
					height: 0.28rem;
					border-radius: 50%;
					margin: 0 10px;
					background: #09BB07;
				}
				.circle_2 {
					display: inline-block;
					width: 0.28rem;
					height: 0.28rem;
					border-radius: 50%;
					margin: 0 10px;
					background: #F76260;
				}
				.circle_3 {
					display: inline-block;
					width: 0.28rem;
					height: 0.28rem;
					border-radius: 50%;
					margin: 0 10px;
					background: #D8D8D8;
				}
			}
		}
		.wh_container {
			.wh_content_item {
				.mark1 {
					background: #09BB07;
					border-radius: 50%;
					color: #fff;
				}
				.mark2 {
					background: #D8D8D8;
					border-radius: 50%;
					color: #fff;
				}
				.mark3 {
					background: #F76260;
					border-radius: 50%;
					color: white;
				}
			}
		}
	}
</style>