<template>
    <div class="novel-list" ref="page">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" 
            :bottomPullText="'上拉加载更多'" :bottomDistance="50" :maxDistance="80" ref="loadmore">          
            <div class="page-top">
                <em>{{titleInfo.title}}</em> 
                <span @click="reverseOrder">[倒序]</span>
                <span @click="order">[正序]</span>
            </div>
            <ul class="list" v-if="datalist">
                <router-link tag="li" :to="'/fiction/chapter/'+item.id" v-for="(item, index) in datalist" :key="index">
                    {{item.chapter_name}}123
                </router-link>
            </ul>
            <div v-else>暂无数据</div>
        </mt-loadmore>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Loadmore } from 'mint-ui'
import { setClientHeight } from 'common/js/dom'
// import * as api from 'api/api'

export default {
    components: { mtLoadmore : Loadmore },
    data() {
        return {
            titleInfo: {
                title: '目录',
                showIcon: false
            },
            allLoaded: false,
            datalist: null,
            page: 0,
        }
    },
    methods: {
        ...mapMutations({handleTitle : 'SET_TITLE'}),
        getNovelChapterList(sort) {         //sort  1: 反序列
            this.api.get("/novel/getNovelChapterList", {params: {'novel_id':this.$route.params.novelId, sort }})
                .then(response =>{
                    if (response.code==200) {
                        if (!sort) {
                            this.datalist = response.data.list
                        }

                        if (this.page == response.page_amount) this.allLoaded = true;
                    }
                })
        },
        loadBottom() {
            // this.allLoaded = true;  // 若数据已全部获取完毕


            this.$refs.loadmore.onBottomLoaded();
        },
        order() {
            console.log(1)
        },
        reverseOrder() {
            console.log(2)
        }
    },
    created() {
        this.getNovelChapterList()
    },
    mounted() {
        this.handleTitle({
            title:    this.$route.params.novelName, 
            showIcon: this.titleInfo.showIcon
        })

        this.$nextTick(()=>{            //使用上拉加载更多，前提条件设置容器固定大小
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
