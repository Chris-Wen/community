<template>
    <div class="center">
        <div class="top">
            <div><img src="../../common/images/global/user.jpg" ></div>
            <div>
                <h2>{{uname}}</h2>
                <p><span>关注：{{attent}}</span> <span>粉丝：{{fans}}</span></p>
            </div>
        </div>
        <ul class="icon-group">
            <router-link  tag="li" to="/center/record"> 
                    <img src="../../common/images/icons/icon-sign.png" />
                    <p>签到</p> 
            </router-link>
            <router-link  tag="li" to="/center/msg"> 
                    <i class="badge">{{1}}</i>
                    <img style="margin-top: 15px;" class="spe-icon" src="../../common/images/icons/icon-msg.png" /> 
                    <p>消息</p>
            </router-link>
            <router-link  tag="li" to="/center/friend"> 
                    <img src="../../common/images/icons/icon-friend.png" /> 
                    <p>好友</p>
            </router-link>
            <router-link  tag="li" to="/center/recharge"> 
                    <img src="../../common/images/icons/icon-charge.png" /> 
                    <p>充值</p>
            </router-link>
            <router-link  tag="li" to="/center/mark"> 
                    <img src="../../common/images/icons/icon-article.png" /> 
                    <p>帖子</p>
            </router-link>
            <router-link  tag="li" to="/"> 
                    <img class="spe-icon" src="../../common/images/icons/icon-collect.png" /> 
                    <p>收藏</p>
            </router-link>
            <router-link  tag="li" to="/center/repository"> 
                    <img style="margin-top: 15px;" class="spe-icon" src="../../common/images/icons/icon-img.png" /> 
                    <p>仓库</p>
            </router-link>
            <router-link  tag="li" to="/"> 
                    <img src="../../common/images/icons/icon-set.png" /> 
                    <p>设置</p>
            </router-link>
            <router-link  tag="li" to="/"> 
                    <img  class="spe-icon"  src="../../common/images/icons/icon-draw.png" /> 
                    <p>我的抽奖</p>
            </router-link>
            <router-link  tag="li" to="/center/account"> 
                    <img   class="spe-icon"  src="../../common/images/icons/icon-change.png" /> 
                    <p>切换账号</p>
            </router-link>
        </ul>

        <div class="personal">
            <div class="score">
                <p>{{score}}</p>
                <p>我的积分</p>
            </div>
            <div class="change-goods">
                <p>已兑换商品</p>
                <ul>
                    <li></li>
                </ul>
                <a href="javascript:;">更多>>></a>
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
                title: "个人中心",
                showIcon: false
            },
            uname: "昵称昵称昵称昵称昵称昵称昵称昵称昵称昵称昵称昵称",
            score: 1132135123,    
            attent: 0,
            fans: 0,
        }
    },
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

.center {
    width: 100%;
    height: auto;
    .top {
        width: 100%;
        height: 200px;
        padding: 0 60px;
        @include box-sizing;
        @include big-background-image(url('../../common/images/global/bg-center.png'));
        @include flex-center;
        div {
            height: 125px;
            @include flex-colum;    
            justify-content: space-around;
            img {
                height: 125px;
                margin-right: 20px;
                @include border-radius(50%);
            }
            h2,p { 
                @include no-wrap; 
                width: 350px; 
                span { 
                    margin-right: 20px; 
                    color: $text-color-dark;
                }
            }
            
        }
    }
    .icon-group {
        width: 100%;
        height: 380px;
        @include box-sizing;
        @include color-background;
        margin: 20px 0;
        padding: 10px 0;
        display: flex;
        flex-flow: row wrap;
        li {
            width: 25%;
            text-align: center;
            position: relative;
            .badge {
                padding: 0 .3em;
                line-height: 1.3em;
                position: absolute;
                @include border-radius(1em);
                background: red;
                color: #fff;
                top: 0;
                left: 105px;
            }
            img {
                width: auto;
                height: 42px;
                margin-top: 20px;
            }
            .spe-icon {
                width: 42px;
                height: auto;
            }
            p {
                position: absolute;
                margin: auto;
                left: 0;
                right: 0;
                bottom: 30px;
                color: $text-color-dark;
            }
        }
    }
    .personal {
        width: 100%;
        height: 310px;
        @include color-background;
        .score {
            width: 100%;
            height: 115px;
            @include box-sizing;
            border-bottom: 1px solid #ebebeb; /*no*/
            font-size: $font-size-normal;    /*no*/
            text-align: center;
            padding: 25px 0;
            p:first-child { margin-bottom: 10px; color: black}
            p:last-child {
                color: $text-color-orange;
                font-weight: 800;
            }
        }
        .change-goods {
            padding: 10px 0;
            >p {
                text-indent: 2em;
                font-size: $font-size-small;  /*no*/
                color: $text-color-dark;
            }
            >a {
                float: right;
                margin-right: 2em;
                text-decoration: underline;
            }
            ul {
                width: 100%;
                height: 100px;
                margin: 10px 0;
            }
        }
    }
}
</style>
