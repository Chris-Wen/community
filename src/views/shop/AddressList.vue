<template>
    <div class="address-list">
        <!-- 订单信息 -->
        <div class="main">
            <div class="top"> 选择收货地址 </div>
            <div class="address-info">
                <ul v-if="addressData">
                    <li v-for="(item, index) in addressData" :key="index" @click="backToOrderPage(item.aid)">
                        <p><em v-if="item.selected == 1">[默认地址]</em><span>{{item.name}}</span>&nbsp;&nbsp;&nbsp;<span>{{item.phone}}</span></p>
                        <p>{{item.province + item.city + item.area + item.address}}</p>
                    </li>
                </ul>
                <div style="background: #fff; text-align:center"  v-if="!addressData && addressCheck">
                    <img :src="NON_ICON" >
                    <p style="margin: .5em 0 1em; color: #ccc">无地址记录</p>
                </div>
            </div>
            <router-link tag="p"  to="/shop/new_address" class="color-grad-btn"> ＋ 新建地址 </router-link>
        </div>
        
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                title: '选择地址',
                showIcon: false,
                showBottomTab: true
            },
            addressData: '',
            addressCheck: false        //成功获取地址请求返回值
        }
    },
    methods: {
        ...mapActions(['handleTitle']),
        backToOrderPage(address_id) {           //选择地址
            var url = this.$route.query.redirect
            url += (url.indexOf('address_id')==-1) ? ("&address_id=" + address_id) : ''
            this.$router.push(url)
        },
    },
    created() {
        this.axios.get("/Mall/getUserAddress")
            .then(response => {
                if (response.code == 200 && response.msg== "succ") {
                    this.addressData = response.data;
                    this.addressCheck = true
                } 
        })
    },
    mounted() {
        this.handleTitle({
            title:  this.titleInfo.title,
            showIcon: this.titleInfo.showIcon,
            showBottomTab: this.titleInfo.showBottomTab
        })
    }
}
</script>


<style lang="scss" scoped>
@import "../../common/css/index.scss";

.address-list {
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
                li {
                    em { color: $text-color-orange; margin-right: 1em; font-size: $font-size-min; /*no*/  }

                 }
            }
        }

    }
    .color-grad-btn { height: 65px; margin-top: 2em; line-height: 65px; font-size: $font-size-normal; /*no*/ } 
}
</style>

