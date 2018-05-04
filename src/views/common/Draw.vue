<template>
    <div class="draw">
        抽奖页面
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                title:  '掌动社区——快乐生活是我们的追求！',
                showIcon:   false
            }
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']) 
    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon, 
        });
    }
}
</script>

<style lang="scss" scoped>

</style>
