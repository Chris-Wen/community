<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
        <slot> </slot>
    </div>
    <div class="dots">
        <span class="dot" v-for="(item, k) in dots" :key="k"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'

export default {
    name: 'Banner',
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 4000
        },
        data: [],
    },
    data() {
        return {
            dots: [],
            currentPageIndex: 0
        }
    },
    mounted() {
        setTimeout(() => {
            this._setSliderWidth()
            this._initDots()
            this._initSlider()

            if (this.autoPlay) {
                this._play()
            }
        }, 20);
    },
    methods: {
        _setSliderWidth() {
            this.children = this.$refs.sliderGroup.children;

            let width = 0;
            let sliderWidth = this.$refs.slider.clientWidth;
            for (let i = 0; i<this.children.length; i++ ) {
                let child = this.children[i];
                addClass(child, 'slider-item');
                child.style.width = sliderWidth + 'px';
                width += sliderWidth;

                if (this.loop) {
                    width += 2*sliderWidth
                }
                this.$refs.sliderGroup.style.width = width + 'px'
            }
        },
        _initSlider() {
            this.slider = new BScroll(this.$refs.slider, {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: true,
                snapLoop: this.loop,
                snapThreshold: 0.3,
                snapSpeed: 400,
                click: true
            })
        },
        _initDots() {
            this.dots = new Array(this.children.length)
        },
        _play() {
            let pageIndex = this.currentPageIndex + 1
            if (this.loop) {
                pageIndex += 1
            }
            this.timer = setTimeout(() => {
                this.slider.goToPage(pageIndex, 0, 400)
            },this.interval)
        }
    }

}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.slider {
    min-height: 1px;
    .slider-group {
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        .slider-item {
            float: left;
            @include box-sizing;
        }
    }
}

</style>


