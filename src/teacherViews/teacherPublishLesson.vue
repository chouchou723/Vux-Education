<template>
    <div class="teacherPublishLesson">
        <view-box ref="viewBox">
            <group title="课程名称" label-width="4.5em" label-margin-right="2em" :class="isBorder?'borderL':''">
                <x-input :max="20" :is-type='nickname' v-model="valueTitle" placeholder="请填写您的课程名称" @on-blur="changeBorder(1)" @on-focus="changeBorder(2)"></x-input>
            </group>
            <group title="课程类型" label-width="4.5em" label-margin-right="2em" id="noborderBottom">
                <tab custom-bar-width="60px" v-model="index01" active-color="#31a2cf">
                    <tab-item @on-item-click="changeLesson('SINGLE')">
                        <div class="classType">
                            <div>单课</div>
                            <div>(1节课)</div>
                        </div>
                    </tab-item>
                    <tab-item @on-item-click="changeLesson('SUIT')">
                        <div class="classType">
                            <div>套课</div>
                            <div>(多节课,2小时/节课)</div>
                        </div>
                    </tab-item>
                </tab>
                <!-- <popup-picker title="时长" :data="list1" v-model="value" @on-change="onChange" show-name :columns="1"></popup-picker> -->
                <x-input v-model="value" title="时长" text-align='right' @on-blur="checkTime" type="number" v-if="type!=='SUIT'"></x-input>
                <x-input v-model="value" title="节数" text-align='right' type="tel" mask="9999999999999" v-if="type=='SUIT'"></x-input>
                <!-- <selector title="时长" :value-map="['idValue', 'idLabel']" :options="optionsL" v-model="value"  direction="rtl" @on-change="onChange"></selector> -->
            </group>
            <group title="课程详情" label-width="4.5em" label-margin-right="2em">
                <x-input type="number" v-model="value1" title="课程人数" text-align='right' @on-blur="checkNum"></x-input>
                <!-- <popup-picker title="课程人数" show-name :data="list2" v-model="value1" @on-show="onShow" @on-hide="onHide" @on-change="onChange" :columns="1"></popup-picker> -->
                <popup-picker title="课程种类" show-name :data="list3" v-model="value2" @on-change="onChange" :columns="1"></popup-picker>
                <popup-picker title="适用对象" show-name :data="list4" v-model="value3" @on-change="onChange" :columns="1"></popup-picker>
                <cell title="课程介绍" is-link link="/teacherAddClassIntro">
                    <div class="mr10">{{value4?'已填写':''}}</div>
                </cell>
            </group>
            <group title="" label-width="4.5em" label-margin-right="2em">
                <cell title="课程图片">
                </cell>
                <vux-upload :class="images.length!=0?'':'plusIcon'" url="" :images="images" :readonly="false" :max="9" :withCredentials="false" :span="3" :preview="true" @success="onSuccess" @error="onError" @remove="onRemove">
                </vux-upload>
            </group>
            <div class="footerBtn">
                <x-button type="primary" action-type="button" @click.native="saveInfo" :disabled="valid">下一步</x-button>
            </div>
        </view-box>
         <loading :show="show2" :text="text1"></loading>

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
        Loading
    } from 'vux'
    import {
        getCourseKind,
        getApplyAge,
        createNewContent
    } from '../api/api'
    import VuxUpload from '../components/Upload'
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    export default {
        components: {
            Loading,
            Group,
            XButton,
            Cell,
            Selector,
            ViewBox,
            VuxUpload,
            XInput,
            Tab,
            TabItem,
            PopupPicker,
        },
        data() {
            return {
                valueTitle: '',
                nickname: function(value) {
                    return {
                        valid: (/^[\u4e00-\u9fa5a-zA-Z0-9]+$/).test(value),
                        msg: '不能输入符号'
                    }
                },
                // list1: [{
                //     name: '0.5小时',
                //     value: '1',
                // }, {
                //     name: '1小时',
                //     value: '2',
                // }, {
                //     name: '1.5小时',
                //     value: '3',
                // }, ],
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
                list3: [],
                list4: [],
                images: [],
                isBorder: false,
                value: '',
                value1: '',
                value2: [],
                value3: [],
                value4: '',
                pics: [],
                index01: 0,
                type: 'SINGLE',
                isloading: false,
                show2:false,
                text1:'课程创建中',
            }
        },
        methods: {
            checkNum(value) {
                let a = (this.value1 + '').split('.')
                this.value1 = a[0] - 0
            },
            checkTime(value) {
                let a = (this.value + '').split('.')
                if (a.length > 1) {
                    this.value = (a[0] + '.' + a[1].slice(0, 1)) - 0
                }
            },
            changeLesson(type) {
                this.type = type;
                if (type === 'SUIT') {
                    this.value = '';
                } else {
                    this.value = '';
                }
            },
            onSuccess(id, data) {
                this.pics.push(id);
                var reads = new FileReader();
                reads.readAsDataURL(data);
                reads.onload = (e) => {
                    this.images = [...this.images, {
                        src: e.target.result
                    }]
                };
            },
            onError() {},
            onRemove(d) {
                this.images.splice(d, 1)
                this.pics.splice(d, 1)
            },
            changeBorder(type) {
                if (type == 1 && this.valueTitle) {
                    this.isBorder = true;
                } else {
                    this.isBorder = false;
                }
            },
            ...mapActions([
                'setMyInfo'
            ]),
            onChange() {
                this.setMyInfo({
                    sex: this.value2
                })
            },
            setInfo() {
                let para = {
                    name: this.valueTitle,
                    type: this.type,
                    time: this.value,
                    num: this.value1,
                    kind: this.value2[0],
                    person: this.value3[0],
                    pics: this.pics.join(','),
                    description: this.value4
                }
                localStorage.setItem('createC', JSON.stringify(para))
            },
            saveInfo() {
                let para = {}
                if (this.type == 'SUIT') {
                    para = {
                        name: this.valueTitle,
                        type: this.type,
                        hours: 2,
                        courseNum: this.value,
                        maxPerson: this.value1,
                        kinds: this.value2[0],
                        applyAge: this.value3[0],
                        picId: this.pics.join(','),
                        description: this.value4
                    }
                } else {
                    para = {
                        name: this.valueTitle,
                        type: this.type,
                        hours: this.value,
                        maxPerson: this.value1,
                        kinds: this.value2[0],
                        applyAge: this.value3[0],
                        picId: this.pics.join(','),
                        description: this.value4
                    }
                }
                this.show2 =true;
                createNewContent(para).then(res => {
                    if (res.code == 0) {
                this.show2 =false;
                        this.$router.push({
                            path: `/teacherPublishHome?id=${res.data.id}`,
                            query: {
                                title: res.data.name,
                                type:para.type
                            }
                        })
                    }
                })
            },
            getCourseKind() {
                getCourseKind().then(res => {
                    this.list3 = res.data.map(item => {
                        return {
                            name: item.label,
                            value: item.name
                        }
                    })
                })
            },
            getApplyAge() {
                getApplyAge().then(res => {
                    this.list4 = res.data.map(item => {
                        return {
                            name: item.label,
                            value: item.name
                        }
                    })
                })
            }
        },
        beforeDestroy() {
            this.setInfo()
        },
        computed: {
            valid() {
                let a = this.valueTitle && this.value && this.value1 && this.value2 && this.value3 && this.value4&&this.pics;
                if (a) {
                    return false
                } else {
                    return true
                }
            },
        },
        created() {
            this.setTitle("创建新的课程内容")
            this.getCourseKind()
            this.getApplyAge()
            if (localStorage.getItem('newCreate')) {
                localStorage.removeItem('createC')
                localStorage.removeItem('newCreate')
                localStorage.removeItem('createDes')
            }
            if (localStorage.getItem('createDes')) {
                this.value4 = localStorage.getItem('createDes')
            }
            if (localStorage.getItem('createC')) {
                let data = JSON.parse(localStorage.getItem('createC'))
                this.valueTitle = data.name;
                this.type = data.type;
                this.value = data.time;
                this.index01 = data.type === 'SUIT' ? 1 : 0;
                this.value1 = data.num;
                this.value2 = [data.kind];
                this.value3 = [data.person];
                this.pics = data.pics ? data.pics.split(',') : [];
                if (this.pics.length !== 0) {
                    this.images = this.pics.map(item => {
                        return {
                            src: `${this.apiUrl}/attach/img/${item}`
                        }
                    });
                }
            }
            // this.value2 = this.getMyInfo.sex
        },
        mounted() {},
    }
</script>
<style lang="less">
    .teacherPublishLesson {
        height: 100%;
        .weui-uploader__input-box {
            border: 1px dashed #D9D9D9;
        }
        .borderL .weui-cell {
            border-left: 5px solid #00a6e7;
            padding-left: 10px;
        }
        .plusIcon .vux-flexbox-item .vux-upload-bg .weui-uploader__input-box::before {
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            background: url('../assets/upload.png') no-repeat center/cover;
        }
        .plusIcon .weui-uploader__input-box {
            border: none;
        }
        .plusIcon .weui-uploader__input-box:after {
            width: 0;
            height: 0;
        }
        .weui-btn_disabled.weui-btn_primary {
            background-color: #e1e1e1;
            color: black;
        }
        .weui-btn_primary,
        .weui-btn_primary:not(.weui-btn_disabled):active {
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
        #noborderBottom .vux-cell-box:before {
            border-top: none;
        }
        .myAvatar {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            margin-right: 10px;
        }
        .vux-upload .vux-flexbox-item .vux-upload-bg .vux-upload-content {
            background-position: center;
        }
        .vux-upload .vux-flexbox-item .vux-upload-bg {
            width: 82%;
            margin: 4% 0 0 9%;
        }
        .mr10 {
            margin-right: 10px;
            font-size: 15px;
        }
        .classType {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-top: 10px;
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
