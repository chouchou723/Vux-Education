<template>
    <div class="teacherFeedback">
        <group title="意见反馈" label-width="4.5em" label-margin-right="2em">
            <!-- <cell>
                    <span slot="title" style="font-size:16px">意见反馈</span>
              </cell> -->
            <x-textarea style="font-size:14px" :max="300" v-model="content" :rows="8" placeholder="请留下您宝贵的意见"></x-textarea>
        </group>
        <group title="联系电话" label-width="4.5em" label-margin-right="2em">
            <!-- <cell>
                    <span slot="title" style="font-size:16px">联系电话</span>
              </cell> -->
            <x-input style="font-size:14px" v-model="mobile" mask="99999999999" type="tel" :max="11" placeholder="请输入您的联系电话" ></x-input>
        </group>
        <div class="plzCall">
            如有问题,请咨询电话<a class="linkA" href="tel:400172074">400-1720-748</a>
        </div>
        <div class="footerBtn">
             <x-button type="primary" action-type="button" :disabled="isDisabled" @click.native="postMyFeedback" :show-loading='isLoading'>提交</x-button>
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
    import {postMyFeedback} from '../api/api'
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
                content: '',
                mobile:'',
                isLoading: false,
            }
        },
        created() {
            this.setTitle('意见反馈')
        },
        methods: {
            postMyFeedback() {
                if (!this.isLoading) {
                    this.isLoading = true;
                    let para = {
                        content: this.content,
                        mobile: this.mobile
                    }
                    postMyFeedback(para).then(res => {
                        if (res.code == 0) {
                            this.$vux.toast.show({
                                type: 'text',
                                text: '提交成功',
                                position: 'middle'
                            })
                            this.isLoading = false;
                            this.content = ''
                            this.mobile = ''
                        }
                    })
                }
            }
        },
        computed: {
            isDisabled() {
                if (this.content && this.mobile) {
                    return false
                } else {
                    return true;
                }
            }
        }
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
        .weui-btn_primary,.weui-btn_loading.weui-btn_primary,.weui-btn_primary:not(.weui-btn_disabled):active {
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
