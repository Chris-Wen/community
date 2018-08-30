<template>
    <div class="topiclist" ref="topiclist">
        <scroll :pullup="openPullUp" :pulldown="openPullDown" @pulldownFresh="refreshPage" @scrollToEnd="loadmore" :data="dataList">
            <div class="scroll">
                <ul class="recommend" v-if="dataList['top_post']">
                    <router-link tag="li" to="/forum/topic" v-for="(item, index) in dataList['top_post']" :key="index">
                        <p> <i>[置顶]</i>{{item.title}}</p>
                        <div>
                            <span><i></i> {{item.nickname || item.username}}</span>
                            <span ><i class="self-icon-comment-o"></i> {{item.reply_num}}</span>
                            <span ><i class="self-icon-clock"></i>{{item.post_time | formatDate}}</span>
                        </div>
                    </router-link>
                </ul>
                <p class="part"> 用户帖子 </p>
                <ul class="article" v-if="dataList['post'] && dataList['post'].length !==0">
                    <router-link tag="li" :to="'/forum/topic/'+ item.id" v-for="(item, index) in dataList['post']" :key="index" active-class="linkClickStyle">
                        <div class="post-title">
                            <p> {{item.title}} </p>
                            <div class="flex-img post-img-show" v-if="item.upload_image_num>1">
                                <div v-for="(image, i) in item.post_images" :key="i" >
                                    <img :src="HOST + image" />
                                </div>
                            </div>
                            <div v-if="item.upload_image_num == 1" class="post-img-show">
                                <div class="post-index-image">
                                    <img :src="HOST + item.post_images[0]" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <span><i></i> {{item.nickname || item.username}}</span>
                            <span ><i class="self-icon-comment-o"></i> {{item.reply_num}}</span>
                            <span ><i class="self-icon-clock"></i>{{item.post_time | formatDate}}</span>
                        </div>
                    </router-link>
                </ul>
                <div v-else style="text-align:center; margin: 10px">暂无帖子</div>
            </div>
        </scroll>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Scroll from 'base/Scroll/Scroll'
import { getScrollHeight } from 'common/js/dom'
import { postTime } from 'common/js/tools'
import *as api from 'api/api'

export default {
    components: { Scroll },
    data() {
        return {
            dataList: {},
            openPullUp: true,       //开启上拉拉加载更多
            openPullDown: true,     //开启下拉刷新
            page: 0,                //当前页
        }
    },
    created() {
        let data = sessionStorage.getItem('forum_index_data')
        this.dataList = data ? JSON.parse(data) : this.getPostList()
    },
    mounted() {
        this.$nextTick( () => {
            let scrollHeight = getScrollHeight() - document.getElementById('forumTab').clientHeight
            document.getElementById('wrapper').style.height = scrollHeight + 1 + 'px' 
        })

        //vuex  设置发帖模块 交流讨论区帖子
        this.setPostType(1)
    },
    methods: {
        ...mapMutations({setPostType : 'SET_EDITOR_TYPE'}),
        loadmore() {
            // console.log('加载更多')
        },
        refreshPage(scrollObj) {
            setTimeout(() => {
                console.log('更新成功');
                scrollObj.finishPullUp();
            }, 1500);
        },
        getPostList(page) {
            api.get('/forum/index', { params:{page} }).then( res => {
                if (res.code==200) {
                    this.dataList = res.data;
                    sessionStorage.setItem('forum_index_data', JSON.stringify(res.data))
                }
            })
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
@import "../../../common/css/index.scss";

.topiclist {
    width: 100%;
    ul li {
        min-height: 142px;
        height: auto;
        width: 100%;
        @include box-sizing;
        border-top: 1px solid $text-color-orange; /*no*/
        padding: 20px 40px 10px;
        &:first-child { border: 0; }
        .post-title {
            margin: 0;
            >p { 
                max-height: 2.3em;
                height: 2.3em;
                @include lines-nowrap(2);
                @include text-justify(1.2em);
            }
            .post-img-show {
                width: 100%;
                height: auto;
                max-height: 300px;
                overflow: hidden;
                margin-bottom: .8em;
                .post-index-image {
                    img { max-width: 100%; height: auto; }
                }
            }
            .flex-img {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                height: 250px;
                overflow: hidden;
                &::after {
                    content: "";
                    flex: auto;
                }
                div {
                    line-height: 200px;
                    width: 32%;
                    img {
                        max-width: 100%;
                        height: auto;
                    } 
                }
            }
        }
        >div {
            margin-top: 20px;
            span { 
                &:not(:first-child) { float: right }
                &:last-child { margin-right: 15px; }
                i {
                    display: inline-block;
                    margin-right: 8px;
                    background-position: center;
                    background-repeat: no-repeat;
                    color: $text-color-orange;
                    line-height: 28px;
                }
                &:first-child i {
                    width: 28px;
                    height: 28px;
                    @include background-image(url("../../../common/images/icons/icon-user.jpg"));
                    margin-top: -3px;    
                    vertical-align: bottom;              
                }
            }
        }
    }
    .recommend {
        // margin-top: 73px;
        @include color-background;
        border-bottom: 1px solid $text-color-orange-d;
        p { color: red }
        li:last-child { 
            p { font-weight: 600; }
        }
    }
    .part {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-indent: 2em;
        font-size: $font-size-small; /*no*/
        color: $text-color-orange-d;
        background-color: $bg-color-d;
    }
    .article {
        @include color-background;
    }
}
</style>
