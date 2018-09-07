<template>
    <div class="fiction-info">
        <div class="top">
            <div>
                <img src="../../common/images/fiction/fiction.jpg" />
            </div>
            <div>
                <p>作者：{{'天残土豆'}}</p>
                <p><span>更新：{{'2018-05-05 15:30'}}</span></p>
                <p>类别：{{'同人'}}</p>
                <p>状态：{{'连载中'}}</p>
                <P>最新章节：{{123}}</P>
                <!-- <p>总字数：{{'11万字'}}</p> -->
            </div>
        </div>
        <div class="intro article-content">
            小说简介小说简介小说简介小说简介小说简介小说简介
            小说简介小说简介小说简介小说简介小说简介小说简介
            小说简介小说简介小说简介小说简介小说简介小说简介
        </div>
        <div class="record">
            <span><i class="self-icon-eye"></i>点击：</span>{{132151}}
            <span><i class="self-icon-star-full"></i>收藏：</span>{{123333}}
        </div>
        <div class="fiction-list">
            <h2>最新章节 &nbsp;&nbsp;&nbsp;&nbsp;<span>更新：{{'2018-05-05 15:30'}}</span> </h2>
            <ul>
                <router-link tag="li" :to="'/fiction/chapter/0'">第1233章：谁知道是啥标题</router-link>
                <router-link tag="li" :to="'/fiction/chapter/0'">第1章：爱谁谁</router-link>
                <router-link tag="li" :to="'/fiction/chapter/0'">第2章：爱谁谁</router-link>
                <router-link tag="li" :to="'/fiction/chapter/0'">第3章：爱谁谁</router-link>
                <router-link tag="li" :to="'/fiction/chapter/0'">第4章：爱谁谁</router-link>
            </ul>
            <router-link tag="p" :to="'/fiction/novel_list/1'" class="more" >更多 >></router-link>
        </div>
        <div class="comment">
            <h2>读者评论</h2>
            <ul>
                <li v-for="(item, index) in data" :key="index">
                    <div><img src="../../common/images/fiction/fiction.jpg" alt=""></div>
                    <div>
                        <p>用户昵称  <span>{{'2018-05-10'}}</span></p>
                        <div>
                            评论内容 评论内容 评论内容 评论内容 评论内容 评论内容
                            评论内容 评论内容 评论内容 评论内容 评论内容 评论内容
                            评论内容 评论内容
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
import { autoTextAreaHeight } from 'common/js/dom'

export default {
    data() {
        return {
            titleInfo: {
                title: '某本小说名称',
                showIcon: false
            },
            commentInput: '',
            data: [
                {}
            ],
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        handleThumbs() {
            console.log('点赞')
            this.isThumbs = !this.isThumbs
            this.thumbsNum = this.isThumbs ? this.thumbsNum+1 : this.thumbsNum-1
        },
        setHeight() {
            autoTextAreaHeight(this.$refs.textarea)
        } 
    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon,
        })

    }
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.fiction-info {
    padding: 15px;
    @include box-sizing;
    font-size: $font-size-small;  /*no*/
    .top {
        padding: 25px 35px;
        display: flex;
        @include color-background;
        >div {
            &:first-child {
                width: 170px;
                min-width: 170px;
                text-align: center;
                img {
                    width: 140px;
                    height: 200px;
                }
            }
            &:last-child {
                width: 100%;
                height: 200px;
                @include flex-colum;
                justify-content: space-between;
                text-align: justify;
                >p { font-size: $font-size-min;  /*no*/ color: $text-color-l; }
                >div {
                    &:first-child {
                        color: $text-color-dark;
                        p {
                            font-size: $font-size-min;  /*no*/
                            &:first-child { 
                                margin-bottom: 10px;
                                span {
                                    font-size: $font-size-normal; /*no*/
                                    color: black;
                                    font-weight: 600;
                                    margin-right: 30px;
                                }
                             }
                        }
                    }
                    &:nth-child(2) {
                        line-height: 1.2em;
                        height: 3.4em;
                        max-height: 3.4em;
                        @include lines-nowrap(3);
                    }
                }
            }
        }      
    }
    .intro {
        margin: 15px 0;
        @include color-background;
        padding: 15px 50px;
        line-height: 1.5;
    }
    .record {
        margin: 15px 0;
        height: 60px;
        line-height: 60px;
        padding: 0 50px;
        @include color-background;
        font-size: $font-size-min;  /*no*/
        span { 
            color: $text-color-orange; 
            font-size: $font-size-small;  /*no*/
            i { margin-right: 10px; }
            &:nth-child(2) { margin-left:　30px }
        }
    }
    .fiction-list {
        padding: 20px 60px;
        @include color-background;
        line-height: 1.5em;
        h2 { margin-bottom: 15px; } 
        .more { text-align: center; color:$text-color-orange; font-size: $font-size-min; /*no*/ }
    }
    .comment {
        margin-top: 15px;
        padding-top: 15px;
        @include color-background;
        >h2 { margin-bottom: 15px; padding-left: 60px; }
        >ul {
            li {
                display: flex;
                @include box-sizing;
                padding: 15px 60px;
                border-bottom: 5px solid #ebebeb;  /*no*/
                div {
                    &:first-child {
                        width: 45px;
                        min-width: 45px;
                        img { width: 35px; height: 35px; @include border-radius(50%); }
                        margin-right: 10px;
                    }
                    &:nth-child(2) {
                        width: 100%;
                        >p { 
                            margin: 5px 0 15px;
                            span { float: right; font-size: $font-size-min;  /*no*/ color: $text-color-l; }
                         }
                        >div {
                            text-align: justify;
                            color: $text-color-dark;
                            line-height: 1.3em;
                        }
                    }
                }
            }
        }
    }
    .comment-input {
        padding: 35px 0 50px;
        @include box-sizing;
        display: flex;
        textarea {
            @include box-sizing;
            width: 100%;
            min-height: 3em;
            border: 1px solid $border-color-d;  /*no*/
            // line-height: 1.5em;
            padding: .8em 1em 0;
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
