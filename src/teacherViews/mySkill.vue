<template>
  <div class="mySkill">
    <group title="最多填写3个标签,每个标签最多4个字" label-width="4.5em" label-margin-right="2em">
      <x-input :is-type='nickname' v-model="value1" placeholder="可填写一个标签"></x-input>
      <x-input :is-type='nickname' v-model="value2" placeholder="可填写一个标签"></x-input>
      <x-input :is-type='nickname' v-model="value3" placeholder="可填写一个标签"></x-input>
    </group>
    <div class="footerBtn">
      <x-button type="primary" action-type="button" :disabled="!value1&&!value2&&!value3" @click.native="confireName">确定</x-button>
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
        document.title = '擅长'
        this.value1 = this.getTeacherInfo.skill[0]
        this.value2 = this.getTeacherInfo.skill[1]
        this.value3 = this.getTeacherInfo.skill[2]
    },
    methods: {
      ...mapActions([
        'setTeacherInfo'
      ]),
      confireName() {
          this.setTeacherInfo({
            skill: [this.value1,this.value2,this.value3]
          })
        // this.$router.push('/applyFirst?step=2')
        this.$router.go(-1)
      },
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
