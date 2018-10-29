<template>
  <div class="myCell">
    <group title=" " label-width="4.5em" label-margin-right="2em">
      <!-- <x-input placeholder="请输入手机号码" type='tel' v-model="value" :max="11"></x-input> -->
      <x-input placeholder="请输入手机号" type='tel' v-model="value" :max="11">
        <img slot="label" style="padding-right:10px;display:block;" src="../assets/inputCell.png" width="20" height="20">
      </x-input>
      <x-input placeholder="请输入短信验证码" class="weui-vcode" v-model="value1" :max="4">
                      <img slot="label" style="padding-right:10px;display:block;" src="../assets/key.png" width="20" height="20">
                      <x-button slot="right" type="primary" :class="['getCode',count?'colorg':'']" @click.native="getCode">{{getCodeContent}}</x-button>
                  </x-input>
    </group>
    <div class="footerBtn">
      <x-button type="primary" action-type="button" :show-loading="isloading" :disabled="!(value.length===11&&value1.length===4)" @click.native="confirm">确定</x-button>
    </div>
  </div>
</template>

<script>
  import {
    XButton,
    Group,
    XInput
  } from 'vux'
  import {
    mapActions,
    mapGetters
  } from 'vuex';
  import {
    getSmsCode,
    submitStudentSmsCode
  } from '../api/api'
  export default {
    components: {
      Group,
      XButton,
      XInput
    },
    data() {
      return {
        value: '',
        value1: '',
        count: false,
        countTime: 60,
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
      this.setTitle('手机')
      this.value = this.getMyInfo.cell
    },
    methods: {
      ...mapActions([
        'setMyInfo'
      ]),
      confirm() {
        if(!this.isloading){
          this.isloading = true;
          let para = {
            captcha: this.value1,
            mobile: this.value
          }
          submitStudentSmsCode(para).then(res => {
            let data = res.data;
          this.isloading = false;
            this.$vux.toast.show({
              text: data,
              width:'auto',
              type: 'text',
              position: 'middle'
            })
          }).then(() => {
            let data = JSON.parse(localStorage.getItem('info'));
            data.cell = this.value;
            let newData = JSON.stringify(data);
            localStorage.setItem('info',newData)
            this.setMyInfo({
              cell: this.value
            })
            setTimeout(()=>{
              this.$router.go(-1)
            },1000)
          }).catch(()=>{
          this.isloading = false;
          })
        }
      },
      getCode() {
        if (this.countTime === 60) {
          if (this.value.length === 11) {
            let para = {
              mobile: this.value
            }
            getSmsCode(para).then(res => {
              // console.log(res)
            }).then(() => {
              this.count = true;
              this.countStart = setInterval(() => {
                if (this.countTime == 1) {
                  clearInterval(this.countStart)
                  this.countTime = 60;
                  this.count = false;
                } else {
                  this.countTime--
                }
              }, 1000)
            })
          } else if (this.value.length < 11) {
            this.$vux.toast.show({
              text: '请填写正确的手机号',
              type: 'text',
              width: 'auto'
            })
          } else {
            this.$vux.toast.show({
              text: '请先填写手机号',
              type: 'text',
              width: 'auto'
            })
          }
        }
      },
    },
    computed: {
      ...mapGetters([
        'getMyInfo'
        // ...
      ]),
      getCodeContent() {
        if (this.count) {
          return `重新获取(${this.countTime}s)`
        } else {
          return '获取验证码'
        }
      },
    },
  }
</script>
<style lang="less">
  .myCell {
    .weui-cells__title {
      margin-top: 0;
      padding-top: .2rem;
      padding-bottom: .1rem;
      font-size: .4rem;
    }
    .getCode {
      font-size: 15px; // padding-left:30px;
      width: 125px;
      border: none;
      border-left: 1px solid gainsboro;
      border-radius: 0;
      background: transparent;
      color: #1AAD19;
    }
    .getCode.weui-btn_primary:not(.weui-btn_disabled):active {
      border: none;
      border-left: 1px solid gainsboro;
      background: transparent;
    }
    .colorg {
      color: #afa8a8;
    }
    .getCode.weui-btn:after {
      border: none;
    }
    .weui-vcode {
            .weui-cell__ft {
                display: flex;
                align-items: center;
            }
        }
    .footerBtn {
      width: 90%;
      margin: 1rem auto 0;
      text-align: center;
    }
  }
</style>
