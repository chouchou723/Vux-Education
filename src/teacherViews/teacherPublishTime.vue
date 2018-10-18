<template>
    <div class="teacherPublishTime">
        <view-box ref="viewBox">
            <group label-margin-right="2em">
                <cell class="classTitle">
                    <div slot="title">{{detail.courseName}}</div>
                </cell>
                <cell>
                    <div slot="title">
                        <div style="font-size:14px;color:grey">
                            场馆:{{detail.venueName}}
                        </div>
                        <div style="font-size:14px;color:grey;margin-top:5px;">
                            地址:{{detail.address}}
                        </div>
                    </div>
                </cell>
            </group>
            <group style="margin-top:1em">
                <cell v-for="(item,index) in classList" :key="'c'+index" is-link :link="`/teacherChangeClassTime?tempId=${detail.tempId}&classNum=${item.classNum}&contentId=${detail.contentId}&venueId=${item.venueId}&roomId=${item.roomId}&date=${item.date.slice(0,10)}&beginTimeStr=${item.beginTimeStr}`">
                    <div slot="title" style="font-size:15px">
                        <div v-if="item.roomId">第{{index+1}}节课: {{item.roomCode}}教室, {{item.date.slice(0,10)}}, {{item.beginTimeStr.slice(0,2)-12>0?'下午':'下午'}}{{item.beginTimeStr}}-{{item.endTimeStr}}
                        </div>
                        <div v-else style="color:#f72121">
                            第{{index+1}}节课: 请选择教室, 日期和时间段
                        </div>
                    </div>
                </cell>
            </group>
            <div class="footerBtn">
                <x-button type="primary" action-type="button" @click.native="saveInfo" :show-loading="isloading">确定并发布</x-button>
            </div>
        </view-box>
    </div>
</template>

<script>
    import {
        XButton,
        Group,
        Cell,
        ViewBox,
    } from 'vux'
    import {
        getTeacherschedules,
        publishClass,
        getTeacherschedulesByTmp
    } from '../api/api'
    export default {
        components: {
            Group,
            XButton,
            Cell,
            ViewBox,
        },
        data() {
            return {
                detail: {
                    courseName: '',
                    venueName: '',
                    address: ''
                },
                tempId: '',
                contentId: '',
                classList: [],
                isloading: false,
            }
        },
        methods: {
            saveInfo() {
                if (!this.isloading) {
                    this.isloading = true;
                    let para = {}
                    para.beginDateStr = this.detail.beginDate
                    para.beginTimeStr = this.detail.beginTime
                    para.endDateStr = this.detail.endDate
                    para.endTimeStr = this.detail.endTime
                    para.address = this.detail.address
                    para.classroomId = this.detail.classroomId
                    para.courseName = this.detail.courseName
                    para.contentId = this.detail.contentId
                    para.venueId = this.detail.venueId
                    para.venueName = this.detail.venueName
                    para.scheduleList = this.detail.scheduleList
                    publishClass(para).then(res => {
                        if (res.code == 0) {
                            this.isloading = false;
                            this.$vux.toast.show({
                                text: '发布成功'
                            })
                            this.$router.push({
                                path: '/teacher'
                            })
                        }
                    })
                }
                // console.log(this.getMyInfo)
                // localStorage.setItem('info', JSON.stringify(this.getMyInfo))
                // setTimeout(() => {
                // }, 1000)
                // this.$router.push({
                //     path: '/teacherClass'
                // })
            },
            fetchData() {
                if (this.$route.query.tempId) {
                    let tmp = {
                        tempId: this.$route.query.tempId
                    }
                    getTeacherschedulesByTmp(tmp).then(res => {
                        this.detail = res.data
                        this.classList = res.data.scheduleList
                    })
                } else {
                    let stepTwo = JSON.parse(localStorage.getItem('stepTwo'))
                    let para = {
                        venueId: stepTwo.venueId,
                        beginTime: stepTwo.beginTime,
                        beginDate: stepTwo.beginDate,
                        endDate: stepTwo.beginDate,
                        classroomId: stepTwo.classroomId,
                        step: stepTwo.step?stepTwo.step:1,
                        contentId: stepTwo.contentId
                    }
                    getTeacherschedules(para).then(res => {
                        this.detail = res.data
                        this.classList = res.data.scheduleList
                    })
                }
            }
        },
        computed: {},
        created() {
            this.setTitle("发布课程")
            this.fetchData()
            // this.value2 = this.getMyInfo.sex
        },
        mounted() {}
    }
</script>
<style lang="less">
    .teacherPublishTime {
        height: 100%;
        .vux-no-group-title {
            margin-top: 0;
        }
        .weui-btn_disabled.weui-btn_primary {
            background-color: #e1e1e1;
            color: black;
        }
        .weui-btn_primary,
        .weui-btn_primary:not(.weui-btn_disabled):active {
            background-color: #00a6e7;
        }
        .weui-cells__title {
            margin-top: 0;
            padding-top: .2rem;
            padding-bottom: .1rem;
            font-size: .4rem;
        }
        .classTitle {
            border-left: 5px solid #00a6e7;
            padding-left: 10px;
        }
        .footerBtn {
            width: 90%;
            margin: 1rem auto 0;
            text-align: center;
        }
    }
</style>
