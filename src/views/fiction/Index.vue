<template>
    <div class="fiction-index">
        <div class="fixed">
            <ul class="banner">
                <router-link to="/">
                    <img src="" alt="">
                </router-link>
            </ul>
            <p class="tab">
                <span :class="{active: index==1}" @click="index=1">原创</span>
                <span :class="{active: index==2}" @click="index=2">同人</span>
                <span :class="{active: index==3}" @click="index=3">完结</span>
                <span :class="{active: index==4}" @click="index=4">排行</span>
            </p>
        </div>
        <div class="recommend">
            <i class="recommend-img"></i>
            <ul>
                <li> 
                    <div class="img"><img src="../../common/images/fiction/fiction.jpg" alt=""></div>
                    <div>
                        <h2>《斗破苍穹》</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas odio maxime eveniet eligendi </p>
                    </div>
                </li>
                <li> 
                    <div class="img"><img src="../../common/images/fiction/fiction.jpg" alt=""></div>
                    <div>
                        <h2>《斗破苍穹》</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas odio maxime eveniet eligendi </p>
                    </div>
                </li>
            </ul>
        </div>
        <ul class="list">
            <li style="height: 100px;">
                具体内容
            </li>
            <li style="height: 100px;">
                具体内容
            </li>
            <li style="height: 100px;">
                具体内容
            </li>
            <li style="height: 100px;">
                具体内容
            </li>
        </ul>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                title: '掌动小说',
                showIcon: false
            },
            index: 1,
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']) 
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
    font-size: $font-size-small;
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
        }
        .tab {
            height: 74px;
            line-height: 74px;
            background-color: $bg-color-d;
            @include flex-around;
            font-size: $font-size-normal; /*no*/
            .active { color: $text-color-orange-d; font-weight: 600  }
        }
    }
    .recommend {
        width: 100%;
        height: 395px;
        padding: 0 70px;
        position: relative;
        @include box-sizing;
        background-color: $bg-color-d;
        .recommend-img{
            display: inline-block;
            width: 110px;
            height: 33px;
            background-image: url("../../common/images/fiction/recommend.png");
            background-size: 105px 33px;
            background-repeat: no-repeat;
            background-position: center;
            position: absolute;
            top: 0;
            right: 70px;
        }
        ul {
            width: 100%;
            height: 100%;
            li {    
                width: 100%;
                @include flex-center;
                &:first-child{  padding-top: 50px; margin-bottom: 35px }
                .img {
                    width: 120px;
                    height: 140px;
                    margin-right: 35px;
                    img { width: auto; height: 140px; @include border-radius(1em); }
                }
            }
        }    
    }
    .list {
        padding: 0 70px;
        li {
            border-bottom: 1px solid $text-color-dark;
        }
    }
}
</style>
