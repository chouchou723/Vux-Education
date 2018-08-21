<template>
  <div class="doComment">
       <view-box ref="viewBox">
    <group style="margin-top:0">
         <cell class="titleS">
            <span slot="title" style="font-size:16px">创意绘画课程</span>
      </cell>
       <cell >
           <div slot="title" class="fz15">
                <span style="margin-right:15px">总体</span>
                <rater v-model="data3"></rater>
           </div> 
           <div slot="title" class="fz15">
                <span style="margin-right:15px">老师</span>
                <rater v-model="data3"></rater>
           </div>
           <div slot="title" class="fz15">
                <span style="margin-right:15px">课程</span>
                <rater v-model="data3"></rater>
           </div> 
           <div slot="title" class="fz15">
                <span style="margin-right:15px">场馆</span>
                <rater v-model="data3"></rater>
           </div>
      </cell>
    </group>
     <group title=" ">
     <x-textarea style="font-size:14px" :max="200" :rows="5" placeholder="亲,课程怎么样,老师好不好,环境如何,学习效果满意吗?" :show-counter="false" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
          <cell>
            <span slot="title" style="font-size:14px;color:#a5a3a3">加油! 还差15字</span>
      </cell>
    </group>
    <group title=" ">
        <!-- <simple-cropper :initParam="uploadParam" :successCallback="uploadHandle" ref="cropper">  -->
             <!-- <cell class="simpleCell" value-align="left"> -->
                 <vux-upload
                            url=""
                            :headers="headers"
                            :data="data"
                            :images="images"
                            :readonly="false"
                            :max="9"
                            :withCredentials="false"
                            :span="4"
                            :preview="true"
                            @success="onSuccess"
                            @error="onError"
                            @remove="onRemove"
                        >
                        </vux-upload>
                <!-- <img src="../assets/upload.png" alt="" class="simpleImg"> -->
                 <!-- <div  class="simpleDivImg">
                     <img src="../assets/upload.png" alt="" class="simpleImg">
                 </div> -->
                 <!-- <div v-for="i in 9" :key="i" class="simpleDivImg">
                     <img src="../assets/delete.png" alt="" class="simpleDel">
            <img :src="userImg" @click="upload(i)"  class="simpleImg">
                 </div> -->
             <!-- </cell> -->
            <!-- </simple-cropper>  -->
          <cell>
            <span slot="title" style="font-size:14px;color:#a5a3a3">图片总共能上传9项哦~</span>
      </cell>
    </group>
    <div class="footerBtn">
     <x-button type="primary" action-type="button" :disabled="value.length==0">提交</x-button>

    </div>
       </view-box>
  </div>
</template>

<script>
  import { XButton, Group, Cell,ViewBox, XTextarea, Rater } from 'vux'
// import SimpleCropper from '@/components/SimpleCrop' 
import VuxUpload from '../components/Upload'
  export default {
    components: {
      Group,
      XButton,
      Cell,
      ViewBox,
      XTextarea,
      Rater,
      VuxUpload,
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
        varmax:9,
        headers:{},
        data:{},
        images:[{src: require('../assets/0e3a716cf47f1eb695e5b62597dec807.jpg')},{src: require('../assets/ff.png')},{src: require('../assets/ff.png')}],
        uploadUrl:'',
        params:{},
          data3:5,
        value: '',
        nickname: function (value) {
        return {
          valid: (/^[\u4e00-\u9fa5a-zA-Z0-9]+$/).test(value),
          msg: '不能输入符号'
        }
      },
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
.doComment{
    height: 100%;
    .vux-no-group-title{
    margin-top: 0;
    // padding-top:.2rem; 
    padding-bottom:.1rem;
    // font-size: .4rem;
}
.footerBtn{
    width: 90%;
    margin:1rem auto 0;
    text-align: center;
}
.titleS{
    position: relative;
    padding:12px 15px;
}
.fz15{
    font-size: 15px;
    display: flex;
    align-items: center;
}
.titleS::after{
    content: '';
    position: absolute;
    width: .15rem;
    height: 100%;
    background: #04be02;
    top:0;
    left:0;
}
textarea::-webkit-input-placeholder{
    color: #a5a3a3
}
.simpleImg{
    width: 2.9rem;
    height: 2.9rem;
}
.vux-upload .vux-flexbox-item .vux-upload-bg .vux-upload-content{
    background-position: center;
}
.vux-upload .vux-flexbox-item .vux-upload-bg{
    width: 82%;
    margin: 4% 0 0 9%;
}
.weui-uploader__input-box{
    border:none;
}
.weui-uploader__input-box:after{
    width: 0;
    height: 0;
}
.vux-upload .vux-flexbox-item .vux-upload-bg .weui-uploader__input-box::before{
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background: url('../assets/upload.png') no-repeat center/cover;
}
}
</style>
