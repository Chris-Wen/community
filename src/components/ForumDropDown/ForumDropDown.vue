<template>
    <ul class="forum-drop-down">
        <li @click="_store(itemId, isStored)">{{ isStored ? '已收藏' : '收藏'}}</li>
        <li @click="_reply(itemId)">回复</li>
        <li v-if="userId==itemUserId">删除</li>
    </ul>
</template>

<script>
export default {
    name: 'DropDown',
    props: {
        userId: { type: Number, default: 0 },           //当前登录用户id
        itemUserId: { type: Number, default: 0 },       //评论主楼用户id
        itemId: { type: Number, default: 0 },           //评论主楼id
        isStored: { type: Boolean, default: false },    //是否已收藏
    },
    methods: {
        _reply(index) {
            this.$emit('reply', index)
        },
        _store(index) {
            this.$emit('store', index)
        }
    }
}
</script>

<style lang="scss">
@import "../../common/css/index.scss";

.forum-drop-down {
    position: absolute;
    top: -30px;
    right: 0;
    @include color-background;
    width: 150px;
    border: 1px solid $border-color-d;  /*no*/
    li {
        height: 54px;
        line-height: 54px;
        border-bottom: 1px solid $border-color-d;  /*no*/
        text-align: center;
        &:last-child { border: 0; }
    }
}
</style>

