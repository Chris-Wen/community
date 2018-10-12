<template>
    <div class="friend-info" v-if="data">
        <div class="top" >
            <div></div>
            <div class="info">
                <img :src="data.user.avatar ? (HOST + data.user.avatar) : DefaultAvatar" >
                <h1>{{data.user.nickname || data.user.username}}</h1>
                <div>
                    <span>关注：{{data.user.idol}} </span> <span>粉丝：{{data.user.fans}}</span> <span>发帖：{{data.user.posting}}</span>
                </div>
                <br>
                <span @click="attention" class="attention-btn color-grad-btn">关注</span>
            </div>
        </div>   
        <div class="content">
            <p>他的主题贴 </p>
            <div v-if="data.post" class="main">
                <ul>
                    <router-link tag="li" :to="'/forum/topic/'+item.id" v-for="(item, index) in data.post" :key="index">
                        <p>{{item.title}}</p>
                        <div>
                            来自<i>{{item.module == 1 ? '交流讨论' : '社区活动'}}</i>板块
                            <span><i class="self-icon-comment-o"></i> {{item.reply_num}}</span>
                            <!-- <span><i class="self-icon-eye"></i> {{111}}</span> -->
                        </div>
                    </router-link>
                </ul>
            </div>
            <div class="none" v-else>
                <img :src="NON_ICON">
                <p>什么都没有</p>
            </div>
        </div> 
    </div>    
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            data: ''
        }
    },
    created() {
        var uid = this.$route.query.uid
        if (uid) {
            this.axios.get("/Member/friendInfo?uid="+ uid)
                .then(response => {
                    if (response.code==200) {
                        this.data = response.data
                        let username = response.data.user.nickname || response.data.user.username

                        if (username) this.handleTitle({ title: username });
                    }
                })
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        attention() {

        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../../common/css/index.scss";

.friend-info {
    @include color-background;
    .top {
        text-align: center;
        >div:first-child { 
            width: 100%; height: 200px; max-height: 200px;
            @include big-background-image(url('../../../../common/images/global/bg-center1.jpg'))
        }
        .info {
            position: relative;
            padding-top: 45px;
            margin-bottom: 10px;
            img { 
                position: absolute;
                margin: auto;
                right: 0;
                left: 0;
                top: -100px;
                width: 125px; height: 125px; 
                @include border-radius(50%); 
                border: 1px solid white; /*no*/ 
            }
            h1 { text-align: center; margin-bottom: 20px; }
            div {
                display: flex;
                justify-content: center;
                span { margin: 0 10px; }
                margin-bottom: 30px;
            }
            .attention-btn {
                padding: .2em 1em;
            }
        }
    }
    .content {
        >p {
            text-indent: 1em;
            border-bottom: 1px solid $border-color-d;  /*no*/
            line-height: 2em;
            font-weight: 600;
        }
        .main {
            ul li {
                @include box-sizing;
                height: 130px;
                border-bottom: 1px solid $border-color-d;  /*no*/
                padding: 20px 40px 15px;
                text-align: justify;
                p {
                    line-height: 1.2em;
                    height: 2.4em;
                    max-height: 2.4em;
                    overflow: hidden;
                }
                div {
                    margin-top: 15px;
                    i { color: $text-color-orange-d }
                    span {
                        float: right;
                        margin: 0 15px 0 30px;
                    }
                }
            }
        }
        .none {
            padding: 50px 0 30px;
            text-align: center;
            color: $text-color-l;  /*no*/
            img { width: 165px; }
            p { margin-top: 15px; }
        }
    }
}
</style>
