<template>
    <div class="classSituation">
        <view-box ref="viewBox">
            <div class="coinBgS">
                <div class="coinContent">{{detail.name}}</div>
                <div class="coinTitle">{{detail.classNum}}节课,共{{detail.totalHours}}课时</div>
            </div>
            <group title=" " label-width="4.5em">
                <cell v-for="(item,index) in lessonL" :key="index" :title="`第${index+1}节课`" is-link style="font-size:16px" :link="`/classSituationDetail?id=${item.id}`">
                </cell>
            </group>
        </view-box>
    </div>
</template>

<script>
    import {
        Group,
        Cell,
        ViewBox
    } from 'vux'
    import {
        getMyLessonSituation
    } from '../api/api'
    import apiHost from '../../config/prod.env'
    export default {
        components: {
            Group,
            Cell,
            ViewBox
        },
        data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                detail:{},
                value: '',
                lessonL: 0
            }
        },
        methods: {
            fetchData(){
                let para = {
                    id :this.$route.query.id
                }
                getMyLessonSituation(para).then(res=>{
                    console.log(res)
                    this.detail = res.data;
                    this.lessonL = res.data.details;
                })
            }
        },
        created() {
            this.setTitle('上课情况');
            this.fetchData()
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {},
        computed: {},
    }
</script>

<style lang="less">
    .classSituation {
        height: 100%;
        .coinBgS {
            width: 100%;
            height: 1.6rem;
            background-color: #fff;
            padding: 0.1rem .7rem 0;
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
    }
</style>
