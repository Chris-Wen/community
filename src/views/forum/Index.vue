<template>
    <div class="forum-index">
        <div class="top-tab">
            <p :class="{ active: showIndex=='index' }" > <router-link to="/forum">交流讨论</router-link> </p>
            <p :class="{ active: showIndex=='activity' }" ><router-link to="/forum/activity">社区活动</router-link></p>
            <p :class="{ active: showIndex=='news' }" ><router-link to="/forum/news">掌动爆料站</router-link> </p>
            <p :class="{ active: showIndex=='game' }" ><router-link to="/forum/game">新游推荐</router-link></p>
        </div>
        <div class="view">
            <transition name="slide-fade">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                title: '掌动社区——快乐生活是我们的追求！',
                showIcon: false
            },
            showIndex: 'index'
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        _initTabStatus () {
                    let url = window.location.href,  page;

                    switch(true) {
                        case /\/#\/forum\/activity/.test(url):    page = 'activity';
                            break;
                        case /\/#\/forum\/news/.test(url):    page = 'news';
                            break;
                        case /\/#\/forum\/game/.test(url):    page = 'game';
                            break;
                        case /\/#\/forum/.test(url):   page = 'index';
                            break;
                    }
                    if (page) this.showIndex = page
            },
        
    },
    mounted() {
        this._initTabStatus()

        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon,
        })
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
    .top-tab {
        position: fixed;
        z-index: 10;
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
    .view { 
        margin-top: 73px;
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
    }
}

</style>
