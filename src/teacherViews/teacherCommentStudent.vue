<template>
  <div class="teacherCommentStudent">
    <group :title="studentName" label-width="4.5em" label-margin-right="2em">
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
    getTeacherLessonDetailList,
    doStudentComment
  } from '../api/api'
  export default {
    components: {
      Group,
      XButton,
      XTextarea
    },
    data() {
      return {
        value: '',
        studentName:'',
        nickname: function(value) {
          return {
            valid: (/^[\u4e00-\u9fa5a-zA-Z0-9]+$/).test(value),
            msg: '不能输入符号'
          }
        },
      }
    },
    created() {
      this.setTitle('学生点评')
      this.fetchData()
    },
    methods: {
      confirm() {
        let para = {
          evaluate: this.value,
          stuId: this.$route.query.sid
        }
        let id = this.$route.query.id;
        doStudentComment(para, id).then(res => {
          if (res.code == 0) {
            this.$vux.toast.show({
              text: '点评成功'
            })
          }
        }).then(() => {
          this.$router.go(-1)
        }).catch(()=>{
                        this.$router.go(-1)
                    })
      },
      fetchData() {
        let id = this.$route.query.id;
        getTeacherLessonDetailList(id).then(res => {
          console.log(res)
          let data = res.data;
          let arr = data.evaluates.filter(item => {
            return item.stuId == this.$route.query.sid
          })
          this.studentName = arr[0].stuName
          this.value = arr[0].evaluate
        })
      }
    },
    computed: {},
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
