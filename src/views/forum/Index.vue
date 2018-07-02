<template>
    <div class="forum-index">
        <div class="top-tab" id="forumTab">
            <p :class="{ active: showIndex=='index' }" > <router-link to="/forum">交流讨论</router-link> </p>
            <p :class="{ active: showIndex=='activity' }" ><router-link to="/forum/activity">社区活动</router-link></p>
            <p :class="{ active: showIndex=='news' }" ><router-link to="/forum/news">掌动爆料站</router-link> </p>
            <p :class="{ active: showIndex=='game' }" ><router-link to="/forum/game">新游推荐</router-link></p>
        </div>
        <!-- <scroll class="view" :data="datalist"> -->
            <transition name="slide-fade">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        <!-- </scroll> -->
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
// import Scroll from 'base/Scroll/Scroll'

export default {
    // components: { Scroll },
    data() {
        return {
            titleInfo: {
                title: '掌动论坛',
                showIcon: true,
                icon: 'self-icon-comment-o fa-lg',
                link: '/editor',
            },
            showIndex: 'index',
            datalist: [],
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        _initTabStatus () {
                let url = window.location.href,  page, showEditIcon=true;

                switch(true) {
                    case /\/#\/forum\/activity/.test(url):    page = 'activity';
                        break;
                    case /\/#\/forum\/news/.test(url):    page = 'news';  showEditIcon = false;
                        break;
                    case /\/#\/forum\/game/.test(url):    page = 'game';  showEditIcon = false;
                        break;
                    case /\/#\/forum/.test(url):   page = 'index';  
                        break;
                }
                if (page) this.showIndex = page
                this.handleTitle({
                    title:    this.titleInfo.title, 
                    showIcon: showEditIcon,
                    icon: this.titleInfo.icon,
                    link: this.titleInfo.link
                })
            },
        
    },
    mounted() {
        this._initTabStatus()

        setTimeout(() => {
            this.datalist = [12,344]
        }, 5000);
    },
    watch: {
        '$route': '_initTabStatus'
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.forum-index {
    position: relative;
    font-size: $font-size-small; /*no*/
    padding-top: 73px;
    .top-tab {
        position: fixed;
        z-index: 1;
        top: 100px;
        width: 100%;
        height: 70px;
        line-height: 70px;
        background-color: $bg-color-d;
        padding: 0 50px;
        border-bottom: 1px solid $text-color-orange;  /*no*/
        @include box-sizing;
        @include flex-between;
        >p { 
            font-size: $font-size-normal; /*no*/
            font-weight: 500;
            a, a:visited { color: black }
            &.active {
                a { color: $text-color-orange; }
                font-weight: 800;
            }
        }
    }
    // .view { 
        .slide-fade-enter-active {
            transition: all .3s ease;
        }
        .slide-fade-leave-active {
            transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        }
        .slide-fade-enter, .slide-fade-leave-to {
            transform: translateX(10px);
            opacity: 0;
        } 
    // }
}

</style>
