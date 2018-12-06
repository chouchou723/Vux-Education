<template>
    <div class="assistantClass">
        <tab custom-bar-width="60px" active-color="#00a6e7">
            <tab-item selected @on-item-click='changeItem("")'>
                <span style="padding:0 26px;border-right:1px solid gainsboro;text-align:center;">全部</span>
            </tab-item>
            <tab-item @on-item-click='changeItem("PROCESS")'>
                <span style="padding:0 .6rem;border-right:1px solid gainsboro">已开课</span>
            </tab-item>
            <tab-item @on-item-click='changeItem("WAIT")'>
                <span style="padding:0 .6rem;border-right:1px solid gainsboro">待审核</span>
            </tab-item>
            <tab-item @on-item-click='changeItem("END")'>已结课</tab-item>
        </tab>
        <!-- <view-box ref="viewBox">  -->
        <scroller delegate-id="myScroller" :on-refresh="refresh" :pageW="pageW" :on-infinite="loadMore" ref='my_scroller' v-if="lessonList1.length!=0">
            <!-- 列表 -->
            <group style="margin-top:-0.2rem" id="picContent">
                <cell-box is-link v-for="(item,index) in lessonList1" :key="index" :link="`/assistantLessonDetail?id=${item.id}`">
                    <div class="lessonList">
                        <x-img :default-src="dsrc" :src="`${apiUrl}/attach/img/${item.picId}/SQUARE`" style="margin-top:.05rem" width="65" height="65" alt="" container="#vux_view_box_body" :offset="1500*(page+1)"></x-img>
                        <div class="lessonDetail">
                            <div class="lessonList">
                                <!-- <div class="hot" v-if="item.ishot">热门</div> -->
                                <div class="lessonName">{{item.name}}</div>
                                <div class="lessonStatus" :style="item.status.label=='已开课'?'color: #04be02;border: 1px solid #04be02;':
                                        item.status.label=='已结课'||item.status.label=='已取消'?'color: #b6b6b6;border: 1px solid #b6b6b6;':'color: #F76260;border: 1px solid #F76260;'">{{item.status.label}}</div>
                            </div>
                            <div class="lessonContent">{{item.courseNum}}节课-{{item.totalTime}}课时 | {{item.applyAge.label}}{{item.applyAge.label=='成人'?'':'儿童'}} | 满{{item.minStuNum||0}}人开课</div>
                            <!-- <div class="lessonPrice" v-if="item.status.label=='已开课'||item.status.label=='待开课'">根据你的情况该课程费用约为{{item.price||0}}元</div> -->
                            <!-- <div class="lessonPrice" v-if="item.status.label=='已结课'">课程费用为{{item.price||0}}元</div> -->
                        </div>
                    </div>
                    <!-- anything -->
                </cell-box>
            </group>
        </scroller>
        <div class="noLessonDiv" v-if="lessonList1.length==0&&status!==''">
            <img src="../assets/noLesson.png" alt="">
            <div>暂无数据</div>
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
        getLessonList
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
                status: '',
                totalPages: 0,
                dsrc: require('../assets/picload.png'),
                // asrc: require("../assets/0e3a716cf47f1eb695e5b62597dec807.jpg"),
                value: '',
                value7: '',
                pageW: 'tc',
                page: 0,
                false: false,
                chooseT: false,
                chooseA: false,
                chooseS: false,
                typeKind: 0,
                chooseItemList: [],
                lessonList: [],
                lessonList1: [{
                    id: '',
                    hot: true,
                    name: '创意绘画单课',
                    courseNum: 0,
                    totalTime: 0,
                    applyAge: {
                        label: ''
                    },
                    minStuNum: 0,
                    price: 0,
                    status: {
                        label: ''
                    },
                    picId: "",
                }, ]
            }
        },
        methods: {
            changeItem(status) {
                this.status = status;
                this.fetchData(0)
            },
            refresh(cb) {
                this.page = 0;
                this.fetchData( this.page, cb);
                // this.$refs.my_scroller.finishPullToRefresh()
                // console.log(d)
            },
            loadMore() {
                // if (this.totalPages > this.page + 1) {
                    this.page++;
                    this.fetchData()
                // }
            },
            goToPay() {
                this.$router.push('/paying')
            },
            fetchData(page = this.page, cb) {
                let para = {
                    page: 0,
                    size: 15*(page+1),
                    status: this.status
                }
                getLessonList(para).then(res => {
                    // console.log(res)
                    this.lessonList1 = [...res.data.content];
                    this.totalPages = res.data.totalElements;
                }).then(res => {
                    if (this.totalPages <= 15*(this.page + 1)) {
                        this.$refs.my_scroller&&this.$refs.my_scroller.finishInfinite(2)
                        this.page =Math.floor(this.totalPages/15)

                    }
                    if (cb) cb()
                })
            }
        },
        created() {
            // console.log(4)
            this.setTitle('我的课程')
            this.fetchData()
        },
        mounted() {},
        computed: {},
    }
</script>

<style lang="less">
    .assistantClass {
        height: 100%;
        .lessonListAll {
            width: 100%;
            display: flex;
            flex-direction: column;
        }
        .noLessonDiv {
            width: 100%;
            margin-top: 4rem; // height: 4rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            img {
                width: 2rem;
            }
            div {
                font-size: .45rem;
                color: #8a8a8a
            }
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
        .weui-btn_primary,.weui-btn_primary:not(.weui-btn_disabled):active {
            background-color: #00a6e7;
        }
        .lessonTitle {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: .2rem 0 0;
        }
        .lessonTitleC {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: .1rem 0 .3rem;
            border-bottom: 1px solid gainsboro;
        }
        .lessonPrice {
            color: #fb6804;
            padding: .1rem 0;
            font-size: 12px;
        }
        .lessonTitleNo {
            color: #8a8e93;
            font-size: .4rem;
            position: relative;
        }
        .lessonTitleStatus {
            font-size: .4rem;
        } //  .weui-cell_access.vux-cell-box:after{
        //     display: none;
        // }
        .lessonTitleNo::before {
            content: '';
            position: absolute;
            width: .25rem;
            height: 1.2rem;
            background: #00a6e7;
            top: -.3rem;
            left: -0.5rem;
        }
        .lessonFoot {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            padding-top: .25rem;
            border-top: 1px solid gainsboro;
            margin-top: .35rem;
        }
        .lessonList {
             width: 100%;
            display: flex;
            align-items: flex-start;
            padding: .1rem 0;
            justify-content: space-between;
        }
        .lessonDetail {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding-left: .4rem;
            font-size: 16px;
            width: 100%;
            min-height: 2rem;
    justify-content: flex-start;
        }
        .hot {
            font-size: 12px;
            padding: 0 .1rem;
            background-color: #f76260;
            color: white;
            border-radius: .07rem;
            margin-right: .2rem;
        }
        .lessonName {
            padding: 0 .2rem 0 0;
            flex: 0 0 60%;           
        }
        .lessonStatus {
            font-size: 12px;
            border-radius: .3rem;
            padding: 0 .2rem;
            margin-top:.05rem;
            margin-right:.4rem;

        }
        .lessonContent {
            font-size: 12px;
            color: #b6b6b6;
            padding: .1rem 0;
        }
    }
</style>
