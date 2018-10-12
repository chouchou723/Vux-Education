<template>
  <div class="teacherAdd">
    <group title=" " label-width="4.5em" label-margin-right="2em">
      <x-textarea :max="200" v-model="value" placeholder="请输入地址" :show-counter="false"></x-textarea>
    </group>
    <div class="footerBtn">
      <x-button type="primary" action-type="button" :disabled="value.length==0" @click.native="confirm">确定</x-button>
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
    mapActions,
    mapGetters
  } from 'vuex';
  export default {
    components: {
      Group,
      XButton,
      XTextarea
    },
    data() {
      return {
        value: '',
        nickname: function(value) {
          return {
            valid: (/^[\u4e00-\u9fa5a-zA-Z0-9]+$/).test(value),
            msg: '不能输入符号'
          }
        },
      }
    },
    created() {
      this.setTitle('地址')
      this.value = this.getTeacherInfo.address
    },
    methods: {
      ...mapActions([
        'setTeacherInfo'
      ]),
      confirm() {
        this.setTeacherInfo({
          address: this.value
        })
        // this.$router.push('/applyFirst?step=2')
        this.$router.go(-1)
      }
    },
    computed: {
      ...mapGetters([
        'getTeacherInfo'
        // ...
      ]),
    },
  }
</script>
<style lang="less">
  .teacherAdd {
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
