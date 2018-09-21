<template>
    <div class="myTeachExp">
        <group v-for="(item,index) in eduList" :key="'edu'+index" label-width="4.5em" label-margin-right="2em">
            <group-title slot="title" class="groupTitle">经验{{eduIndex[index]}}<span style="float:right;" v-if="index!=0"><img @click="deleteEdu(index)" src="../assets/delete.png" width="15" alt=""></span></group-title>
            <group>
                <datetime v-model="item.start" title="起始日期" @on-cancel="log('cancel')" @on-confirm="onConfirm">
                </datetime>
                <datetime v-model="item.end" title="结束日期" @on-cancel="log('cancel')" @on-confirm="onConfirm">
                </datetime>
                <div style="background:#f4f4f4;width:100%;height:10px"></div>
                <cell title="经验介绍"></cell>
                <x-textarea :max="125" :rows="5" v-model="item.content" placeholder="请填写你的经验"></x-textarea>
            </group>
        </group>
        <div class="addNewBtn">
            <div class="newText" @click="addNewEdu(eduList)">
                +添加新的经验
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
        Cell,
        XTextarea
    } from 'vux'
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
            Cell,
            XTextarea
        },
        data() {
            return {
                eduIndex: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
                eduList: [{
                    start: "",
                    end: '',
                    content: ''
                }],
                list1: [
                    ['1年之内', '1年', '2年', '2年以上']
                ],
                list2: [
                    ['专科', '本科', '博士', '硕士']
                ],
                value: '',
                value1: '',
                value2: '',
                value3: [],
                value4: '',
                value5: '',
                tableNumber: ['一', '二', '三', '四', '五', '六', '七']
            }
        },
        created() {
            document.title = '教学经验'
            if (this.getTeacherInfo.exp.length !== 0) {
                this.eduList = this.getTeacherInfo.exp
            }
        },
        methods: {
            deleteEdu(index) {
                this.eduList.splice(index, 1);
            },
            addNewEdu(data) {
                let l = data.length;
                this.eduList.push({
                    no: this.tableNumber[l]
                })
            },
            ...mapActions([
                'setTeacherInfo'
            ]),
            confirm() {
                this.setTeacherInfo({
                    exp: this.eduList
                })
                // this.$router.push('/applyFirst?step=2')
                this.$router.go(-1)
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
            }
        },
    }
</script>
<style lang="less">
    .myTeachExp {
        background-color: #f4f4f4;
        .weui-cells__title {
            margin-top: 0;
            padding-top: .2rem;
            padding-bottom: .1rem;
            font-size: .4rem;
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
        .weui-btn_primary {
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
