<template>
    <div class="topiclist" ref="topiclist">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" 
        :bottomPullText="bottomPullText" :topDistance="40" :bottomDistance="40" :maxDistance="55" ref="loadmore"> 
            <div class="scroll">
                <ul class="recommend" v-if="datalist['top_post']">
                    <router-link tag="li" :to="'/forum/topic/'+ item.id" v-for="(item, index) in datalist['top_post']" :key="index">
                        <div class="post-title">
                            <p><i>[置顶]</i> {{item.title}} </p>
                            <!-- <div class="flex-img post-img-show" v-if="item.upload_image_num>1">
                                <div v-for="(image, i) in item.post_images" :key="i" >
                                    <img :src="HOST + image" />
                                </div>
                            </div>
                            <div v-if="item.upload_image_num == 1" class="post-img-show">
                                <div class="post-index-image">
                                    <img :src="HOST + item.post_images[0]" />
                                </div>
                            </div> -->
                        </div>
                        <div>
                            <span><i></i> {{item.nickname || item.username}}</span>
                            <span ><i class="self-icon-comment-o"></i> {{item.reply_num}}</span>
                            <span ><i class="self-icon-clock"></i>{{item.post_time | formatDate}}</span>
                        </div>
                    </router-link>
                </ul>
                <p class="part"> 用户帖子 </p>
                <ul class="article" v-if="datalist.post">
                    <router-link tag="li" :to="'/forum/topic/'+ item.id" v-for="(item, index) in datalist.post" :key="index" active-class="linkClickStyle">
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
        </mt-loadmore>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Loadmore } from 'mint-ui'
import { setClientHeight } from 'common/js/dom'
import { postTime } from 'common/js/tools'
import *as api from 'api/api'

export default {
    components: { mtLoadmore : Loadmore },
    data() {
        return {
            datalist: {},
            page: 0,                //当前页
            allLoaded: false,
            bottomPullText: '上拉加载更多',
            maxPage: 0
        }
    },
    created() {
        let data = sessionStorage.getItem('forum_index_data')
        if (data) {
            this.datalist = JSON.parse(data)
        } else {
            this.getPostList()
        } 
    },
    mounted() {
        this.$nextTick( () => {
            let scrollHeight = setClientHeight() - document.getElementById('forumTab').clientHeight
            this.$refs.topiclist.style.height = scrollHeight + 'px' 
        })

        //vuex  设置发帖模块 交流讨论区帖子
        this.setPostType(1)
    },
    methods: {
        ...mapMutations({setPostType : 'SET_EDITOR_TYPE'}),
        loadTop() {           //下拉刷新
            this.getPostList();
            this.$refs.loadmore.onTopLoaded();
        },
        loadBottom() {
            console.log('加载更多操作')
            if (this.page >= this.maxPage) {
                // this.allLoaded = true;  // 若数据已全部获取完毕
                this.bottomPullText = '没有更多了'
                this.$refs.loadmore.onBottomLoaded();
            } else {
                this.bottomPullText = '上拉加载更多'
                this.getPostList(this.page);
            }
        },
        getPostList(page=0) {
            api.get('/forum/index', { params:{page} }).then( res => {
                if (res.code==200) {
                    if (this.page>0) {          //分页加载操作
                        this.datalist.post.push(res.data.post)

                        this.$refs.loadmore.onBottomLoaded();
                        this.page ++
                    } else {                    //初始化获取数据操作
                        this.datalist = res.data;
                        this.maxPage = res.totalPage
                    }
                    sessionStorage.setItem('forum_index_data', JSON.stringify(this.datalist))
                }
            })
        }
    },
    filters: {
        formatDate(time) {
            return postTime(time)
        }
    },
    beforeRouteLeave (to, from, next) {
        if (to.name !== 'postDetail') {
            sessionStorage.removeItem('forum_index_data')
        }
        next()
    },
}
</script>

<style lang="scss" scoped>
@import "../../../common/css/index.scss";

.topiclist {
    width: 100%;
    overflow: auto;
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
                width: 100%;
                @include flex-between;
                height: 150px;
                overflow: hidden;
                align-items: center;
                &::after {
                    content: "";
                    width: 30%;
                    height: 150px;
                    display: flex;
                    justify-content: space-between;
                }
                div {
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
