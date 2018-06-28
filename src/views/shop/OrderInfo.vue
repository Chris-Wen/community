<template>
    <div class="order-info">
        <div class="status">
            <div><em>订单状态:</em> {{'配送中'}}</div>
            <div><em>物流单号:</em> {{12345648877845456}}</div>
            <a href="#" class="needsClick">查看物流</a>
        </div>
        <div class="address-info">
            <h1>收货信息：</h1>
            <ul>
                <li>
                    <div>姓名：</div>
                    <div>{{'卡卡西'}}</div>
                </li>
                <li>
                    <div>手机：</div>
                    <div>{{'18845456123'}}</div>
                </li>
                <li>
                    <div>地址：</div>
                    <div>{{'火影村马拉多纳西康路欧洲印象，复制忍者超查克拉无敌天才社区1888栋B座19楼1901号'}}</div>
                </li>
            </ul>
        </div>
        <div class="goods-info">
            <div>
                <img src="http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172503958.jpg" alt="图片">
            </div>
            <div>
                <div>
                    <h2>商品标题商品标题商品标题商品标题商品标题</h2>
                    <div>
                        <span class="zd-icon-score"></span> 积分 <em>8888</em>  
                        <span class="price" v-if="true"> + ￥ <em>555</em></span>
                    </div>
                    <span class="amount">x 1</span>
                </div>
                <p>订单号: 124546456464654444444</p>
            </div>
        </div>
        <div class="payment-info">
            <div>积分： <span>88888 积分</span></div>
            <div>实付款(含运费)：<span>8888 元</span></div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                title: '订单详情',
                showIcon: true,
                icon: 'self-icon-headphones fa-lg',
                link: '/',
                showBottomTab: false
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
}
</script>


<style lang="scss" scoped>
@import "../../common/css/index.scss";

.order-info {
    font-size: $font-size-small;  /*no*/
    position: relative;
    .status {
        @include color-background;
        height: 100px;
        padding: 20px 60px;
        @include box-sizing;
        position: relative;
        >a {  
            position: absolute;
            top: 35%;
            right: 60px;
            border: 1px solid $text-color-orange; /*no*/ 
            color: $text-color-orange;
            padding: 0 0.5em;
            line-height: 1.3;
            font-size: $font-size-min;  /*no*/
            @include border-radius(1em);
            @include expand-click;
        }
        div {
            color: $text-color-dark;
            em { font-size: $font-size-normal; /*no*/ font-weight: 800; color: black}
            &:nth-of-type(1) { margin-bottom: 5px; }
        }
    }
    .address-info {
        @include color-background;
        padding: 20px 60px;
        margin: 8px 0;
        ul {
            margin-top: 10px;    
            li {
                display: flex;
                div {
                    line-height: 1.3;
                    &:nth-child(1) {
                        width: 3em;
                        min-width: 3em;
                    }
                    text-align: justify;
                }
            }
        }
    }
    .goods-info {
        @include color-background;
        padding: 20px 60px;
        display: flex;
        align-items: center;
        >div {
            &:first-child {
                width: 150px;
                img { width: 100px; height: 100px; @include border-radius(1em); }
                min-width: 150px;
            }
            &:nth-child(2) {
                >div {
                    margin-bottom: 5px;
                    border-bottom: 1px solid $border-color-d; /*no*/
                    position: relative;
                    div {
                        margin: 10px 0;
                        color: $text-color-orange;
                        em { font-size: $font-size-large;  /*no*/ }
                        .price { color: red; }
                    }
                    >span { position: absolute; right: 0; color: red; bottom: 20%; }
                }
                >p {
                    color: $text-color-dark;
                    font-size: $font-size-min;  /*no*/
                    
                    line-height: 2em;
                }
            }
        }
    }
    .payment-info {
        margin: 8px 0;
        @include color-background;
        height: 100px;
        padding: 20px 60px;
        @include box-sizing;
        div {
            color: $text-color-dark;
            &:first-child { 
                margin-bottom: 10px; 
                span { color: $text-color-orange; }
            }
            span { float: right; color: red; }
        }
    }
}
</style>

