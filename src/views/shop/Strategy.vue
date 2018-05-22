<template>
    <div class="strategy">
        这是积分攻略页面    
    </div>    
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                title: '积分攻略',
                showIcon: false
            }
        }
    },
    methods: {
        ...mapActions(['handleTitle']),
    },
    mounted() {
        this.handleTitle({
            title:  this.titleInfo.title,
            showIcon: this.titleInfo.showIcon
        })
    }
}
</script>

<style lang="scss" scoped>


</style>
