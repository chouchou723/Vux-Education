<template>
    <div class="wrapper">
        <view-box ref="viewBox">
            <transition name="fade">
                <router-view></router-view>
            </transition>
            <v-bottom slot="bottom"></v-bottom>
        </view-box>
    </div>
</template>
<script>
    import {
        ViewBox
    } from 'vux'
    import vBottom from '../components/Bottom.vue';
    export default {
        data() {
            return {}
        },
        components: {
            vBottom,
            ViewBox
        },
    }
</script>
<style>
    .wrapper {
        width: 100%;
        height: 100%;
        /* overflow: hidden; */
    }
</style>
