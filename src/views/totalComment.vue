<template>
  <div class="totalComment">
       <view-box ref="viewBox">
    <group v-for="(comment,index) in commentlist" :key="comment+index" :class="index===0?'firstGroup':''">
       <cell link="/commentDetail">
           <div  slot="title" class="commentTitle">
               <img src="../assets/0e3a716cf47f1eb695e5b62597dec807.jpg" alt="" class="simpleImg">
                <div class="commentContent">
                    <div class="commentName">
                        <span>{{comment.name}}</span>
                        <span style="color:#7F8389;font-size:12px;">{{comment.time}}</span>
                    </div>
                    <div>
                    <span style="margin-right:3px;font-size:12px;color:#7F8389">总体</span>
                    <img src="../assets/star.png" alt="" v-for="(item,index) in rank" :key="index+'a'" class="star"><img src="../assets/starg.png" alt="" v-for="(item,index) in (5-rank)" :key="index+'b'" v-if="item" class="star">
                    </div>
                    <div class="commentWord"> {{comment.commentWord.slice(0,30)+'...'}}
                    </div>
                     <div style="color:#1aad19;font-size:12px;" v-if="comment.commentWord.length>30">全文</div>
                     <div class="imgList">
			    				<div class="each" v-for="(item,index) in images" :key="'img'+index">
                                    <x-img :default-src="dsrc" :src="item.src" alt="" success-class="simg" :offset="700" container="#vux_view_box_body"></x-img>
                                </div>
			    				<div class="allPic">
			    					<i class="picMin"></i>8
			    				</div>
			    			</div>
                        <!-- <div class="allPic" v-if="comment.number>3">
			    					<i class="picMin"></i>8
			    				</div> -->
                        <!-- <div class="moreImg" v-if="comment.number>3">
                            <img src="../assets/picicon.png" class="picIcon" alt="">
                            <span style="color:white;font-size:12px">8</span>
                        </div> -->
                    <div class="commentName">
                        <span style="color:#7F8389;font-size:12px">
                            浏览 3300
                        </span>
                        <div>
                        <span style="margin-right:.4rem">
                            <img src="../assets/good.png" alt="" width="12" v-if="isGood">
                            <img src="../assets/goodn.png" alt="" width="12" v-else>
                            <span :style="isGood?'color:#1aad19':'color:#7F8389'">9</span>
                        </span>
                        <span>
                            <img src="../assets/comment.png" alt="" width="12" >
                            <span style="color:#7F8389">9</span>
                        </span>
                        </div>
                    </div>
                </div>
           </div>
      </cell>
    </group>
       </view-box>
  </div>
</template>

<script>
  import {Group, Cell, ViewBox,XImg } from 'vux'
// import SimpleCropper from '@/components/SimpleCrop' 
// import VuxUpload from 'vux-upload'
import VuxUpload from '../components/Upload'

  export default {
    components: {
      Group,
      Cell,
      ViewBox,
      VuxUpload,XImg
    //   SimpleCropper
    },
    data () {
      return {
        //   uploadParam: {
        //                 fileType: 'recruit', // 其他上传参数 
        //                 uploadURL: this.$dataURL + 'uploadAction/qcloudImg', // 上传地址 
        //                 scale: 4 // 相对手机屏幕放大的倍数: 4倍 
        //                 }, 
        // userImg: require('../assets/0e3a716cf47f1eb695e5b62597dec807.jpg'),
        dsrc:require('../assets/picload.png'),
        varmax:9,
        commentlist:[{number:4,name:'Kino的天空',time:'4月17日 22:05',commentWord:'我参加了周六上午的国画课，小朋友年纪小，希望从小培养，上课过程很开心！我参加了周六上午的国画课，小朋友年纪小，希望从小培养，上课过程很开心！'},
        {number:1,name:'chou的天空',time:'4月17日 22:05',commentWord:'希望从小培养，上课过程很开心！'},
        {number:2,name:'七月的天空',time:'4月17日 22:05',commentWord:'加了周六上午的国画课，小朋友年纪小，希望从小培养，上课过程,希望从小培养，上课过程很开心！'}],
        commentWord:'我参加了周六上午的国画课，小朋友年纪小，希望从小培养，上课过程很开心！我参加了周六上午的国画课，小朋友年纪小，希望从小培养，上课过程很开心！',
        rank:3,
        images:[{src: require('../assets/ee.png')},{src: require('../assets/0e3a716cf47f1eb695e5b62597dec807.jpg')}
        ,{src: require('../assets/ff.png')}],
        uploadUrl:'',
        params:{},
          data3:5,
        value: '',
        isGood:false,
        clientHeight:0,
        focusElem:'',
        showM:false,
        comm:''
      }
    },
    created(){
        let type = this.$route.query.type;
        if(type){
            document.title = '昵称'
        }else{
            document.title = '姓名'
        }
    },
    mounted(){
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
    methods:{
//         upload () {
//   this.$refs['cropper'].upload() 
//  }, 
//  // 上传头像成功回调 
//  uploadHandle (data) {
//   if (data.state === 'SUCCESS') { 
//   this.userImg = this.form.headImgUrl = data.fileId 
//   } 
//  }
onSuccess(){},
onError(){},
onRemove(){},
    }
  }
</script>
<style lang="less">
.totalComment{
    height: 100%;
    .vux-no-group-title{
    // padding-top:.2rem; 
    margin-top: .3rem;
    padding-bottom:.1rem;
    // font-size: .4rem;
    }
    .firstGroup .vux-no-group-title{
        margin-top: 0;
    }
    .star{
        width: 12px;
        height: 12px;
        margin-right:.1rem;
    }
    .commentContent{
        width: 100%;
        flex:auto;
        // margin-left:.4rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
    .commentTitle{
        display: flex;
        width: 9.2rem;
        padding-top:.2rem;
    }
    .commentName{
        width: 100%;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .commentWord{
        font-size: 14px;
        margin:.2rem 0 0.1rem;
        line-height: 1.5;
    }
    .commentWordCom{
        font-size: 14px;
        margin:.2rem 0;
        line-height: 1.5;
    }
    .simpleImg{
        flex-shrink: 0;
        width: 59px;
        height: 59px;
        border-radius: 50%;
        margin-right: .4rem;
    }
    .vux-upload .vux-flexbox-item .vux-upload-bg .vux-upload-content{
        background-position: center;
    }
    .vux-upload .vux-flexbox-item .vux-upload-bg{
        width: 93%;
        margin: 4% 0 0 0;
    }
    .weui-cell_access .weui-cell__ft:after{
        display: none;
    }
    .imgList {
				display: flex;
				margin:0 -5px;
				position: relative;
				.each {					
					width:2.2rem;
					flex:1;
                    margin:5px;
                    height: 2.2rem;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;
					.simg {
						display: block;
                        max-width: 200%;
                        max-height: 200%;
					}
                }
    }
    .allPic {
					position: absolute;
					bottom: 0.2rem;
                    right:0.2rem;
					width:1rem;
					height: 0.533333rem;
					line-height: 0.533333rem;
					background-color:rgba(0,0,0,0.6);
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
