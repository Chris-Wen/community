<template>
    <div class="editor">
        <div class="nav">发布</div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                title: '发布主题',
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
@import '../../common/css/index.scss';

.editor {
    position: fixed;
    z-index: 20;
    width: 100%;
    height: 100%;
    @include color-background;
    font-size: $font-size-normal; /*no*/
    .nav {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 30px;
        height: 100px;
        line-height: 100px;
        color: red;
    }
}
</style>
