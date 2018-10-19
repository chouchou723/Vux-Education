<template>
	<div class="courseDetail">
		<view-box ref="viewBox">
			<div class="banner">
				<img :src="`${apiUrl}/attach/img/${banner}`" alt="" class="courseBanner">
			</div>
			<div class="courseBar">
				<div class="course">
					<div class="tit">{{detail.name}}</div>
					<div class="price">{{detail.price}}元</div>
				</div>
				<div :class="['favorite',isFav?'selected':'']">
					<i class="ico_favorite" @click="changeFav"></i>
					<span>收藏</span>
				</div>
			</div>
			<group class="courseBox">
				<cell class="tit" title="课程信息"></cell>
				<CellBox>
					<div class="info_lf">
						{{detail.courseNum}}节课, 共{{detail.totalTime}}课时, 满{{detail.minStuNum}}人开课
					</div>
					<div class="info_rt">
						已报名{{detail.stuNum}}人
					</div>
				</CellBox>
				<div class="tips">
					温馨提示：本课程满{{detail.minStuNum}}人开课，在开课前1个工作日内若报名人数不足，课程将取消，已付款金额或积分将按原付款方式退回（最快1个工作日到账）
				</div>
			</group>
			<group class="courseBox">
				<cell class="tit" title="课程地点"></cell>
				<CellBox>{{detail.address}}</CellBox>
			</group>
			<group class="courseBox">
				<cell class="tit" title="课程时间"></cell>
				<div v-for="(item,index) in lessonList" :key="'lesson'+index" v-if="isMore?(index>=0):(index<=2)" class="weui-cell vux-cell-box">
					第{{item.classNum}}节课: {{item.date.substring(0,4)}}年{{item.date.substring(5,7)}}月{{item.date.substring(8,10)}}日, {{item.week}}, {{item.beginTimeStr.split(':')[0]>12?'下午':'上午'}}{{item.beginTimeStr}}-{{item.endTimeStr}}</div>
				<CellBox v-if="lessonList.length>3">
					<div class="more" @click="changeMore"><span>{{isMore?'点击隐藏':'点击查看更多'}}</span><i :class="['ico_arr', isMore?'rotate90':'']"></i></div>
				</CellBox>
			</group>
			<group class="courseBox">
				<cell class="tit" title="适用对象"></cell>
				<CellBox>{{detail.age}}{{detail.age=='成人'?'':'儿童'}}</CellBox>
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
									<img :src="`${apiUrl}/attach/img/${pic.id}/SQUARE`" alt="" class="img">
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
			<tabbar class="tabBar2" slot="bottom">
				<tabbar-item class="call">
					<img slot="icon" src="../assets/bi4.png">
					<span slot="label">客服电话</span>
				</tabbar-item>
				<tabbar-item class="buy" @click.native="gotoBuy">
					<span slot="label">购买课程</span>
				</tabbar-item>
			</tabbar>
			<!-- <toast v-model="show7" type="text" :text="toastWord" position='middle'></toast> -->
		</view-box>
		<div v-transfer-dom>
			<previewer :list="pics" ref="previewer"></previewer>
		</div>
	</div>
</template>

<script>
	import {
		ViewBox,
		Group,
		Cell,
		CellBox,
		Tabbar,
		TabbarItem,
		Previewer,
		TransferDom,
	} from 'vux'
	import {
		lessonDetail,
		doCollect
	} from '../api/api'
	import apiHost from '../../config/prod.env'
	export default {
		directives: {
			TransferDom
		},
		components: {
			ViewBox,
			Group,
			Cell,
			CellBox,
			Tabbar,
			TabbarItem,
			Previewer
		},
		data() {
			return {
				isOh:false,
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
				banner: '',
				commentPic: [{
					id: ''
				}],
				data42: 4,
				videoPoster: require('../assets/0e3a716cf47f1eb695e5b62597dec807.jpg'),
				isFav: false,
				show7: false,
				toastWord: '',
				lessonList: [],
				isMore: false,
				isMoreContent: false,
				oh:'',
				// showM:true,
			}
		},
		methods: {
			gotoBuy(){
				let order = {
					name:this.detail.name,
					price:this.detail.price,
					courseNum:this.detail.courseNum,
					id:this.$route.query.id
				}
				localStorage.setItem('order',JSON.stringify(order))
				this.$router.replace('/confirmOrder')
			},
			show(index) {
				this.$refs.previewer.show(index)
			},
			gotoDetail($e) {
				console.log($e);
				if ($e.target.className !== 'img') {
					this.$router.push(`/commentDetail?id=${this.comment.id}`)
				} else {}
			},
			gotoMoveComment() {
				this.$router.push(`/totalComment?id=${this.$route.query.id}`)
			},
			playVideo() {
				// this.showM = false;
				this.$refs.video.play();
			},
			changeFav() {
				let id = this.$route.query.id
				doCollect(id).then(res => {
					if (res && res.code == 0) {
						if (this.isFav) {
							this.isFav = false;
							this.$vux.toast.show({
								text: '取消收藏',
								type: 'text',
								position: 'middle'
							})
						} else {
							this.isFav = true;
							this.$vux.toast.show({
								text: '收藏成功',
								type: 'text',
								position: 'middle'
							})
						}
					}
				})
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
			fetchData() {
				let id = this.$route.query.id
				lessonDetail(id).then(res => {
					let data = res.data;
					this.banner = data.picId;
					this.isFav = data.hasCollection;
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
					console.log(this.pics)
				})
			},
			setCall() {
				document.querySelector(".tabBar2 .call").setAttribute('href', 'tel:4001720748');
			},
		},
		created() {
			this.setTitle('课程详情')
			this.fetchData()
			// this.lessonListT = this.lessonListAll.slice(0,3);
			// this.lessonList = [...this.lessonListAll]
		},
		mounted() {
			window.onresize = function() {
				if (this.$refs.video) {
					this.$refs.video.style.width = window.innerWidth + "px";
					this.$refs.video.style.height = window.innerHeight + "px";
				}
			}
			this.setCall();
			setTimeout(() => {
				this.oh = document.getElementsByClassName('introduce')[0].offsetHeight;
				if (this.oh < 390) {
					this.isMoreContent = true;
					this.isOh = false
				} else {
					this.isMoreContent = false;
					this.isOh = true
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
					console.log(458)
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
	.courseDetail {
		// background: #F4F4F4;
		height: 100%;
		.courseBanner {
			width: 100%;
			height: 5.333333rem;
			display: block;
		}
		.courseBar {
			display: flex;
			height: 1.733333rem;
			background: #fff;
			border-left: 8px solid #1AAD19;
			padding-left: 7px;
			align-items: center;
			.course {
				flex: 1;
				.tit {
					font-size: 0.426666rem;
				}
				.price {
					color: #FB6600;
					font-size: 0.373333rem;
				}
			}
			.favorite {
				width: 1.533333rem;
				height: 1.066666rem;
				text-align: center;
				border-left: 1px solid #E5E5E5;
				&.selected {
					.ico_favorite {
						background: url(../assets/favorite_on.png) no-repeat;
						background-size: 100% 100%;
					}
				}
				.ico_favorite {
					display: block;
					width: 0.6rem;
					height: 0.6rem;
					margin: 0 auto;
					background: url(../assets/favorite.png) no-repeat;
					background-size: 100% 100%;
				}
				span {
					font-size: 0.24rem;
					color: #7F8389;
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
			.assess {
				display: flex;
				width: 100%;
				.pho {
					width: 1.84rem;
					height: 1.84rem;
					flex:0 0 1.84rem;
					margin-right: 0.266666rem;
					img {
						display: block;
						width: 100%;
						border-radius: 50%;
					}
				}
				.info {
					// width: 100%;
					flex: 1;
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
							flex: 0 0 2.2rem;
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
							.ico_zaned {
								display: inline-block;
								width: 0.266666rem;
								height: 0.293333rem;
								background: url(../assets/zan_on.png) no-repeat;
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
		.tabBar2 {
			background: #1AAD19 !important;
			.call {
				flex: 1;
				background: #F9F9F9;
			}
			.buy {
				flex: 3;
				line-height: 0.706666rem;
				span {
					color: #fff;
					font-size: 16px;
				}
				.weui-tabbar__label {
					padding-top: 2px;
				}
			}
		}
		.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
			color: #999999;
		}
	}
</style>