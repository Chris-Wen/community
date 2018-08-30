<template>
    <div class="article">
        <div v-if="datalist">
            <div class="title">
                <h1>{{datalist.activity}}</h1>
                <p v-if="datalist.origin">来源：{{datalist.origin}}  </p>
                <p class="article-info">作者： {{datalist.initiator}}&nbsp;&nbsp;&nbsp;&nbsp; <span>{{datalist.creattime | formatDate}}</span> </p>
            </div>
            <div class="content">
                <div class="article-content" v-html="datalist.text"></div>
                <!-- 点赞 -->
                <div class="enjoy" v-if="datalist.collect_likes == 1">
                    <div :class="['thumbs', {'active': isThumbs }]" @click="handleThumbs"><i class="self-icon-thumbs-up"></i> </div>
                    <p>{{thumbsNum}}</p>
                </div>
            </div>

            <!-- 评论 -->
            <div class="comment">
                <p class="comment-title">用户评论：</p>
                <ul class="comment-list" v-if="comment">
                    <li v-for="(item, index) in comment" :key="index">
                        <div class="avatar">
                            <img :src="item.avatar || defaultAvatar" >
                        </div>
                        <div class="item">
                            <span >{{item.reply_time | formatDate}}</span>
                            <p>{{item.nickname || item.username}} </p>
                            <div class="article-content" v-html="item.content"></div>
                        </div>
                    </li>
                </ul>
                <div class="no-comment" v-else>暂无评论</div>
            </div>
            <!-- 评论输入栏 -->
            <div class="comment-input">
                <textarea ref="textarea" v-model="commentInput" placeholder="期待你的评论~" style="height: auto" @input='setHeight'></textarea>
                <div @click="submitComment">发送</div>
            </div>
            </div>
        <div style="text-align:center; margin-top: 2em;" v-else-if="errorPageShow">活动已下线</div>
    </div>    
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { autoTextAreaHeight } from 'common/js/dom'
import { formatDate, textareaFormat } from 'common/js/tools'
import * as api from 'api/api'

export default {
    data() {
        return {
            titleInfo: {
                title: '精品推荐',
                showIcon: false
            },
            datalist: null,
            comment: null,
            defaultAvatar: require('../../common/images/global/user.jpg'),
            isThumbs: false,
            thumbsNum: '',
            commentInput: '',
            errorPageShow: false,
            likeStatus: false,
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        setHeight() {
            autoTextAreaHeight(this.$refs.textarea)
        },
        initPage(data) {
            this.thumbsNum = data.likes
            this.comment = data.reply_num ?  data.reply_data : null
            this.likeStatus = data.like_status ? true : false
        },
        handleThumbs() {
            this.isThumbs = !this.isThumbs
            this.thumbsNum = this.isThumbs ? this.thumbsNum++ : this.thumbsNum--
        }, 
        submitComment() {
            let acid = this.$route.params.acid, content;
            if (this.commentInput) {
                content = textareaFormat(this.commentInput)
            } else {
                return Toast('请填写评论内容')
            }
            api.post("/forum/replyActivity", { acid, content }).then( response => {
                if (response.code==200) {
                    Toast('评论成功');
                    let data = [
                        {
                            uid: this.userInfo.uid,
                            nickname: this.userInfo.uname,
                            reply_time: Date.parse(new Date())/1000,
                            content: content
                        }
                    ]
                    if (this.comment) {
                        this.comment.unshift(...data)
                    } else {
                        this.comment = data;
                    }

                    this.commentInput = null;
                } else {
                    Toast(response.msg)
                }
            })
        }
    },
    created() {
        let acid = this.$route.params.acid;
        if (acid) {
            api.get('/forum/getActivityInfo', { params: {acid} }).then(response => {
                if (response.code == 200) {
                    let data = response.data
                    this.datalist = data
                    // this.thumbsNum = data.likes
                    // this.comment = data.reply_num ?  data.reply_data : null
                    data && this.initPage(data)
                } else if (response.code == 401) {
                    this.errorPageShow = true
                }
            })
        }
    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon
        });
    },
    computed: {
        ...mapGetters(['userInfo']),
    },
    filters: {
        formatDate(time) {
            return formatDate(time, "yyyy-MM-dd hh:mm")
        }
    },
    beforeRouteLeave (to, from, next) {
        if (this.likeStatus !== this.isThumbs) {    //退出页面时发送点赞状态
            api.get("/forum/showActivityLike");
        }
        next();
    },
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.article {
    @include box-sizing;
    font-size: $font-size-small;  /*no*/
    .title {
        padding: 0 60px 10px;
        text-align: center;
        border-bottom: 1px solid $text-color-orange;  /*no*/
        line-height: 1.5;
        h1 { 
            margin: 25px 0 10px 0;
            text-align: center; 
            line-height: 1.3em;
            max-height: 2.5em;   
        }
        .article-info {
            font-size: $font-size-min;  /*no*/
        }
        // div {
        //     margin: 10px 0 20px;
        //     color: $text-color-dark;
        //     max-height: 1em;
        //     font-size: $font-size-min;  /*no*/
        //     span:nth-child(2) { margin: 0 1em }
        // }
    }
    // 文章内容
    .content {
        width: 100%;
        @include color-background;
        padding: 40px 60px;
        text-align: justify;
        @include box-sizing;
        // >img {
        //     max-width: 100%;
        //     margin:　1em 0;
        // }
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
        .no-comment { padding-left: 60px; }
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
                    width: 100%;
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
            padding: 0 1em;
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
