<template>
	<div class="myOrder">
		<view-box ref="viewBox">
			<div class="banner">
				<img src="../assets/banner.jpg" alt="" class="courseBanner">
			</div>
			<div class="courseBar">
				<div class="course">
					<div class="tit">创意绘画单课</div>
					<div class="price">2880元</div>
				</div>
				<div class="favorite">
					<i class="ico_favorite"></i>
					<span>收藏</span>
				</div>
			</div>
			<group class="courseBox">
			    <cell class="tit" title="课程信息"></cell>		    
			    <CellBox>
			    	<div class="info_lf">
			    		24节课，共48课时，满5人开课
			    	</div>
			    	<div class="info_rt">
			    		已报名3人
			    	</div>
			    </CellBox>
			    <div class="tips">
			    	温馨提示：本课程满5人开课，在开课前1个工作日内若报名人数不足，课程将取消，已付款金额或积分将按原付款方式退回（最快1个工作日到账）
			    </div>
			</group>
			<group class="courseBox">
			    <cell class="tit" title="课程地点"></cell>		    
			    <CellBox>博成路上南路世博源二区L1层星动力空间</CellBox>
			</group>
			<group class="courseBox">
			    <cell class="tit" title="课程时间"></cell>		    
			    <CellBox>第1节课：2018年4月28日，周六，上午10:00 - 12:00</CellBox>
			    <CellBox>第2节课：2018年4月28日，周六，上午10:00 - 12:00</CellBox>
			    <CellBox>第3节课：2018年4月28日，周六，上午10:00 - 12:00</CellBox>
			    <CellBox><div class="more"><span>点击查看更多</span><i class="ico_arr"></i></div></CellBox>
			</group>
			<group class="courseBox">
			    <cell class="tit" title="适用对象"></cell>		    
			    <CellBox>3-6岁儿童</CellBox>
			</group>
			<group class="courseBox">
			    <cell class="tit" title="授课老师"></cell>		    
			    <cell-box is-link>
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
			    	<div class="introduce">
				    	<p>该旨在培养学龄前儿童对美术绘画的兴趣，增强色彩认知，快乐学习。</p>
				    	<video width="100%" height="200px" src="http://www.w3school.com.cn/i/movie.ogg" controls="controls"></video>
				    	<img src="../assets/0e3a716cf47f1eb695e5b62597dec807.jpg" alt="">
			    	</div>
			    </CellBox>
			    <CellBox><div class="more"><span>点击查看更多</span><i class="ico_arr"></i></div></CellBox>
			</group>
			<group class="courseBox">
			    <cell class="tit" title="课程评价">
			    	<div class="moreEval">更多评价（288条）</div>
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
						        <rater v-model="data42" active-color="#FFBE00" :font-size="15" disabled></rater>
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
		<tabbar class="tabBar2">
		    <tabbar-item class="call">
		        <img slot="icon" src="../assets/bi4.png">
		        <span slot="label">客服电话</span>
		    </tabbar-item>
	    	<tabbar-item class="buy" link="/courseBuy">
	    		<span slot="label">购买课程</span>
	    	</tabbar-item>
	    </tabbar>
	    
	</div>
</template>

<script>
import {ViewBox, Group, Cell,CellBox,Tabbar,TabbarItem,Confirm,TransferDomDirective as TransferDom,Rater, Range} from 'vux'
import {pushHimOnWall} from '../api/api'
import apiHost from '../../config/prod.env'

export default{
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
    	Confirm,
    	Rater, 
    	Range
	},
	data(){
		return {			
			data42: 5,
		}
	},
	methods: {
		
	}
}
</script>

<style lang="less">
p { padding:0; margin:0; }
.myOrder{
	background: #F4F4F4;
}
.courseBanner {
	width:100%;
	height:5.333333rem;
	display: block;
}
.courseBar { 
	display: flex; 
	height: 1.733333rem;
	background: #fff;
	border-left:5px solid #1AAD19;
	padding-left:0.493333rem;	
	align-items:center;
	.course {
		flex:1;
		.tit {
			font-size: 0.426666rem;
		}
		.price {
			color: #FB6600;
			font-size: 0.373333rem;
		}
	}
	.favorite {
		width:1.533333rem;
		height: 1.066666rem;
		text-align: center;
		border-left:1px solid #E5E5E5;
		&.selected{
			.ico_favorite {
				background: url(../assets/favorite_on.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		.ico_favorite {
			display: block;
			width:0.6rem;
			height: 0.6rem;
			margin:0 auto;
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
	.vux-no-group-title {
		.tit {
			color: #7F8389;
			font-size: 0.346666rem;
		}
		.moreEval {
			color: #F76260;
		}
	}
	.vux-cell-box {
		overflow: hidden;
		font-size: 0.346666rem;
		justify-content:space-between;
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
		margin:0 0.4rem 10px;		
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
					line-height: 0.533333rem;
					text-align: center;
					background-color:rgba(0,0,0,0.6);
					border-radius: 0.533333rem;
					color: #fff;
					.picMin {
						display: inline-block;
						width: 0.293333rem;
						height: 0.293333rem;
						background: url(../assets/picMin.png) no-repeat;
						background-size: 100% 100%;
						margin-right:3px;
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
.tabBar2 {
	background: #1AAD19 !important;
	.call {
		flex: 1;
		background: #F9F9F9;
	}
	.buy {		
		flex:3;
		line-height:0.706666rem;
		span {
			color: #fff;
		}
	}
}
</style>