<template>
    <div class="topic">
        <!-- 右上icon及下拉菜单 -->
        <div class="nav">
            <router-link tag="i" :to="{ name: 'editor', params: { type: 'theme' } }" class="self-icon-comment-o fa-2x"></router-link>
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
            <div class="theme">
                <h1>{{topic.title}}</h1>
                <div class="theme-top">
                    <div> <router-link to="/center/friend/info"> <img :src="topic.avatar"></router-link> </div>
                    <div>
                        <div class="more" @click=" showTopDrop = !showTopDrop ">
                            <i class="self-icon-more_horiz fa-lg"></i>
                        </div>
                        <p>{{topic.name}}</p>
                        <p>{{topic.time}}</p>
                    </div>
                </div>
                <div>
                    <drop-down v-show="showTopDrop" 
                        :userId="userId" :itemId="topic.topicId" 
                        :itemUserId="topic.id" :isStored="topic.isStored" 
                        @store="_store" @reply="_reply"
                    />
                    <div class="content" v-html="topic.content"></div>
                </div>
            </div>
            <!-- 评论 -->
            <div class="list">
                <ul>
                    <li v-for="(item, index) in commentList" :key="index">
                        <div class="item">
                            <div> <router-link to="/center/friend/info"> <img :src="item.avatar"></router-link> </div>
                            <div>
                                <div>
                                    <div class="more" @click="showMenu(index)">
                                        <i class="self-icon-more_horiz fa-lg"></i>
                                    </div>
                                    <p>{{item.name}}</p>
                                    <p>{{item.time}}</p>
                                </div>
                                <div class="content-box">
                                    <drop-down v-show="indexShow == index" :userId="userId" :itemId="item.listId" :itemUserId="item.id" :isStored="item.isStored"></drop-down>
                                    <div class="content">
                                        <div v-html="item.content"></div>
                                        <ul class="reply" v-if="item.total>0">
                                            <li v-for="(val, key) in item.reply" :key="key" @click.stop.capture="replyComment('commentId', 'replyUserid')">
                                                <router-link to="/center/friend/info">{{val.name}}</router-link>:
                                                <span >回复<router-link to="/center/friend/info"> {{val.name}}</router-link>：</span>
                                                {{val.content}}
                                            </li>
                                            <router-link :to="{ name: 'forum_comment_list', params: { commentId: 123 } }" class="bottom" v-if="item.total>=3">还有{{ item.total-2 }}条评论 <span class="self-icon-caret-up"></span> </router-link>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <ol>
                    <li></li>
                </ol>
            </div>
        </mt-loadmore>
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
                title: '帖子详情',
                showIcon: false
            },
            userId: 123,

            showEditor: true,
            editorType: '',

            navDropDown: false,
            showTopDrop: false,
            indexShow: -1,
            topic: {
                topicId: 1,
                id: 123,
                isStored: true,
                title:　'帖子主题帖子主题帖子主题帖子主题帖子主题帖子主题帖子主题',
                name:　'我是谁',
                time: '2017-11-12',
                avatar: 'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172657362.jpg',
                content:　`有人说三代火影很弱，没什么招牌忍术，不要跟我说尸鬼封禁，那是旋涡一族的术。<br> 三代作为影，他没有血继限界，可以说他是靠怒力上位的。<br> 他的查克拉量应该很大，招牌术就是猿魔、手里剑影分身、一次放五种遁术、火龙岩弹。<br> 可以说三代强在查克拉量和战斗经验上。毕竟看到初代和二代不慌的能有几个。<br> 三代牛的还是活得长，得有七八十岁吧。<br>`
            },
            commentList:  [
                    {
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
                    {
                        id: 123,
                        listId: 1002,
                        isStored: false,
                        name:　'我是谁',
                        time: '5-12 16:40',
                        avatar: 'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172657362.jpg',
                        content:　`三代火影很弱，没什么招牌忍术`,
                        total: 0,  /**总回复数量*/
                    },
                    {
                        id: 123,
                        listId: 1003,
                        isStored: false,
                        name:　'谁',
                        time: '5-12 12:30',
                        avatar: 'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172657362.jpg',
                        content:　`有人说三代火影很弱，没什么招牌忍术，不要跟我说尸鬼封禁，那是旋涡一族的术。`,
                        total: 2,  /**总回复数量*/
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
                                name:　'谁',
                                time: '5-12 12:30',
                                avatar: 'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172657362.jpg',
                                content:　`怎么可能，会所有忍术不是盖的。猿魔也是啊`,
                                to: { id: 1, name: '我在哪' }
                            }
                        ]
                    },
                ],
            datalist: [],

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
        replyComment(commentId, replyUserid) {         //回复评论

            this.$router.push({ path: '/editor', params: { type: 123 } })
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
        }
    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon
        });

        setTimeout(() => {   
            this.datalist = [1,3,4]
        }, 1000);
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

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
