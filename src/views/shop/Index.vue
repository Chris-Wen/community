<template>
    <div class="shop-index">
        <banner class="banner" />
        <!-- 积分 -->
        <div class="score">
            <div class="title">
                <p class="dotted">{{'····'.repeat(40)}} </p>
                <p> <span>我的积分</span> <i>{{this.$store.state.userInfo.score || '***'}}</i></p>  
            </div>
            <ul class="score-bar">
                <router-link tag="li" to="/points">  <i></i>  <p>赚积分</p>    </router-link >
                <router-link tag="li" to="/draw">    <i></i>  <p>积分抽奖</p>  </router-link >
                <router-link tag="li" to="/order">    <i></i> <p>我的订单</p>  </router-link >
                <router-link tag="li" to="/address">  <i></i> <p>地址管理</p>  </router-link >
            </ul>
        </div>
        <!-- 热卖 -->
        <div class="hot-sale">
            <p> <span> ❤ </span>  猜你喜欢</p>
            <div>  </div>
        </div>
        <!-- 商品推荐 -->
        <i class="pic-background recommend"></i>
        <div class="link-card">
            <div class="card-list">
                <ul class="score-goods">
                    <router-link tag="li" :to="{ path: '/shop/list', query: { type: 1 }}">
                         <i ></i>
                        <p>5000分以下</p>
                    </router-link>
                    <router-link tag="li" :to="{ path: '/shop/list', query: { type: 2 }}">
                         <i ></i>
                        <p>5000-8000分</p>
                    </router-link>
                    <router-link tag="li" :to="{ path: '/shop/list', query: { type: 3 }}">
                         <i ></i>
                        <p>8000分以上</p>
                    </router-link>
                </ul>
                <p class="dotted"> {{'····'.repeat(40)}} </p>
                <ul class="others">
                    <li>
                        <i></i> 
                        <p>新品专区</p>
                    </li>
                    <li>
                        <i></i> 
                        <p>好货精选</p>
                    </li>
                    <li>
                        <i></i> 
                        <p>淘优惠</p>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 商品分类 -->
        <i class="pic-background"></i>
        <div class="link-card">
            <div class="card-list">
                <ul class="sport">
                    <li>
                        <i></i> 
                        <p>美食生活</p>
                    </li>
                    <li>
                        <i></i> 
                        <p>家居百货</p>
                    </li>
                    <li>
                        <i></i> 
                        <p>数码运动</p>
                    </li>
                </ul>
                <p class="dotted">{{ '····'.repeat(40) }} </p>
                <ul class="disport">
                    <li>
                        <i></i> 
                        <p>动漫卡通</p>
                    </li>
                    <li>
                        <i></i> 
                        <p>美妆时尚</p>
                    </li>
                    <li>
                        <i></i> 
                        <p>电子卡券</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import Banner from '../../components/Banner/Banner'

export default {
    data() {
        return {
            titleInfo: {
                title: '积分商城',
                showIcon: false,
            }
        }
    },
    components:{ Banner },
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

.shop-index {
    width: 100%;
    @include box-sizing;
    .banner { 
        width: 100%; 
        height: 240px;
    }
    .dotted { 
        width: 100%;
        overflow: hidden;
        color: $text-color-ll;
        font-size: $font-size-small; /*no*/
        word-spacing: 0;
    }
    //积分栏
    .score {
        width: 100%;
        height: 220px;
        @include box-sizing;
        @include color-background;
        padding: 20px 0;
        .title {
            width: 100%;
            text-align: center;
            margin-bottom: 10px;
            position: relative; 
            p:last-child {
                @include center;
                font-size: 0; 
                width: 320px;
                height: 30px;
                @include color-background;
                span,i {
                    line-height: 30px;
                    font-size:14px; /*no*/
                    display: inline-block;
                    @include box-sizing;
                    height: 30px;
                    width: 135px;
                }   
                span {
                    background-color: $text-color-orange-d;
                    border-top-left-radius: 1em;
                    border-bottom-left-radius: 1em;
                    color:$text-color-w;
                    padding: 1px 0;
                }      
                i {
                    color:$text-color-orange-d;
                    border:1px solid $text-color-orange-d;
                    border-top-right-radius: 1em;
                    border-bottom-right-radius: 1em;
                }
            }  
        }
        .score-bar { 
            width: 100%; 
            @include box-sizing;
            color: $text-color-l; 
            min-height: 140px;
            display: flex;
            padding: 0 5%;
            li {
                flex: 1;
                height: auto;
                text-align: center;
                padding: .133333rem;
                i{
                    background-size: 90px 90px;
                    background-repeat: no-repeat;
                    display: inline-block;
                    margin: 10px 0;
                    height: 90px;
                    width:  90px;
                }
                &:first-child i{ background-image: url('../../common/images/shop/icons/earn_score.jpg') }  
                &:nth-child(2) i{ background-image: url('../../common/images/shop/icons/draw_score.jpg') }
                &:nth-child(3) i{ background-image: url('../../common/images/shop/icons/order.jpg') }
                &:last-child i{ background-image: url('../../common/images/shop/icons/address.jpg') }
            }
            
        }
    }
    //热卖
    .hot-sale {
        width: 100%;
        height: 210px;
        @include box-sizing;
        padding: 15px 0 15px 30px;
        >p { 
            font-size: $font-size-normal; /*no*/
            color: black;
            font-weight: 800;
            span { 
                color: $text-color-orange; 
                font-size: $font-size-small; /*no*/
                padding: 0 5px;
            }
        }
    }
    //背景图（推荐，分类）
    .pic-background, .recommend{ 
        display: block;
        width: 100%;
        min-height: 160px;
        background: url("../../common/images/shop/icons/sort.jpg") no-repeat;
        background-position: center center; 
        background-size: 100%; 
    }
    .recommend { 
        background: url("../../common/images/shop/icons/recommend.jpg") no-repeat;
        background-size:100%;
        background-position: center center; 
    } 

    //商品推荐， 分类
    .link-card {
        @include flex-between;
        width: 100%;
        height: 360px;
        // padding: 20px 0;
        margin-bottom: 15px; 
        @include color-background;
        .card-list {
            width: 100%;
            padding: 0 40px;
            @include box-sizing;
            position: relative;
            ul {
                @include flex-between;
                width: 100%;
                height: 50%;
                li{
                    padding: 0 10px;
                    margin: 20px 0;
                    width: auto;
                    height: auto;
                    text-align: center;
                    @include extend-click;
                    i{
                        display: block;
                        @include background-image-center;
                        width: 100px;
                        height: 100px;
                        margin: 0 auto;
                        margin-bottom: 20px;
                    }
                }
            }
            .dotted {  @include center; height: 1em; width: 80%; }
            .score-goods {
                li {
                    &:first-child i { background-image: url('../../common/images/shop/icons/G1.jpg') }
                    &:nth-child(2) i { background-image: url('../../common/images/shop/icons/G2.jpg') }
                    &:nth-child(3) i { background-image: url('../../common/images/shop/icons/G3.jpg') }
                }
            }
            .others {
                li {
                    &:first-child i { background-image: url('../../common/images/shop/icons/G4.jpg') }
                    &:nth-child(2) i { background-image: url('../../common/images/shop/icons/G5.jpg') }
                    &:nth-child(3) i { background-image: url('../../common/images/shop/icons/G6.jpg') }
                }
            }
            .sport {
                li {
                    &:first-child i { background-image: url('../../common/images/shop/icons/sort1.jpg') }
                    &:nth-child(2) i { background-image: url('../../common/images/shop/icons/sort2.jpg') }
                    &:nth-child(3) i { background-image: url('../../common/images/shop/icons/sort3.jpg') }
                }
            }
            .disport {
                li {
                    &:first-child i { background-image: url('../../common/images/shop/icons/sort4.jpg') }
                    &:nth-child(2) i { background-image: url('../../common/images/shop/icons/sort5.jpg') }
                    &:nth-child(3) i { background-image: url('../../common/images/shop/icons/sort6.jpg') }
                }
            }
        }
    }
}
</style>
