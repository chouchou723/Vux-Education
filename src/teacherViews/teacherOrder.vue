<template>
    <div class="teacherOrder">
        <!-- <view-box ref="viewBox"> -->
            <tab custom-bar-width="60px" active-color="#00a6e7">
                <tab-item selected @on-item-click='changeItem("")'>
                    <span style="padding:0 32px;border-right:1px solid gainsboro">全部</span>
                </tab-item>
                <tab-item @on-item-click='changeItem("PASS")'>
                    <span style="padding:0 .6rem;border-right:1px solid gainsboro">待上课</span>
                </tab-item>
                <tab-item @on-item-click='changeItem("PROCESS")'>
                    <span style="padding:0 .6rem;border-right:1px solid gainsboro">已上课</span>
                </tab-item>
                <tab-item @on-item-click='changeItem("CANCEL")'>已退款</tab-item>
            </tab>
            <!-- 列表 -->
            <scroller delegate-id="myScroller" :on-infinite="loadMore" :pageW="pageW" ref='my_scroller' v-if="lessonList.length!==0">
            <group style="margin-top:-0.2rem" v-for="(item,index) in lessonList" :key="index" >
                <cell-box is-link :link="`/teacherLessonDetail/?id=${item.id}`">
                    <div class="lessonListAll">
                        <div class="lessonTitleC">
                            <div class="lessonTitleNo">订单号:{{item.code}}</div>
                            <div class="lessonTitleStatus" :style="item.status.name=='PASS'?'color:#f76967':item.status.name=='PROCESS'?'color:#04be02':'color:#8a8e93'">{{item.status.label}}</div>
                        </div>
                        <div class="lessonTitle">
                            <x-img :default-src="dsrc" :src="`${apiUrl}/attach/img/${item.course.picId}/SQUARE`" width="80" height="80" alt="" :offset="1500*(page+1)" container="#vux_view_box_body"></x-img>
                            <div class="lessonDetail">
                                <div class="lessonList">
                                    <div class="lessonName">{{item.course.name}}</div>
                                </div>
                                <!-- <div class="lessonContent">{{item.content}}</div> -->
                                <div class="lessonPrice">总价:{{item.price}}元</div>
                            </div>
                        </div>
                    </div>
                    <!-- anything -->
                </cell-box>
            </group>
            </scroller>
             <cell-box v-if="lessonList.length===0">
                 <div style="text-align:center;font-size:17px;color:rgb(170, 170, 170);width:100%;margin-top:10px">没有更多数据</div>
             </cell-box>
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
        XImg
    } from 'vux'
    import {
        getTeacherOrder
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
            XImg,Scroller
        },
        data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                page: 0,
                pageW:'',
                totalPages:0,
                dsrc: require('../assets/picload.png'),
                asrc: require("../assets/0e3a716cf47f1eb695e5b62597dec807.jpg"),
                value: '',
                lessonList: [
                ],
                status:'',
            }
        },
        methods: {
            loadMore() {
               if(this.totalPages>this.page+1){
                    this.page++;
                    this.fetchData()
                }else{
                    // console.log(12213)
                        this.$refs.my_scroller.finishInfinite(2)
                }
            },
            changeItem(status) {
                this.status = status;
                this.fetchData(0)
                // console.log(num)
            },
            fetchData(page=this.page){
                let para={
                    page:page,
                    size:15,
                    status: this.status,
                    // sort:'asc'
                }
                getTeacherOrder(para).then(res=>{
                    this.totalPages = res.data.totalPages;
                    this.lessonList = res.data.content;
                })
            }
        },
        created() {
            this.setTitle('我的订单');
            this.fetchData()
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {},
        computed: {},
    }
</script>

<style lang="less">
    .teacherOrder {
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
            font-size: 16px;
        }
        .lessonName {
            padding: 0 .2rem 0 0;
        }
        .lessonContent {
            font-size: .16rem;
            color: #b6b6b6;
            padding: .1rem 0;
        }
        .lessonPrice {
            color: #fb6804;
            padding: .1rem 0;
        }
        .lessonTitleNo {
            color: #8a8e93;
            font-size: .4rem;
            position: relative;
        }
        .lessonTitleStatus {
            font-size: .4rem;
        }
        .weui-cell_access.vux-cell-box:after {
            display: none;
        }
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
        .pay {
            font-size: .4rem;
            width: 2.3rem;
            height: .9rem;
            line-height: .9rem;
            text-align: center;
            border: 1px solid #31a2cf;
            color: #31a2cf;
            border-radius: .1rem;
            margin-right: .3rem;
        }
        .notPay {
            font-size: .4rem;
            width: 2.3rem;
            height: .9rem;
            line-height: .9rem;
            text-align: center;
            border: 1px solid black;
            border-radius: .1rem;
        }
    }
</style>
