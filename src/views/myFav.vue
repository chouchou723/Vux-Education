<template>
    <div class="myFav">
        <!-- <view-box ref="viewBox"> -->
        <scroller delegate-id="myScroller" :on-infinite="loadMore" ref='my_scroller' v-if="lessonList.length!==0">

            <group style="margin-top:-0.2rem" >
                <cell-box is-link v-for="(item,index) in lessonList" :key="index" :link="`/courseDetails?id=${item.courseId}`">
                    <div class="lessonListAll">
                        <div class="lessonTitle">
                            <x-img :default-src="dsrc" :src="`${apiUrl}/attach/img/${item.course.picId}/SQUARE`" width="74" height="74" alt="" :offset="700" container="#vux_view_box_body"></x-img>
                            <div class="lessonDetail">
                                <div class="lessonList">
                                    <div class="lessonName">{{item.course.name}}</div>
                                </div>
                                <div class="lessonContent">{{item.course.courseNum}}节课-{{item.course.hours}}课时 | {{item.course.applyAge.label}}{{item.course.applyAge.label=='成人'?'':'儿童'}} | 满{{item.course.minStuNum}}人开课</div>
                                <div class="lessonPrice">{{item.course.price}}元</div>
                            </div>
                        </div>
                    </div>
                    <!-- anything -->
                </cell-box>
            </group>
        </scroller>
             <div v-if="lessonList.length===0" style="width:100%;height:80%;display:flex;justify-content:center;align-items:center;color:#999999;font-size:0.4rem;">
                    暂无收藏
                </div>
        <!-- </view-box> -->
    </div>
</template>

<script>
    import {
        Group,
        CellBox,
        ViewBox,
        XImg
    } from 'vux'
    import {
        getMyCollect
    } from '../api/api'
    import apiHost from '../../config/prod.env'
    import Scroller from '../components/Scroller'

    export default {
        components: {
            Group,
            CellBox,
            ViewBox,
            XImg,Scroller
        },
        data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                dsrc: require('../assets/picload.png'),
                asrc: require("../assets/0e3a716cf47f1eb695e5b62597dec807.jpg"),
                value: '',
                value7: '',
                page:0,
                totalPages:0,
                false: false,
                chooseT: false,
                chooseA: false,
                chooseS: false,
                typeKind: 0,
                chooseItemList: [],
                lessonList: [
                ]
            }
        },
        methods: {
            loadMore() {
            //    if(this.totalPages>this.page+1){
                    this.page++;
                    this.fetchData()
                // }else{
                //     console.log(12213)
                //         this.$refs.my_scroller.finishInfinite(2)
                // }
            },
            fetchData(page = this.page){
                let para ={
                    // page:0
                    size: 15*(page+1),

                }
                getMyCollect(para).then(res=>{
                    console.log(res)
                    this.totalPages = res.data.totalElements;
                    this.lessonList = res.data.content;
                }).then(res => {
                    if (this.totalPages <= 15*(this.page + 1)) {
                        this.$refs.my_scroller.finishInfinite(2)
                        this.page =Math.floor(this.totalPages/15)

                    }
                })
            }
        },
        created() {
            this.setTitle('我的收藏');
            this.fetchData()
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {},
        computed: {},
    }
</script>

<style lang="less">
    .myFav {
        height: 100%;
        .lessonListAll {
            width: 100%;
            display: flex;
            flex-direction: column;
        }
        .lessonTitle {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: .2rem 0;
        }
        .lessonTitleC {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: .1rem 0 .3rem;
            border-bottom: 1px solid gainsboro;
            position: relative;
        }
        .lessonList {
            width: 100%;
            display: flex;
            align-items: center;
            padding: .1rem 0;
        }
        .lessonDetail {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding-left: .4rem;
        }
        .lessonName {
            padding: 0 .2rem 0 0;
        }
        .lessonContent {
            font-size: 12px;
            color: #b6b6b6;
            padding: .1rem 0;
        }
        .lessonPrice {
            color: #fb6804;
        }
        .weui-cell_access.vux-cell-box:after {
            width: .3rem;
            height: .3rem;
            top: 50%;
        }
    }
</style>
