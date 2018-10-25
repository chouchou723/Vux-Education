<template>
    <div class="teacherPicComment">
        <view-box ref="viewBox">
            <group>
                <cell primary="content" value-align="left">
                    <div class="detailImg6">
                        <div v-for="(item,index) in pics" :key="index" :class="item.src?'detailImg':''" @click="show(index)">
                            <span class="detailNo" v-if="item.src">{{index+1}}</span>
                            <div :style="`background:url(${item.src}) no-repeat center/cover; width: 2.9rem;height: 2.9rem;`"></div>
                        </div>
                    </div>
                </cell>
                <!-- <cell style="font-size:15px;" > -->
                <x-textarea :max="500" :rows="8" v-model="value" placeholder="请对于本次课程中的作品进行点评" :show-counter="true"></x-textarea>
                <!-- </cell> -->
                <div v-transfer-dom>
                    <previewer :list="pics" ref="previewer"></previewer>
                </div>
            </group>
            <div class="footerBtn">
                <x-button type="primary" action-type="button" @click.native="saveInfo" :show-loading="isloading" :disabled="isloading">提交</x-button>
            </div>
        </view-box>
    </div>
</template>

<script>
    import {
        Group,
        Cell,
        ViewBox,
        Previewer,
        XTextarea,
        XButton,
    TransferDom
    } from 'vux'
    import {
        getTeacherLessonDetailList,
        doStudentPicComment
    } from '../api/api'
    import apiHost from '../../config/prod.env'
    export default {
        directives: {
            TransferDom
        },
        components: {
            Group,
            Cell,
            ViewBox,
            Previewer,
            XTextarea,
            XButton,
            
        },
        data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                value: '',
                pics: [
                ],
                isloading:false
            }
        },
        methods: {
            show(index) {
                this.$refs.previewer.show(index)
            },
            saveInfo(){
                  if (!this.isloading && this.value) {
                      this.isloading = true;
                      let para = {
                          evaluate: this.value
                      }
                      let id = this.$route.query.id
                      doStudentPicComment(para,id).then(res=>{
                          if(res.code==0){
                              this.$vux.toast.show({
                                      text: '上传成功'
                                  })
                                  this.isloading = false;
                          }
                      }).then(()=>{
                          this.$router.go(-1)
                      }).catch(()=>{
                        this.isloading = false;
                        this.$router.go(-1)
                    })
                    }
            },
            fetchData() {
                let id = this.$route.query.id;
                getTeacherLessonDetailList(id).then(res => {
                    console.log(res)
                    let data = res.data;
                    this.value = data.evaluate
                    this.pics = data.picIds.map(item=>{
                        return {src:`${this.apiUrl}/attach/img/${item.id}`}
                    })
                })
            }
        },
        created() {
            this.setTitle('作品点评')
            this.fetchData()
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {},
        computed: {},
    }
</script>

<style lang="less">
    .teacherPicComment {
        height: 100%;
        .coinBgS {
            width: 100%;
            height: 1.8rem;
            background-color: #fff;
            padding: 0.2rem 0.5rem;
            position: relative;
            box-sizing: border-box;
        }
        .coinBgS::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: .15rem;
            height: 100%;
            background-color: #04be02;
        }
        .coinTitle {
            font-size: 13px;
            color: #999999;
        }
        .coinContent {
            font-size: 16px;
            margin-bottom: .1rem;
        }
        .detailImg6 {
            display: flex;
            width: 9rem;
            flex-wrap: wrap;
            justify-content: flex-start;
            margin: 0 auto;
        }
        .detailImg {
            flex: 0 0 2.9rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: .3rem;
            position: relative;
        }
        .detailImg:nth-child(3n+2){
            margin-left:.15rem;
            margin-right:.15rem;
        }
        .img6 {
            width: 2.9rem;
            height: 2.9rem;
            position: relative;
        }
        .detailNo {
            position: absolute;
            ;
            top: .09rem;
            left: 0;
            color: white;
            z-index: 1;
            font-size: 12px;
            width: 0.9rem;
            text-align: left;
            padding-left: .1rem;
        }
        .detailImg::after {
            content: '';
            width: 0;
            height: 0;
            border-width: 0 0 .9rem .9rem;
            border-style: solid;
            border-color: transparent transparent transparent #00a6e7;
            position: absolute;
            ;
            top: 0;
            left: 0;
        }
        .footerBtn {
            width: 90%;
            margin: 1rem auto 0;
            text-align: center;
        }
        .weui-btn_disabled.weui-btn_primary {
            background-color: #e1e1e1;
            color: black;
        }
        .weui-btn_primary,.weui-btn_loading.weui-btn_primary,.weui-btn_primary:not(.weui-btn_disabled):active {
            background-color: #00a6e7;
        }
    }
</style>
