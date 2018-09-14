<template>
    <div class="fiction-info" v-if="datalist">
        <div class="top">
            <div>
                <img :src="HOST + datalist.info.img" />
            </div>
            <div>
                <p>作者：{{datalist.info.author}}</p>
                <p><span>更新：{{datalist.info.update_time | postTime}}</span></p>
                <p>类别：{{datalist.info.type==1 ? '原创' : '同人'}}</p>
                <p>状态：{{datalist.info.state ? '完结' : '连载中'}}</p>
                <P>最新章节：{{datalist.info.total_chapter}}</P>
                <!-- <p>总字数：{{}}</p> -->
            </div>
        </div>
        <div class="intro article-content" v-html="datalist.info.intro"></div>
        <div class="record">
            <span><i class="self-icon-eye"></i>点击：</span>{{datalist.info.views | transformNumber}}
            <span><i class="self-icon-star-full"></i>收藏：</span>{{datalist.info.add_num | transformNumber}}
        </div>
        <div class="fiction-list" v-if="datalist.chapter">
            <h2>最新章节 &nbsp;&nbsp;&nbsp;&nbsp;<span>更新：{{datalist.info.update_time | transformDate}}</span> </h2>
            <ul>
                <router-link tag="li" v-for="(item, key) in datalist.chapter" :key="key" :to="'/fiction/chapter/'+item.id">{{item.chapter_name}}</router-link>
            </ul>
            <router-link  tag="p" :to="'/fiction/novel_list/'+datalist.info.nid + '/'+ datalist.info.name" class="more" >更多 >></router-link>
        </div>
        <div class="comment">
            <h2>读者评论</h2>
            <ul v-if="datalist.comment">
                <li v-for="(item, index) in datalist.comment" :key="index">
                    <div><img :src="item.avatar || DefaultAvatar" /></div>
                    <div>
                        <p>{{item.nickname || item.username}}  <span>{{item.create_time}}</span></p>
                        <div v-html="item.comment"></div>
                    </div>
                </li>
            </ul>
            <div style="text-indent: 3em" v-else>暂无评论</div>
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
import {formatDate, postTime, formatNumber} from 'common/js/tools'
import * as api from 'api/api'

export default {
    data() {
        return {
            titleInfo: {
                title: '',
                showIcon: false
            },
            commentInput: '',
            datalist: null,
            data: ''
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        setHeight() {
            autoTextAreaHeight(this.$refs.textarea)
        } 
    },
    created() {
        api.get("/novel/fictionInfo?id="+this.$route.params.fictionId).then( response => {
            if (response.code==200) {
                this.datalist = response.data
            }
        })
    },
    mounted() {
        this.handleTitle({
            title:    this.$route.params.novelName, 
            showIcon: this.titleInfo.showIcon,
        })
    },
    filters: {
        transformDate(time) {
            return formatDate("yyyy-MM-dd hh:mm", time)
        },
        postTime(time) {
            return postTime(time)
        },
        transformNumber(val) {
            return formatNumber(val)
        }
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
        line-height: 1.8;
        ul { margin-top: 10px }
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
