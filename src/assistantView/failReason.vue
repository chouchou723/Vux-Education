<template>
  <div class="failReason">
    <group title="原因" label-width="4.5em" label-margin-right="2em">
      <x-textarea :max="300" v-model="value" placeholder="请填写课程审核不通过的原因" :show-counter="true"></x-textarea>
    </group>
    <div class="footerBtn">
      <x-button type="primary" action-type="button" @click.native="saveInfo" :show-loading="isloading" :disabled="value.length==0">提交</x-button>
    </div>
  </div>
</template>

<script>
  import {
    XButton,
    Group,
    XTextarea
  } from 'vux'
  import {
    rejectTheClass
  } from '../api/api'
  export default {
    components: {
      Group,
      XButton,
      XTextarea
    },
    data() {
      return {
        value: '',
        isloading:false,
        nickname: function(value) {
          return {
            valid: (/^[\u4e00-\u9fa5a-zA-Z0-9]+$/).test(value),
            msg: '不能输入符号'
          }
        },
      }
    },
    created() {
      document.title = '审核不通过'
    },
    methods: {
      saveInfo() {
                if(!this.isloading){
                    this.isloading = true;
                    let para = {
                        courseId: this.$route.query.id,
                        reason:this.value,
                    }
                    let id = this.$route.query.id
                    rejectTheClass(para,id).then(res=>{
                       if(res.code==0){
                             this.$vux.toast.show({
                    text: '提交成功'
                })
                        }
                    }).then(()=>{
                        this.$router.go(-1)
                    })
                }
                // console.log(this.getMyInfo)
                // this.$vux.toast.show({
                //     text: '保存成功'
                // })
                // localStorage.setItem('info', JSON.stringify(this.getMyInfo))
            },
    },
    computed: {
    },
  }
</script>
<style lang="less">
  .failReason {
    .weui-cells__title {
      margin-top: 0;
      padding-top: .2rem;
      padding-bottom: .1rem;
      font-size: .4rem;
    }
    .weui-btn_disabled.weui-btn_primary {
      background-color: #e1e1e1;
      color: black;
    }
    .weui-btn_primary,.weui-btn_primary:not(.weui-btn_disabled):active {
      background-color: #00a6e7;
    }
    .footerBtn {
      width: 90%;
      margin: 1rem auto 0;
      text-align: center;
    }
  }
</style>
