<template>
    <div class="topic">
        <!-- 右上icon及下拉菜单 -->
        <div class="nav">
            <router-link tag="i" :to="{ name: 'editor', params: { type: 'theme', targetPostId: topic.id } }" class="self-icon-comment-o fa-2x"></router-link>
            <i @click="navDropDown = !navDropDown" class="self-icon-more_vert fa-2x"></i>
        </div>
        <div v-if="navDropDown" class="mask" @click.stop="navDropDown = false">
            <ul class="drop-down">
                <li v-if="topic.isStored" >已收藏</li>
                <li v-else >收藏</li>
                <li>转发</li>
                <li>倒序查看</li>
            </ul>
        </div>
        <!-- 页面内容、帖子主题 -->
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <div class="theme" v-if="topic">
                <h1> {{topic.title}} </h1>
                <div class="theme-top">
                    <router-link to="/center/friend/info" tag="div"> 
                        <img :src="topic.avatar || defaultAvatar" />
                    </router-link>
                    <div>
                        <div class="more" @click=" showTopDrop = !showTopDrop ">
                            <i class="self-icon-more_horiz fa-lg"></i>
                        </div>
                        <p>{{topic.nickname || topic.username}}</p>
                        <p>{{topic.post_time | formatDate}}</p>
                    </div>
                </div>
                <div>
                    <ul class="forum-drop-down" v-show="showTopDrop">
                        <li @click="_store(itemId, isStored)">{{ topic.isStored ? '已收藏' : '收藏'}}</li>
                        <router-link tag="li" :to="{ name: 'editor', params: { type: 'theme', targetPostId: topic.id } }">回复</router-link>
                        <li v-if="userInfo.uid==topic.uid">删除</li>
                    </ul>
                        
                    <div class="article-content" >
                        <div v-html="transfromEmoji(topic.content)"></div>
                        <div v-for="(img, i) in topic.images" :key="i">
                            <img class="image" v-lazy="host+img" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- 评论 -->
            <div class="list" v-if="commentList && commentList.length !==0">
                <ul>
                    <li v-for="(item, index) in commentList" :key="index">
                        <div class="item">
                            <div> <router-link :to="'/center/friend/info/'+ item.uid"> <img :src="item.avatar || defaultAvatar"></router-link> </div>
                            <div>
                                <div>
                                    <div class="more" @click="showMenu(index)">
                                        <i class="self-icon-more_horiz fa-lg"></i>
                                    </div>
                                    <p>{{item.nickname || item.username}}</p>
                                    <p>{{item.reply_time | formatDate}}</p>
                                </div>
                                <div class="content-box">
                                    <drop-down v-show="indexShow == index" :userId="userInfo.uid" 
                                        :itemId="item.rid" :itemUserId="item.uid" 
                                        :uname="item.nickname || item.username" 
                                        @reply="replyComment"
                                        :isStored="item.isStored"/>
                                    <div class="content">
                                        <div class="article-content" v-html="transfromEmoji(item.content)"></div>
                                        <!-- 二级评论 -->
                                        <ul class="reply" v-if="item.reply_num>0">
                                            <li v-for="(val, key) in item.second_reply_data" :key="key" @click.stop.capture="replyComment(val.id, val.uid, val.nickname || val.username)">
                                                <router-link :to="'/center/friend/info'+val.uid">{{val.nickname || val.username}}</router-link>:
                                                <span >回复<router-link to="/center/friend/info"> {{val.name}}</router-link>：</span>
                                                {{val.content}}
                                            </li>
                                            <router-link :to="{ path: '/forum_comment_list', query: { commentId: item.rid } }" class="bottom" v-if="item.reply_num>5">还有{{ item.reply_num-2 }}条评论 <span class="self-icon-caret-up"></span> </router-link>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div style="margin: 20px 0; text-align:center" v-else>暂无评论</div>
        </mt-loadmore>
    </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import  DropDown from 'components/ForumDropDown/ForumDropDown'
import { Loadmore } from 'mint-ui'
import * as api from 'api/api' 
import { postTime, formateEmoji } from 'common/js/tools'
import { HOST } from 'common/js/config'
// import Scroll from 'base/Scroll/Scroll'

export default {
    components: { DropDown, mtLoadmore : Loadmore },
    data() {
        return {
            titleInfo: {
                title: '帖子详情',
                showIcon: false
            },
            userId: 123,
            showEditor: true,
            editorType: '',
            defaultAvatar: require('../../common/images/global/user.jpg'),
            navDropDown: false,
            showTopDrop: false,
            indexShow: -1,
            topic: {
                // isStored: true,  是否已收藏
                           },
            commentList:  [],
            allLoaded: false
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        showMenu(index) {
            this.indexShow = index==this.indexShow ? -1 : index
        },
        _store(id, isStored) {
            if (isStored) {
                console.log('已收藏,执行取消收藏操作')
            } else {
                console.log('未收藏，执行收藏操作')
            }
        },
        _reply(itemId) {
            console.log('弹出填写页面，进行编辑')
        },
        replyComment(commentId, replyUserid, uname) {         //回复评论
            this.$router.push({ name: 'editor', params: { type: 'reply', commentId, replyUserid, uname } })
        },
        //上、下拉刷新加载
        loadTop() {
            console.log('刷新操作')
            this.$refs.loadmore.onTopLoaded();
        },
        loadBottom() {
            console.log('加载更多操作')

            this.allLoaded = true;  // 若数据已全部获取完毕
            this.$refs.loadmore.onBottomLoaded();
        },
        getReply(page) {
            let id = this.$route.params.id
            if (id) {
                api.get('/forum/getPostInfo', {params: {id, page}}).then( data => {
                    if (data.code==200) {
                        let list = data.data
                        if (list.info) this.topic = list.info;
                        this.commentList = list.reply;
                    }
                })
            }
        },
        transfromEmoji(html) { return formateEmoji(html) },
    },
    created() {
        this.getReply();
    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon
        });
    },
    computed: {
        ...mapGetters(['userInfo']),
        host() {
            return HOST
        }
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
.forum-drop-down {
    position: absolute;
    top: -30px;
    right: 0;
    @include color-background;
    width: 150px;
    border: 1px solid $border-color-d;  /*no*/
    li {
        height: 54px;
        line-height: 54px;
        border-bottom: 1px solid $border-color-d;  /*no*/
        text-align: center;
        &:last-child { border: 0; }
    }
}
.topic {
    font-size: $font-size-small;  /*no*/
    @include color-background;
    min-height: 960px;
    .nav {
        height: 100px;
        line-height: 100px;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 110;
        color: #fff;
        i { padding: 0 30px 0 10px }
    }
    .drop-down {
        position: absolute;
        top: 0;
        @include color-background;
        right: 30px;
        width: 195px;
        li {
            height: 54px;
            line-height: 54px;
            border: 1px solid $border-color-d;  /*no*/
            text-align: center;
            &:last-child { border: 0; }
        }
    }
    .theme {
        text-align: justify;
        padding: 35px;
        border-bottom: 15px solid #ebebeb; 
        .theme-top {
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
                    width: 100%;
                    .more { float: right; line-height: 60px;}
                    p {
                        &:first-of-type { margin: 5px 0; }
                        &:last-of-type { color: $text-color-l; font-size: $font-size-min;  /*no*/ }
                    }
                }
                i { color: $text-color-l; }
            }
            
        }
        >div:last-child {
            position: relative;
            line-height: 1.4em;
            // .content {
            //     img { margin-top: 15px auto; width: auto; max-width: 95% }
            // }
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
                                .reply {
                                    color: $text-color-dark;
                                    line-height: 1.3em;
                                    background: #f4f2f2;
                                    padding: 10px 6px;
                                    margin-top: 25px;
                                    li {
                                        margin-bottom: 15px;
                                        &:last-child { margin: 0; }
                                    }
                                    .bottom {
                                        text-align: right; padding-right: 10px; 
                                        span { margin: 0 5px; }
                                    }
                                }
                            }
                        }
                    }
                    i { 
                        color: $text-color-l; 
                    }
                }
            }
        }
    }
    .more { padding-left: 25px; }
}
</style>
