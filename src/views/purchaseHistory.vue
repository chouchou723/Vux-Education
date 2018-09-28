<template>
    <div class="purchaseHistory">
        <view-box ref="viewBox">
            <group :title="`近半年消费总计:${total}元`">
                <cell v-for="(item,index) in pointDetail" :key="index">
                    <div style="color:#fb6804">
                        {{item.cost}}元
                    </div>
                    <div class="coinBg" slot="title">
                        <div class="coinTitle">
                            <div>{{item.orderTime}}</div>
                        </div>
                        <div class="coinContent">
                            <div>{{item.target}}
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
        getMyPurchase
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
                total: '',
                pointDetail: [
                ],
            }
        },
        methods: {
            fetchData(){
                let para = {

                }
                getMyPurchase(para).then(res=>{
                    this.total = res.data.total
                    this.pointDetail =res.data.details
                })
            },
        },
        created() {
            this.setTitle('消费记录')
            this.fetchData()
            // console.log(this.getMyF,apiHost.API_ROOT)
        },
        mounted() {},
        computed: {},
    }
</script>

<style lang="less">
    .purchaseHistory {
        height: 100%;
        .weui-cells__title {
            margin-top: 0;
            padding-top: .2rem;
            padding-bottom: .2rem;
            font-size: .4rem;
        }
        .coinBg {
            max-width: 7rem; // height: 2rem;
            padding: 0 .2rem;
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
            justify-content: space-between;
        }
    }
</style>
