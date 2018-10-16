<template>
    <div class="friend-list" v-if="data">
        <!-- <div class="search">
            <i class="self-icon-search"></i> <input type="text" placeholder="搜索：关注的人">
        </div> -->
        <ul class="list" v-if="data && data.length>0">
            <li v-for="(item,index) in data" :key="index">
                <img :src="item.avatar ? (HOST + item.avatar) : DefaultAvatar" >
                <div class="content flex-between">
                    <router-link tag="div" :to="{path: '/center/friend/info', query: {uid: item.uid==userInfo.uid ? item.target_uid : item.uid}}">
                        <h1>{{item.nickname || item.username}}</h1>
                        <p>{{item.signature || "这个人很懒，什么都没有留下"}}</p>
                    </router-link>
                    <div @click="attention(item.type, item.target_uid , item.uid, index)">
                        <span v-if="item.type==2">互相关注</span>
                        <span :class="{'active' : item.target_uid == userInfo.uid}" v-else>{{item.target_uid == userInfo.uid ? '关&nbsp;注' : '已关注'}}</span>
                    </div>
                </div>
            </li>
        </ul>
        <div v-else class="none">
            <img :src="NON_ICON" >
            <p>什么都没有</p>
        </div>
    </div>        
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            titleInfo: {
                title: '我的关注/粉丝/好友',
                showBottomTab: true
            },
            data: '',
        }
    },
    methods: {
        ...mapActions(['handleTitle']),
        attention(type, target_uid, uid, index) {
            if (type==2) return;                //暂时只做关注动作，其他动作不做
            if (this.userInfo.uid == target_uid) {
                this.axios.get("/member/attention?uid="+ uid)
                    .then(response => {
                        if (response.code == 200) {
                            this.data[index].type=2
                        }
                    })
            }
        }
    },
    created() {
        this.axios.get("/member/getUserRelationship")
            .then(response => {
                if (response.code==200) {
                    this.data = response.data
                }
            })
    },
    mounted() {
        this.$nextTick().then(()=>{
            this.handleTitle({
                title: this.titleInfo.title,
                showBottomTab: this.titleInfo.showBottomTab
            })
        })
    },
    computed: {
        ...mapGetters(['userInfo'])
    }
}
</script>

<style lang="scss" scoped>
@import "../../../../common/css/index.scss";

.friend-list {
    .search {
        border-bottom: 1px solid $border-color-d;  /*no*/
        text-align: center;
        height: 60px;
        line-height: 60px;
        position: relative;
        input {
            width: 80%;
            text-indent: 2.5em;
            height: 1.5em;
            @include border-radius(2em);
            background: #ebebeb;
            outline: none;
        }
        i { 
            color: $text-color-l; 
            position: absolute;
            left: 13%;
        }
    }
    .list {
        li {
            height: 140px;
            position: relative;
            img { 
                width: 100px;
                height: 100px;
                @include border-radius(50%);
                position: absolute;
                margin: auto 30px;
                top: 0;
                bottom: 0;
            }
            .content {
                @include box-sizing;
                height: 100%;
                // display: flex;
                // flex-flow: row nowrap;   
                align-items: center;             
                margin-left: 80px;
                border-bottom: 1px solid $border-color-d;  /*no*/
                padding: 20px 0 20px 65px;
                div {
                    &:first-child {
                        @include no-wrap; 
                        p { margin-top: 15px; @include no-wrap; color: $text-color-l; }
                    }
                    &:last-child {
                        width: 6em;
                        // margin-right:40px; 
                        text-align: center;
                        span {
                            display: block;
                            height: 1.65em;
                            line-height: 1.65em;
                            width: 5em;
                            border: 1px solid $text-color-l;  /*no*/
                            border-radius: 1em;
                            color: $text-color-dark;
                            &.active {
                                border: 0;
                                background: $text-color-orange;
                                color: white;
                            }
                        }
                    }
                }
            }
        }
        
    }
    .none {
        text-align: center;
        color: $text-color-ll;
        img { border-radius: 100%; width: 150px; margin: 30px 0; }
    }
}
</style>

