<template>
    <div class="address" >
        <ul>
            <li v-for="(item, index) in addressData" :key="index" @touchstart="touchStart" @touchend="touchEnd">
                <slider-delete @handleDelete="deleteItem(item.aid, index)" :index="index">
                    <div class="item-content">
                        <div>
                            <p>姓名： <span>{{item.name}}</span></p>
                            <p>手机： {{item.phone}}</p>
                            <div>
                                <p>地址：</p> <p>{{item.province + item.city + item.area}} {{item.address}}</p>
                            </div>
                        </div>
                        <div class="item-bottom">
                            <span @click="setDefaultAddress(item.aid, index, item.selected==1)"> 
                                <i  name="check" class="fa-lg" :class="item.selected==1 ? 'self-icon-check-circle' : 'self-icon-circle-o'"></i> 
                                默认地址
                            </span> 
                            <router-link :to="{path: '/shop/new_address', query: { aid : item.aid }}">
                                <i class="self-icon-pencil2"></i> 编辑
                            </router-link>
                        </div>
                    </div>
                </slider-delete>
            </li>
        </ul>
        <div v-if="empty" class="default">
            <img :src="NON_ICON" >
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
            addressData: '',
            empty: false,
            sliderDeleteParams: {
                lastTouch: '',
                targetTouch: ''
            }
        }
    },
    methods: {
        ...mapActions(['handleTitle']),
        deleteItem(aid, index) {
            // this.addressData.splice(index, 1)
            this.axios.post("/Mall/deleteAddress", {aid})
                .then(response => {
                    if (response.code == 200) {
                        this.addressData.splice(index, 1)
                    }
                   Toast(response.msg)
                })
        },
        setDefaultAddress(aid, index, isDefault) {
            if (isDefault) return;
            this.axios.post("/Mall/setDefaultAddress", {aid})
                .then(response => {
                    if (response.code == 200) {
                        this.addressData.forEach(el => {
                            el['selected'] = 0;
                        });
                        this.addressData[index]['selected'] = 1
                    }
                    Toast(response.msg)
                })
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
    created() {
        this.axios.get("/Mall/getUserAddress")
            .then(response => {
                if (response.code == 200 && response.msg== "succ") {
                    this.addressData = response.data;
                } else if (response.msg == "empty"){
                    this.empty = true
                }
        })
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
