<template>
    <div class="recharge-page">
        <form >
            <div>
                <label for="account">充值账号：</label>
                <input class="border" id="account" type="text">
            </div>
            <div>
                <label>账号类型：</label><div class="border">通行证</div>
            </div>
            <div>
                <label for="account">充值类型：</label>
                <div class="flex-between">
                    <span @click="toggleStatus('coin')" :class="['border', { active: params.type=='coin'}]">X币</span> <span @click="toggleStatus('score')" :class="['border', { active: params.type=='score'}]">商城积分</span>
                </div>
            </div>
            <div>
                <label>充值金额：</label>
                <div class="flex-between">
                    <div @click="toggleStatus(100)" :class="{ active: params.amount==100}">100</div> <div @click="toggleStatus(200)" :class="{ active: params.amount==200}">200</div> <input type="text" placeholder="其他面额">
                </div>
            </div>
            <div>
                <label>充值方式：</label>
                <ul>
                   <li  @click="toggleStatus('alipay')" :class="{ active: params.method=='alipay'}">
                       <span></span> 支付宝支付
                    </li> 
                   <li  @click="toggleStatus('wechat')" :class="{ active: params.method=='wechat'}">
                       <span></span> 微信支付
                    </li> 
                   <li  @click="toggleStatus('bank')" :class="{ active: params.method=='bank'}">
                       <span></span> 银行卡支付
                    </li> 
                </ul>
            </div>
        </form>
        <div class="color-grad-btn">立即充值</div>
    </div>    
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                title: '充值',
                showIcon: false
            },
            params: {
                type: 'coin',
                amount: 100,
                method: 'alipay'
            }
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        toggleStatus(index) {
            if (index== 'coin' || index == 'score') {
                this.params.type = index
            } else if (typeof(index) == 'number') {
                this.params.amount = index
            } else {
                this.params.method = index
            }
            
        }
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
@import "../../../common/css/index.scss";

.recharge-page {
    font-size: $font-size-small;  /*no*/
    min-height: 950px;
    @include color-background; 
    .border { border: 1px solid $border-color-d;  /*no*/ }
    form {
        padding: 60px 75px;
        .active { 
            border: 1px solid $text-color-orange !important;  /*no*/  
            color: $text-color-orange;    
        }
        >div {
            margin-bottom: 20px;
            display: flex;
            line-height: 2em;
            label { width: 5.5em; min-width: 5.5em; font-weight: 600; color: $text-color-dark; font-size: 1.1em; }
            >div { width: 100%; text-align: center }
            &:first-child { input { width: 100%; text-align: center } }
            &:nth-child(2) { div{ text-align: center } }
            &:nth-child(3) { span { display: block; width: 48% }  }
            &:nth-child(4) { 
                >div {
                    width: 100%;
                    div,input { width: 30%; 
                        border: 1px solid $border-color-d;  /*no*/ 
                        text-align: center;
                    } 
                }                
            }
            &:nth-child(5) {
                line-height: 75px; 
                ul {
                    width: 100%;
                    li {
                        border: 1px solid $border-color-d;  /*no*/
                        height: 75px;
                        margin-bottom: 10px;
                        span {
                            display: inline-block;
                            width: 75px;
                            height: 70px;
                            vertical-align: middle;
                            margin: 0 10px;
                        }
                        &:first-child span { @include background-image(url('../../../common/images/icons/alipay.jpg')) }
                        &:nth-child(2) span { @include background-image(url('../../../common/images/icons/icon-wechat.jpg')) }
                        &:nth-child(3) span { 

                            @include background-image(url('../../../common/images/icons/icon-bank.jpg')) 
                        }
                    }
                }
            }
        }
    }
    .color-grad-btn {
        width: 31.25%;
        min-width: 200px;
        height: 60px;
        line-height: 60px;
        font-size: $font-size-normal;  /*no*/
        margin: 0 auto;
        font-weight: 800;
    }
}
</style>

