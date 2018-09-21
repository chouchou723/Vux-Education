<template>
  <div class="teachTime">
    <group title=" " label-width="4.5em" label-margin-right="2em">
      <popup-picker :data="list1" v-model="value1" value-text-align="left" placeholder="请选择你的教龄"></popup-picker>
    </group>
    <div class="footerBtn">
      <x-button type="primary" action-type="button" :disabled="value1.length==0" @click.native="confirm">确定</x-button>
    </div>
  </div>
</template>

<script>
  import {
    XButton,
    Group,
    XInput,
    PopupPicker
  } from 'vux'
  import {
    mapActions,
    mapGetters
  } from 'vuex';
  export default {
    components: {
      Group,
      XButton,
      XInput,
      PopupPicker
    },
    data() {
      return {
        list1: [
          ['1年之内', '1年', '2年', '2年以上']
        ],
        value1: [],
      }
    },
    created() {
      document.title = '教龄'
  this.value1 = this.getTeacherInfo.teachTime;
    },
    methods: {
      ...mapActions([
        'setTeacherInfo'
      ]),
      confirm() {
        this.setTeacherInfo({teachTime:this.value1})
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
  .teachTime {
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
    .weui-btn_primary {
      background-color: #00a6e7;
    }
    .vux-popup-picker-select {
      text-align: left;
    }
    .footerBtn {
      width: 90%;
      margin: 1rem auto 0;
      text-align: center;
    }
  }
</style>
