<template>
    <div class="classSetting">
        <view-box ref="viewBox">
            <group title="课程金额" label-width="4.5em" label-margin-right="2em">
                <x-input :max="10" type="number" title="金额"  v-model="valueTitle" placeholder="请设置该课程的金额" @on-blur="checkMoney" text-align="right" ></x-input>
            </group>
            <group title="满几人开课" label-width="4.5em" label-margin-right="2em">
                <x-input  type="tel" mask="9999999" title="人数"  v-model="value1"  :placeholder="`最多${$route.query.maxStuNum}人`" @on-blur="onBlur" text-align="right" ></x-input>

                <!-- <popup-picker title="人数" show-name :data="list2" v-model="value1" @on-show="onShow" @on-hide="onHide" @on-change="onChange" :columns="1"></popup-picker> -->
            </group>
            <div class="footerBtn">
                <x-button type="primary" action-type="button" @click.native="saveInfo" :show-loading="isloading" :disabled="!(valueTitle&&value1)">提交</x-button>
            </div>
        </view-box>
    </div>
</template>

<script>
    import {
        XButton,
        Group,
        ViewBox,
        XInput,
        PopupPicker,
    } from 'vux'
    import {passTheClass} from '../api/api'
    export default {
        components: {
            Group,
            XButton,
            ViewBox,
            XInput,
            PopupPicker,
        },
        data() {
            return {
                valueTitle: '',
                // list2: [{
                //     name: '1人',
                //     value: '1'
                // }, {
                //     name: '2人',
                //     value: '2',
                // }, {
                //     name: '3人',
                //     value: '3',
                // }, ],
                value1: '',
                isloading: false,
            }
        },
        methods: {
            checkMoney(v){
                if(v){
                    let a = (this.valueTitle + '').match(/(\d)+(\.\d)?(\d)?/)[0]
                    this.valueTitle = a-0;
                }else{
                    this.valueTitle =1;
                }
            },
            onBlur(v){
                let max = this.$route.query.maxStuNum
                if(v-max>0){
                    this.value1 = max-0
                }
            },
            saveInfo() {
                if(!this.isloading){
                    this.isloading = true;
                    let para = {
                        courseId: this.$route.query.id,
                        price:this.valueTitle,
                        minPerson:this.value1
                    }
                    let id = this.$route.query.id
                    passTheClass(para,id).then(res=>{
                        if(res.code==0){
                             this.$vux.toast.show({
                    text: '提交成功'
                })
                        }
                    }).then(()=>{
                        this.$router.go(-1)
                    })
                }
            },
        },
        computed: {
        },
        created() {
            this.setTitle("审核通过")
        },
        mounted() {}
    }
</script>
<style lang="less">
    .classSetting {
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
        .footerBtn {
            width: 90%;
            margin: 1rem auto 0;
            text-align: center;
        }
    }
</style>
