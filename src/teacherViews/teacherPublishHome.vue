<template>
    <div class="teacherPublishHome">
        <view-box ref="viewBox">
            <group title="选择课程内容" label-width="4.5em" label-margin-right="2em">
                <div class="publishDiv">
                    <div class="publishIcon" @click="goToChoose(1)">
                        <img src="../assets/publishNew.png" alt="">
                        <div class="publishText">创建新的课程内容</div>
                    </div>
                    <div class="publishIcon" @click="goToChoose(2)">
                        <img src="../assets/publishChoose.png" alt="">
                        <div class="publishText">选择已有课程内容</div>
                    </div>
                </div>
            </group>
            <group title="课程名称" label-margin-right="2em" v-if="classTitle">
                <cell class="classTitle">
                    <div slot="title">{{classTitle}}</div>
                </cell>
            </group>
            <group title="补充课程内容" label-margin-right="2em">
                <popup-picker title="上课场馆" show-name :data="list2" v-model="value1" @on-change="onChangeAdd" :columns="1"></popup-picker>
                <!-- <popup-picker title="上课时间段" show-name :data="list3" v-model="value2"  @on-change="onChange" :columns="1"></popup-picker> -->
                <datetime v-model="value2" format="HH:mm" title="上课开始时间"></datetime>
                <datetime v-model="value3" title="上课起始日期" :end-date="value4"></datetime>
                <datetime v-model="value4" v-if="classtype!='SINGLE'" title="上课结束日期" :start-date="value3"></datetime>
                <popup-picker title="上课教室" show-name :data="list4" v-model="value5" @on-change="onChange" :columns="1"></popup-picker>
                <x-input v-model="value6" v-if="classtype!='SINGLE'" type="tel" mask="9999999999999"  title="每隔几天上一次课" text-align='right'></x-input>
                <!-- <popup-picker title="每个几天上一次课" show-name :data="list5" v-model="value6"  @on-change="onChange" :columns="1"></popup-picker> -->
            </group>
            <div class="footerBtn">
                <x-button type="primary" action-type="button" @click.native="saveInfo" :disabled="valid">下一步</x-button>
            </div>
        </view-box>
    </div>
</template>

<script>
    import {
        XButton,
        Group,
        Cell,
        Selector,
        ViewBox,
        XInput,
        Tab,
        PopupPicker,
        TabItem,
        Datetime
    } from 'vux'
    import {
        getAllVenue,
        getClassrooms,
        getTeacherschedules
    } from '../api/api'
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    export default {
        components: {
            Group,
            XButton,
            Cell,
            Selector,
            ViewBox,
            XInput,
            Tab,
            TabItem,
            PopupPicker,
            Datetime
        },
        data() {
            return {
                list1: [{
                    name: '0.5小时',
                    value: '1',
                }, {
                    name: '1小时',
                    value: '2',
                }, {
                    name: '1.5小时',
                    value: '3',
                }, ],
                list2: [],
                list3: [{
                    name: '上午10:00 - 12:00',
                    value: '1'
                }, {
                    name: '下午14:00 - 16:00',
                    value: '2',
                }, {
                    name: '下午16:30 - 18:30',
                    value: '3',
                }, ],
                list4: [],
                list5: [{
                    name: '1天',
                    value: '1'
                }, {
                    name: '2天',
                    value: '2',
                }, {
                    name: '3天',
                    value: '3',
                }, ],
                value1: [],
                value2: '',
                value3: '',
                value4: '',
                value5: [],
                value6: '',
                classTitle: '',
                isloading: false,
                classid: '',
                classtype:'SINGLE',
            }
        },
        methods: {
            getVenue() { //获取场馆
                getAllVenue().then(res => {
                    this.list2 = res.data.map(item => {
                        return {
                            name: item.name,
                            value: item.id + ''
                        }
                    })
                })
            },
            goToChoose(num) {
                if (num == 1) {
                    this.$router.push('/teacherPublishLesson')
                    localStorage.setItem('newCreate','new')
                } else {
                    this.$router.push('/teacherChooseLesson')
                }
            },
            ...mapActions([
                'setMyInfo'
            ]),
            onChange() {
                // this.setMyInfo({
                //     sex: this.value2
                // })
            },
            onChangeAdd(value) {
                this.getClassrooms()
                // console.log(this.list4)
            },
            getClassrooms(id) {
                if(typeof(this.value1[0])!= 'undefined'){
                    getClassrooms(this.value1[0]).then(res => {
                        this.list4 = res.data.map(item => {
                            return {
                                name: '教室' + item.code,
                                value: item.id + '',
                            }
                        })
                    }).then(()=>{
                    if(id){
                        setTimeout(()=>{
                            this.value5 = [id]
    
                        },1)
                    }
    
                    })

                }
            },
            setInfo() {
                let stepTwo = {
                    venueId: this.value1[0],
                    beginTime: this.value2,
                    beginDate: this.value3,
                    endDate: this.value4,
                    classroomId: this.value5[0],
                    step: this.value6,
                    contentId: this.classid,
                    type:this.classtype
                }
                localStorage.setItem('stepTwo', JSON.stringify(stepTwo))
            },
            saveInfo() {
                 this.setInfo()
                this.$router.push({
                    path: '/teacherPublishTime'
                })
            },
        },
        computed: {
            endDate() {
                let date = new Date();
                let month = ('0' + (date.getMonth() + 1)).slice(-2);
                let day = ('0' + date.getDate()).slice(-2)
                return date.getFullYear() + '-' + month + '-' + day
            },
            valid(){
                var a ;
                if(this.classtype=='SINGLE'){
                    a = this.classTitle&& this.classid&&this.value1&&this.value2&&this.value3&&this.value5
                }else{
                    a = this.classTitle&& this.classid&&this.value1&&this.value2&&this.value3&&this.value4&&this.value5&&this.value6
                }
                // console.log(this.classid)
                if(a){
                    return false
                }else{
                    return true
                }
            }
        },
        created() {
            this.setTitle('发布课程')
            this.getVenue()
            if(this.$route.query.title){
                this.classTitle = this.$route.query.title
            }else{
               localStorage.removeItem('stepTwo')
            }
            this.classid = this.$route.query.id || ''
            this.classtype = this.$route.query.type ||'';
            if (localStorage.getItem('stepTwo')&&this.classTitle) {
                let data = JSON.parse(localStorage.getItem('stepTwo'))
                this.value1 = [data.venueId];
                this.value2 = data.beginTime;
                this.value3 = data.beginDate;
                this.value4 = data.endDate;
                this.value6 = data.step;
                this.getClassrooms(data.classroomId)
            }
        },
        // beforeDestroy() {
        //     this.setInfo()
        // },
        mounted() {}
    }
</script>
<style lang="less">
    .teacherPublishHome {
        height: 100%;
        .weui-uploader__input-box {
            border: 1px dashed #D9D9D9;
        }
        .weui-btn_disabled.weui-btn_primary {
            background-color: #e1e1e1;
            color: black;
        }
        .weui-btn_primary,.weui-btn_primary:not(.weui-btn_disabled):active {
            background-color: #00a6e7;
        }
        .weui-cells__title {
            margin-top: 0;
            padding-top: .2rem;
            padding-bottom: .1rem;
            font-size: .4rem;
        }
        .vux-tab-wrap {
            padding-top: 65px;
            .vux-tab-container,
            .vux-tab {
                height: 65px;
            }
            .vux-tab-item {
                line-height: 22px
            }
        }
        .classTitle {
            border-left: 5px solid #00a6e7;
            padding-left: 10px;
        }
        .publishDiv {
            width: 100%;
            height: 4rem;
            background: white;
            display: flex;
            box-sizing: border-box;
            padding: .7rem 0;
            .publishIcon:first-child {
                border-right: 1px solid gainsboro;
            }
            .publishIcon {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                img {
                    width: 1.5rem;
                }
                .publishText {
                    font-size: .4rem;
                    color: #00a6e7;
                    margin-top: .3rem;
                }
            }
        }
        .weui-input{
            color:#999;
        }
        .weui-select {
            color: #999999
        }
        .footerBtn {
            width: 90%;
            margin: 1rem auto 0;
            text-align: center;
        }
    }
</style>
