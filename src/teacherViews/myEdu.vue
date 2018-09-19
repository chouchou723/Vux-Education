<template>
    <div class="myEdu">
        <group v-for="(item,index) in eduList" :key="'edu'+index" label-width="4.5em" label-margin-right="2em">
            <group-title slot="title" class="groupTitle">经历{{item.no}}<span style="float:right;" v-if="index!=0"><img @click="deleteEdu(index)" src="../assets/delete.png" width="15" alt=""></span></group-title>
            <x-input title="学校" :is-type='nickname' v-model="value1" text-align="right" placeholder="请填写"></x-input>
            <x-input title="专业" :is-type='nickname' v-model="value2" text-align="right" placeholder="请填写"></x-input>
            <popup-picker title="学历" :data="list2" v-model="value3" value-text-align="left"></popup-picker>
            <datetime v-model="value4" title="起始日期" @on-cancel="log('cancel')" @on-confirm="onConfirm">
            </datetime>
            <datetime v-model="value5" title="结束日期" @on-cancel="log('cancel')" @on-confirm="onConfirm">
            </datetime>
        </group>
        <div class="addNewBtn">
            <div class="newText" @click="addNewEdu(eduList)">
                +添加新的经历
            </div>
        </div>
        <div class="footerBtn">
            <x-button type="primary" action-type="button" :disabled="value.length==0" @click.native="confirm">确定</x-button>
        </div>
    </div>
</template>

<script>
    import {
        XButton,
        Group,
        XInput,
        PopupPicker,
        Datetime
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
            Datetime
        },
        data() {
            return {
                eduList: [{
                    no: '一'
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
            document.title = '教育经历'
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
                'setMyInfo'
            ]),
            confirm() {
                // this.setMyInfo({cell:this.value})
                this.$router.push('/myInfo')
            }
        },
        computed: {
            ...mapGetters([
                'getMyInfo'
                // ...
            ]),
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
        input::-webkit-input-placeholder {
            color: #dbdbdb;
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
