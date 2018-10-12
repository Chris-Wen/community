<template>
    <div class="topic" v-if="commentList">
        <!-- 页面内容、帖子主题 -->
        <div class="comment">
            <div class="comment-top">
                <div> <router-link :to="{path: '/center/friend/info', query: {uid: commentList.uid}}"> <img :src="commentList.avatar || DefaultAvatar"></router-link> </div>
                <div>
                    <p>{{commentList.nickname || commentList.username}}</p>
                    <p>{{commentList.reply_time | formatDate}}</p>
                </div>
            </div>
            <div>
                <div class="article-content" v-html="formateEmoji(commentList.content)"></div>
            </div>
        </div>
        <!-- 评论 -->
        <div class="list">
            <div style="margin: .8em 0; font-size: 16px;">{{commentList.reply_num}}条回复</div>
            <ul v-if="commentList">
                <li v-for="(item, index) in commentList.reply" :key="index">
                    <div class="item">
                        <div> <router-link :to="{path: '/center/friend/info', query: {uid: item.uid}}"> <img :src="item.avatar || DefaultAvatar"></router-link> </div>
                        <div>
                            <div style="font-size:12px">
                                <p>{{item.nickname || item.username}}</p>
                                <p>{{item.reply_time | formatDate}}</p>
                            </div>
                            <div class="content-box">
                                <div class="content">
                                    <div @click="replyComment('commentId', 'replyUserid')" class="article-content" >
                                        <span style="font-size：15px;" v-if="commentList.uid !== item.target_uid">回复 {{item.target_uname}}：&nbsp;</span>
                                        <div style="display:inline-block" v-html="formateEmoji(item.content)"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li><div class="more">暂无更多回复</div></li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import  DropDown from 'components/ForumDropDown/ForumDropDown'
import { Loadmore } from 'mint-ui'
import { postTime, formateEmoji } from 'common/js/tools'
import * as api from 'api/api'
// import Scroll from 'base/Scroll/Scroll'


export default {
    components: { DropDown, mtLoadmore : Loadmore },
    data() {
        return {
            titleInfo: {
                title: '楼层',
                showIcon: false,
            },
            userId: 123,
            showEditor: true,
            editorType: '',
            navDropDown: false,
            showTopDrop: false,
            indexShow: -1,
            commentList: [],

            allLoaded: false
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        replyComment(commentId, replyUserid) {         //回复评论
            this.$router.push({ path: '/editor', params: { type: 123 } })
        },
        getTargetReplyInfo(page=0) {
            if (!this.$route.query.comment_id) {
                setTimeout(() => {
                    this.$router.go(-1);
                }, 2000);
                return Toast('获取评论参数错误')
            }
            api.get('/forum/getTargetReplyInfo?target_reply_id='+this.$route.query.comment_id)
                .then( response => {
                    if (response.code==200) {
                        this.commentList = response.data
                    } else {
                        Toast("获取内容失败，请稍候重试！")
                        setTimeout(() => {
                            this.$router.go(-1)
                        }, 2000);
                    }
                })
        },
        formateEmoji(html) { return formateEmoji(html) },
    },
    created() {
        this.getTargetReplyInfo()
    },
    mounted() {
        this.handleTitle({
            title:  `${this.$route.query.floor}楼` || this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon,
            // showBottomTab: true
        });
    },
    filters: {
        formatDate(time) {
            return postTime(time)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.topic {
    font-size: $font-size-small;  /*no*/
    @include color-background;
    min-height: 960px;
    .comment {
        text-align: justify;
        padding: 35px;
        border-bottom: 15px solid #ebebeb; 
        .comment-top {
            display: flex;
            align-items: stretch; 
            margin: 30px 0;
            >div {
                &:first-child {
                    width: 80px;
                    min-width: 80px;
                    img { 
                        height: 60px; width: 60px;
                        @include border-radius(50%);
                        margin-right: 20px;
                    }
                }
                &:last-child {
                    p {
                        &:first-of-type { margin: 5px 0; }
                        &:last-of-type { color: $text-color-l; font-size: $font-size-min;  /*no*/ }
                    }
                }
            }
            
        }
        >div:last-child {
            position: relative;
            line-height: 1.4em;
            .content {
                img { margin-top: 15px auto; width: auto; max-width: 95% }
            }
        }
    }
    .list {
        padding: 0 35px;
        >ul>li {
            padding: 30px 0;
            border-bottom: 1px solid $border-color-d;  /*no*/
            &:last-child { border: 0 }
            .item {
                display: flex;
                align-items: stretch; 
                >div {
                    &:first-child {
                        width: 80px;
                        min-width: 80px;
                        img { 
                            height: 60px; width: 60px;
                            @include border-radius(50%);
                            margin-right: 20px;
                        }
                    }
                    &:last-child {
                        width: 100%;
                        .more { float: right; line-height: 60px;}
                        div:first-child>p {
                            &:first-of-type { margin: 5px 0; }
                            &:last-of-type { color: $text-color-l; font-size: $font-size-min;  /*no*/ }
                        }
                        .content-box {
                            position: relative;
                            .content {
                                text-align: justify;
                                line-height: 1.4em;
                                margin: 30px 35px 0 0;
                            }
                        }
                    }
                }
            }
        }
    }
    .more { text-align: center; color: $text-color-l; }
}
</style>
