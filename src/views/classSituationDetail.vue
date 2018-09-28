<template>
    <div class="classSituationDetail">
        <view-box ref="viewBox">
            <div class="coinBgS">
                <div class="coinContent">第{{detail.classNum}}节课</div>
                <div class="coinTitle"> {{detail.date.substring(0,4)}}年{{detail.date.substring(5,7)}}月{{detail.date.substring(8,10)}}日,{{detail.week}},{{detail.beginTime.split(':')[0]>12?'下午':'上午'}}{{detail.beginTime.slice(0,5)}}-{{detail.endTime.slice(0,5)}}</div>
            </div>
            <group>
                <cell style="font-size:16px;">
                    <div slot="title" style="color:#999999">老师评语</div>
                </cell>
                <cell style="font-size:15px;" primary="content" value-align="left">
                    <div style="color:black;line-height:1.5;padding:3px 0">{{detail.evaluate||'暂无评语'}}</div>
                </cell>
            </group>
            <group>
                <cell style="font-size:16px">
                    <div slot="title" style="color:#999999">课程作品点评</div>
                </cell>
                <cell style="font-size:15px;" primary="content" value-align="left">
                    <div style="color:black;line-height:1.5">{{detail.stuEvaluates||'暂无点评'}}</div>
                </cell>
                <cell primary="content" value-align="left">
                    <div class="detailImg6">
                        <div v-for="(item,index) in pics" :key="index" :class="item.src?'detailImg':''" @click="show(index)">
                            <span class="detailNo" v-if="item.src">{{index+1}}</span>
                            <div :style="`background:url(${item.src}) no-repeat center/cover; width: 2.9rem;height: 2.9rem;`"></div>
                        </div>
                    </div>
                </cell>
                <div v-transfer-dom>
                    <previewer :list="pics" ref="previewer"></previewer>
                </div>
            </group>
        </view-box>
    </div>
</template>

<script>
    import {
        Group,
        Cell,
        ViewBox,
        Previewer,
        TransferDom
    } from 'vux'
    import {
        getMyLessonSituationOne
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
            Previewer
        },
        data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                detail: {
                    date: '',
                    beginTime: '',
                    endTime: '',
                    week: ''
                },
                pics: [],
            }
        },
        methods: {
            show(index) {
                this.$refs.previewer.show(index)
            },
            fetchData() {
                let id = this.$route.query.id
                getMyLessonSituationOne(id).then(res => {
                    console.log(res)
                    this.detail = res.data
                    this.pics = res.data.attachments.map(item => {
                        return {
                            src: `${this.apiUrl}/attach/img/${item.id}`
                        }
                    })
                })
            }
        },
        created() {
            this.setTitle('上课情况')
            this.fetchData();
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {},
        computed: {},
    }
</script>

<style lang="less">
    .classSituationDetail {
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
            justify-content: space-between;
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
        .img6 {
            width: 2.9rem;
            height: 2.9rem;
            position: relative;
        }
        .detailNo {
            position: absolute;
            ;
            top: .09rem;
            left: .12rem;
            color: white;
            z-index: 1;
            font-size: 12px;
        }
        .detailImg::after {
            content: '';
            width: 0;
            height: 0;
            border-width: 0 0 .9rem .9rem;
            border-style: solid;
            border-color: transparent transparent transparent #04be02;
            position: absolute;
            ;
            top: 0;
            left: 0;
        }
    }
</style>
