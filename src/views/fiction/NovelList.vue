<template>
    <div class="novel-list" ref="page">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" 
        :bottomPullText="'上拉加载更多'" :bottomDistance="50" :maxDistance="80" ref="loadmore">          
            <div class="page-top">
                <em>{{titleInfo.title}}</em> 
                <span @click="reverseOrder">[倒序]</span>
                <span @click="order">[正序]</span>
            </div>
            <ul class="list">
                <router-link tag="li" :to="'/fiction/chapter/'+index" v-for="(item, index) in datalist" :key="index">第{{item}}章   咯热门咯热门咯热门咯热门咯热门咯热门咯热门咯热门</router-link>
            </ul>
        </mt-loadmore>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Loadmore } from 'mint-ui'
import { setClientHeight } from 'common/js/dom'

export default {
    components: { mtLoadmore : Loadmore },
    data() {
        return {
            titleInfo: {
                title: '小说目录',
                showIcon: false
            },
            allLoaded: false,
            datalist: [1,2,3,4,5,6,7,8,9,10,8,9,10],
            page: 0,
        }
    },
    methods: {
        ...mapMutations({handleTitle : 'SET_TITLE'}),
        loadBottom() {
            console.log('加载更多操作')

            // this.allLoaded = true;  // 若数据已全部获取完毕
            setTimeout(() => {
                this.datalist = this.datalist.concat([1,2,3,4,5,6,7,8,9,10])
                this.$refs.loadmore.onBottomLoaded();
            }, 2000);
        },
        order() {
            console.log(1)
        },
        reverseOrder() {
            console.log(2)
        }
    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon
        })

        this.$nextTick(()=>{
            this.$refs.page.style.height = setClientHeight() + 'px'
        })
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.novel-list {
    font-size: $font-size-small;  /*no*/
    @include color-background;
    /deep/ .mint-loadmore-bottom { color: red}
    overflow: auto;
    .page-top {
        padding: 30px 70px;
        border-bottom: 1px solid $border-color-d; /*no*/
        em {  
            font-size: $font-size-normal;  /*no*/
            font-weight: bold;
        }
        span { 
            float: right;
            color: red;
            margin: 0 8px;
            @include extend-click;

        }
    }
    .list {
        padding: 0px 70px;
        line-height: 3;
        li {
            @include no-wrap;
            border-bottom: 1px solid $border-color-d; /*no*/
        }
    }
}
</style>
