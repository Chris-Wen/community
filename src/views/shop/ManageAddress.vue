<template>
    <div class="address">
        <ul v-if="addressData.length">
            <li v-for="(item, index) in addressData" :key="index" @touchstart="touchStart" @touchend="touchEnd">
                <slider-delete @handleDelete="deleteItem(item.aid)" :index="index">
                    <div class="item-content">
                        <div>
                            <p>姓名： <span>{{item.name}}</span></p>
                            <p>手机： {{item.phone}}</p>
                            <div>
                                <p>地址：</p> <p>{{item.province + item.city + item.area}} {{item.address}}</p>
                            </div>
                        </div>
                        <div class="item-bottom">
                            <span @click="setDefaultAddress(item.aid)"> 
                                <i  name="check" class="fa-lg" :class="item.selected==1 ? 'self-icon-check-circle' : 'self-icon-circle-o'"></i> 
                                默认地址
                            </span> 
                            <router-link to="/shop/new_address"><i class="self-icon-pencil2"></i> 编辑</router-link>
                        </div>
                    </div>
                </slider-delete>
            </li>
        </ul>
        <div v-else class="default">
            <img src="../../common/images/shop/hold/home.jpg" alt="">
            <p>还没有收货地址呦!</p>
        </div>
        <router-link to="/shop/new_address" class="new"> ＋ 新建地址 </router-link>
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
                title: '地址管理',
                showIcon: false,
                showBottomTab: true
            },
            addressData: [
                {area: "朝阳区", city: "市辖区", province: "北京市", phone: "18812315645", address: "朝阳小区，张朝阳投资基地", aid: '35', name: '张朝阳', selected: '1'},
                {area: "昌平区", city: "市辖区", province: "北京市", phone: "19915464522", address: "平昌小区，平川路张三丰故居平昌小区，平川路张三丰故", aid: '37', name: '张三丰', selected: '0'},
                {area: "海淀区", city: "市辖区", province: "北京市", phone: "17712345624", address: "海定区海淀大厦1001", aid: '36', name: '张伟', selected: '0'}
            ],
            sliderDeleteParams: {
                lastTouch: '',
                targetTouch: ''
            }
        }
    },
    methods: {
        ...mapActions(['handleTitle']),
        deleteItem(aid) {

        },
        setDefaultAddress(aid) {
            
        },
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
        }
    },
    mounted() {
        this.handleTitle({
            title:  this.titleInfo.title,
            showIcon: this.titleInfo.showIcon,
            showBottomTab: this.titleInfo.showBottomTab
        })
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.address {
    font-size: $font-size-small;  /*no*/
    >ul {
        li {
            height: auto;
            @include box-sizing;
            @include color-background;
            margin-bottom: 10px;
            .item-content {
                >div { 
                    p { line-height: 1.3em; }
                    &:first-child {
                        border-bottom: 1px solid $border-color-d; /*no*/
                        padding: 25px 70px;
                    }
                    div {
                        display: flex;
                        p { 
                            display: inline-block;  
                            text-align: justify;
                            &:first-child { width: 4em; min-width: 3em; max-width: 4em; }
                         }
                    }
                }
                .item-bottom {
                    height: 40px;
                    line-height: 40px;
                    span,a { padding: 0 70px;  }
                    span i { color: $text-color-ll; vertical-align: middle }
                    .self-icon-check-circle { color: $text-color-orange }
                    a {  float: right; color: black; }
                }
            }
        }
    }
    .default {
        margin: 300px 0 200px;
        text-align: center;
        color: $text-color-dark;
        font-size: $font-size-min;  /*no*/
        img { height: 90px; @include border-radius(50%); margin-bottom: 30px; }
    }
    .new {
        font-size: $font-size-normal;  /*no*/
        color: black;
        display: block;
        width: 62.5%;
        @include color-background;
        margin: 20px auto;
        text-align: center;
        height: 2em;
        line-height: 2em;
    }
}
</style>
