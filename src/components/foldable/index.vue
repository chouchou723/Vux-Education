<template>
    <div class="vue-foldable">
        <div class="vue-foldable-container" :style="{ maxHeight: currentMaxHeight + 'px'}" ref="container">
            <slot/>
        </div>
        <div :class="{ 'collapsed': collapsed }" class="vue-foldable-mask" v-if="reachThreshold"></div>
        <slot name="view-more" :toggle="toggle" :collapsed="collapsed">
            <div class="vue-foldable-view-more" :class="{ 'collapsed': collapsed }" @click="toggle" v-if="reachThreshold">
                <!-- <VueIcon
                      class="vue-foldable-icon"
                      :class="{ 'collapsed': collapsed }"
                    /> -->
                <span :class="['vue-foldable-text',type==='teacher'?'fzb':'fzg']">
                      {{ collapsed ? '点击查看更多' : '点击隐藏' }}
                      <i :class="[type==='teacher'?'teacherI':'studentI', collapsed?'rotate90':'']"></i>
                    </span>
            </div>
        </slot>
    </div>
</template>

<script>
    //   import VueIcon from './VueIcon.vue'
    const DEFAULT_VISUAL_HEIGHT = 290;
    export default {
        name: 'vue-foldable',
        // components: { VueIcon },
        props: {
            type: {
                type: String
            },
            minHeight: {
                type: Number,
                default: DEFAULT_VISUAL_HEIGHT,
            },
            height: {
                type: [Number, String],
                default: DEFAULT_VISUAL_HEIGHT,
            },
            once: {
                type: Boolean,
                default: false
            },
            async: {
                type: Boolean,
                default: false
            },
            timeout: {
                type: Number,
                default: 3000
            },
            noMask: {
                type: Boolean,
                default: false
            }
        },
        data() {
            let height = this.height
            if (typeof this.height === 'number' && this.height < this.minHeight) {
                height = this.minHeight
            }
            return {
                collapsed: true,
                currentMaxHeight: height,
                threshold: height,
                reachThreshold: true,
                percentageMode: typeof this.height === 'string' && this.height.indexOf('%') !== -1,
                percentage: null
            }
        },
        created() {
            if (this.percentageMode) {
                this.percentage = parseInt(this.threshold.replace('%', '').trim()) / 100
            } else if (typeof this.height === 'string') {
                this.currentMaxHeight = this.threshold = DEFAULT_VISUAL_HEIGHT
            }
        },
        mounted() {
            // console.log(2)
            this.handleMount()
            // Temporary hack since this.$nextTick still cannot ensure all the sub components rendered.
            // See: https://vuejs.org/v2/api/#mounted
            setTimeout(this.handleMount, 50)
            // this.$nextTick(function () {
            //     this.handleMount()
            // })
            if (this.async) {
                onElementHeightChange({
                    el: this.$refs.container,
                    callback: this.handleMount,
                    timeout: this.timeout
                })
            }
        },
        methods: {
            handleMount() {
                const contentHeight = this.$refs.container.scrollHeight
                // console.log(3, contentHeight)
                this.calculateThreshold(contentHeight)
                this.checkReachThresfold(contentHeight)
            },
            checkReachThresfold(contentHeight) {
                this.reachThreshold = contentHeight > this.threshold
            },
            calculateThreshold(contentHeight) {
                if (this.percentageMode) {
                    let calculatedHeight = contentHeight * this.percentage
                    if (calculatedHeight < this.minHeight) {
                        calculatedHeight = this.minHeight
                    }
                    this.currentMaxHeight = calculatedHeight
                    this.threshold = calculatedHeight
                }
            },
            toggle() {
                this.collapsed = !this.collapsed
                if (this.collapsed) {
                    this.currentMaxHeight = this.threshold
                } else {
                    // explicitly set max height so that it can be transitioned
                    this.currentMaxHeight = this.$refs.container.scrollHeight
                    if (this.once) {
                        this.reachThreshold = false
                    }
                }
            }
        }
    }
    function onElementHeightChange({
        el,
        callback,
        timeout
    }) {
        let oldHeight = el.scrollHeight,
            newHeight
        let poller
        let interval = 100
        let count = 0
        let maxCount = timeout / interval
        // console.log(4, oldHeight, newHeight)
        function unit() {
            count++
            newHeight = el.scrollHeight
            if (oldHeight !== newHeight) {
                callback(newHeight)
                if (poller) {
                    clearTimeout(poller)
                }
            }
            // console.log(5, count, newHeight)
            oldHeight = newHeight
            if (count <= maxCount) {
                poller = setTimeout(unit, interval)
            }
        }
        unit()
    }
</script>

<style lang="less">
    .vue-foldable {
        position: relative;
        .vue-foldable-container {
            overflow: hidden;
        }
        .vue-foldable-mask {
            position: absolute;
            bottom: 30px;
            left: 0;
            /* view-more's height */
            height: 80px;
            width: 100%;
            background: transparent;
            pointer-events: none;
            &.collapsed {
                opacity: 1;
                background: linear-gradient(to bottom, rgba(55, 55, 55, 0), white)
            }
            &:not(.collapsed) {
                opacity: 0
            }
        }
        .vue-foldable-view-more {
            width: 100%;
            text-align: center;
            height: 25px;
            line-height: 35px;
            cursor: pointer; //   color: #4dba87;
            .fzb {
                color: #00a6e7
            }
            .fzg {
                color: #1AAD19;
            }
            .vue-foldable-icon {
                width: 22px;
                transform: rotate(180deg);
                transition: transform 0.3s;
                vertical-align: middle;
            }
            .vue-foldable-text {
                vertical-align: middle;
                border-top: 1px solid #D9D9D9;
                width: 100%;
                display: flex;
                margin-top: 10px;
                justify-content: center;
                align-items: center;
            }
            .teacherI {
                display: inline-block;
                margin: 0 3px;
                width: 0.213333rem;
                height: 0.133333rem;
                background: url(../../assets/triB.png) no-repeat;
                background-size: 100% 100%;
                transform-origin: center center; // transform: rotate(360deg);
            }
            .studentI {
                display: inline-block;
                margin: 0 3px;
                width: 0.213333rem;
                height: 0.133333rem;
                background: url(../../assets/triS.png) no-repeat;
                background-size: 100% 100%;
                transform-origin: center center; // transform: rotate(360deg);
            }
            .rotate90 {
                transform: rotate(180deg);
            }
            &.collapsed {
                .vue-foldable-icon {
                    transform: rotate(0deg)
                }
            }
        }
    }
</style>