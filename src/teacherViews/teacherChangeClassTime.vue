<template>
    <div class="teacherChangeClassTime">
        <view-box ref="viewBox">
            <group title="修改课程内容" label-margin-right="2em">
                <popup-picker title="上课教室" show-name :data="list4" v-model="value1" :columns="1"></popup-picker>
                <datetime v-model="value2" title="上课日期"></datetime>
                <datetime v-model="value3" format="HH:mm" title="上课开始时间"></datetime>
            </group>
            <div class="footerBtn">
                <x-button type="primary" action-type="button" @click.native="saveInfo">确认</x-button>
            </div>
        </view-box>
    </div>
</template>

<script>
    import {
        XButton,
        Group,
        ViewBox,
        PopupPicker,
        Datetime
    } from 'vux'
    import {
        getClassrooms,
        editIndClassTime
    } from '../api/api';
    export default {
        components: {
            Group,
            XButton,
            ViewBox,
            PopupPicker,
            Datetime
        },
        data() {
            return {
                list4: [],
                value1: [],
                value2: '',
                value3: '',
                data: {},
            }
        },
        methods: {
            saveInfo() {
                this.data.classroomId = this.value1[0]
                this.data.date = this.value2;
                this.data.beginTime = this.value3
                console.log(this.data)
                editIndClassTime(this.data).then(res => {
                    if (res.code == 0) {
                        this.$vux.toast.show({
                            type: 'text',
                            text: '修改成功'
                        })
                        this.$router.push({
                            path:'/teacherPublishTime',
                            query:{
                                tempId:this.data.tempId
                            }
                        })
                    }
                })
                // // this.isloading = true;
                // // console.log(this.getMyInfo)
                // // this.$vux.toast.show({
                // //     text: '保存成功'
                // // })
                // // localStorage.setItem('info', JSON.stringify(this.getMyInfo))
                // // setTimeout(() => {
                // //     this.isloading = false;
                // // }, 1000)
                // this.$router.push({
                //     path: '/teacherClass'
                // })
            },
            getClassrooms(vid, id) {
                getClassrooms(vid).then(res => {
                    this.list4 = res.data.map(item => {
                        return {
                            name: '教室' + item.id,
                            value: item.id + '',
                        }
                    })
                }).then(() => {
                    if (id) {
                        setTimeout(() => {
                            this.value1 = [id]
                        }, 1)
                    }
                })
            },
        },
        computed: {},
        created() {
            this.setTitle('发布课程')
            let {
                tempId,
                classNum,
                contentId,
                venueId,
                roomId,
                date,
                beginTimeStr
            } = { ...this.$route.query
            };
            this.getClassrooms(venueId, roomId)
            console.log(tempId)
            this.data = {
                tempId: tempId,
                classNum: classNum,
                contentId: contentId
            }
            this.value2 = date;
            this.value3 = beginTimeStr
        },
        mounted() {}
    }
</script>
<style lang="less">
    .teacherChangeClassTime {
        height: 100%;
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
