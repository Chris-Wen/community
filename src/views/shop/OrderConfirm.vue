<template>
    <div class="order-confirm" v-if="data">
        <!-- 支付弹窗 -->
        <div v-if="paymentToastShow" class="mask payment-mask" @click.self="canclePayment">
            <div class="payment-toast">
                <div class="large-font-size">收银台</div>
                <!-- 抽奖奖品信息 -->
                <div class="item-price" v-if="$route.query.prize_record_id">
                    <font color="red" >￥<span class="large-font-size">12</span> </font>
                </div>
                <!-- 积分商品信息 -->
                <div class="item-price" v-else>
                    <i class="zd-icon-score"></i> <span>{{8888}}</span> <span class="large-font-size">+ ￥{{888}}</span>
                </div>
                <ul class="pay-method">
                    <li class="flex-between" @click.stop="paymethod=1">
                        <span><img src="../../common/images/shop/icons/alipay.jpg" /> 支付宝支付</span> <i :class="paymethod==1 ? 'self-icon-check-circle' : 'self-icon-circle-o'"></i>
                    </li>
                    <li class="flex-between" @click.stop="paymethod=2">
                        <span><img src="../../common/images/shop/icons/wechat.jpg" /> 微信支付</span> <i :class="paymethod==2 ? 'self-icon-check-circle' : 'self-icon-circle-o'"></i>
                    </li>
                </ul>
                <div class="payment color-grad-btn" @click="showPayment">立即付款</div>
            </div>
        </div>
        <!-- 订单信息 -->
        <div class="main">
            <div @click="selectAddress" class="top"> 选择收货地址 <i class="self-icon-angle-right"></i></div>
            <div class="address-info">
                <ul v-if="data.address">
                    <li>
                        <em>姓名：</em> <span>{{data.address.name}}</span>
                    </li>
                    <li>
                        <em>手机：</em><span>{{data.address.phone}}</span>
                    </li>
                    <li>
                        <em>地址：</em> <div>{{data.address.province + data.address.city + data.address.area + data.address.address}}</div>
                    </li>
                </ul>
                <div style="color:#666; text-align:center" v-if="data.order && !data.address">
                    <img :src="NON_ICON" >
                    <p>还没有地址默认收货地址！</p> 
                </div>
            </div>
            <div class="goods-info">
                <ul v-if="$route.query.prize_record_id">
                   <li v-if="data.order">
                        <div><img :src="HOST + data.order.logo" /></div>
                        <div>
                            <h2>{{data.order.prize}}</h2>
                            <p class="refer">{{data.order.describe}}</p>
                            <!-- <p class="refer">市场参考价：{{8888 +'元'}}</p> -->
                            <span> x 1 </span>
                        </div>
                    </li>
                </ul>
                <ul v-if="false">
                    <li v-for="(item, key) in data.order" :key="key">
                        <div><img :src="item.pic" /></div>
                        <div>
                            <h2>{{item.title}}</h2>
                            <p><i class="zd-icon-score"></i>积分 <span> 8888</span> <span>+ ￥ {{5000}}</span> </p>
                            <p class="refer">市场参考价：{{8888 +'元'}}</p>
                            <span> x {{item.number}} </span>
                        </div>
                    </li>
                </ul>
                <p v-if="$route.query.prize_record_id">运费： <span>12元</span></p>
            </div>
        </div>
        <div class="btn-pay color-grad-btn" @click="payNow">立即支付</div>
        
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
                address: '',
                order: ''
            },      
            paymentToastShow: true,
            paymethod: 1,       //付款方式  1：支付宝 2：微信
        }
    },
    methods: {
        ...mapActions(['handleTitle']),
        submit() { console.log("跳转页面结算") },
        selectAddress() {           //选择地址
            if (this.$route.query.prize_record_id) {         //奖品兑换通道
                this.$router.push({
                    path: '/shop/address_list',
                    query: {redirect: this.$route.fullPath} 
                })
            }
        },
        canclePayment() {           //取消支付弹窗
            this.paymentToastShow = false
        },
        showPayment() {
            this.paymentToastShow = true
        },
        payNow() {          //立即支付动作  支付窗口弹窗动作
            console.log("支付窗口弹窗动作")
            if (!this.data.address) return Toast('无收货地址，无法提交订单') 
            //  兑奖情况提交订单
            if (this.$route.query.prize_record_id) {
                
            } else {            //积分商品付款

            }
            this.paymentToastShow = true
        }
    },
    created() {
        let prize_id = this.$route.query.prize_record_id
        let address_id = this.$route.query.address_id
        if (prize_id) {
            var url = "/payment/getOrderInfo?prize_id="+ prize_id
            url += address_id ? ('&address_id=' + address_id) : ''
            this.axios.get(url).then( response => {
                    this.data = response.data
                })
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
    .payment-toast {
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #fff;
        text-align: center;
        .large-font-size { font-size: 1.45em; font-weight: 800;}
        >div {
            &:first-child { height: 75px; font-weight: 800; line-height: 75px;}
            &.item-price {
                height: 125px;
                line-height: 125px;
                border-top: 1px solid $text-color-ll;  /*no*/
            }
        }
        .pay-method {
            border-top: 8px solid $text-color-ll;        /*no*/
            border-bottom: 8px solid $text-color-ll;        /*no*/
            img { width: 66px; margin-right: 1.5em; }
            li {
                padding: 0 60px;
                height: 100px;
                line-height: 100px;
                &:first-child { border-bottom: 1px solid $text-color-ll; /*no*/}
            }
            i {
                font-size: 1.35em;
                color: $text-color-ll;
                &.self-icon-check-circle { color: orange; }
            }
        }
        .payment { margin: 0; }
    }
}
</style>

