<template>
    <div class="fiction-index">
        <div class="fiction-top">
            <ul class="banner" v-if="recommends && recommends.length">
               <slider>
                    <div v-for="(item, index) in recommends" :key="index">
                        <a :href="item.link">
                            <img class="needsclick" :src="item.img">
                        </a>
                    </div>
                </slider>
                <router-link tag="div" to="/fiction/recommend" class="link-more">更多>>></router-link>
            </ul>
        </div>
        <div class="view" v-if="novelData">
            <div :class="['tab', {'fixed': topTabFixed}]" ref="tab" >
                <router-link tag="div" to="/fiction"> <span :class="{ active: tabIndex=='original' }" >原创</span> </router-link>
                <router-link tag="div" to="/fiction/relative"> <span :class="{ active: tabIndex=='relative' }" >同人</span> </router-link>
                <router-link tag="div" to="/fiction/complete"> <span :class="{ active: tabIndex=='complete' }" >完结</span> </router-link>
                <router-link tag="div" to="/fiction/rank"> <span :class="{ active: tabIndex=='rank' }" >排行</span> </router-link>
            </div>
            <transition name="slide-fade">
                <router-view :original="novelData.original" :relative="novelData.relative"
                     :complete="novelData.complete" :rank="novelData.rank" />
            </transition>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import Slider from '../../base/Slider/Slider'
import * as api from 'api/api'

export default {
    components: { Slider },
    data() {
        return {
            titleInfo: {
                title: '掌动小说',
                showIcon: false,
                hideReturnIcon: true,
            },
            tabIndex: 'original',
            isUnfold: false,
            topTabFixed: false,
            recommends: null,       //推荐栏
            novelData: null         //小说列表
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        handleScroll () {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let dom = this.$refs.tab

            if (!dom) { return;  }
            this.topTabFixed = scrollTop >= dom.offsetTop 
        },
        initTabStatus () {
            let url = this.$route.fullPath,  page;

            switch(true) {
                case /fiction\/relative/.test(url):    
                        page = 'relative';
                    break;
                case /fiction\/complete/.test(url):    
                        page = 'complete';
                    break;
                case /fiction\/rank/.test(url):    
                        page = 'rank';
                    break;
                case /fiction$/.test(url):   
                        page = 'original';
                    break;
            }
            if (page) this.tabIndex = page
        },  
    },
    created() {
        api.get("/novel/index").then(response=>{
            if (response.code==200) {
                this.recommends = response.data.ad_list
                this.novelData = response.data.novel_list
            }
        })
    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            hideReturnIcon: this.titleInfo.hideReturnIcon,
            showIcon: this.titleInfo.showIcon,
        })
        this.initTabStatus()

        window.addEventListener('scroll', this.handleScroll)

    },
    watch: {
        '$route': 'initTabStatus'
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll); // 离开页面 关闭监听 不然会报错
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.fiction-index {
    width: 100%;
    height: auto;
    position: relative;
    font-size: $font-size-small; /*no*/
    @include  color-background;
    .fiction-top {
        width: 100%;
        @include box-sizing;
        .banner {
            width: 100%;
            height: 200px;
            position: relative;
            @include box-sizing;
            overflow: hidden;
            >div{ height: 200px; }
            .link-more {
                font-size: $font-size-min;  /*no*/
                height: 1em;
                position: absolute;
                // transform: scale(.85);
                right: 0;
                bottom: 0;
                color:　$text-color-orange-d;
                padding: 10px; 
            }
        }
    }
    .fixed { position: fixed; top: 100px; z-index: 10;  }
    .tab {
        width: 100%;
        height: 74px;
        line-height: 74px;
        background-color: $bg-color-d;
        @include flex-around;
        font-size: $font-size-normal; /*no*/
        border-bottom: 1px solid $text-color-orange-d;  /*no*/
        .active { color: $text-color-orange-d; font-weight: 600  }
        span { padding: 0 1em }
    }
    .view { 
        // margin-top: 73px;
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
