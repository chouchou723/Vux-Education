<template>
  <div class="myName">
      
    <group title=" " label-width="4.5em" label-margin-right="2em">
      <x-input :max="20" :is-type='nickname' v-model="value" :placeholder="type?'请输入昵称':'请输入姓名'"></x-input>
    </group>
    <div class="footerBtn">
     <x-button type="primary" action-type="button" :disabled="value.length==0" @click.native="confireName">确定</x-button>

    </div>
  </div>
</template>

<script>
  import { XButton, Group,XInput } from 'vux'
import {
    mapActions,mapGetters
} from 'vuex';
  export default {
    components: {
      Group,
      XButton,
      XInput
    },
    data () {
      return {
        value: '',
        nickname: function (value) {
        return {
          valid: (/^[\u4e00-\u9fa5a-zA-Z0-9]+$/).test(value),
          msg: '不能输入符号'
        }
      },
      type:'',
      }
    },
    created(){
        this.type = this.$route.query.type;
        if( this.type){
            document.title = '昵称'
          this.value = this.getMyInfo.nickname
        }else{
          document.title = '姓名'
          this.value = this.getMyInfo.name
        }
    },
    methods:{
       ...mapActions([
                'setMyInfo'
            ]),
      confireName(){
        if( this.type){
          this.setMyInfo({nickname: this.value})
        }else{
          this.setMyInfo({name: this.value})
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
.myName{
    .weui-cells__title{
    margin-top: 0;
    padding-top:.2rem; 
    padding-bottom:.1rem;
    font-size: .4rem;
}
.footerBtn{
    width: 90%;
    margin:1rem auto 0;
    text-align: center;
}
}
</style>
