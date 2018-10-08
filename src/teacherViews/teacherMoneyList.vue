<template>
    <div class="teacherMoneyList">
        <view-box ref="viewBox">
            <group v-for="(item,index) in pointDetail" :key="index">
                <cell>
                    <div slot="title" style="color:#999999;font-size:14px;margin-right: 10px;">提现单号: {{item.code}}</div>
                    <div style="color:#999999;font-size:14px;">{{item.orderTime}}</div>
                </cell>
                <cell>
                    <!-- <div style="color:#fb6804">
                    2880元
                </div> -->
                    <div class="coinBg" slot="title">
                        <div class="coinContent">
                            <div>提现金额</div>
                        </div>
                        <div class="coinContent">
                            <div>提现帐户
                            </div>
                        </div>
                    </div>
                    <div class="coinBg">
                        <div class="coinContent">
                            <div style="color:#fb6804">{{item.price}}元</div>
                        </div>
                        <div class="coinContent">
                            <div style="color:black">微信帐户 {{name}}
                            </div>
                        </div>
                    </div>
                </cell>
            </group>
        </view-box>
    </div>
</template>

<script>
    import {
        Group,
        Cell,
        ViewBox
    } from 'vux'
    import {
        getTeacherWithdraw
    } from '../api/api'
    import apiHost from '../../config/prod.env'
    export default {
        components: {
            Group,
            Cell,
            ViewBox
        },
        data() {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                name: '',
                pointDetail: [{
                        date: '2018-03-11 10:52:01',
                        point: 20000,
                        content: '充值20000积分',
                        remain: 20000
                    },
                ],
            }
        },
        methods: {
            fetchData(){
                let name = JSON.parse(localStorage.getItem('teacherInfo')).name
                this.name = name;
                getTeacherWithdraw().then(res=>{
                    console.log(res)
                    this.pointDetail = res.data
                })
            }
        },
        created() {
            this.setTitle('我的提现');
            this.fetchData()

            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {},
        computed: {},
    }
</script>

<style lang="less">
    .teacherMoneyList {
        height: 100%;
        .weui-cells__title {
            margin-top: 0;
            padding-top: .2rem;
            padding-bottom: .2rem;
            font-size: .4rem;
        }
        .weui-cell{
            align-items:flex-start;
        }
        .coinBg {
            max-width: 7rem; // height: 2rem;
            // padding: 0 .2rem;
            position: relative;
            box-sizing: border-box;
        }
        .coinTitle {
            font-size: 13px;
            color: #999999;
            display: flex;
            justify-content: space-between;
            margin-bottom: .2rem;
        }
        .coinContent {
            font-size: 16px;
            display: flex;
            justify-content: flex-end;
            padding: 5px 0;
            color: #999999
        }
    }
</style>
