<template>
    <div class="news">
        <div class="top-news">
            <p class="mark"><i>游民资讯</i></p>
            <p class="dotted">{{'......'.repeat(30)}}</p>
            <ul>
                <router-link tag="li" to="/forum/article">
                    <div class="info">
                        <h2>{{"游民资讯游民资讯游民资讯游民资讯游民资讯游民资讯游民资讯"}}</h2>
                        <div>
                            <p>{{"内容简介内容简介内容简介内容简介内容简介内容简介内容简介"}}</p>
                            <p>{{'2018-05-01'}}   <span> <i class="self-icon-eye"></i> {{299999 | exchangeNumber }}</span> </p>
                        </div>
                    </div>
                    <div class="img"><img src="../../common/images/fiction/BANNER.jpg" alt=""></div>
                </router-link>
                <router-link tag="li" to="/forum/article">
                    <div class="info">
                        <h2>{{"游民资讯游民资讯"}}</h2>
                        <div>
                            <p>{{"内容简介内容简介内容简介内容简"}}</p>
                            <p>{{'2018-05-01'}}   <span> <i class="self-icon-eye"></i> {{99999 | exchangeNumber }}</span> </p>
                        </div>
                    </div>
                    <div class="img"><img src="../../common/images/fiction/BANNER.jpg" alt=""></div>
                </router-link>
            </ul>
        </div>
        <div class="game-news">
            <p class="mark"><i>泛游戏</i></p>
            <p class="dotted">{{'......'.repeat(30)}}</p>
            <ul>
                <li>
                    <div class="info">
                        <h2>{{"游民资讯游民资讯游民资讯游民资讯游民资讯游民资讯游民资讯"}}</h2>
                        <div>
                            <p>{{"内容简介内容简介内容简介内容简介内容简介内容简介内容简介"}}</p>
                            <p>{{'2018-05-01'}}   <span> <i class="self-icon-eye"></i> {{299999 | exchangeNumber }}</span> </p>
                        </div>
                    </div>
                    <div class="img"><img src="../../common/images/fiction/BANNER.jpg" alt=""></div>
                </li>
                <li>
                    <div class="info">
                        <h2>{{"游民资讯游民资讯"}}</h2>
                        <div>
                            <p>{{"内容简介内容简介内容简介内容简"}}</p>
                            <p>{{'2018-05-01'}}   <span> <i class="self-icon-eye"></i> {{99999 | exchangeNumber }}</span> </p>
                        </div>
                    </div>
                    <div class="img"><img src="../../common/images/fiction/BANNER.jpg" alt=""></div>
                </li>
            </ul>
        </div>
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
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.news {
    .dotted { color: $text-color-orange-d; padding-top: 30px;}
    .mark {
        position: absolute;
        top: 25px;
        left: 5%;
        font-size: 0.95em;
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
    .top-news { 
        @include color-background;
        position: relative;
        .mark { @include color-background } 
    }
    .game-news { 
         position: relative;
        .mark { background: #ebebeb } 
     }
    ul {
        padding: 0 40px;
        li {
            height: 205px;
            @include box-sizing; 
            border-bottom: 1px solid $text-color-orange;  /*no*/
            display: flex;
            align-items: center;
            justify-content: space-around;
            h2 { max-height: 2.2em; }
            .info {
                height: 150px;
                width: 50%;
                @include flex-colum;
                justify-content: space-between;
                p { 
                    text-align: justify;
                    max-height: 2em;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    color: $text-color-dark;
                }
                div {
                    p:last-child {
                        font-size: $font-size-min;  /*no*/
                        margin-top: 15px;
                        span { float: right; }
                    }
                }
            }
            .img { img { width: 200px; height: 150px } }
            &:last-child { border: 0; }
        }
    }
}
</style>

