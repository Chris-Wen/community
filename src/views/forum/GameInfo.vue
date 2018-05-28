<template>
    <div class="game-info">
        <div class="top">
            <img src="http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172503958.jpg" alt="">
            <h1>游戏名称</h1>
            <p class="grade"><i>★★★★★</i>5.5</p>
            <div class="intro">
                <p>
                    游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍
                    游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍
                    游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍
                    游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍
                </p>
            </div>
            <div class="btn-group flex-around">
                <a href="javascript:;">启动游戏</a>
                <a href="javascript:;">游戏下载</a>
            </div>
        </div>
        <div class="version">
            <p class="title">版本信息</p>
            <p>
                版本信息介绍版本信息介绍版本信息介绍版本信息介绍版本信息介绍版本信息介绍
                版本信息介绍版本信息介绍版本信息介绍版本信息介绍版本信息介绍版本信息介绍
            </p>
        </div>
        <div class="slider-img">
            <div class="container">
                <slider :autoPlay="false" :showDots="false" :isFullScreenSlider="false" >
                    <div>
                        <img src="../../common/images/fiction/game_img.jpg" alt="">
                    </div>
                    <div>
                        <img src="../../common/images/fiction/game_img.jpg" alt="">
                    </div>
                    <div>
                        <img src="../../common/images/fiction/game_img.jpg" alt="">
                    </div>
                </slider>
            </div>
        </div>
        <div class="comment">
            <p class="title">应用评论</p>
            <p>
                评论内容
                下载安装后可评论
            </p>
        </div>
    </div>    
</template>

<script>
import Slider from '../../base/Slider/Slider'
import { mapMutations, mapActions } from 'vuex'

export default {
    components: { Slider },
    data() {
        return {
            titleInfo: {
                title: '游戏详情',
                showIcon: false
            },
            showIndex: 1
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']) 
    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon
        });
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.game-info {
    @include box-sizing;
    font-size: $font-size-small;  /*no*/
    .title {
        color: $text-color-orange-d;
        margin-bottom: 20px;
    }
    .top {
        text-align: center;
        margin: 12px;
        padding-bottom: 45px;
        @include color-background;
        h1 { text-align: center }
        >img {
            width: 180px;
            height: 180px;
            @include border-radius(1em);
            margin: 60px 0 35px;
        }
        .grade {
            margin-top: 10px;
            
        }
        .intro {
            width: 80%;
            margin: 35px auto;
            height: auto;
            max-height: 3.3em;
            overflow: hidden;
            line-height: 1.2em;
            text-align: justify;
        }
        .btn-group {
            a {
                @include border-radius(1em);
                padding: .4em 1em;
                &:first-child {
                    color: $text-color-orange-d;
                    border: 1px solid $text-color-orange-d;
                }
                &:last-child {
                    color: white;
                    background: $text-color-orange;
                }
            }
            
        }
    }
    .version {
        margin: 12px;
        @include color-background;
        padding: 25px 60px;
        text-align: justify;
        line-height: 1.2em;
    }
    .slider-img {
        margin: 12px 0 12px 12px;
        height: 240px;
        overflow: hidden;
        @include box-sizing;
        .container {
            width: 83.6%;
            height: 100%;
            img { 
                width: 100%; height: 100%;
                @include box-sizing;
                padding-right: 10px;
            }   
        }
    }
    .comment {
        margin: 12px;
        padding: 25px 60px;
        min-height: 100px;
        @include color-background;
    }
}
</style>

