<template>
    <div class="novel-list">
        <ul class="list">
            <router-link tag="li" :to="'/fiction/chapter/'+index" v-for="(item, index) in datalist" :key="index">第{{item}}章   咯热门咯热门咯热门咯热门咯热门咯热门咯热门咯热门</router-link>
        </ul>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Loadmore } from 'mint-ui'
// import Scroll from 'base/Scroll/Scroll'

export default {
    components: { mtLoadmore : Loadmore },
    data() {
        return {
            titleInfo: {
                title: '小说目录',
                showIcon: false
            },
            allLoaded: false,
            datalist: [1,2,3,4,5,6,7,8,9,10]
        }
    },
    methods: {
        ...mapMutations({handleTitle : 'SET_TITLE'}),
        //上、下拉刷新加载
        loadTop() {
            console.log('刷新操作')
            this.$refs.loadmore.onTopLoaded();
        },
        loadBottom() {
            console.log('加载更多操作')

            this.allLoaded = true;  // 若数据已全部获取完毕
            this.$refs.loadmore.onBottomLoaded();
        }
    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon
        })
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.novel-list {
    font-size: $font-size-small;  /*no*/
    @include color-background;
    min-height: 960px;
    .list {
        padding: 30px 70px;
        line-height: 3;
        li {
            @include no-wrap;
            border-bottom: 1px solid $border-color-d; /*no*/
        }
    }
}
</style>
