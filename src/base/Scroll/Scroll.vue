<template>
    <div ref="wrapper" id="wrapper">
        <!-- <div v-if="showPulldownMsg">下拉刷新</div> -->
        <slot></slot>
        <div v-if="showPullupMsg">上拉加载更多</div>
    </div>    
</template>

<script>
import BScroll from 'better-scroll'

export default {
    props: {
        /**
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
        probeType: {        //scroll事件启用
            type: Number,
            default: 1
        },
        click: {            //派发点击事件
            type: Boolean,
            default: true
        },
        listenScroll: {     //是否派发滚动事件
            type: Boolean,
            default: false
        },
        data: {             //用于判断数据更新后重置BScroll
            // type: Array,
            default: null
        },
        pullup: {
            type: Boolean,
            default: false
        },
        pulldown: {
            type: Boolean,  
            default: false
        },
    },
    data() {
        return {
            scroll: null,
            showPulldownMsg: false,
            showPullupMsg: false
        }
    },
    methods: {
        initScroll() {
            if(!this.$refs.wrapper) { return }
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click,
                pullUpLoad: {           // 配置上拉加载
                    threshold: -60,      //上啦60px的时候加载
                    stop: 30
                },
                mouseWheel: {           // pc端同样能滑动
                    speed: 20,
                    invert: false
                },
                pullDownRefresh: {      //下拉刷新配置
                    threshold: 60,
                    stop: 30
                },
                // useTransition: false,  // 防止iphone微信滑动卡顿
            });

            // this.scroll.on('pullingUp', ()=>{           //上拉加载更多事件
            //     this.scrollFinish = false;
            //     // 防止一次上拉触发两次事件,不要在ajax的请求数据完成事件中调用下面的finish方法,否则有可能一次上拉触发两次上拉事件
            //     // this.scroll.finishPullUp();
            //     // 加载数据
            //     this.$emit('')

            // });
            // 是否派发滚动到底部事件，用于上拉加载
            if (this.pullup) {
                this.scroll.on('scrollEnd', () => {     
                    // console.log(this.scroll.y)   
                    // console.log(this.scroll.maxScrollY)          
                    if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                        // this.scrollFinish = false;
                        this.showPullupMsg = true
                        this.$emit('scrollToEnd')
                    }
                })
            }

            // 是否派发顶部下拉事件，用于下拉刷新
            if (this.pulldown) {
                this.scroll.on('touchEnd', pos => {
                        // 下拉动作
                    if (pos.y > 50) {
                        this.showPulldownMsg = true
                        this.$emit('pulldownFresh', this.scroll)
                    }
                })
            }
        },
        enable() {
            this.scroll && this.scroll.enable()
        },
        disable() {
            this.scroll && this.scroll.disable()
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        }
    },
    mounted() {
        // 设置wrapper的高度
        // this.$refs.wrapper.style.height = setClientHeight() - this.$refs.wrapper.offsetTop + "px";
        // better-scroll 的content高度不大于wrapper高度就不能滚动,
        //   这里的问题是,当一页数据的高度不够wrapper的高度的时候,即使存在n页也不能下拉
        // 需要设置content的min-height大于wrapper高度
        // this.$refs.wrapper.children[0].style.minHeight = this.$refs.wrapper.offsetHeight + 1 + "px";

        //   this._initScroll();
        //   this.getIncomeDetail(this.nextPage);

        // 设置scroll的高度
        // this.scrollHeight = document.getElementById("app").offsetHeight - document.getElementById("scroll").offsetTop ;


        this.$nextTick(() => {
            this.initScroll()
        })
    },
    watch: {
        data() {
            //数据更新后，延时刷新BScroll
            this.$nextTick().then(() => {
                this.refresh();
                this.showPulldownMsg = false
                this.showPullupMsg = false
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    width: 100%;
    overflow: hidden;
}
</style>
