<template>
    <div class="lecture">
        <sticky scroll-box="vux_view_box_body" ref="sticky" :offset="0" :check-sticky-support="false">
            <search v-model="searchValue" position="absolute" auto-scroll-to-top @on-cancel="onCancel" @on-submit="onSubmit" @on-focus="onFocus" ref="search" @touchmove.native="touchmove"></search>
            <tab custom-bar-width="40px" @touchmove.native="touchmove">
                <tab-item @on-item-click="changeLesson('SINGLE')" selected>兴趣体验</tab-item>
                <tab-item @on-item-click="changeLesson('SUIT')">系统学习</tab-item>
            </tab>
            <div class="chooseDiv" @touchmove="touchmove">
                <div class="chooseTitle" :style="chooseIndex!==1?'':'color:#04BE02'" @click="chooseSelect('time')">{{this.value7?this.value7:'上课时间'}}
                    <img src="../assets/tri.png" alt="" style="width:.25rem;margin-left:.1rem" v-if="chooseIndex!==1">
                    <img src="../assets/triS.png" alt="" style="width:.25rem;margin-left:.1rem" v-else>
                </div>
                <div class="chooseTitle" :style="chooseIndex!==2?'':'color:#04BE02'" @click="chooseSelect('add')">上课地点
                    <img src="../assets/tri.png" alt="" style="width:.25rem;margin-left:.1rem" v-if="chooseIndex!==2">
                    <img src="../assets/triS.png" alt="" style="width:.25rem;margin-left:.1rem" v-else></div>
                <div class="chooseTitle" :style="chooseIndex!==3?'':'color:#04BE02'" @click="chooseSelect('select')">筛选条件
                    <img src="../assets/tri.png" alt="" style="width:.25rem;margin-left:.1rem" v-if="chooseIndex!==3">
                    <img src="../assets/triS.png" alt="" style="width:.25rem;margin-left:.1rem" v-else></div>
                <!-- <div class="modalTime" v-if="chooseIndex===1">
                    {{nowTime}}
                </div> -->
            </div>
        </sticky>
        <!-- 列表 -->
        <scroller delegate-id="myScroller" :pageW="pageW" :on-refresh="refresh" :on-infinite="loadMore" ref='my_scroller' v-if="lessonList.length!==0">
            <group id="picContent">
                <!-- <div> -->
                <cell-box is-link v-for="(item,index) in lessonList" :key="index" :link="`/courseDetails?id=${item.id}`">
                    <div class="lessonList">
                        <x-img :default-src="dsrc" :src="`${apiUrl}/attach/img/${item.picId}/SQUARE`" style="margin-top:.05rem" width="65" height="65" alt="" container="#vux_view_box_body" :offset="1500*(page+1)" :delay="50"></x-img>
                        <div class="lessonDetail">
                            <div class="lessonList">
                                <div class="hot" v-if="item.hot">热门</div>
                                <div class="lessonName">{{item.name}}</div>
                                <div class="lessonStatus">{{item.maxStuNum}}人-已报{{item.stuNum||0}}人</div>
                            </div>
                            <div class="lessonContent">{{item.courseNum}}节课-{{item.hours}}课时 | {{item.applyAge.label}}{{item.applyAge.label=='成人'?'':'儿童'}} | 满{{item.minStuNum||0}}人开课</div>
                            <div class="lessonPrice">{{item.price||0}}元</div>
                        </div>
                    </div>
                    <!-- anything -->
                </cell-box>
                <!-- </div> -->
            </group>
        </scroller>
        <div v-if="lessonList.length===0" style="width:100%;height:80%;display:flex;justify-content:center;align-items:center;color:#999999;font-size:0.4rem;">
                    暂无课程
                </div>
        <group class="modalG" v-if="chooseIndex===1">
            <datetime v-model="value7" clear-text="重置" @on-confirm="changeDate" @on-clear="clearDate" :show="chooseIndex===1" @on-cancel="cancelSelect">
            </datetime>
        </group>
        <!-- 蒙版 -->
        <div v-transfer-dom>
            <div class="LecturenormalModal" v-if="chooseIndex===2||chooseIndex===3" @click="cancelSelectModal" @touchmove="touchmove">
                <!-- 地点筛选 -->
                <div class="LecturemodalAdd" v-if="chooseIndex===2">
                    <div style="width:100%;height:.34rem;background:#F4F4F4;border-bottom:1px solid #D9D9D9"></div>
                    <div class="LectureaddList">
                        <div v-for="(item,index) in addList" :key="index" :class="chooseItemList.includes(item.id)?'LectureselectItem':'LectureaddItem'" @click="chooseItem(item.id)">{{item.name}}</div>
                    </div>
                    <div class='Lectureaddfooter'>
                        <div style="color:grey" @click="cancelSelect">取消</div>
                        <div style="color:#04BE02" @click="clearAddSelect">重置</div>
                        <div @click="confirmAddSelect">确定</div>
                    </div>
                </div>
                <!-- 筛选条件 -->
                <div class="LecturemodalSelect" v-if="chooseIndex===3">
                    <div style="width:100%;height:.34rem;background:#F4F4F4;border-bottom:1px solid #D9D9D9"></div>
                    <div class="LectureselectTwo">
                        <div class="LectureselectTwoFirst">
                            <div :class="['LectureselectKind',typeKind==index?'LecturetypeChoose':'']" v-for="(item,index) in kindList" :key="index" @click="changeType(index)">
                                {{item}}
                            </div>
                        </div>
                        <div class="LectureaddListS">
                            <div v-for="(item,index) in selectList[typeKind]" :key="index" :class="chooseListSelect[typeKind].includes(item.name)?'LectureselectItem':'LectureaddItem'" @click="chooseItemSelect(item.name)">{{item.label}}</div>
                        </div>
                    </div>
                    <div class='Lectureaddfooter'>
                        <div style="color:grey" @click="cancelSelect">取消</div>
                        <div style="color:#04BE02" @click="clearsSelect">重置</div>
                        <div @click="confirmsSelect">确定</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        Group,
        Tab,
        TabItem,
        Cell,
        Search,
        Datetime,
        CellBox,
        Loading,
        Sticky,
        TransferDom,
        XImg
    } from 'vux'
    import {
        getLessonList,
        getAllVenue,
        getCourseKind,
        getApplyAge
    } from '../api/api'
    import apiHost from '../../config/prod.env'
    import Scroller from '../components/Scroller'
    export default {
        directives: {
            TransferDom
        },
        components: {
            Group,
            Tab,
            TabItem,
            Cell,
            Search,
            Datetime,
            CellBox,
            Loading,
            Sticky,
            XImg,
            Scroller
        },
        data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                searchValue: '',
                page: 0,
                size: 15,
                classType: 'SINGLE',
                dsrc: require('../assets/picload.png'),
                value7: '',
                false: false,
                show2: false,
                chooseIndex: 0,
                typeKind: 0,
                pageW:'',
                typeKindBackup: 0,
                chooseItemList: [],
                chooseItemListBackup: [],
                nowTime: '', //`${new Date().getFullYear()}年${new Date().getMonth()+1}月${new Date().getDate()}日`,
                addList: [],
                selectList: [
                    [],
                    []
                ],
                chooseListSelect: {
                    0: [],
                    1: []
                },
                chooseListSelectBackUp: {
                    0: [],
                    1: []
                },
                kindList: ['课程种类', '适用对象', ],
                onFetching: false,
                lessonList: [],
                totalPages: 0,
            }
        },
        methods: {
            refresh(cb) {
                this.page = 0;
                this.fetchData(this.page, cb);
            },
            loadMore() {
                // console.log('首次')
                // if(this.totalPages>this.page+1){
                this.page++;
                this.fetchData()
                // }else{
                //         this.$refs.my_scroller.finishInfinite(2)
                // }
            },
            changeLesson(type) {
                this.classType = type;
                this.chooseIndex = 0;
                this.page = 0;
                this.fetchData();
            },
            chooseItemSelect(id) {
                if (this.chooseListSelect[this.typeKind].includes(id)) {
                    this.chooseListSelect[this.typeKind] = this.chooseListSelect[this.typeKind].filter(item => {
                        return item != id;
                    })
                } else {
                    this.chooseListSelect[this.typeKind].push(id)
                }
                // console.log(this.chooseListSelectBackUp)
            },
            changeType(type) {
                this.typeKind = type;
                // this.selectList = this['selectList'+type]
            },
            cancelSelect() {
                this.chooseIndex = 0;
            },
            cancelSelectModal($e) {
                if ($e.target.className === 'LecturenormalModal') {
                    this.chooseIndex = 0;
                }
            },
            clearAddSelect() {
                this.chooseItemList = [];
                this.chooseItemListBackup = [];
                this.chooseIndex = 0;
                this.fetchData(0);
            },
            clearsSelect() {
                this.chooseListSelect = [
                    [],
                    []
                ];
                this.chooseListSelectBackUp = [
                    [],
                    []
                ];
                this.typeKind = 0;
                this.typeKindBackup = 0;
                this.chooseIndex = 0;
                this.fetchData(0);
            },
            confirmAddSelect() { //确认上课地点
                this.chooseItemListBackup = JSON.parse(JSON.stringify(this.chooseItemList));
                this.chooseIndex = 0;
                this.fetchData(0);
            },
            confirmsSelect() { //确认上课年龄和上课类型
                this.chooseIndex = 0;
                this.chooseListSelectBackUp = JSON.parse(JSON.stringify(this.chooseListSelect))
                this.typeKindBackup = this.typeKind;
                this.fetchData(0);
                // console.log(this.chooseListSelectBackUp)
            },
            chooseItem(id) {
                if (this.chooseItemList.includes(id)) {
                    this.chooseItemList = this.chooseItemList.filter(item => {
                        return item != id;
                    })
                } else {
                    this.chooseItemList.push(id)
                }
            },
            changeDate(value) {
                // this.value7
                this.nowTime = value.split('-')[0] + '年' + value.split('-')[1] + '月' + value.split('-')[2] + '日';
                this.chooseSelect('time');
                this.fetchData(0);
                // console.log(value)
            },
            clearDate() {
                this.nowTime = '';
                this.value7 = '' //new Date().toLocaleDateString().replace(/\//g, '-')
                this.chooseSelect('time');
                this.fetchData(0);
            },
            onSubmit() {
                this.fetchData(0);
            },
            onCancel() {
                this.searchValue = '';
                this.fetchData(0);
            },
            onFocus() {
                this.chooseIndex = 0;
            },
            chooseSelect(type) {
                // this.typeKind = 0;
                if (type == 'time') {
                    this.chooseIndex === 1 ? this.chooseIndex = 0 : this.chooseIndex = 1
                } else if (type == 'add') {
                    this.chooseIndex === 2 ? this.chooseIndex = 0 : this.chooseIndex = 2
                    this.chooseItemList = JSON.parse(JSON.stringify(this.chooseItemListBackup))
                } else {
                    this.chooseIndex === 3 ? this.chooseIndex = 0 : this.chooseIndex = 3
                    this.chooseListSelect = JSON.parse(JSON.stringify(this.chooseListSelectBackUp))
                    this.typeKind = this.typeKindBackup;
                }
            },
            touchmove($event) {
                if (this.chooseIndex === 2 || this.chooseIndex === 3) {
                    $event.preventDefault()
                }
            },
            fetchData(page = this.page, cb) {
                this.page = page;
                let para = {
                    applyAge: this.chooseListSelectBackUp[1].join(','),
                    status:'PASS',
                    date: this.value7,
                    kinds: this.chooseListSelectBackUp[0].join(','),
                    name: this.searchValue,
                    // page: page,
                    size: 15 * (page + 1),
                    type: this.classType,
                    venueId: this.chooseItemListBackup.join(',')
                }
                getLessonList(para).then(res => {
                    // console.log(res)
                    this.totalPages = res.data.totalElements;
                    this.lessonList = res.data.content;
                    if (page == 0) {
                        this.$refs.my_scroller&&this.$refs.my_scroller.scrollTo(0, 0)
                    }
                }).then(res => {
                    if (this.totalPages <= 15 * (this.page + 1)) {
                        this.$refs.my_scroller&&this.$refs.my_scroller.finishInfinite(2)
                        this.page =Math.floor(this.totalPages/15)
                    }
                    if (cb) cb()
                })
            },
            getVenue() { //获取场馆
                getAllVenue().then(res => {
                    this.addList = res.data;
                    // console.log(res)
                })
            },
            getCourseKind() {
                getCourseKind().then(res => {
                    this.selectList[0] = res.data
                    // console.log(this.selectList)
                })
            },
            getApplyAge() {
                getApplyAge().then(res => {
                    this.selectList[1] = res.data
                })
            }
        },
        created() {
            this.setTitle("我要选课")
            this.changeType(0)
            this.fetchData();
            this.getVenue();
            this.getCourseKind();
            this.getApplyAge();
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {},
        computed: {},
    }
</script>

<style lang="less">
    .lecture {
        height: 100%;
        .chooseDiv {
            width: 100%;
            display: flex;
            position: relative;
        }
        .chooseTitle {
            font-size: 12px;
            flex: auto;
            padding: .4rem .3rem;
            background: white;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }
        .modalTime {
            width: 100%;
            position: absolute;
            bottom: -1.3rem;
            height: 1rem;
            background-color: white;
            display: flex;
            align-items: center;
            padding-left: .7rem;
            z-index: 1;
        }
        .modalG {
            position: absolute;
            bottom: -1.4rem;
        }
        .lessonList {
            width: 100%;
            display: flex;
            align-items: flex-start;
            padding: 0 0 .1rem;
        }
        .lessonDetail {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding-left: .4rem;
            width: 100%;
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
            flex: 0 0 65%;
        }
        .lessonStatus {
            font-size: 12px;
            color: #fa9b9a;
            border: 1px solid #fa9b9a;
            border-radius: .3rem;
            padding: 0 .2rem;
            margin-top:.05rem;
        }
        .lessonContent {
            font-size: 12px;
            color: #b6b6b6;
        }
        .lessonPrice {
            color: #fb6804;
        }
    }
    .LecturenormalModal {
        // width: 100%;
        // position: absolute;
        // bottom:0;
        // height: 100%;
        // background-color: rgba(0,0,0,0.5);
        // z-index: 600;
        position: fixed;
        width: 100%;
        height: 20rem;
        left: 0px;
        top: 3.6rem; // opacity: 0.5;
        -webkit-transition: opacity 0.2s ease-in;
        transition: opacity 0.2s ease-in;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 501;
    }
    .LecturemodalAdd {
        width: 100%; // position: absolute;
        // top:3.6rem;
        min-height: 3rem;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between; // z-index: 1001;
        overflow: hidden;
    }
    .LectureaddList {
        /* width: 100%; */
        display: flex;
        padding: 0.3rem .7rem;
        justify-content: flex-start;
        flex-wrap: wrap;
        min-height: 2rem;
    }
    .LectureaddItem {
        padding: 0 0.2rem;
        height: .7rem;
        line-height: .7rem;
        border: 1px solid gainsboro;
        margin-right: .2rem;
        margin-bottom: .2rem;
    }
    .LectureselectItem {
        padding: 0 0.2rem;
        height: .7rem;
        line-height: .7rem;
        border: 1px solid #04be02;
        background-color: #04be02;
        color: white;
        margin-right: .2rem;
        margin-bottom: .2rem;
    }
    .Lectureaddfooter {
        display: flex;
        justify-content: space-between;
        padding: 0.3rem .7rem;
        font-size: .4rem;
        border-top: 1px solid gainsboro;
    }
    .LecturemodalSelect {
        width: 100%; // position: absolute;
        // top:3.6rem;
        /* min-height: 5rem; */
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between; // z-index: 1001;
        /* padding:.3rem 0 0; */
    }
    .LectureselectTwo {
        display: flex;
        padding: 0 .3rem .3rem 0;
    }
    .LectureselectTwoFirst {
        flex: 0 0 2.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start; // padding:0 .4rem 0 0;
        border-right: 1px solid gainsboro;
        min-height: 3rem;
    }
    .LectureselectKind {
        // padding: .3rem .1rem .3rem .3rem;
        // flex:auto;
        width: 100%;
        text-align: center;
        height: 1.2rem;
        line-height: 1.2rem;
    }
    .LectureaddListS {
        display: flex;
        padding: .3rem 0 0 .4rem;
        justify-content: flex-start;
        flex-wrap: wrap;
        /* height: 2rem; */
        align-items: flex-start;
        align-self: flex-start;
    }
    .LecturetypeChoose {
        color: #04be02;
        position: relative;
    }
    .LecturetypeChoose::after {
        content: '';
        position: absolute;
        width: .15rem;
        height: 100%;
        background: #04be02;
        top: 0rem;
        left: 0;
    }
</style>
