<template>
  <div class="myCell">
    <group title=" " label-width="4.5em" label-margin-right="2em">
      <x-input placeholder="请输入手机号码" type='tel' v-model="value" :max="11"></x-input>
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
    XInput
  } from 'vux'
  import {
    mapActions,
    mapGetters
  } from 'vuex';
  export default {
    components: {
      Group,
      XButton,
      XInput
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
      document.title = '手机'
      this.value = this.getMyInfo.cell
    },
    methods: {
      ...mapActions([
        'setMyInfo'
      ]),
      confirm() {
        this.setMyInfo({
          cell: this.value
        })
        this.$router.go(-1)
      }
    },
    computed: {
      ...mapGetters([
        'getMyInfo'
        // ...
      ]),
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
    .footerBtn {
      width: 90%;
      margin: 1rem auto 0;
      text-align: center;
    }
  }
</style>
