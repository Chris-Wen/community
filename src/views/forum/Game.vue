<template>
    <div class="game">
        <div class="part">
            <p class="mark"><i>最新游戏</i></p>
            <p class="dotted">..............................................................................</p>
        </div>
        <ul class="new-game">
            <router-link tag="li" to="/forum/game_info">
                <h1>{{'游戏名称'}}</h1>
                <img src="http://221.123.178.232/smallgamesdk/Public/Uploads/20180109173040544.jpg" >
                <div>
                    <span><i>★</i> {{5.5}}</span>
                    <p>{{"游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍"}}</p>
                </div>
            </router-link>
            <router-link tag="li" to="/forum/game_info">
                <h1>{{'游戏名称'}}</h1>
                <img src="http://221.123.178.232/smallgamesdk/Public/Uploads/20180109173040544.jpg">
                <div>
                    <span><i>★</i> {{5.5}}</span>
                    <p>{{"游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍游戏介绍"}}</p>
                </div>
            </router-link>
        </ul>
        <div class="part game-part">
            <p class="mark"><i>热门游戏</i></p>
            <p class="dotted">..............................................................................</p>
        </div>

        <ul class="top-game flex-between">
            <li>
                <img src="http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172503958.jpg" alt="">
                <h2>游戏名称</h2>
                <p>类别  <span><i>★</i> 5.5</span></p>
            </li>
            <li>
                <img src="http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172503958.jpg" alt="">
                <h2>游戏名称</h2>
                <p>类别  <span><i>★</i> 5.5</span></p>
            </li>
            <li>
                <img src="http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172503958.jpg" alt="">
                <h2>游戏名称</h2>
                <p>类别  <span><i>★</i> 5.5</span></p>
            </li>
            <li>
                <img src="http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172503958.jpg" alt="">
                <h2>游戏名称</h2>
                <p>类别  <span><i>★</i> 5.5</span></p>
            </li>
        </ul>

    </div>    
</template>

<script>
export default {
    data() {
        return{ }
    },
    filters: {
        exchangeNumber: function(value) {
            let number = value<100000 ? value : Math.floor(value/10000) + '万+'
            return number
        }
    },
    methods: {
        setDotsStyle() { return '......'.repeat(30) }
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.game {
    .part {
        height: 80px;
        position: relative;
        .dotted { color: $text-color-orange-d; padding-top: 18px;}
        .mark {
            position: absolute;
            top: 10px;
            left: 5%;
            font-size: 0.95em;
            background: #ebebeb;
            i {
                font-weight: 800;
                display: inline-block;
                width: 130px;
                height: 45px;
                line-height: 48px;
                text-align: center;
                color: #fff;
                @include background-image(url('../../common/images/fiction/bg_orange.png'));
                background-size: 120px 42px;
            }
        }
    }
    .game-part { 
        height: 95px;
        .dotted { padding-top: 25px; } 
        .mark { top: 20px }
    }
    ul li { @include color-background; }
    .new-game {
        li {
            width: 100%;
            padding: 0 40px 30px;
            @include box-sizing;
            margin-bottom: 10px;
            img { width: 100%; }
            h1,h2 { line-height: 3em }
            div {
                padding-top: 15px;
                color: $text-color-l;
                p { 
                    width: 80%;
                    @include no-wrap;
                }
                span { float: right; }
            }
        }
    }
    .top-game {
        padding: 0 40px;
        li {
            width: 42%;
            height: 280px;
            margin-bottom: 20px;
            text-align: center;
            h2 { text-align: center }
            >img { 
                height: 180px; width: 180px;
                @include border-radius(1em); 
                margin: 20px 0 10px 0; 
            }
            >p:last-child {
                text-align: left;
                margin-top: 10px;
                padding: 0 1em;
                span { float: right; }
                color: $text-color-l;
                font-size: $font-size-min;  /*no*/
            }
        }
    }
}
</style>

