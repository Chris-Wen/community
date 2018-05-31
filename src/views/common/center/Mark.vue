<template>
    <div class="mark-page">
        <div class="flex-around tab">
            <div :class="{ active: tab=='theme' }"  @click="changeTab('theme')">主题</div>
            <div :class="{ active: tab=='reply' }" @click="changeTab('reply')">回复</div>
        </div>
        <ul v-if="tab=='reply'" class="list">
            <li v-for="(item, index) in data" :key="index">
                <div>
                    <div class="item-top">
                        <img :src="item.avatar" />    
                         {{item.nickname}}
                    </div> 
                    <p>回复：{{item.reply}}</p>   
                    <p>原帖：{{item.title}}</p>
                    <div class="item-content">
                        来自：{{item.form}}论坛   
                        <span>{{item.time}}</span>
                    </div>
                </div>
            </li>
        </ul>
        <ul class="list" v-else-if="tab='theme'"> 
            <li v-for="(item, index) in data" :key="index">
                <div>
                    <div class="item-top theme">
                        <img :src="item.avatar" />    
                         {{item.nickname}}
                        <span><i class="self-icon-bubbles2"></i> {{111}}</span>
                        <span><i class="self-icon-eye"></i> {{111}}</span>
                    </div> 
                    <p>回复：{{item.reply}}</p>   
                    <p>原帖：{{item.title}}</p>
                    <div class="item-content">
                        来自：{{item.form}}论坛   
                        <span>{{item.time}}</span>
                    </div>
                </div>
            </li>
        </ul>
        <div v-if="!data" class="none">
            <img src="../../../common/images/icons/none.jpg">
            <p>什么都没有</p>
        </div>
    </div>    
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                title: '我的收藏/帖子',
                showIcon: false
            },
            tab: 'theme',
            data: '',
            data1: [
                { 
                    avatar:　'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172657362.jpg',
                    nickname: '我是谁我在哪', 
                    reply: '我不知道你在说啥我不知道你在说啥我不知道你在说啥',
                    title: '不知道是什么帖子的标题',
                    form: '不知道哪来的帖子',
                    time: '2018-05-30'
                },
                { 
                    avatar:　'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172657362.jpg',
                    nickname: '我是谁我在哪', 
                    reply: '我不知道你在说啥我不知道你在说啥我不知道你在说啥',
                    title: '不知道是什么帖子的标题',
                    form: '不知道哪来的帖子',
                    time: '2018-05-30'
                }
            ]
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        changeTab (index) {
            if (this.tab==index) return;
            this.tab = index
            this.data = this.data1      
            // this.data = index=='reply' ? this.data1 : ''
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

.mark-page {
    font-size: $font-size-small;  /*no*/
    @include color-background;
    min-height: 950px;
    .tab {
        height: 70px;
        @include box-sizing;
        border-bottom: 1px solid $border-color-d;  /*no*/
        font-size: $font-size-normal;  /*no*/
        div {
            height: 100%;
            width: 50%;
            line-height: 70px;
            @include box-sizing;
            text-align: center;
            &.active {
                color: $text-color-orange;
                border-bottom: 1px solid $text-color-orange-d;  /*no*/
                font-weight: 800;
            }
        }
    }
    .list { 
        li {
            border-bottom: 1px solid $text-color-orange-d;  /*no*/
            >div {
                margin: 25px 85px;
                height: 160px; 
                @include box-sizing;
                .item-top {
                    color: black;
                    margin-bottom: 20px;
                    font-weight: 800; 
                    img { vertical-align: middle; width: 35px; @include border-radius(50%); margin-right: 10px; display: inline-block; }
                }
                .theme {
                    span { 
                        font-size: $font-size-min;  /*no*/
                        font-weight: normal;
                        float: right; margin-left: 30px; 
                        i { color: $text-color-orange; font-size: $font-size-small;  /*no*/ }
                    }
                }
                p { line-height: 1.5em;  @include no-wrap; }
                .item-content {
                    span { float: right; font-size: $font-size-min; /*no*/ }
                }
            }
        }
    }
    .none {
        padding-top: 75px;
        text-align: center;
        color: $text-color-ll;  /*no*/
        img { width: 165px; }
        p { margin-top: 15px; }
    }
}
</style>

