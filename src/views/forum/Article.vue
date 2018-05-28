<template>
    <div class="article">
        <div class="title">
            <h1>文章标题文章标题文章标题文章标题文章</h1>
            <p>来源：{{'XXXX'}}  &nbsp;&nbsp;作者： {{'XXXX'}}</p>
        </div>
        <div class="content">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro optio sequi cumque neque placeat maiores, nam, rerum possimus quis, officiis consectetur! Eveniet, rerum quod modi quis ullam amet illo voluptas.</p>
            <br>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, itaque pariatur odio maiores saepe cupiditate ut ipsam eius voluptatem voluptates expedita explicabo perferendis, dolorum aspernatur corporis mollitia nisi neque temporibus.</p>
            <img src="http://221.123.178.232/smallgamesdk/Public/Uploads/20180109173040544.jpg" alt="">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus sit iste quam explicabo, itaque corrupti porro. Magni ad velit quia perferendis quas voluptate quam, veniam rem accusantium ea voluptates quasi.</p>
        </div>
        <div class="comment">
            <p class="comment-title">用户评论：</p>
            <ul class="comment-list">
                <li>
                    <div class="avatar">
                        <img :src="preSrc + '20180109172657362.jpg'" alt="">
                    </div>
                    <div class="item">
                        <span>{{'2018-05-28 17:12'}}</span>
                        <p>昵称昵称昵称昵称</p>
                        <div>
                            评论内容评论内容评论内容
                            评论内容评论内容评论内容
                            评论内容评论内容评论内容
                        </div>
                    </div>
                </li>
                <li>
                    <div class="avatar">
                        <img :src="preSrc + '20180109172657362.jpg'" alt="">
                    </div>
                    <div class="item">
                        <span>{{'2018-05-28 17:12'}}</span>
                        <p>昵称昵称昵称昵称</p>
                        <div>
                            评论内容评论内容评论内容
                            评论内容评论内容评论内容
                            评论内容评论内容评论内容
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="comment-input">
            <input type="text" placeholder="期待你的评论~"> <span>发送</span>
        </div>
    </div>    
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                title: '泛游戏',
                showIcon: false
            }
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']) 
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
@import "../../common/css/index.scss";

.article {
    @include box-sizing;
    font-size: $font-size-small;  /*no*/
    .title {
        padding: 0 60px;
        text-align: center;
        border-bottom: 1px solid $text-color-orange;  /*no*/
        h1 { 
            margin-top: 35px;
            text-align: center; 
            line-height: 1.3em;
            max-height: 2.5em;   
        }
        >p {
            margin: 10px 0 20px;
            color: $text-color-dark;
            max-height: 1em;
            font-size: $font-size-min;  /*no*/
        }
    }
    .content {
        @include color-background;
        padding: 40px 60px;
        text-align: justify;
        img {
            width: 100%;
            margin:　1em 0;
        }
    }
    .comment {
        .comment-title {
            color: $text-color-orange;
            font-weight: 800;
            text-indent: 2em;
            line-height: 3em;
        }
        .comment-list {
            @include color-background;
            li {
                border-bottom: 1px solid $text-color-orange-d;  /*no*/
                padding: 15px 70px 35px;
                display: flex;
                .avatar {
                    text-align: right;
                    img { width: 35px; height: 35px; @include border-radius(50%); margin-right: 10px; }
                }
                .item {
                    line-height: 1.3em;
                    >span { float: right; font-size: $font-size-min;  /*no*/ color: $text-color-l; line-height: 1.5em; }
                    >p { line-height: 1.5em; margin-bottom: 15px; }
                    >div { color: $text-color-l; text-align: justify }
                }
            }
        }
    }
    .comment-input {
        padding: 35px 20px 50px;
        input {
            @include box-sizing;
            margin-right: 10px;
            width: 70%;
            height: 3em;
            text-indent: 1em;
            border: 1px solid $border-color-d;  /*no*/
        }
        >span {
            font-weight: 800;
            display: inline-block;
            width: 25%;
            min-width: 6em;
            height: 3em;
            line-height: 3em;
            text-align: center;
            color: white;
            background: $text-color-orange;
        }
    }
}
</style>

