<template>
  <div class="mySkill">
    <group title="最多填写3个标签,每个标签最多4个字" label-width="4.5em" label-margin-right="2em">
      <x-input :is-type='nickname' v-model="value1" placeholder="可填写一个标签"></x-input>
      <x-input :is-type='nickname' v-model="value2" placeholder="可填写一个标签"></x-input>
      <x-input :is-type='nickname' v-model="value3" placeholder="可填写一个标签"></x-input>
    </group>
    <div class="footerBtn">
      <x-button type="primary" action-type="button" :disabled="value.length==0" @click.native="confireName">确定</x-button>
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
        value1: '',
        value2: '',
        value3: '',
        nickname: function(value) {
          return {
            //   valid: (/^[\u4e00-\u9fa5a-zA-Z0-9]+$/).test(value),
            valid: value.length <= 4,
            msg: '字数超过4个字'
          }
        },
        type: '',
      }
    },
    created() {
      this.type = this.$route.query.type;
      if (this.type) {
        document.title = '昵称'
        this.value = this.getMyInfo.nickname
      } else {
        document.title = '姓名'
        this.value = this.getMyInfo.name
      }
    },
    methods: {
      ...mapActions([
        'setMyInfo'
      ]),
      confireName() {
        if (this.type) {
          this.setMyInfo({
            nickname: this.value
          })
        } else {
          this.setMyInfo({
            name: this.value
          })
        }
        this.$router.push('/myInfo')
      },
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
  .mySkill {
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
