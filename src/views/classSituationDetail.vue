<template>
    <div class="classSituationDetail">
        <view-box ref="viewBox">
            <div class="coinBgS">
                <div class="coinContent">第1节课</div>
                <div class="coinTitle">2018年10月10日,周六,上午10:00-12:00</div>
            </div>
            <group>
                <cell style="font-size:16px;">
                    <div slot="title" style="color:#999999">老师评语</div>
                </cell>
                <cell style="font-size:15px;" primary="content" value-align="left">
                    <div style="color:black;line-height:1.5;padding:3px 0">本节课很好,孩子表现很主动,了解了创意的基础知识,对创意绘画有了更深的认识</div>
                </cell>
            </group>
            <group>
                <cell style="font-size:16px">
                    <div slot="title" style="color:#999999">课程作品点评</div>
                </cell>
                <cell style="font-size:15px;" primary="content" value-align="left">
                    <div style="color:black;line-height:1.5">本节课很好,孩子表现很主动,了解了创意的基础知识,对创意绘画有了更深的认识</div>
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
        pushHimOnWall
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
                value: '',
                buyStatus: false,
                type: 'coin', //coin
                lessonL: 50,
                pics: [{
                        src: require('../assets/ff.png')
                    }, {
                        src: require('../assets/aa.jpg')
                    },
                    {
                        src: require('../assets/bb.png')
                    }, {
                        src: require('../assets/cc.jpg')
                    }, {
                        src: require('../assets/dd.png')
                    }, {
                        src: require('../assets/ee.png')
                    },
                    {
                        src: require('../assets/ff.png')
                    }, {
                        src: require('../assets/aa.jpg')
                    }, {}
                ],
            }
        },
        methods: {
            show(index) {
                this.$refs.previewer.show(index)
            },
            goTo() {
                console.log(1);
                if (this.buyStatus) {
                    this.$router.push('/myLesson')
                } else {
                    this.$router.push('/paying')
                }
            }
        },
        created() {
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
