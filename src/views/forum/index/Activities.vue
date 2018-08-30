<template>
    <div class="topiclist">
        <ul class="recommend" v-if="datalist.activity && datalist.activity.length !==0">
            <router-link tag="li" :to="'/forum/article/'+ item.acid" v-for="(item, index) in datalist.activity" :key="index">
                <h1 v-if="item.type==1"> ★★★★★<i>【限时任务】</i>★★★★★</h1>
                <h1 v-if="item.type==2"> ★★★★★<i>【日常任务】</i>★★★★★</h1>
                <h1 v-if="item.type==3"> ★★★★★<i>【特殊任务】</i>★★★★★</h1>
                <p>{{item.activity}}</p>
            </router-link>
        </ul>
        <p class="part"> 用户帖子 </p>
        <ul class="article" v-if="datalist.posts && datalist.posts.length !==0">
            <li v-for="(item, index) in datalist.posts" :key="index">
                <p> {{item.title}}</p>
                <div>
                    <span><i></i> {{item.nickname || item.username}}</span>
                    <span ><i class="self-icon-comment-o"></i> {{item.reply_num}}</span>
                    <span ><i class="self-icon-clock"></i>{{item.post_time | formatDate}}</span>
                </div>
            </li>
        </ul>
        <div v-else style="text-align:center; margin: 10px">暂无帖子</div>
    </div>
</template>

<script>
import * as api from 'api/api'
import { formatDate, postTime } from 'common/js/tools'
import { mapMutations} from 'vuex'


export default {
    data() {
        return {
            datalist: {
                activity: [],
                posts: [],
                hasCache: false
            },
        }
    },
    created() {
        let data = sessionStorage.getItem('forum_activity_data')
        this.dataList = data ? JSON.parse(data) : this.getPostList()
        this.hasCache = data ? true: false
    },
    methods: {
        ...mapMutations({setPostType : 'SET_EDITOR_TYPE'}),
        getPostList (page=0) {  
            api.get('/forum/activity', {page}).then( res => {
                if (res.code==200) {
                    this.datalist.activity = res.data['activity'] 
                    this.datalist.posts = res.data['posts'] 

                    !this.hasCache && sessionStorage.setItem('forum_activity_data', JSON.stringify(res.data))
                }
            })
        }
    },
    mounted() {
        //vuex  设置发帖模块 社区活动帖子
        this.setPostType( 2 )
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
    ul li {
        height: 142px;
        width: 100%;
        @include box-sizing;
        border-top: 1px solid $text-color-orange; /*no*/
        padding: 20px 40px 10px;
        &:first-child { border: 0; }
        p { 
            max-height: 2.3em;
            height: 2.3em;
            @include lines-nowrap(2);
            @include text-justify(1.2em);
            margin-bottom: 25px;
        }
        div {
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
        @include color-background;
        padding: 0 35px;
        li { 
            min-height: 110px;
            padding: 25px 20px; 
            @include flex-colum;
            justify-content: space-between;
            p, h1 { text-align: center;} 
            p { margin: 0 }
            &:nth-child(odd) { h1 { color: red }} 
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
