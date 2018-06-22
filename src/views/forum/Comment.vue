<template>
    <div class="topic">
        <!-- 页面内容、帖子主题 -->
        <div class="comment">
            <div class="comment-top">
                <div> <router-link to="/center/friend/info"> <img :src="commentList.avatar"></router-link> </div>
                <div>
                    <p>{{commentList.name}}</p>
                    <p>{{commentList.time}}</p>
                </div>
            </div>
            <div>
                <div class="content" v-html="commentList.content"></div>
            </div>
        </div>
        <!-- 评论 -->
        <div class="list">
            <ul>
                <li v-for="(item, index) in commentList.reply" :key="index">
                    <div class="item">
                        <div> <router-link to="/center/friend/info"> <img :src="item.avatar"></router-link> </div>
                        <div>
                            <div>
                                <p>{{item.name}}</p>
                                <p>{{item.time}}</p>
                            </div>
                            <div class="content-box">
                                <div class="content">
                                    <div @click="replyComment('commentId', 'replyUserid')" v-html="item.content"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="more">暂无更多回复</div>
            <ol>
                <li></li>
            </ol>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import  DropDown from 'components/ForumDropDown/ForumDropDown'
import { Loadmore } from 'mint-ui'
// import Scroll from 'base/Scroll/Scroll'


export default {
    components: { DropDown, mtLoadmore : Loadmore },
    data() {
        return {
            titleInfo: {
                title: '2楼',
                showIcon: true,
                icon: 'self-icon-comment-o fa-lg',
                link: '/editor'
            },
            userId: 123,
            showEditor: true,
            editorType: '',
            navDropDown: false,
            showTopDrop: false,
            indexShow: -1,
            commentList: {
                        id: 123,
                        listId: 1001,
                        name:　'我是谁',
                        time: '5-12 12:30',
                        isStored: true,
                        avatar: 'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172657362.jpg',
                        content:　`有人说三代火影很弱，没什么招牌忍术，不要跟我说尸鬼封禁，那是旋涡一族的术。`,
                        total: 13,  /**总回复数量*/
                        reply: [
                            {
                                id: 1,
                                name:　'我在哪',
                                time: '5-12 12:30',
                                avatar: 'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172657362.jpg',
                                content:　`没什么招牌忍术`,
                                to: ''
                            },
                            {
                                id: 23,
                                name:　'我是谁',
                                time: '5-12 12:30',
                                avatar: 'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172657362.jpg',
                                content:　`怎么可能，会所有忍术不是盖的。猿魔也是啊`,
                                to: { id: 1, name: '我在哪' }
                            }
                        ]
                    },
            datalist: [],

            allLoaded: false
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        replyComment(commentId, replyUserid) {         //回复评论
            this.$router.push({ path: '/editor', params: { type: 123 } })
        },

    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon,
            icon: this.titleInfo.icon,
            link: this.titleInfo.link,
            showBottomTab: false
        });

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
