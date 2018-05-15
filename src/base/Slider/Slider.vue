<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
        <slot> </slot>
    </div>
    <div class="dots">
        <span :class="['dot', {active: currentPageIndex==k}]" v-for="(item, k) in dots" :key="k"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'

export default {
    name: 'Slider',
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

            this.autoPlay ? this._play() : ''
        }, 20)

        window.addEventListener('resize', () => {
            if (!this.slider) return;
            this._setSliderWidth(true)
            this.slider.refresh()
        })
    },
    methods: {
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children

        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')

          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400
        })

        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex

          if (this.autoPlay) {
            clearTimeout(this.timer)
            this._play()
          }
        })

        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
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
        }, this.interval)
      }
    }

}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.slider {
    min-height: 1px;
    height: 240px;
    .slider-group {
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        .slider-item {
            float: left;
            @include box-sizing;
            overflow: hidden;
            text-align:center;
            a {
                display: block;
                width: 100%;
                overflow: hidden;
            }
            img {
                display: block;
                width: 100%;
            }
        }
    }
    .dots {
        position: absolute;
        right: 0;
        left: 0;
        text-align: center;
        bottom: 12px;
        font-size: 0;
        .dot {
            display: inline-block;
            margin: 0 5px;
            width: 10px; 
            height: 10px;
            @include border-radius(50%);
            background: $text-color-l;
            &.active {
                width: 12px;
                height: 12px;
                background: $text-color-orange;
            }
        }
    }
}

</style>


