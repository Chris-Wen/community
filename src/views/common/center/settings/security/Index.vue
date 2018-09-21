<template>
    <div class="settings">
        <router-view></router-view>
    </div>    
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { hasClass, removeClass, setClientHeight } from 'common/js/dom'

export default {
    data() {
        return {
            titleInfo: {
                title: '账号安全',
                showIcon: false,
            },
            msgIndex: 0,
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        // initTabStyle() {
        //     let height = setClientHeight();
        //     document.querySelector('.settings').style.minHeight = height +　'px'
        // },

    },
    computed: {
        ...mapGetters(['token'])
    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon
        });

        // this.$nextTick(()=> this.initTabStyle() )
    }
}
</script>

<style lang="scss" scoped>
@import "../../../../../common/css/index.scss";
.already {
    color: red !important; 
}
.settings {
    font-size: $font-size-small;  /*no*/
    @include color-background;
    // @include box-sizing;
    .item-tab {
        font-weight: 800;
        padding: 1em 35px;
        color: $text-color-dark;
        border-bottom: 1px solid $border-color-d;  /*no*/
        // .badge { font-size: $font-size-min; /*no*/ margin-left: .5em; }
        i { float: right; }
    }
    .active { color: $text-color-orange;}

    .bottom-btn {
        font-size: 1.15em;
        margin: 8em auto 0;
        padding: .5em 1em;
        width: 5em;
        border:  1px solid $border-color-d; /*no*/
        @include border-radius(.3em);
        @include color-grad-btn;
    }
}
</style>

