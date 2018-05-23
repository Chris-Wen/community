<template>
    <div class="strategy">
        <div class="top">
            <img src="../../common/images/shop/hold/point_img.jpg" alt="">
        </div>    
        <ul class="link-group">
            <router-link tag="li" to="/">
                <img src="../../common/images/shop/icons/icon_point1.jpg" alt="">
                <div>
                    <p>签到</p>
                    <p>每天可签到一次，每次8积分</p>
                </div>
            </router-link>
            <router-link tag="li" to="/">
                <img src="../../common/images/shop/icons/icon_point2.jpg" alt="">
                <div>
                    <p>玩游戏</p>
                    <p>进入游戏获取积分</p>
                </div>
            </router-link>
            <router-link tag="li" to="/">
                <img src="../../common/images/shop/icons/icon_point3.jpg" alt="">
                <div>
                    <p>邀请好友</p>
                    <p>邀请好友可获得积分，每个100积分</p>
                </div>
            </router-link>
            <router-link tag="li" to="/">
                <img src="../../common/images/shop/icons/icon_point4.jpg" alt="">
                <div>
                    <p>其他积分奖励活动</p>
                    <p>点一点，可能有惊喜哦</p>
                </div>
            </router-link>
        </ul>
    </div>    
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                title: '积分攻略',
                showIcon: false,
                showBottomTab: true
            }
        }
    },
    methods: {
        ...mapActions(['handleTitle']),
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

.strategy {
    .top {
        margin-bottom: 8px;
        img { width: 100%; max-height: 240px; overflow: hidden; }
    }
    .link-group { 
        li { 
            width: 100%;
            height: 150px;
            margin-bottom: 8px;
            @include flex-center;
            @include box-sizing;
            @include color-background;
            >img {
                height: 90px;
                margin:　0 30px 0 60px;
            }
            div {
                p {
                    &:first-child {
                        font-size: $font-size-normal; /*no*/
                        font-weight: 800;
                        margin-bottom: 10px;
                    }
                    &:last-child { color: $text-color-l }
                }
            }
        }
    }
}
</style>
