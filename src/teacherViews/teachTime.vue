<template>
  <div class="teachTime">
    <group title=" " label-width="4.5em" label-margin-right="2em">
      <popup-picker :data="list1" v-model="value1" value-text-align="left" placeholder="请选择你的教龄" show-name></popup-picker>
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
    PopupPicker
  } from 'vux'
  import {
    mapActions,
    mapGetters
  } from 'vuex';
  import {
    getTeacherExp
  } from '../api/api'
  export default {
    components: {
      Group,
      XButton,
      PopupPicker
    },
    data() {
      return {
        list1: [],
        value1: [],
      }
    },
    created() {
      this.setTitle('教龄')
      this.getTeacherExp()
    },
    methods: {
      ...mapActions([
        'setTeacherInfo'
      ]),
      confirm() {
        let arr = this.list1[0].filter(item => {
          return item.value === this.value1[0]
        })
        let newA = {
          label: arr[0].name,
          name: arr[0].value
        }
        this.setTeacherInfo({
          experience: newA
        })
        // this.$router.push('/applyFirst?step=2')
        this.$router.go(-1)
      },
      getTeacherExp() {
        getTeacherExp().then(res => {
          let arr = res.data.map(item => {
            return {
              name: item.label,
              value: item.name
            }
          })
          this.list1 = [arr]
          
          console.log(arr)
          let v = this.getTeacherInfo.experience.name?this.getTeacherInfo.experience.name:arr[0].value
          this.value1 = [v];
        })
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
    .weui-btn_primary,.weui-btn_primary:not(.weui-btn_disabled):active {
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
