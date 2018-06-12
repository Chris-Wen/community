<template>
    <div :class="[{'mask': showMask}, 'toast-popup']">
        <div class="toast">
            <span v-if="showCloseBtn" @click="_cancle" class="btn-close"><i class="self-icon-close"></i></span>
            <div class="title"> {{title}}</div>
            <div class="msg">
                <div v-if="msg">{{msg}}</div>
                <slot></slot>
            </div>
            <div class="btn-group">
                <div @click="_handleClick(false)" :class="[{'active': showStyle=='leftBtn'}, selfClass]">{{leftBtn }}</div>
                <div @click="_handleClick(true)" :class="[{'active': showStyle=='rightBtn'}, selfClass]">{{rightBtn }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SelfToast',
    props: {
        showMask: {
            type: Boolean,
            default: true
        },
        showCloseBtn: {
            type: Boolean,
            default: false
        },
        title: { default: '' },
        msg: { default: '' },
        leftBtn: { default: '取消' },
        rightBtn: { default: '确定' },
        selfClass: { default: '' },
        showStyle: { default: 'leftBtn' }
    },
    methods: {
        _handleClick(index) {
            this.$emit('handleClick', index)
        },
        _cancle() {
            this.$emit('cancle')
        }
    }
}
</script>

<style lang="scss">
@import '../../common/css/index.scss';
@keyframes glow {
    0% {
        border-color: rgba(255, 0, 0, .5);
        box-shadow: 0 0 20px rgba(255, 0, 0,.6), inset 0 0 10px rgba(255, 0, 0,.4), 0 1px 0 rgba(255, 0, 0, .5);
    }
    100% {
        border-color: red;
        box-shadow: 0 0 5px rgba(255, 0, 0,.2), inset 0 0 5px rgba(255, 0, 0,.1), 0 1px 0 red;
    }
} 

@keyframes glow1 {
    0% {
        border-color: rgba(255, 0, 0, 1);
        box-shadow: 0 0 20px rgba(255, 0, 0,.6), inset 0 0 10px rgba(255, 0, 0,.4), 0 1px 0 rgba(255, 0, 0, 1);
    }
    100% {
        border-color: #fff;
        // box-shadow: 0 0 5px rgba(255, 0, 0,.2), inset 0 0 5px rgba(255, 0, 0,.1), 0 1px 0 #fff;
    }
}

.toast-popup{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    padding-top: 50%;
    .toast {
        position: relative;
        font-size: 16px; /*no*/
        margin: auto;
        width: 75%;
        max-width: 480px;
        height: auto;
        text-align: center;
        z-index: 100;
        padding-top: 30px;
        @include color-background;
        @include border-radius(.5em);
        .btn-close {
            position: absolute;
            top: -12.5px;
            right: -12.5px;
            color: white;
            display: block;
            background: #ff6767;
            width: 35px;
            height: 35px;
            line-height: 32px;
            @include border-radius(50%);
            &:before {
                content: '';
                position: absolute;
                top: -10px;
                left: -10px;
                right: -10px;
                bottom: -10px;
            }
        }
        .title {
            font-size: 18px;  /*no*/
            font-weight: 600;
            line-height: 1.2em;
            margin-bottom: 15px;
        }
        .msg { 
            padding: 0 80px 40px; 
            color: $text-color-dark; text-align: justify; 
            line-height: 1.2em;
            img { width: 100px; height: 100px; @include border-radius(.6em); margin-bottom: 15px; }
        }
        .btn-group {
            border-top: 1px solid $border-color-d;  /*no*/
            background: #f7f7f7;
            display: flex;
            border-bottom-left-radius: .5em;
            border-bottom-right-radius: .5em;
            div {
                @include box-sizing;
                flex: 1; 
                font-weight: 550;
                width: 50%;
                height: 85px;
                line-height: 85px;
                &.active { 
                    border: 1px solid red;  /*no*/
                    animation: glow1 800ms ease-out infinite alternate; 
                }
                &:first-child { border-bottom-left-radius: .5em; color: $text-color-dark;}
                &:last-child { 
                    color: $text-color-orange-d; 
                    border-left: 1px solid $border-color-d; /*no*/ 
                    border-bottom-right-radius: .5em;
                }
            }
        }
    }
}
</style>

