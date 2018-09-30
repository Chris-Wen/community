<template>
    <div class="mark-page">
        <div class="flex-around tab">
            <div :class="{ 'active': tab=='theme' }"  @click="changeTab('theme')">主题</div>
            <div :class="{ 'active': tab=='reply' }" @click="changeTab('reply')">回复</div>
        </div>
        <div v-if="tab=='reply'">
            <ul class="list" v-if="data.reply.length>0"> 
                <li v-for="(item, index) in data.reply" :key="index">
                    <router-link tag="div" :to="'/forum/topic/'+ item.id">
                        <div class="item-top">
                            <img :src="userInfo.avatar || DefaultAvatar" />    
                            {{userInfo.uname}}
                        </div> 
                        <p>回复：{{item.reply_num}}</p>   
                        <p>原帖：{{item.title}}</p>
                        <div class="item-content">
                            来自：{{item.module==1 ? "交流讨论": "社区活动"}}论坛   
                            <span>{{item.post_time | transformDate}}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
            <div v-else class="none">
                <img :src="defaultError">
                <p>什么都没有</p>
            </div>
        </div>
        <div v-if="tab=='theme'">
            <ul class="list" v-if="data.post.length>0"> 
                <li v-for="(item, index) in data.post" :key="index">
                    <router-link tag="div" :to="'/forum/topic/'+ item.id">
                        <div class="item-top theme">
                            <img :src="userInfo.avatar || DefaultAvatar" />    
                            {{userInfo.uname}}
                            <span><i class="self-icon-bubbles2"></i> {{item.reply_num}}</span>
                            <!-- <span><i class="self-icon-eye"></i> {{item.reply_num}}</span> -->
                        </div> 
                        <!-- <p>回复：{{item.reply_num}}</p>    -->
                        <p>主题：{{item.title}}</p>
                        <div class="item-content">
                            来自：{{item.module==1 ? "交流讨论": "社区活动"}}论坛   
                            <span>{{item.post_time | transformDate}}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
            <div v-else class="none">
                <img :src="defaultError">
                <p>什么都没有</p>
            </div>
        </div>

    </div>    
</template>

<script>

import { mapMutations, mapActions, mapGetters } from 'vuex'
import { formatDate } from 'common/js/tools'

export default {
    data() {
        return {
            titleInfo: {
                title: '我的收藏/帖子',
                showIcon: false
            },
            tab: 'theme',
            a: 1,
            data: {
                post: [],
                reply: []
            },
            defaultError: require('../../../common/images/icons/none.jpg'),
        }
    },
    methods: {  
        ...mapActions([ 'handleTitle']),
        changeTab (index) { this.tab = index },
    },
    created() {
        this.axios.get("/member/getPostData")
            .then( response => {
                if (response.code==200) {
                    var data = response.data
                    this.data.post = data.post ? data.post : []
                    this.data.reply = data.reply ? data.post : []
                }
            })
    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon
        });
    },
    filters: {
        transformDate(time) {
            return formatDate(time, "yyyy-MM-dd")
        }
    },
    computed:{
        ...mapGetters(['userInfo'])
    }
}
</script>

<style lang="scss" scoped>
@import "../../../common/css/index.scss";

.mark-page {
    font-size: $font-size-small;  /*no*/
    @include color-background;
    min-height: 950px;
    .tab {
        height: 70px;
        @include box-sizing;
        border-bottom: 1px solid $border-color-d;  /*no*/
        font-size: $font-size-normal;  /*no*/
        div {
            height: 100%;
            width: 50%;
            line-height: 70px;
            @include box-sizing;
            text-align: center;
            &.active {
                color: $text-color-orange;
                border-bottom: 1px solid $text-color-orange-d;  /*no*/
                font-weight: 800;
            }
        }
    }
    .list { 
        li {
            border-bottom: 1px solid $text-color-orange-d;  /*no*/
            >div {
                margin: 25px 85px;
                height: 160px; 
                @include box-sizing;
                .item-top {
                    color: black;
                    margin-bottom: 20px;
                    // font-weight: 800; 
                    img { vertical-align: middle; width: 35px; @include border-radius(50%); margin-right: 10px; display: inline-block; }
                }
                .theme {
                    span { 
                        font-size: $font-size-min;  /*no*/
                        font-weight: normal;
                        float: right; margin-left: 30px; 
                        i { color: $text-color-orange; font-size: $font-size-small;  /*no*/ }
                    }
                }
                p { line-height: 1.5em;  @include no-wrap; }
                .item-content {
                    span { float: right; font-size: $font-size-min; /*no*/ }
                }
            }
        }
    }
    .none {
        padding-top: 75px;
        text-align: center;
        color: $text-color-ll;  /*no*/
        img { width: 165px; }
        p { margin-top: 15px; }
    }
}
</style>

