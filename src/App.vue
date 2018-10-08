<template>
  <div id="app" @touchstart="touchstart" @touchmove="touchmove">
    <transition>
      <router-view></router-view>
    </transition>
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
  import {
    Loading,
  } from 'vux'
  import {
    mapState,
    mapActions
  } from 'vuex'
  import {
    getAT,
    getStudentInfo,
    getInfoTeacher
  } from './api/api'
  export default {
    name: 'app',
    components: {
      Loading
    },
    data() {
      return {
        clientX: 0,
        show2: false,
        inf: {
          img: require('@/assets/0e3a716cf47f1eb695e5b62597dec807.jpg'),
          nickname: '',
          name: '',
          sex: '男',
          birthday: '',
          address: '',
          cell: ''
        },
        teacherInf: {
          img: '',
          teachTime: {label:'',name:''},
          skill: '',
          name: '',
          sex: '男',
          birthday: '',
          address: '',
          cell: '',
          intro: '',
          edu: '',
          exp: '',
        }
      }
    },
    created() {
      const role = localStorage.getItem('role');
      getAT().then(res => {
        console.log(res)
      })
      if (role == 'teacher') {
        this.getInfoTeacher()
      } else {
        this.getStudentInfo()
      }
    },
    methods: {
      getStudentInfo() {
        getStudentInfo().then(res => {
          if (res.data === null) {
            localStorage.setItem('info', JSON.stringify(this.inf))
            this.setMyInfo({ ...this.inf
            })
          } else {
            let data = res.data;
            let inf = {
              img: data.avatarId,
              nickname: data.nickName ? data.nickName : '',
              name: data.realName ? data.realName : '',
              sex: data.gender ? data.gender.label : '男',
              birthday: data.birthday ? data.birthday.slice(0, 10) : '',
              address: data.address ? data.address : '',
              cell: data.mobilePhone ? data.mobilePhone : '',
              id: data.id
            }
            localStorage.setItem('info', JSON.stringify(inf))
            this.setMyInfo({ ...inf
            })
          }
        })
      },
      getInfoTeacher() {
        getInfoTeacher().then(res => {
          // console.log(res)
          if (res.data === null) {
            localStorage.setItem('info', JSON.stringify(this.teacherInf))
            this.setTeacherInfo({ ...this.teacherInf
            })
          } else {
            let data = res.data;
            let inf = {
              img: data.picId,
              teachTime: data.experience?data.experience:{label:'',name:''},
              skill: data.skill.split(','),
              name: data.realName,
              sex: data.gender ? data.gender.label : '',
              birthday: data.birthday ? data.birthday : '',
              address: data.address ? data.address : '',
              cell: data.mobilePhone ? data.mobilePhone : '',
              intro: data.description ? data.description : '',
              edu: data.edus,
              exp: data.exps,
            }
            localStorage.setItem('teacherInfo', JSON.stringify(inf))
            this.setTeacherInfo({ ...inf
            })
          }
        })
      },
      ...mapActions([
        'setMyInfo', 'setTeacherInfo'
      ]),
      touchstart($event) {
        this.clientX = $event.touches[0].clientX;
      },
      touchmove($event) {
        if (this.clientX < 20) {
          let r = confirm('是否要关闭当前页面')
          if (r == true) {
            this.$wechat.closeWindow();
          } else {}
        }
      }
    },
    computed: {
      ...mapState({
        isLoading: state => state.isLoading
      })
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  #app {
    width: 100%;
    height: 100%;
    background-color: #F4F4F4;
     ::-webkit-input-placeholder {
      color: #B2B2B2;
    }
  } // .fade-enter-active, .fade-leave-active {
  //   transition: opacity .2s;
  // }
  // .fade-enter, .fade-leave-to  {
  //   opacity: 0;
  // }
</style>
