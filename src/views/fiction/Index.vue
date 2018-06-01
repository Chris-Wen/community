<template>
    <div class="fiction-index">
        <div class="fixed">
            <ul class="banner" v-if="recommends.length">
               <slider>
                    <div v-for="(item, index) in recommends" :key="index">
                        <a :href="item.linkUrl">
                            <img class="needsclick" @load="loadImage" :src="item.picUrl">
                        </a>
                    </div>
                </slider>
            </ul>
            <p class="tab">
                <router-link tag="div" to="/fiction"> <span :class="{active: tabIndex==1}" @click="tabIndex=1">原创</span> </router-link>
                <router-link tag="div" to="/fiction/relative"> <span :class="{active: tabIndex==2}" @click="tabIndex=2">同人</span> </router-link>
                <router-link tag="div" to="/fiction"> <span :class="{active: tabIndex==3}" @click="tabIndex=3">完结</span> </router-link>
                <router-link tag="div" to="/fiction"> <span :class="{active: tabIndex==4}" @click="tabIndex=4">排行</span> </router-link>
            </p>
        </div>
        <div class="view">
            <transition name="slide-fade">
                <router-view></router-view>
            </transition>
        </div>
        <!-- <div class="recommend">
            <i class="recommend-img"></i>
            <ul :class="{'unfold': isUnfold }">
                <li v-for="(item, index) in data" :key="index"> 
                    <div class="img"><img src="../../common/images/fiction/fiction.jpg" alt=""></div>
                    <div>
                        <p>《斗破苍穹》</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas odio maxime eveniet eligendi </p>
                    </div>
                </li>
            </ul>
            <div v-if="!isUnfold" class="more" @click="isUnfold = true">
                    更多<i class="self-icon-angle-right fa-lg"></i>
            </div>
        </div> -->
        <!-- <ul class="list">
            <li>
                <span class="status">连载中</span>
                <div>
                    <p>《斗破苍》</p>
                    <p>一个个个个个打的技术监督局发哦激动I就爱的风景</p>
                    <p> <span>作者：EZ</span> <span>字数：121313213212</span> </p>
                </div>
                
            </li>
            <li>
                <span class="status">连载中</span>
                <div>
                    <p>《我的世界》</p>
                    <p>我的世界，去哦诶积分卡机爱的减肥骄傲的看看片；看； 啊放假啊记得付款了姐姐夸奖啊垃</p>
                    <p> <span>作者：我是谁我在哪</span> <span>字数：121313213212</span> </p>
                </div>
                
            </li>
        </ul> -->
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import Slider from '../../base/Slider/Slider'

export default {
    components: { Slider },
    data() {
        return {
            titleInfo: {
                title: '掌动小说',
                showIcon: false
            },
            tabIndex: 1,
            recommends: [
                {linkUrl: '#1', picUrl: 'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109173040544.jpg'},
                {linkUrl: '#2', picUrl: 'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109173040544.jpg'},
                {linkUrl: '#2', picUrl: 'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109173040544.jpg'}
            ],
            data: [1,2,3,4, 5],
            isUnfold: false
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        loadImage() {

        } 
    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon,
        });
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.fiction-index {
    width: 100%;
    height: auto;
    position: relative;
    font-size: $font-size-small; /*no*/
    padding-top: 295px; 
    @include  color-background;
    .fixed {
        z-index: 100;
        position: fixed;
        top: 100px;
        height: 275px;
        width: 100%;
        @include box-sizing;
        border-bottom: 1px solid $text-color-orange;
        .banner {
            width: 100%;
            height: 200px;
            @include box-sizing;
            overflow: hidden;
            >div{ height: 200px; }
        }
        .tab {
            height: 74px;
            line-height: 74px;
            background-color: $bg-color-d;
            @include flex-around;
            font-size: $font-size-normal; /*no*/
            .active { color: $text-color-orange-d; font-weight: 600  }
            span { padding: 0 1em }
        }
    }
    .view { 
        // margin-top: 73px;
        .slide-fade-enter-active {
            transition: all .3s ease;
        }
        .slide-fade-leave-active {
            transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        }
        .slide-fade-enter, .slide-fade-leave-to {
            transform: translateX(10px);
            opacity: 0;
        } 
    }
    // .list {
    //     padding: 0 70px;
    //     li {
    //         width: 100%;
    //         height: 130px;
    //         position: relative;
    //         color: $text-color-l;
    //         border-bottom: 1px solid $border-color-d;
    //         @include box-sizing;
    //         &:last-child { border: 0 }
    //         div {
    //             width: 80%;
    //             height: 100%;
    //             padding-top: 20px;
    //             @include box-sizing;
    //             p {
    //                 @include no-wrap;
    //                 font-size: 12px; /*no*/
    //                 &:first-child { 
    //                     font-weight: 600; 
    //                     color: black ;
    //                    line-height: 1.5em;
    //                 }
    //                 &:last-child { 
    //                     margin: 20px 0; 
    //                     span {
    //                         display: inline-block;
    //                         width: 45%;
    //                         vertical-align: middle;
    //                         &:first-child { width: 50%; @include no-wrap }
    //                     }
    //                 }
    //             }
    //         }
    //         .status {
    //             float: right;
    //             line-height: 130px;
    //         }
    //     }
    // }
}
</style>
