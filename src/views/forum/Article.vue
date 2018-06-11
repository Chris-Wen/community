<template>
    <div class="article">
        <div class="title">
            <h1>文章标题文章标题文章标题文章标题文章</h1>
            <p>来源：{{'XXXX'}}  &nbsp;&nbsp;作者： {{'XXXX'}}</p>
        </div>
        <div class="content">
            <div class="article-content" v-html="html"></div>
            <!-- 点赞 -->
            <div class="enjoy">
                <div :class="['thumbs', {'active': isThumbs }]" @click="handleThumbs"><i class="self-icon-thumbs-up"></i> </div>
                <p>{{thumbsNum}}</p>
            </div>
        </div>

        <!-- 评论 -->
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
        <!-- 评论输入栏 -->
        <div class="comment-input">
            <textarea ref="textarea" v-model="commentInput" placeholder="期待你的评论~" style="height: auto" @input='setHeight'></textarea> <div>发送</div>
        </div>
    </div>    
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                title: '精品推荐',
                showIcon: false
            },
            html: ` <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro optio sequi cumque neque placeat maiores, nam, rerum possimus quis, officiis consectetur! Eveniet, rerum quod modi quis ullam amet illo voluptas.</p>
                    <br>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, itaque pariatur odio maiores saepe cupiditate ut ipsam eius voluptatem voluptates expedita explicabo perferendis, dolorum aspernatur corporis mollitia nisi neque temporibus.</p>
                    <img src="http://221.123.178.232/smallgamesdk/Public/Uploads/20180109173040544.jpg" alt="">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus sit iste quam explicabo, itaque corrupti porro. Magni ad velit quia perferendis quas voluptate quam, veniam rem accusantium ea voluptates quasi.</p>`,
            isThumbs: false,
            thumbsNum: 12334,
            commentInput: ''
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        setHeight() {
            autoTextAreaHeight(this.$refs.textarea)
        },
        handleThumbs() {
            console.log('点赞')
            this.isThumbs = !this.isThumbs
            this.thumbsNum = this.isThumbs ? this.thumbsNum+1 : this.thumbsNum-1
        }, 
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
        div {
            margin: 10px 0 20px;
            color: $text-color-dark;
            max-height: 1em;
            font-size: $font-size-min;  /*no*/
            span:nth-child(2) { margin: 0 1em }
        }
    }
    // 文章内容
    .content {
        width: 100%;
        @include color-background;
        padding: 40px 60px;
        text-align: justify;
        @include box-sizing;
        >img {
            max-width: 100%;
            margin:　1em 0;
        }
        .enjoy {
            margin-top: 40px;
            text-align: center;
            color: $text-color-dark;
            @include color-background;
            .thumbs {
                width: 60px;
                height: 60px;
                @include border-radius(50%);
                background: #f1f1f1;
                line-height: 60px;
                margin: 20px auto;
                i { font-size: 1.5em }
            }
            .active { color: $text-color-orange;  }
            .active + p { color: $text-color-orange }
        }
    }
    // 评论
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
        @include box-sizing;
        display: flex;
        textarea {
            @include box-sizing;
            width: 100%;
            min-height: 3em;
            border: 1px solid $border-color-d;  /*no*/
            line-height: 1.5em;
            padding: 0.5em 1em 0;
        }
        >div {
            margin-left: 10px;
            font-weight: 800;
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
