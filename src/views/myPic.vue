<template>
    <div class="myPic">
        <view-box ref="viewBox">
            <!-- 列表 -->
            <group v-for="(item,index) in lessonList" :key="index" @click.native="gotoPic(index,item.data.length)" v-if="lessonList.length!==0">
                <cell-box>
                    <div class="lessonListAll">
                        <div class="lessonTitleC">
                            <div class="lessonTitleNo">{{item.time.replace('-','年').replace('-','月')}}日</div>
                        </div>
                        <div class="lessonTitle">
                            <div v-for="(pic,ind) in item.data" :key="ind" class="picImg">
                                <x-img :default-src="dsrc" :src="`${apiUrl}/attach/img/${pic.picId}/SQUARE`" width="100" height="100" alt="" :offset="700" container="#vux_view_box_body"></x-img>
                            </div>
                        </div>
                    </div>
                    <!-- anything -->
                </cell-box>
            </group>
             <div v-if="lessonList.length===0" style="width:100%;height:80%;display:flex;justify-content:center;align-items:center;color:#999999;font-size:0.4rem;">
                    暂无作品
                </div>
        </view-box>
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
        getMyPicture
    } from '../api/api'
    import apiHost from '../../config/prod.env'
    export default {
        components: {
            Group,
            CellBox,
            XImg,
            ViewBox
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
            gotoPic(index,num) {
                // console.log(1)
                let pics = this.lessonList[index].data.map(item=>{
                    return item.picId
                })
                localStorage.setItem('pics',pics.join(','))
                this.$router.push(`/picDetail?num=${num}`)
            },
            fetchData(){
                let para = {

                }
                getMyPicture(para).then(res=>{
                    let a = [{time:'2018-1-1',data:[{picId:'0c495cb2-f2d9-49d2-9fd4-39cd268588a1'},{picId:'0c495cb2-f2d9-49d2-9fd4-39cd268588a1'},{picId:'0c495cb2-f2d9-49d2-9fd4-39cd268588a1'},
                    {picId:'0c495cb2-f2d9-49d2-9fd4-39cd268588a1'},{picId:'0c495cb2-f2d9-49d2-9fd4-39cd268588a1'}]}]
                    this.lessonList = a//res.data
                })
            }
        },
        created() {
            this.setTitle('我的作品');
            this.fetchData()
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {},
        computed: {},
    }
</script>

<style lang="less">
    .myPic {
        height: 100%;
        #vux_view_box_body div:first-child .weui-cells {
            margin-top: 0
        }
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
            flex-wrap: nowrap;
            overflow: hidden;
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
        .lessonTitleNo {
            // color: #8a8e93;
            font-size: .4rem;
            position: relative;
        }
        .picImg {
            flex: 0 0 33.3333%;
            text-align: center;
        }
        // .picImg:nth-child(2){
        //     margin:0 .2rem;
        // }
    }
</style>
