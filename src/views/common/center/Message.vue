<template>
    <div class="center-message">
        
        <div @click="changeTab(1)" :class="['item-tab', {'active': msgIndex==1} ]">
            系统消息     
            <mt-badge v-if="unread" class="badge" type="error">{{unread}}</mt-badge>
            <i :class="[ msgIndex ==1 ? 'self-icon-angle-down' : 'self-icon-angle-right', 'fa-lg']"></i>
        </div>
        <ul v-if="msgIndex==1" class="content">
            <li v-for="(item, index) in data" :key="index" @touchstart="touchStart" @touchend="touchEnd">
                <slider-delete>
                    <div class="msg-list">
                        <h2>消息标题消息标题消息标题消息标题</h2>
                        <div class="msg">
                            <p>消息内容消息内容消息内容消息内容消息内容消息内容消息内容</p>
                        </div> 
                        <p>{{'2018-05-29 12:30'}}</p>
                    </div>
                </slider-delete>
            </li>
        </ul>
        <div @click="changeTab(2)" :class="['item-tab', {'active': msgIndex==2} ]">我的帖子     <i :class="[ msgIndex ==2 ? 'self-icon-angle-down' : 'self-icon-angle-right', 'fa-lg']"></i></div>
        <ul v-if="msgIndex==2" class="content">
            <li>
                <slider-delete>
                    <div class="msg-list">
                        <h2>消息标题消息标题消息标题消息标题</h2>
                        <div class="msg">
                            <p>消息内容消息内容消息内容消息内容消息内容消息内容消息内容</p>
                        </div> 
                    </div>
                </slider-delete>
            </li>
        </ul>
        <div @click="changeTab(3)" :class="['item-tab', {'active': msgIndex==3} ]">我收到的回复     <i :class="[ msgIndex ==3 ? 'self-icon-angle-down' : 'self-icon-angle-right', 'fa-lg']"></i></div>
        <ul v-if="msgIndex==3" class="content">
            <li>
                <slider-delete>
                    <div class="msg-list">
                        <h2>消息标题消息标题消息标题消息标题</h2>
                        <div class="msg">
                            <p>消息内容消息内容消息内容消息内容消息内容消息内容消息内容</p>
                        </div> 
                    </div>
                </slider-delete>
            </li>
        </ul>
    </div>    
</template>

<script>
import { Badge } from 'mint-ui'
import { mapMutations, mapActions } from 'vuex'
import SliderDelete from '../../../base/SliderDelete/SliderDelete'
import { hasClass, removeClass } from 'common/js/dom'

export default {
    components: { SliderDelete, 'mt-badge': Badge },
    data() {
        return {
            titleInfo: {
                title: '消息',
                showIcon: false
            },
            msgIndex: 0,
            sliderDeleteParams: {
                lastTouch:　'',
                targetTouch: ''
            },
            data: [1,2,3,4,5,6],
            unread: 12
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        changeTab (index, ev) {
            ev = ev || event;
            this.msgIndex = hasClass(ev.currentTarget, 'active') ? 0 : index
        },
        touchStart(ev) {
            ev = ev || event;
            this.sliderDeleteParams.lastTouch = this.sliderDeleteParams.targetTouch;
            this.sliderDeleteParams.targetTouch = ev.currentTarget;
        },
        touchEnd(ev) {
            ev = ev || event;
            //若上一个左滑项与当前触摸项不是同一个。上一个左滑项右滑，不再显示删除按钮
            if ( this.sliderDeleteParams.lastTouch && (this.sliderDeleteParams.lastTouch !== this.sliderDeleteParams.targetTouch)) { 
                removeClass(this.sliderDeleteParams.lastTouch.children[0].children[0], 'left-slider')
            }   
        } 
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
@import "../../../common/css/index.scss";

.center-message {
    font-size: $font-size-small;  /*no*/
    @include color-background;
    min-height: 950px;
    .item-tab {
        font-weight: 800;
        padding: 1em 35px;
        color: $text-color-dark;
        border-bottom: 1px solid $border-color-d;  /*no*/
        .badge { font-size: $font-size-min; /*no*/ margin-left: .5em; }
        i { float: right; }
    }
    .active { color: $text-color-orange;}
    .content {
        border-bottom: 1px solid $border-color-d;  /*no*/
        .msg-list {
            margin: 25px 40px 0 40px;
            border-bottom: 1px solid $text-color-l;  /*no*/
            padding-bottom: 25px;
            h2 { @include no-wrap; font-weight: 500 }
            >p { text-align: right; color: $text-color-l; font-size: $font-size-min; /*no*/ }
            .msg { margin-top: 10px; text-align: justify; color: $text-color-l; }
        }
        li:last-child .msg-list { border: 0 }
    }
}
</style>

