<template>
    <div class="assistantHome">
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
    import vBottom from '../components/AssiTeacherBottom.vue';
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
    .assistantHome {
        width: 100%;
        height: 100%;
        /* overflow: hidden; */
    }
</style>
