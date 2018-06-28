<template>
    <div class="order-confirm" v-if="data">
        <!-- 支付弹窗 -->
        <div v-if="paymentToastShow" class="mask payment-mask" @click="canclePayment">
            <div class="payment-toast">
                <div>收银台</div>
                <div class="item-price">
                    <i class="zd-icon-score"></i> <span>{{8888}}</span> <span>+ ￥{{888}}</span>
                </div>
                <ul>
                    <li>
                        <img src="" /> <span>支付宝支付</span> <i class="self-icon-check-o"></i>
                    </li>
                    <li>
                        <img src="" /> <span>微信支付</span> <i class="self-icon-check-o"></i>
                    </li>
                </ul>
                <div class="payment color-grad-btn" @click="showPayment">立即付款</div>
            </div>
        </div>
        <!-- 订单信息 -->
        <div class="main">
            <div @click="selectAddress" class="top"> 选择收货地址 <i class="self-icon-angle-right"></i></div>
            <div class="address-info">
                <ul v-if="true">
                    <li>
                        <em>姓名：</em> <span>{{'王尼玛'}}</span>
                    </li>
                    <li>
                        <em>手机：</em><span>{{'18723456411'}}</span>
                    </li>
                    <li>
                        <em>地址：</em> <div>浙江省杭州市滨江区 滨盛路17777号萧宏大厦19楼浙江省杭州市滨江区 滨盛路17777号萧宏大厦19楼</div>
                    </li>
                </ul>
                <div v-else>还没有地址呦！去新建</div>
            </div>
            <div class="goods-info">
                <ul>
                    <li v-for="(item, key) in data.goods" :key="key">
                        <div><img :src="item.pic" /></div>
                        <div>
                            <h2>{{item.title}}</h2>
                            <p><i class="zd-icon-score"></i>积分 <span> 8888</span> <span>+ ￥ {{5000}}</span> </p>
                            <p class="refer">市场参考价：{{8888 +'元'}}</p>
                            <span> x {{item.number}} </span>
                        </div>
                    </li>
                </ul>
                <p>运费： <span>{{'15元'}}</span></p>
            </div>
        </div>
        <div class="btn-pay color-grad-btn">立即支付</div>
        
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                title: '订单确认',
                showIcon: true,
                icon: 'self-icon-headphones fa-lg',
                link: '/',
                showBottomTab: true
            },
            data: {
                goods: [
                    {id: 1, price: 123, number: 1, score: 1000 , title: '银杏叶片', pic: 'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172657362.jpg'},
                    {id: 2, price: 9.99, number: 19, score: 2000 , title: '伊利股份', pic: 'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172657362.jpg'},
                ]
            },       
            paymentToastShow: false
        }
    },
    methods: {
        ...mapActions(['handleTitle']),
        submit() { console.log("跳转页面结算") },
        selectAddress() {           //选择地址

        },
        canclePayment() {           //取消支付弹窗
            this.paymentToastShow = false
        },
        showPayment() {
            this.paymentToastShow = true
        }
    },
    mounted() {
        this.handleTitle({
            title:  this.titleInfo.title,
            showIcon: this.titleInfo.showIcon,
            icon:   this.titleInfo.icon,
            link:   this.titleInfo.link,
            showBottomTab: this.titleInfo.showBottomTab
        })
    },
    watch: {

    }
}
</script>


<style lang="scss" scoped>
@import "../../common/css/index.scss";

.order-confirm {
    width: 100%;
    font-size: $font-size-small;  /*no*/
    .main {
        width: 100%;
        @include box-sizing;
        .top { height: 85px; line-height: 85px; i{ float: right; font-size: 1.3em } padding: 0 70px; }
        .address-info {
            @include color-background;
            padding: 30px 70px;
            line-height: 1.4em;
            margin-bottom: 18px;
            ul {
                text-align: justify;
                em { display:inline-block; width: 3em; min-width: 3em;  }
                li {display: flex; }
            }
        }
        .goods-info {
            >p { 
                padding: 0 70px; 
                @include color-background; 
                margin-top: 5px; 
                line-height: 2em;
                span { float: right; }
            }
            ul {
                li {
                    padding: 18px 70px;
                    @include color-background;
                    @include box-sizing;
                    display: flex;
                    // border-bottom: 1px solid $border-color-d;  /*no*/
                    div {
                        height: 100px;
                        &:first-child {
                            margin-right: 50px;
                            img { width: 100px; @include border-radius(0.5em) }
                        }
                        &:last-child {
                            position: relative;
                            width: 100%;
                            @include box-sizing;
                            h2 { @include no-wrap; }
                            p {
                                i {  }
                                span {
                                    &:nth-of-type(1) {
                                        color: $text-color-orange;
                                    }
                                }
                            }
                            .refer { color: $text-color-l; font-size: $font-size-min; /*no*/ }
                            >span { 
                                position: absolute;
                                right: 0;
                                margin: auto;
                                top: 0;
                                bottom: 0;
                                line-height: 100px;
                                color: red;
                            }
                        }
                    }
                }
            }
        }
    }
    .color-grad-btn { height: 65px; margin-top: 15px; line-height: 65px; font-size: $font-size-normal; /*no*/ } 
}
</style>

