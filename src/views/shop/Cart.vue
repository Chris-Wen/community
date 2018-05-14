<template>
    <div class="cart">
        <div class="content" v-if="isData">
            <ul class="list">
                <li >
                    <div class="item">
                        <div class="check-box">
                            <div @click="1">
                                <i :class="[0 ? 'self-icon-check-circle' : 'check']"></i>
                            </div>
							 <router-link tag="div" to="">
                                 <img src="../../common/images/shop/hold/hotsale1.jpg" >
                             </router-link>
						</div>
						<div class="goods-cont">
							<p>商品标题商品标题商</p>
							<p class="price"> 
								<i class="zd-icon-score"></i>积分 
								<span class="item-score">{{9999}}</span>
								<span v-if="0" class="item-price">+ ￥ <i>{{888}}</i> </span> 
							</p>
							<p>参考价：1233.00元 </p>
							<div class="btn-group">
								<a href="javascript:;" class="btn" @click="num<99 ? num++ : '' ">+</a>
								<span> {{num}} </span>
								<a href="javascript:;" class="btn" @click="num>0 ? num-- : '' ">-</a>
							</div>
						</div>    
                    </div>                    
                </li>
                <li >
                    <div class="item">
                        <div class="check-box">
                            <div @click="1">
                                <i :class="[0 ? 'self-icon-check-circle' : 'check']"></i>
                            </div>
							 <router-link tag="div" to="">
                                 <img src="../../common/images/shop/hold/hotsale1.jpg" >
                             </router-link>
						</div>
						<div class="goods-cont">
							<p>商品标题商品标题商</p>
							<p class="price"> 
								<i class="zd-icon-score"></i>积分 
								<span class="item-score">{{9999}}</span>
								<span class="item-price">+ ￥ <i>{{888}}</i> </span> 
							</p>
							<p>参考价：1233.00元 </p>
							<div class="btn-group">
								<a href="javascript:;" class="btn" @click="num<99 ? num++ : '' ">+</a>
								<span> {{num}} </span>
								<a href="javascript:;" class="btn" @click="num>0 ? num-- : '' ">-</a>
							</div>
						</div>    
                    </div>                    
                </li>

            </ul>
            <div class="bottom">
                <div class="select-all" @click="isAllSelected = !isAllSelected  ">
					<i :class="[isAllSelected ? 'self-icon-check-circle' : 'check']"></i>
					&nbsp;全选 
				</div>
				<div class="cart-total">
				    <div>合计:</div> 
                    <div>
                        <p> <span >10000</span> 积分</p>
					    <p><span >44.00</span> 元</p>
                    </div>
				</div>
				<div class="settlement" @click="submit">
					结算
				</div>
            </div>
        </div>
        <div class="none" v-else>
            <div class="status">
                <img src="../../common/images/shop/hold/cart1.jpg" >
                <p>购物车竟然是空的</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                title: '购物车',
                showIcon: true,
                icon: 'self-icon-headphones fa-lg',
                link: '/',
                showBottomTab: true
            },
            isData: true,
            isAllSelected: false,
            num: 1
        }
    },
    methods: {
        ...mapActions(['handleTitle']),
        submit() { console.log("跳转页面结算") } 
    },
    mounted() {
        this.handleTitle({
            title:  this.titleInfo.title,
            showIcon: this.titleInfo.showIcon,
            icon:   this.titleInfo.icon,
            link:   this.titleInfo.link,
            showBottomTab: this.titleInfo.showBottomTab
        })
    }
}
</script>



<style lang="scss" scoped>
@import "../../common/css/index.scss";

.check { 
    border: 2px solid $border-color-d;  /*no*/
    @include border-radius(50%);
    display: inline-block;
    width: 25px; height: 25px;
}
.cart {
    height: 100%;
    position: relative;
    font-size: $font-size-small; /*no*/
    .none {
        min-height: 800px;
        position: relative;
        .status {
            text-align: center;
            height: 150px;
            position: absolute;
            right: 0;
            left: 0;
            top: 40%;
            font-size: $font-size-min; /*no*/
            color: $text-color-l;
            img { @include border-radius(50%); margin-bottom: 30px; height: 95px; }
        }
    }
    .content {
        .list {
            li {
                @include color-background;
                margin-bottom: 6px;
                width: 100%;
                height: 150px;
            }
            .item {
                width: 100%;
                position: relative;
                @include flex-center;
                .check-box {
                    width: 30%;
                    min-width: 180px;
                    height: 100%;
                    padding-right: 50px;
                    @include flex-between; 
                    i { color: $text-color-orange; font-size: 1.5em; }
                    div {
                        text-align: center;
                        line-height: 150px; 
                        &:first-child { width: 80px; }
                        &:last-child { img { width: 100px; height: 100px; @include border-radius(0.5em); } }
                    }
                }
                .goods-cont {
                    max-width: 65%;
                    height: 100%;
                    >p {
                        @include no-wrap;
                        &:first-child { 
                            color: black; 
                            font-weight: 800;
                            font-size: $font-size-normal; /*no*/
                        }
                        &.price {
                            margin: 10px 0 5px; 
                            color: $text-color-orange;
                            .zd-icon-score { 
                                width: 23px;
                                height: 23px;
                                margin-right: 5px;
                                @include background-image-center;
                            }
                            .item-score, .item-price i { font-size: 1.4em }
                            .item-price { color: red }
                        }
                        &:nth-child(3) {
                            color: $text-color-l;
                            font-size: $font-size-min; /*no*/
                        }
                    }
                    .btn-group {
                        position: absolute;
                        bottom: 10px;
                        right: 20px;
                        text-align: center;
                        span {
                            display: inline-block;
                            font-size: $font-size-small; /*no*/ 
                            min-width: 60px;
                            height: 35px;
                            line-height: 35px;
                            border: 1px solid $border-color-d; /*no*/
                            vertical-align: 4px;
                        }
                        .btn {
                            font-size: $font-size-large;  /*no*/
                            display: inline-block;
                            height: 35px;
                            line-height: 35px;
                            width: 1.3em;
                            border: 1px solid $border-color-d; /*no*/
                            font-weight: 800;
                        }
                    }
                }
            }
        }
        .bottom {
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 95px;
            @include box-sizing;
            @include color-background;
            @include flex-between;
            line-height: 95px;
            color: $text-color-ll;
            .select-all {
                width: 20%;
                text-align: center;
                min-width: 130px;
                i { 
                    vertical-align: -8%; 
                    color: $text-color-orange; 
                    font-size: 1.5em; 
                }
                .self-icon-check { border:0; } 
            }
            .cart-total {
                max-width: 48%;
                overflow: hidden;
                @include flex-center;
                div {
                    min-width: 2.5em;
                    &:last-child {
                        line-height: 1.5em;
                        margin: 0 25px;
                        p {
                            @include no-wrap;
                            font-weight: 800;
                            font-size: $font-size-normal; /*no*/
                            &:first-child { color: $text-color-orange; }
                            &:nth-child(2) { color: red }
                        }
                    }
                }
                
            }
            .settlement {
                width: 30%;
                @include color-grad-btn;
            }
        }
    }   
}
</style>

