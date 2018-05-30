<template>
    <div class="friend-page">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                title: '我的关注',
                showIcon: false
            }
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),

    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon
        });
    }
}
</script>

<style lang="scss" scoped>
@import "../../../../common/css/index.scss";

.friend-page {
    font-size: $font-size-small;  /*no*/
    @include color-background;
    min-height: 950px;
    
}
</style>

