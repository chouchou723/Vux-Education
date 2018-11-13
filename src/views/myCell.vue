<template>
  <div class="myCell">
    <group title=" " label-width="4.5em" label-margin-right="2em">
      <!-- <x-input placeholder="请输入手机号码" type='tel' v-model="value" :max="11"></x-input> -->
      <x-input placeholder="请输入手机号" type='tel' v-model="value" :max="11">
        <img slot="label" style="padding-right:10px;display:block;" src="../assets/inputCell.png" width="20" height="20">
      </x-input>
      <x-input placeholder="请输入短信验证码" class="weui-vcode" v-model="value1" :max="4">
        <img slot="label" style="padding-right:10px;display:block;" src="../assets/key.png" width="20" height="20">
        <x-button slot="right" type="primary" :class="['getCode',count?'colorg':'']" @click.native="validMoto">{{getCodeContent}}</x-button>
      </x-input>
    </group>
    <div v-transfer-dom>
      <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
        <div class="img-box">
          <div class="motoTitle">请输入随机验证码</div>
          <x-input title="" placeholder="请输入(不区分大小写)" v-model="valueM" class="randomN" :max='4'>
            <div slot="right-full-height" class="randomMoto" @click="changeAlpha">
              <!-- <span v-for="(r,index) in randomE" :key="'rr'+index">{{r}}</span> -->
              <span class="codeColor">{{codeNumber1}}</span>
              <span class="codeColor">{{codeNumber2}}</span>
              <span class="codeColor">{{codeNumber3}}</span>
              <span class="codeColor">{{codeNumber4}}</span>
            </div>
          </x-input>
          <div style="margin:5% 30%">
            <x-button @click.native="doShowToast" :disabled="valueM.length!==4" type="primary">确定</x-button>
          </div>
        </div>
      </x-dialog>
    </div>
    <div class="footerBtn">
      <x-button type="primary" action-type="button" :show-loading="isloading" :disabled="!(value.length===11&&value1.length===4)" @click.native="confirm">确定</x-button>
    </div>
  </div>
</template>

<script>
  import {
    XButton,
    Group,
    XInput,
    XDialog,
    TransferDomDirective as TransferDom
  } from 'vux'
  import {
    mapActions,
    mapGetters
  } from 'vuex';
  var alphaTable = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'I', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'e', 'x', 'y', 'z', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'];
  import {
    getSmsCode,
    submitStudentSmsCode
  } from '../api/api'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Group,
      XButton,
      XInput,
      XDialog
    },
    data() {
      return {
        value: '',
        value1: '',
        count: false,
        countTime: 60,
        isloading: false,
        valueM: '',
        showHideOnBlur: false,
        codeNumber1: alphaTable[Math.floor(Math.random() * 26) + 1],
        codeNumber2: alphaTable[Math.floor(Math.random() * 26) + 1],
        codeNumber3: alphaTable[Math.floor(Math.random() * 26) + 1],
        codeNumber4: alphaTable[Math.floor(Math.random() * 26) + 1],
      }
    },
    created() {
      this.setTitle('手机')
      this.value = this.getMyInfo.cell
    },
    mounted() {
      // this.randomNumber();
    },
    methods: {
      doShowToast() {
        let a = this.valueM.toLowerCase();
        let b = this.correct.toLowerCase();
        if (a == b) {
          this.getCode();
          this.showHideOnBlur = false;
        } else {
          this.$vux.toast.show({
            text: '请填写正确的验证码',
            type: 'text',
            width: 'auto'
          })
        }
      },
      changeAlpha() {
        this.codeNumber1 = alphaTable[Math.floor(Math.random() * 26) + 1];
        this.codeNumber2 = alphaTable[Math.floor(Math.random() * 26) + 1];
        this.codeNumber3 = alphaTable[Math.floor(Math.random() * 26) + 1];
        this.codeNumber4 = alphaTable[Math.floor(Math.random() * 26) + 1];
        this.randomNumber();
      },
      randomNumber() {
        let color = "";
        let str = "0123456789abcdef";
        let span = document.getElementsByClassName("codeColor");
        let length = str.length + 1;
        for (let i = 0; i < 4; i++) { //生成四位数
          for (let j = 0; j < 6; j++) { //随机改变每个数字的颜色
            color += str.substr(parseInt(Math.random() * length), 1); //取颜色(循环，每次提取一位，进行拼接组成6为颜色的值)
          }
          span[i].style.color = ("#" + color); //随机改变每个span的颜色
          color = "";
        }
      },
      validMoto() {
        this.valueM = ''
        if (this.countTime === 60) {
          if (this.value.length === 11) {
            this.randomNumber();
            this.showHideOnBlur = true;
          } else if (this.value && this.value.length < 11) {
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
      ...mapActions([
        'setMyInfo'
      ]),
      confirm() {
        if (!this.isloading) {
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
              width: 'auto',
              type: 'text',
              position: 'middle'
            })
          }).then(() => {
            let data = JSON.parse(localStorage.getItem('info'));
            data.cell = this.value;
            let newData = JSON.stringify(data);
            localStorage.setItem('info', newData)
            this.setMyInfo({
              cell: this.value
            })
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
          }).catch(() => {
            this.isloading = false;
          })
        }
      },
      getCode() {
        let para = {
          mobile: this.value
        }
        getSmsCode(para).then(res => {
          this.$vux.toast.show({
            text: '验证码已发送',
            type: 'text',
            width: 'auto'
          })
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
        // if (this.countTime === 60) {
        //   if (this.value.length === 11) {
        //     let para = {
        //       mobile: this.value
        //     }
        //     getSmsCode(para).then(res => {
        //       // console.log(res)
        //     }).then(() => {
        //       this.count = true;
        //       this.countStart = setInterval(() => {
        //         if (this.countTime == 1) {
        //           clearInterval(this.countStart)
        //           this.countTime = 60;
        //           this.count = false;
        //         } else {
        //           this.countTime--
        //         }
        //       }, 1000)
        //     })
        //   } else if (this.value.length < 11) {
        //     this.$vux.toast.show({
        //       text: '请填写正确的手机号',
        //       type: 'text',
        //       width: 'auto'
        //     })
        //   } else {
        //     this.$vux.toast.show({
        //       text: '请先填写手机号',
        //       type: 'text',
        //       width: 'auto'
        //     })
        //   }
        // }
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
      correct: function() {
        return this.codeNumber1 + this.codeNumber2 + this.codeNumber3 + this.codeNumber4;
      }
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
  .motoTitle {
    height: 1rem;
    line-height: 1rem;
    font-size: 17px;
    text-align: left;
    padding-left: 17px
  }
  .randomMoto {
    // height: 100%;
    width: 2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 17px;
    margin: 10px 5px 10px 0;
    border: 1px solid gainsboro;
    border-radius: 5px;
    background: #F9F9F9;
  }
  .randomN {
    input {
      font-size: 17px;
    }
  }
</style>
