<template>
    <div class="myLesson">
        <!-- <view-box ref="viewBox"> -->
        <scroller delegate-id="myScroller" :pageW="pageW" :on-infinite="loadMore" ref='my_scroller'>
            <!-- 列表 -->
            <group style="margin-top:-0.2rem" class="groupC" v-for="(item,index) in lessonList" :key="index">
                <cell-box is-link :link="`/courseInfo?id=${item.id}`">
                    <div class="lessonListAll">
                        <div class="lessonTitleC">
                            <div class="lessonTitleNo">课程号:{{item.id}}</div>
                            <div class="lessonTitleStatus" :style="item.classStatus&&item.classStatus.label=='待上课'?'color:#f76967':
                            item.classStatus&&item.classStatus.label=='已上课'?'color:#04be02':'color:#8a8e93'">{{item.classStatus?item.classStatus.label:''}}</div>
                        </div>
                        <div class="lessonTitle">
                            <x-img :default-src="dsrc" :src="`${apiUrl}/attach/img/${item.picId}/SQUARE`" width="75" height="75" alt="" :offset="2000*page" container="#vux_view_box_body"></x-img>
                            <div class="lessonDetail">
                                <div class="lessonList">
                                    <div class="lessonName">{{item.name}}</div>
                                </div>
                                <div class="lessonContent">{{item.courseNum}}节课-{{item.hours}}课时</div>
                                <div class="lessonPrice">{{item.price}}元</div>
                            </div>
                        </div>
                    </div>
                    <!-- anything -->
                </cell-box>
            </group>
        </scroller>
        <!-- </view-box> -->
    </div>
</template>

<script>
    import {
        Group,
        CellBox,
        XImg,
        ViewBox
    } from 'vux'
    import {
        getMyLessonList
    } from '../api/api'
    import apiHost from '../../config/prod.env'
    import Scroller from '../components/Scroller'
    export default {
        components: {
            Group,
            CellBox,
            XImg,
            ViewBox,
            Scroller
        },
        data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                dsrc: require('../assets/picload.png'),
                asrc: require('../assets/0e3a716cf47f1eb695e5b62597dec807.jpg'),
                value: '',
                pageW: 'ml',
                page: 0,
                value7: '',
                false: false,
                chooseT: false,
                chooseA: false,
                chooseS: false,
                typeKind: 0,
                chooseItemList: [],
                lessonList: [
                ],
                totalPages:0
            }
        },
        methods: {
            loadMore() {
                // if(this.totalPages>this.page+1){
                    this.page++;
                    this.fetchData()
                // }else{
                //     this.$refs.my_scroller.finishInfinite(2)
                // }
            },
            fetchData(page = this.page){
                let para = {
                    // page : this.page
                    size: 15*(page+1),
                }
                getMyLessonList(para).then(res=>{
                    this.totalPages = res.data.totalElements;
                    this.lessonList = res.data.content
                    // console.log(this.lessonList)
                }).then(res => {
                    if (this.totalPages <= 15*(this.page + 1)) {
                        this.$refs.my_scroller.finishInfinite(2)
                        this.page =Math.floor(this.totalPages/15)

                    }
                })
            },
        },
        created() {
            document.title = "我的课程";
            this.fetchData()
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {},
        computed: {},
    }
</script>

<style lang="less">
    .myLesson {
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
            padding: 0.3rem 0 0.2rem;
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
        .lessonTitleStatus {
            font-size: .4rem;
        }
        .weui-cell_access.vux-cell-box:after {
            width: .3rem;
            height: .3rem;
            top: 65%;
        }
        .lessonTitleNo {
            color: #8a8e93;
            font-size: .4rem;
            position: relative;
        }
        .groupC {
            position: relative;
        }
        .groupC::before {
            content: '';
            position: absolute;
            width: .15rem;
            height: 1.2rem;
            background: #04be02;
            top: 0;
            left: 0;
            z-index: 1;
        }
    }
</style>
