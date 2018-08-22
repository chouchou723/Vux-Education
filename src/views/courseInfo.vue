<template>
	<div class="courseInfo">
		<view-box ref="viewBox">
			<group class="courseBox2">
			    <cell class="tit" title="课程信息"></cell>
			    <CellBox class="courseBar">
				    <div class="course">
						<div class="tit">国画课程</div>
						<div class="info">24节课，共48课时</div>
					</div>					
					<x-button mini plain type="primary" link="/doComment">我要评价</x-button>
				</CellBox>
			</group>
			<group class="courseBox">
			    <cell class="tit" title="课程地点"></cell>		    
			    <CellBox>
			    	<div class="con">
				    	<p>时间：上午10:00-12:00</p>
				    	<p>地点：博成路上南路世博源L1层星动力空间</p>
			    	</div>
			    </CellBox>
			</group>
			<group class="courseBox">
			    <cell class="tit" title="课程日历"></cell>
			    <div class="calendarBox">
				    <Calendar ref="Calendar" :sundayStart="true" :markDateMore="arr" :markDate="arr2" v-on:isToday="clickToday" agoDayHide=1530115200 v-on:choseDay="clickDay" v-on:changeMonth="changeDate"></Calendar>
				    <flexbox>
				      <flexbox-item><div class="flex-demo"><i class="circle_1"></i>已上课</div></flexbox-item>
				      <flexbox-item><div class="flex-demo"><i class="circle_2"></i>没上课</div></flexbox-item>
				      <flexbox-item><div class="flex-demo"><i class="circle_3"></i>即将上课</div></flexbox-item>
				    </flexbox>
			    </div>
			</group>
			<group class="courseBox">
			    <cell class="tit" title="上课情况"></cell>		    
			    <CellBox is-link link="/classSituation">
			    	查看每节课的签到情况和老师评语
			    </CellBox>
			</group>
			<group class="courseBox">
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
			</group>
			<group class="courseBox">
			    <cell class="tit" title="课程介绍"></cell>		    
			    <CellBox>
			    	<div :class="['introduce',isMoreContent?'':'lite']">
				    	<p>该旨在培养学龄前儿童对美术绘画的兴趣，增强色彩认知，快乐学习。</p>
				    	<video :poster="videoPoster" preload='auto' ref="video" width="100%" height="200px"
						 x5-video-player-type="h5" x5-video-player-fullscreen="true" src="http://yun.it7090.com/video/XHLaunchAd/video01.mp4"></video>
						 <img src="../assets/play.png" alt="" class="playIcon" @click="playVideo" v-if="showM">
						 <div class="playModal" v-if="showM"></div>
				    	<img src="../assets/0e3a716cf47f1eb695e5b62597dec807.jpg" alt="">
			    	</div>
			    </CellBox>
			    <CellBox><div class="more"  @click="changeMoreContent"><span>{{isMoreContent?'点击隐藏':'点击查看更多'}}</span><i :class="['ico_arr', isMoreContent?'rotate90':'']"></i></div></CellBox>

			    <!-- <CellBox><div class="more"><span>点击查看更多</span><i class="ico_arr"></i></div></CellBox> -->
			</group>
			<group class="courseBox">
			    <cell class="tit" title="课程评价">
			    	<div class="moreEval" @click="gotoMoveComment">更多评价（288条）</div>
			    </cell>		   
			    <CellBox>
			    	<div class="assess">
			    		<div class="pho"><img src="../assets/pho.jpg" alt=""></div>
			    		<div class="info">
			    			<div class="hd">
			    				<div class="name">Kino的天空</div>
						    	<div class="data">4月17日 </div>
						    </div>
			    			<div class="rater">
			    				<span>总体</span>
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
			</group>
		</view-box>	
	</div>
</template>

<script>
import {XButton,Flexbox,FlexboxItem,ViewBox, Group, Cell,CellBox} from 'vux'
import {pushHimOnWall} from '../api/api'
import Calendar from 'vue-calendar-component';
import apiHost from '../../config/prod.env'
export default {
	components: {
		XButton,
		Calendar,
		Flexbox, 
		FlexboxItem,
	    ViewBox,
	    Group,
	    Cell,
	    CellBox
	},
	data(){
		return {			
			data42: 3,
			isMoreContent:false,
			videoPoster:require('../assets/0e3a716cf47f1eb695e5b62597dec807.jpg'),
			arr2: ['2018/6/23'],
			arr: [
		        {
		          date: '2018/6/1',
		          className: 'mark1'
		        },
		        {
		          date: '2018/6/13',
		          className: 'mark2'
		        }
		    ]
		}
	},
	methods: {
		changeMoreContent(){
			if(this.isMoreContent){
				this.isMoreContent=false;
				this.lessonList = this.lessonListAll.slice(0,3);
			}else{
				this.isMoreContent=true;
				this.lessonList = this.lessonListAll
			}
		},
		gotoMoveComment(){
			this.$router.push('/totalComment')
		},
		playVideo(){
			// this.showM = false;
			this.$refs.video.play();
		},
		clickDay(data) {
	      console.log('选中了', data); //选中某天
	      this.$toast('选中了' + data);
	    },
	    clickToday(data) {
	      console.log('跳到了本月今天', data); //跳到了本月
	    },
	    changeDate(data) {
	      this.$toast('切换到的月份为' + data);
	      console.log('左右点击切换月份', data); //左右点击切换月份
	    },
	},
	mounted () {
		 window.onresize = function(){
			this.$refs.video.style.width = window.innerWidth + "px"; 
			this.$refs.video.style.height = window.innerHeight + "px"; 
		}
	},
	computed:{
		showM(){
			if(this.$refs.video&&this.$refs.video.paused){
				return false
			}else{
				return true
			}
		}
	},
	created() {
	    function format(date, index) {
	      date = new Date(date);
	      return `${date.getFullYear()}-${date.getMonth() + 1}-${index}`;
	    }
	    this.arr = [
	      {
	        date: format(new Date(), 1),
	        className: 'mark1'
	      },
	      {
	        date: format(new Date(), 1),
	        className: 'mark1'
	      },
	      {
	        date: format(new Date(), 13),
	        className: 'mark2'
	      }
	    ];
	}
}
</script>

<style lang="less">
p {
	margin:0;
	padding:0;
}
.courseInfo{
	height: 100%;

.weui-tab__panel {
	padding:0 !important;
}
.courseBox2 {
	.weui-cells {
		margin-top:0;
		.tit {
			font-size: 0.346666rem;
			color: #7F8389;
		}		
	}
	.weui-cell:before {
		left:10px !important;
	}
	
}
.courseBar { 
	display: flex; 
	clear: both;
	height: 1.56rem;
	background: #fff;
	border-left:5px solid #1AAD19;
	padding-left:10px !important;	
	align-items:center;	
	justify-content:space-between;	
	.course {
		flex: 1;
		.tit {
			color: #000;
			font-size: 0.346666rem;
		}
		.info {
			margin-top:8px;
			color: #7F8389;
			font-size: 0.293333rem;
		}
	}
	
}
.courseBox {
	.weui-cells {
		margin-top:.77em;
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
				width:100%;
				display: flex;
				align-items: center;
				justify-content:center;
				i {
					display: inline-block;
					margin:0 3px;
					width:0.213333rem;
					height: 0.133333rem;
					background: url(../assets/triS.png) no-repeat;
					background-size: 100% 100%;
					transform-origin:center center;
					transform: rotate(180deg);
				}
				.rotate90{
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
			img {
				display: block;
				width: 100%;
				border-radius: 50%;
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
				margin:0;
				color: #000;
			}
		}
	}
	.introduce {
		position: relative;
		&.lite{
			height: 11rem;
			position: relative;
			overflow: hidden;
			&::after{
				content:'';
			    position: absolute;
				bottom: -10px;
				width: 100%;
				padding-top: 1rem;
				background-image: -webkit-gradient(linear,left top, left bottom,from(rgba(255,255,255,0)),color-stop(70%, #fff));
				background-image: linear-gradient(-180deg,rgba(255,255,255,0) 0%,#fff 70%);
			}
		}
		p {
			margin:5px 0;
		}
		video {
			margin:5px 0;
		}
		img { 
			max-width: 100%;
			display: block;
			margin:5px 0;
		}
		.playModal{
			width: 100%;
			height: 200px;
			position: absolute;
			top:1.35rem;
			left:0;
			background: rgba(0,0,0,0.4)
		}
		.playIcon{
			width: 2rem;
			height: 2rem;
			position: absolute;
			top:3rem;
			left:0;
			right: 0;
			margin: auto;
			z-index: 1;
		}
	}	
	.assess {
		display: flex;
		.pho {
			width: 1.84rem;
			height: 1.84rem;
			margin-right: 0.266666rem;
			img {
				display: block;
				width: 100%;
				border-radius: 50%;
			}
		}
		.info {
			.hd {
				display: flex;
				justify-content:space-between;
				.data {
					color: #7F8389;
					font-size: 0.293333rem;
				}
			}
			.rater {
				color: #7F8389;
				font-size: 0.293333rem;
				margin:0.133333rem 0;
			}
			.star{
				width: 12px;
		        height: 12px;
		        margin-right:.1rem;
			}
			.imgList {
				display: flex;
				margin:0 -5px;
				position: relative;
				.each {					
					width:2.2rem;
					flex:1;
					margin:5px;
					img {
						display: block;
						max-width: 100%;
					}
				}
				.allPic {
					position: absolute;
					right:10px;
					bottom:10px;
					width:1rem;
					height: 0.533333rem;
					text-align: center;
					background-color:rgba(0,0,0,0.6);
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
				justify-content:space-between;
				color: #7F8389;
				font-size: 0.293333rem;
				.zan {
					.ico_zan {
						display: inline-block;
						width:0.266666rem;
						height: 0.293333rem;
						background: url(../assets/zan.png) no-repeat;
						background-size: 100% 100%;
						margin-right:3px;
						vertical-align: middle;
						margin-top:-2px;
					}
				}
				.reply {
					margin-left:10px;
					.ico_reply {
						display: inline-block;
						width:0.266666rem;
						height: 0.293333rem;
						background: url(../assets/reply.png) no-repeat;
						background-size: 100% 100%;
						margin-right:3px;
						vertical-align: middle;
						margin-top:-2px;
					}
				}
			}
		}
	}
}
.calendarBox {
	padding:0 15px;
	.vux-flexbox {
		color: #7F8389;
		font-size: 0.293333rem;
		border-top: 1px solid #E5E5E5;
		padding:15px 0;
		.circle_1 {
			display: inline-block;
			width:0.28rem;
			height: 0.28rem;
			border-radius: 50%;
			margin:0 10px;
			background: #09BB07;		
		}
		.circle_2 {
			display: inline-block;
			width:0.28rem;
			height: 0.28rem;
			border-radius: 50%;
			margin:0 10px;
			background: #F76260;
		}
		.circle_3 {
			display: inline-block;
			width:0.28rem;
			height: 0.28rem;
			border-radius: 50%;
			margin:0 10px;
			background: #D8D8D8;
		}
	}
}
.wh_container {
	.wh_content_all {
		background: #fff;
		padding-bottom:0;
		.wh_top_changge {
			background: #09BB07;
			li {
				height: 1rem;
			}
			.wh_content_li {
				flex: 5;
			}
		}		
		.wh_content {
			padding:0;
		}
	}
	.wh_content_item {
		display: flex;
		width:14.285714%;
		line-height: 40px;
		.wh_top_tag {
			color: #000;
		}
		.wh_item_date {
			width:0.506666rem;
			height: 0.506666rem;
			font-size: 0.293333rem;
			color: #000;
		}
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
	}
}
}
</style>