<template>
  <div class="teachTime">
    <group title=" " label-width="4.5em" label-margin-right="2em">
      <popup-picker :data="list1" v-model="value1" value-text-align="left" placeholder="请选择你的教龄"></popup-picker>
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
        value: '',
        value1: [],
      }
    },
    created() {
      document.title = '手机'
    },
    methods: {
      ...mapActions([
        'setMyInfo'
      ]),
      confirm() {
        // this.setMyInfo({cell:this.value})
        this.$router.push('/myInfo')
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
