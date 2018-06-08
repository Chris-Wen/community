<template>
    <div class="prize-record" >
        <ul>
            <li v-for="(item, index) in data" :key="index" @touchstart="touchStart" @touchend="touchEnd">
                <slider-delete @handleDelete="deleteItem(index)">
                    <div class="prize-item">
                        <div class="img">
                            <img src="http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172657362.jpg" >
                        </div>
                        <div>
                            <h2>{{'物品名称'}} x {{1}}</h2>
                            <p>{{'2018-06-06 12:00'}}</p>
                        </div>
                    </div>
                </slider-delete>
            </li>
        </ul>

        <div class="roll-msg">
            <ul v-if="list.length" ref="wrapper">
                <li v-for="(item, index) in list" :key="index">
                    {{item.name}} 获得 <span>{{'40米长屠龙刀一把'}}</span>   
                </li>
            </ul>
        </div>
    </div>    
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import SliderDelete from 'base/SliderDelete/SliderDelete'
import { removeClass } from 'common/js/dom'

export default {
    components: { SliderDelete },
    data() {
        return {
            titleInfo: {
                title: '中奖记录',
                showIcon: false
            },
            data: [12,34,1,5],
            sliderDeleteParams: {
                lastTouch: '',     
                targetTouch: ''
            },
            list: [
                {name: '1', prize: '40米长屠龙刀一把'},
                {name: '1', prize: '40米长屠龙刀一把'},
                {name: '1', prize: '40米长屠龙刀一把'},
                {name: '1', prize: '40米长屠龙刀一把'},
                {name: '1', prize: '40米长屠龙刀一把'},
                {name: '1', prize: '40米长屠龙刀一把'},
                {name: '1', prize: '40米长屠龙刀一把'},
                {name: '1', prize: '40米长屠龙刀一把'},
                {name: '1', prize: '40米长屠龙刀一把'},
                {name: '1', prize: '40米长屠龙刀一把'},
            ]
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        touchStart(ev) {
            ev = ev || event;
            this.sliderDeleteParams.lastTouch = this.sliderDeleteParams.targetTouch;
            this.sliderDeleteParams.targetTouch = ev.currentTarget;
        },
        touchEnd(ev) {
            ev = ev || event;
            //若上一个左滑项与当前触摸项不是同一个。上一个左滑项右滑，不再显示删除按钮
            if ( this.sliderDeleteParams.lastTouch && (this.sliderDeleteParams.lastTouch !== this.sliderDeleteParams.targetTouch)) { 
                removeClass(this.sliderDeleteParams.lastTouch.children[0].children[0], 'left-slider')
            }   
        },
        deleteItem(index) {
            this.data.splice(index, 1)
        },
        initRollList() {
            if (this.list.length == 10) {
                this.$refs.wrapper.className = 'animate'
            }
        }
    },
    mounted() {
        this.initRollList()

        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon
        });
    }
}
</script>

<style lang="scss" scoped>
@import "../../../common/css/index.scss";

.prize-record {
    font-size: $font-size-small;  /*no*/
    padding-top: 20px;
    >ul {
        li {
            width: 100%;
            @include color-background;
            height: 140px;
            margin-bottom: 10px;
            .prize-item {
                display: flex;
                width: 100%;
                padding:　20px 70px;
                @include box-sizing;
                .img {
                    width: 130px;
                    img { width: 100px; height: 100px; @include border-radius(.5em); }
                }
                >div:last-child {
                    h2 { margin:　20px 0 10px; }
                    p { color: $text-color-l; font-size: $font-size-min;  /*no*/ transform: scale(0.95) }
                }
            }
            
        }
    } 
        
    .roll-msg {
        margin:　20px 0;
        text-align: center;
        font-size: $font-size-min;  /*no*/
        line-height: 2em;
        max-height: 10em;
        overflow: hidden;
        ul {
            
            li span { color: $text-color-orange-d; }
            &.animate {
                @include animate-wrapper(20em);
                animation: move 12s linear infinite; 
            } 
        }

        // @include 
    }
}
</style>

