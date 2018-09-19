<template>
    <div class="teacherFeedback">
        <group title="意见反馈" label-width="4.5em" label-margin-right="2em">
            <!-- <cell>
                    <span slot="title" style="font-size:16px">意见反馈</span>
              </cell> -->
            <x-textarea style="font-size:14px" :max="300" :rows="8" placeholder="请留下您宝贵的意见" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
        </group>
        <group title="联系电话" label-width="4.5em" label-margin-right="2em">
            <!-- <cell>
                    <span slot="title" style="font-size:16px">联系电话</span>
              </cell> -->
            <x-input style="font-size:14px" placeholder="请输入您的联系电话" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-input>
        </group>
        <div class="plzCall">
            如有问题,请咨询电话<a class="linkA" href="tel:400172074">400-1720-748</a>
        </div>
        <div class="footerBtn">
            <x-button type="primary" action-type="button" :disabled="value.length==0">提交</x-button>
        </div>
    </div>
</template>

<script>
    import {
        XButton,
        Group,
        Cell,
        XInput,
        XTextarea
    } from 'vux'
    export default {
        components: {
            Group,
            XButton,
            Cell,
            XInput,
            XTextarea,
        },
        data() {
            return {
                value: '',
                nickname: function(value) {
                    return {
                        valid: (/^[\u4e00-\u9fa5a-zA-Z0-9]+$/).test(value),
                        msg: '不能输入符号'
                    }
                },
            }
        },
        created() {
            let type = this.$route.query.type;
            if (type) {
                document.title = '昵称'
            } else {
                document.title = '姓名'
            }
        },
        methods: {}
    }
</script>
<style lang="less">
    .teacherFeedback {
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
        .weui-btn_primary {
            background-color: #00a6e7;
        }
        .footerBtn {
            width: 90%;
            margin: 1rem auto 0;
            text-align: center;
        }
        .plzCall {
            padding: 15px;
            color: #6f5f5f;
        }
        .linkA {
            text-decoration: underline;
            color: #00a6e7;
            margin-left: .2rem;
        }
    }
</style>
