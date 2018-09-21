<template>
    <div class="settings">
        
        <router-link tag="div" to="/center/settings/personal"  class="item-tab">
            个人资料     
            <!-- <mt-badge v-if="unread" class="badge" type="error">{{unread}}</mt-badge> -->
            <i class=" self-icon-angle-right fa-lg "></i>
        </router-link>

        <router-link tag="div" to=""  class="item-tab">
            账号安全     
            <i class=" self-icon-angle-right fa-lg "></i>
        </router-link>
        
        <div  :class="['item-tab', {'active': msgIndex==3} ]">
            隐私设置     
            <i class=" self-icon-angle-right fa-lg "></i>
        </div>

        <div class="bottom-block">
            <div class="bottom-btn" @click="changeUserState">{{token ? "退出登录": "登&nbsp;&nbsp;&nbsp;&nbsp;录"}}</div>
        </div>
    </div>    
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { hasClass, removeClass, setClientHeight } from 'common/js/dom'

export default {
    data() {
        return {
            titleInfo: {
                title: '设置',
                showIcon: false
            },
            msgIndex: 0,
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        initTabStyle() {
            let height = setClientHeight();
            document.querySelector('.settings').style.minHeight = height +　'px'
        },
        changeTab (index, ev) {
            ev = ev || event;
            this.msgIndex = hasClass(ev.currentTarget, 'active') ? 0 : index
        },
        changeUserState() {         //登录或 退出登录
            if (this.token) {
                this.axios.get("/login/logout").then(res=> {
                    if (res.code==200) {    
                        Toast('登出成功');

                        this.$store.commit('LOGOUT');
                    }
                })
            } else {
                this.$router.push('/login')
            }
        }
    },
    computed: {
        ...mapGetters(['token'])
    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon
        });

        this.$nextTick(()=> this.initTabStyle() )
    }
}
</script>

<style lang="scss" scoped>
@import "../../../../common/css/index.scss";
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

