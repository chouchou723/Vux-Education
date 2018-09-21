<template>
  <div class="teacherCommentStudent">
    <group title="张明霞" label-width="4.5em" label-margin-right="2em">
      <x-textarea :max="300" v-model="value" :rows="5" placeholder="学生上课情况怎么样,画的好不好,表现满意吗?" :show-counter="true"></x-textarea>
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
      document.title = '地址'
      this.value = this.getMyInfo.address
    },
    methods: {
      ...mapActions([
        'setMyInfo'
      ]),
      confirm() {
        this.setMyInfo({
          address: this.value
        })
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
  .teacherCommentStudent {
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
    .footerBtn {
      width: 90%;
      margin: 1rem auto 0;
      text-align: center;
    }
  }
</style>
