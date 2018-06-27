<template>
    <div class="fiction-chapter">
        <p class="title">第一章 上天入地</p>
        <div class="html" v-html="data">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae debitis, non excepturi repudiandae repellat, hic eum illo voluptate ipsum assumenda libero vitae quidem consectetur, iusto deserunt reiciendis minus voluptates adipisci.
        </div>
        <div class="btn-groups">
            <router-link tag="button" to="#">上一章</router-link>
            <router-link tag="button" to="#">下一章</router-link>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                title: '章节内容',
                showIcon: false
            },
            datalist: [1,2,3,4,5,6,7,8,9,10],
            data: `<p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae debitis, non excepturi repudiandae repellat, hic eum illo voluptate ipsum assumenda libero vitae quidem consectetur, iusto deserunt reiciendis minus voluptates adipisci.</p>
                <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae debitis, non excepturi repudiandae repellat, hic eum illo voluptate ipsum assumenda libero vitae quidem consectetur, iusto deserunt reiciendis minus voluptates adipisci.</p>
                <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae debitis, non excepturi repudiandae repellat, hic eum illo voluptate ipsum assumenda libero vitae quidem consectetur, iusto deserunt reiciendis minus voluptates adipisci.</p>
                <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae debitis, non excepturi repudiandae repellat, hic eum illo voluptate ipsum assumenda libero vitae quidem consectetur, iusto deserunt reiciendis minus voluptates adipisci.</p>
                <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae debitis, non excepturi repudiandae repellat, hic eum illo voluptate ipsum assumenda libero vitae quidem consectetur, iusto deserunt reiciendis minus voluptates adipisci.</p>
            `
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

.fiction-chapter {
    font-size: $font-size-small;  /*no*/
    @include color-background;
    min-height: 960px;
    padding: 30px;
    .title { font-size: $font-size-normal;  /*no*/ line-height: 2em; }
    .html {
        line-height: 1.5;
        text-align: justify;
        text-indent: 2em;
    }
    .btn-groups {
        display: flex;
        margin-top: 50px;
        button {
            color: $text-color-orange;
            flex: 1;
            @include color-background;
            border: 0;
            border-right: 1px solid $border-color-d;
            outline: 0;
        }
    }
}
</style>
