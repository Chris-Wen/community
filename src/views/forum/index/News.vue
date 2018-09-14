<template>
    <div class="news">
        <div v-if="datalist">
            <div class="top-news" v-if="datalist.spec_gamenews">
                <p class="mark"><i>游民资讯</i></p>
                <p class="dotted">{{`......`.repeat(30)}}</p>
                <ul>
                    <router-link tag="li" v-for="(spec, index) in datalist.spec_gamenews" :key="index" :to="'/forum/article/'+spec.acid">
                        <div class="info">
                            <h2 class="lines-nowrap">{{spec.activity}}</h2>
                            <div>
                                <p class="lines-nowrap">{{spec.intro}}</p>
                                <p>{{spec.creattime | transformTime}}   <span> <i class="self-icon-eye"></i> {{spec.views | exchangeNumber }}</span> </p>
                            </div>
                        </div>
                        <div class="img" v-if="spec.cover"><img :src="HOST + spec.cover" /></div>
                    </router-link>
                </ul>
            </div>
            <div class="game-news" v-if="datalist.normal_gamenews">
                <p class="mark"><i>泛游戏</i></p>
                <p class="dotted">{{`......`.repeat(30)}}</p>
                <ul>
                    <router-link tag="li" v-for="(item, index) in datalist.normal_gamenews" :key="index" :to="'/forum/article/'+item.acid">
                        <div class="info">
                            <h2 class="lines-nowrap">{{item.activity}}</h2>
                            <div>
                                <p class="lines-nowrap">{{item.intro}}</p>
                                <p>{{item.creattime | transformTime}}   <span> <i class="self-icon-eye"></i> {{item.views | exchangeNumber }}</span> </p>
                            </div>
                        </div>
                        <div class="img" v-if="item.cover"><img :src="HOST + item.cover" /></div>
                    </router-link>     
                </ul>
            </div>
        </div>
        <div v-else style="margin-top: 1em; text-align:center">暂无资讯内容</div>
    </div>    
</template>

<script>
import * as api from 'api/api'
import {formatDate} from 'common/js/tools'

export default {
    data() {
        return {
            datalist: null
        }
    },
    methods: {
        
        
    },
    created() {
        api.get("/forum/pubStand").then(res => {
            if (res.code==200) {
                this.datalist = res.data
            }
        })
    },
    filters: {
        exchangeNumber: function(value) {
            let number = value<100000 ? value : Math.floor(value/10000) + '万+'
            return number
        },
        transformTime: function(time) {
            return formatDate(time, "yyyy-MM-dd")
        }
    },
}
</script>

<style lang="scss" scoped>
@import "../../../common/css/index.scss";

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
            @include background-image(url('../../../common/images/fiction/bg_orange.png'));
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
            h2 { max-height: 2.2em;  }
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
            .img { 
                width: 200px; height: 150px; overflow: hidden;
                img { width: 100% } 
            }
            &:last-child { border: 0; }
            &:first-child { border-bottom: 1px solid $text-color-orange;  /*no*/ }
        }
    }
}
</style>

