<template>
    <div class="fiction-info">
        <div class="top">
            <div>
                <img src="../../common/images/fiction/fiction.jpg" />
            </div>
            <div>
                <div>
                    <p><span>{{'网游之三国无双'}}</span>  {{'天残土豆'}}</p>
                    <p><span>最后更新：{{'2018-05-05 15:30'}}</span></p>
                </div>
                <div>
                    小说简介小说简介小说简介小说简介小说简介小说简介
                    小说简介小说简介小说简介小说简介小说简介小说简介
                    小说简介小说简介小说简介小说简介小说简介小说简介
                </div>
                <p>总字数：{{'11万字'}}</p>
            </div>
        </div>
        <div class="record">
            <span><i class="self-icon-eye"></i>点击：</span>{{132151}}
            <span><i class="self-icon-star-full"></i>收藏：</span>{{123333}}
        </div>
        <div class="fiction-list">
            <h2>章节目录</h2>
            <ul>
                <li>第1233章：谁知道是啥标题</li>
                <li>第1章：爱谁谁</li>
                <li>第2章：爱谁谁</li>
                <li>第3章：爱谁谁</li>
                <li>第4章：爱谁谁</li>
            </ul>
            <p class="more">更多 >></p>
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
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                title: '某本小说',
                showIcon: false
            },
            data: [12,3,34,5,6,7]
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),

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
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                }
            }
        }      
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
}
</style>
