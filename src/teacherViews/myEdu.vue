<template>
    <div class="myEdu">
        <group v-for="(item,index) in eduList" :key="'edu'+index" label-width="4.5em" label-margin-right="2em">
            <group-title slot="title" class="groupTitle">经历{{eduIndex[index]}}<span style="float:right;" v-if="index!=0"><img @click="deleteEdu(index)" src="../assets/delete.png" width="15" alt=""></span></group-title>
            <x-input title="学校" v-model="item.school" text-align="right" placeholder="请填写"></x-input>
            <x-input title="专业" v-model="item.subject" text-align="right" placeholder="请填写"></x-input>
            <popup-picker title="学历" :data="list2" v-model="item.degreeV" show-name value-text-align="right" @on-change="changeDegree(item)"></popup-picker>
            <datetime v-model="item.beginDateStr" :end-date="item.endDateStr?item.endDateStr:endDate" title="起始日期">
            </datetime>
            <datetime v-model="item.endDateStr"  title="结束日期" :start-date="item.beginDateStr">
            </datetime>
        </group>
        <div class="addNewBtn">
            <div class="newText" @click="addNewEdu(eduList)">
                +添加新的经历
            </div>
        </div>
        <div class="footerBtn">
            <x-button type="primary" action-type="button" :disabled="!valid" @click.native="confirm">确定</x-button>
        </div>
    </div>
</template>

<script>
    import {
        XButton,
        Group,
        XInput,
        PopupPicker,
        Datetime,
        GroupTitle
    } from 'vux'
    import {
        getTeacherDegree
    } from '../api/api'
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    export default {
        components: {
            Group,
            XButton,
            XInput,
            PopupPicker,
            Datetime,
            GroupTitle
        },
        data() {
            return {
                eduIndex: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
                eduList: [{
                    school: '',
                    subject: '',
                    degree: [],
                    beginDateStr: '',
                    endDateStr: '',
                    degreeV: []
                }],
                list2: [],
            }
        },
        created() {
            this.setTitle('教育经历')
            this.getTeacherDegree()
            if (this.getTeacherInfo.edus.length !== 0) {
                this.eduList = this.getTeacherInfo.edus.map(item => {
                    return {
                        ...item,
                        degreeV: [item.degree.name]
                    }
                })
            }
        },
        methods: {
            deleteEdu(index) {
                this.eduList.splice(index, 1);
            },
            addNewEdu(data) {
                let l = data.length;
                this.eduList.push({
                    school: '',
                    subject: '',
                    degree: [],
                    beginDateStr: '',
                    endDateStr: '',
                    degreeV: []
                })
            },
            ...mapActions([
                'setTeacherInfo'
            ]),
            changeDegree(item) {
                let arr = this.list2[0].filter(ia => {
                    return ia.value === item.degreeV[0]
                })
                item.degree = {
                    label: arr[0].name,
                    name: arr[0].value
                };
            },
            confirm() {
                this.setTeacherInfo({
                    edus: this.eduList
                })
                let backTwo = localStorage.getItem('backTwo');
          if(backTwo=='true'){
            this.$router.push('/applyFirst')
          }else{
            this.$router.back()//go(-1)
          }
            },
            getTeacherDegree() {
                getTeacherDegree().then(res => {
                    let arr = res.data.map(item => {
                        return {
                            name: item.label,
                            value: item.name
                        }
                    })
                    this.list2 = [arr]
                    //   this.value1 = [this.getTeacherInfo.teachTime.name];
                })
            }
        },
        computed: {
            ...mapGetters([
                'getTeacherInfo'
                // ...
            ]),
            valid() {
                return this.eduList.every(item => {
                    return Object.values(item).every(it => it != '')
                })
            },
            endDate() {
                let date = new Date();
                let month = ('0' + (date.getMonth() + 1)).slice(-2);
                let day = ('0' + date.getDate()).slice(-2)
                return date.getFullYear() + '-' + month + '-' + day
            }
        },
    }
</script>
<style lang="less">
    .myEdu {
        background-color: #f4f4f4;
        .weui-cells__title {
            margin-top: 0;
            padding-top: .2rem;
            padding-bottom: .1rem;
            font-size: .4rem;
        }
        .weui-input {
            color: #999
        }
        .weui-btn_disabled.weui-btn_primary {
            background-color: #e1e1e1;
            color: black;
        }
        .groupTitle {
            font-size: 17px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 15px;
            height: 1.2rem;
            color: grey;
        }
        .vux-no-group-title {
            margin-top: 0;
        }
        .weui-btn_primary,.weui-btn_primary:not(.weui-btn_disabled):active {
            background-color: #00a6e7;
        }
        .vux-popup-picker-select {
            text-align: left;
        }
        .addNewBtn {
            width: 100%;
            height: 2rem;
            line-height: 2rem;
            text-align: center;
            .newText {
                color: #00a6e7;
                font-size: 16px;
            }
        }
        .footerBtn {
            width: 90%;
            margin: 0 auto;
            padding-bottom: 1rem;
            text-align: center;
        }
    }
</style>
