<template>
    <div class="details">
        <!-- 商品展示 -->
        <div class="goods-details">
			<div class="goods-show">
				<div class="goods-bgimg"> <img :src="preSrc + details.pic" :onerror="defaultImg"> </div>
				<div class="goods-cont">
					<p class="title">{{details.title}}</p>
					<div>
						<p> 
                            <i></i> 积分 <span>{{details.score}}</span> 
                            <span style="color:red" v-if="details.price && parseInt(details.price)>0">+ <em>￥</em> {{details.price}}</span>  
                        </p>
                        <p>市场参考价：{{details.realprice}}元 <span class="freight">运费：{{ details.freight==2 ? '包邮': '不包邮'}}</span></p>
					</div>
                    <router-link class="custom-serve" to="/custom">
                            <span><i class="fa fa-headphones"></i>联系客服</span>
                    </router-link>
				</div>  
			</div>
			<div class="buy-btn">
				<a href="javascript:;" @click="addCart">加入购物车</a>
				<a href="javascript:;" @click="buyNow">立即购买</a>
			</div>
		</div>
        <!-- 商品信息 -->
        <section >
			<div class="info-title">
				<span>商品详情</span> 
				<p class="dotted">{{'····'. repeat(20)}}</p>
			</div>
			<ul id="productInfo">
				<li><i>品名：</i>{{details.sname}}</li>
				<li><i>品牌：</i>{{details.title}}</li>
				<li><i>详情：</i> <div v-html="details.detail"></div></li>
			</ul>
		</section>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                title: '商品详情',
                showIcon: true,
                icon: 'fa fa-shopping-cart fa-lg',
                link: '/shop/cart'
            },
            details: {
                pic: '',
                title: '王者荣耀游戏手柄王者荣耀游戏手柄，优质精选',
                score: 1213,
                price:　123,
                realprice: 188,
                freight:　2,
                sname: '游戏手柄',
                detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero ducimus ipsam assumenda sequi iure perspiciatis velit veritatis laudantium in, blanditiis consectetur ad provident molestias suscipit quidem excepturi saepe consequatur perferendis.'　
            },
            defaultImg: `this.src = "${require('../../common/images/shop/hold/detail_default.jpg')}"`
        }
    },
    methods: {
        ...mapActions(['handleTitle']),
        addCart() {

        },
        buyNow() {

        }
    },
    mounted() {
        this.handleTitle({
            title:  this.titleInfo.title,
            showIcon: this.titleInfo.showIcon,
            icon:   this.titleInfo.icon,
            link:   this.titleInfo.link
        })
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.details {
    font-size: $font-size-small; /*no*/
    .goods-details{
        .goods-show{
            @include box-sizing;
            @include color-background;
            width: 100%;
            height: 525px;
            .goods-bgimg{
                height: 360px;
                img{ width: 100%; height: 360px; }
            }
            .goods-cont{
                @include box-sizing;
                width: 100%;
                height: 165px;
                padding: 20px 60px;
                position: relative;
                @include flex-colum;
                justify-content: space-between;
                .title { 
                    width: 70%; 
                    font-size: $font-size-normal; /*no*/ 
                    font-weight: 800;
                    color: black;
                    height: 2.2em;
                    @include text-justify(1.2em);
                    overflow: hidden;
                }
                >div {
                    p {
                        &:first-child {
                            color: $text-color-orange;
                            margin-bottom: 8px;
                            i {
                                display: inline-block;
                                @include background-image(url('../../common/images/icons/icon_zd.jpg')); 
                                vertical-align: middle;	
                                width: 25px;
                                height: 25px;
                            }
                            em { font-size: $font-size-small; /*no*/ }
                            span { font-size: $font-size-large; /*no*/ }
                        }
                        &:nth-child(2) {
                            font-size: $font-size-min; /*no*/
                            color: $text-color-dark;
                        }
                    }
                    .freight{ float: right }
                }
                .custom-serve{
                    position: absolute;
                    color:	$text-color-orange-d;
                    font-size: $font-size-min; /*no*/
                    top: 0;
                    right: 0;
                    padding: 50px 40px;
                    transform: scale(0.90);
                    span {
                        i { margin-right: 8px; }
                        border: 1px solid $text-color-orange; /*no*/
                        @include border-radius(1em);
                        padding: 0 25px;
                    }
                }
            }
        }
        // 购物车按钮
        .buy-btn{
            font-size: 0;
            width: 100%;
            a{
                font-size: $font-size-small; /*no*/
                display: inline-block;
                width: 50%;
                height: 65px;
                line-height: 65px;
                text-align: center;
                color: white;
                &:first-child {
                    @include color-grad-btn;
                }
                &:last-child {
                        background: -webkit-gradient(linear, left top, right top, from(#e33432), to(#e36333)); 
                        background: linear-gradient(to right, #e33432, #e36333);
                }
            }
        }
    }

    /* 商品展示 */
    section{
        width: 100%;
        @include box-sizing;
        .info-title{
            position: relative;
            width: 100%;
            height: 60px;
            text-align: center;
            span{
                color: $text-color-dark;
                display: block;
                width: 7em;
                line-height: .941176rem;
                @include center;
                background: #ebebeb;
            }
            .dotted{
                line-height: 60px;
                color: $text-color-ll;
                width: 85%;
                overflow:hidden;
                margin:0 auto;
            }
        }
        ul{
            @include box-sizing;
            @include color-background;
            width: 100%;
            padding: 70px 70px 30px;
            li{
                width: 100%;
                @include text-justify(1.5em);
                margin: 10px 0;
                color: $text-color-dark;
                i {
                    font-size: $font-size-normal; /*no*/
                    color:black;
                }
            }
        }
    }
}
</style>

