<template>
    <div class="teacherChooseLesson">
        <!-- <view-box ref="viewBox">  -->
        <scroller delegate-id="myScroller"  :pageW="pageW" :on-infinite="loadMore" ref='my_scroller' v-if="lessonList1.length!=0">
        <!-- 列表 -->
        <group title=" ">
            <cell-box is-link v-for="(item,index) in lessonList1" :key="index" @click.native="changeIndex(item,index,$event)">
                <div class="lessonList">
                    <div class="imgModal">
                        <img :src="ccsrc" width="15" height="15" alt="" v-if="index===chooseIndex">
                        <img :src="ddsrc" width="15" height="15" alt="" v-else>
                    </div>
                    <x-img :default-src="dsrc" :src="`${apiUrl}/attach/img/${item.picId}/SQUARE`" width="65" height="65" alt="" container="#vux_view_box_body" :offset="1500*(page+1)"></x-img>
                    <div class="lessonDetail">
                        <div class="lessonList">
                            <!-- <div class="hot" v-if="item.ishot">热门</div> -->
                            <div class="lessonName">{{item.name}}</div>
                        </div>
                        <div class="lessonContent">{{item.courseNum}}节课-{{item.hours}}课时 | {{item.applyAge.label}}{{item.applyAge.label=='成人'?'':'儿童'}} | 满{{item.maxPerson||0}}人开课</div>
                    </div>
                </div>
                <!-- anything -->
            </cell-box>
        </group>
        </scroller>
        <!-- <div style="height:1.4rem;background:#f4f4f4;"></div> -->
         <div v-if="lessonList1.length===0" style="width:100%;height:80%;display:flex;justify-content:center;align-items:center;color:#999999;font-size:0.4rem;">
                    暂无课程
                </div>
        <div :class="['footB',chooseIndex!==''?'hasChoosen':'noChoosen']" @click="goToPublish">
            {{chooseIndex!==''?'确定':'请选择一门课程'}}
        </div>
        <!-- </view-box> -->
    </div>
</template>

<script>
    import {
        Group,
        Tab,
        TabItem,
        CellBox,
        ViewBox,
        XImg,
        XButton
    } from 'vux'
    import {
        getTeacherAlreadyClass
    } from '../api/api'
    import apiHost from '../../config/prod.env'
    import Scroller from '../components/Scroller'
    export default {
        components: {
            Group,
            Tab,
            TabItem,
            CellBox,
            ViewBox,
            XImg,
            Scroller,
            XButton
        },
        data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                dsrc: require('../assets/picload.png'),
                ccsrc: require('../assets/chooseicon.png'),
                ddsrc: require('../assets/noicon.png'),
                pageW: 'tc',
                chooseIndex: '',
                page:0,
                totalPages:0,
                lessonList1: [
                ]
            }
        },
        methods: {
            changeIndex(item,i, $event) {
                let cn = $event.target.parentNode.className;
                let dn = $event.target.className;
                if (cn.indexOf('imgModal') > -1 || dn.indexOf('imgModal') > -1) {
                    if (this.chooseIndex === i) {
                        this.chooseIndex = '';
                    } else {
                        this.chooseIndex = i;
                    }
                } else {
                    this.$router.push({
                        path: `/teacherChooseLessonDetail?id=${item.id}`
                    })
                }
            },
            goToPublish() {
                if (this.chooseIndex !== '') {
                    let id = this.lessonList1[this.chooseIndex].id
                    let name = this.lessonList1[this.chooseIndex].name
                    let type = this.lessonList1[this.chooseIndex].type.name
                    this.$router.push({
                        path: `/teacherPublishHome?id=${id}`,
                        query: {
                            title: name,
                            type : type
                        }
                    })
                }
            },
            loadMore() {
                // if(this.totalPages>this.page+1){
                    this.page++;
                    this.fetchData()
                // }else{
                //         this.$refs.my_scroller.finishInfinite(2)
                // }
            },
            fetchData(page = this.page){
                let para = {
                    // page:this.page,
                    // size:15
                    size: 15*(page+1),

                }
                getTeacherAlreadyClass(para).then(res=>{
                    console.log(res)
                    this.lessonList1 = res.data.content;
                     this.totalPages = res.data.totalElements;
                }).then(res => {
                    if (this.totalPages <= 15*(this.page + 1)) {
                        this.$refs.my_scroller&&this.$refs.my_scroller.finishInfinite(2)
                        this.page =Math.floor(this.totalPages/15)

                    }
                })
            }
        },
        created() {
            this.setTitle('选择已有课程内容')
            this.fetchData()
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {
        },
        computed: {},
    }
</script>

<style lang="less">
    .teacherChooseLesson {
        height: 100%;
        .weui-cells__title {
            margin-top: 0;
            padding-top: .2rem;
            padding-bottom: .1rem;
            font-size: .4rem;
        }
        .weui-cell_access.vux-cell-box:after{
            right: 9px;
        }
        .lessonList {
            width: 100%;
            display: flex;
            align-items: flex-start;
            padding: .1rem 0;
            position: relative;
        }
        .lessonDetail {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding-left: .3rem;
            font-size: 16px;
        }
        .lessonName {
            padding: 0 .2rem 0 0;
        }
        .lessonPrice {
            color: #fb6804;
            padding: .1rem 0;
            font-size: 12px;
        }
        .lessonContent {
            font-size: 12px;
            color: #b6b6b6;
            padding: .1rem 0;
        }
        .imgModal {
            width: 1rem;
            height: 65px;
            display: flex;
            justify-content: center;
            align-items: center;
            align-self: center;
            box-sizing: border-box;
            padding-right: .3rem; // position: absolute;
            // top: .1rem;
            // left: 0;
        }
        .footB {
            width: 100%;
            height: 1.5rem;
            line-height: 1.5rem;
            text-align: center;
            position: fixed;
            left: 0;
            bottom: 0;
            font-size: 17px;
        }
        .hasChoosen {
            background: #00a6e7;
            color: white;
        }
        .noChoosen {
            background-color: #e1e1e1;
            color: #484141;
        }
    }
</style>
