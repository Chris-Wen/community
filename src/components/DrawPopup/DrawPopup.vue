<template>
    <div class="mask-bg">
        <!-- 闪星效果 -->
        <ul class="flash-star">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <div class="cover">
            <!-- 光束效果 -->
            <ul class="decoration-light">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <div class="container">
               <div class="popup-container">
                    <div class="prize-info">
                            <!-- 奖品内容 -->
                        <slot></slot>
                    </div>
                    <img src="../../common/images/global/cover.png">
                </div> 
                <div class="btn-group">
                    <div @click="_handleClick(false)" :class="[{'active': showStyle=='leftBtn'}, selfClass]">{{leftBtn }}</div>
                    <div @click="_handleClick(true)" :class="[{'active': showStyle=='rightBtn'}, selfClass]">{{rightBtn }}</div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'DrawPopup',
    props: {
        leftBtn: { default: '取消' },
        rightBtn: { default: '确定' },
        selfClass: { default: '' },
        showStyle: { default: 'rightBtn' }
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

<style lang="scss" scoped>
@import '../../common/css/index.scss';
@keyframes flash {
    0% { opacity: 1; }
    100% { opacity: 0.1; }
} 

@keyframes glow {
    0% {
        border-color: rgba(255, 0, 0, 1);
        box-shadow: 0 0 20px rgba(255, 0, 0,.6), inset 0 0 10px rgba(255, 0, 0,.4), 0 1px 0 rgba(255, 0, 0, 1);
    }
    100% {
        border-color: #fff;
        box-shadow: 0 0 5px rgba(255, 0, 0,.2), inset 0 0 5px rgba(255, 0, 0,.1), 0 1px 0 #fff;
    }
}

.mask-bg {
    @include mask-bg;
    overflow: hidden;
    @include box-sizing;
    .flash-star li{
        position: absolute;     
        z-index: 5;
        @include background-image(url('../../common/images/icons/flash-star.png'));
        width: 60px;
        height: 60px;
        &:nth-child(1) {
            top: 10%;
            left: 50%;
            animation: flash 1.5s ease-in-out infinite;
        }
        &:nth-child(2) {
            top: 16%;
            left: 11%;
            transform: scale(0.7);
            animation: flash 1.2s ease-in-out infinite;
        }
        &:nth-child(3) {
            top: 42%;
            left: 25%;
            animation: flash 1.7s ease-in-out infinite;
            transform: scale(0.9)
        }
        &:nth-child(4) {
            top: 46%;
            left: 70%;
            animation: flash 1.6s ease-in-out infinite;
            transform: scale(0.7)
        }
        &:nth-child(5) {
            top: 28%;
            left: 65%;
            animation: flash 1.55s ease-in-out infinite;
            transform: scale(0.7)
        }
        &:nth-child(6) {
            top: 20%;
            right: 7%;
            animation: flash 1.9s ease-in-out infinite;
            transform: scale(0.7)
        }
    }
    .cover {
        text-align: center;
        position: relative;
        .decoration-light>li{
            position: absolute;
            height: 500px;
            width: 75px;
            background: -webkit-gradient(linear, bottom, top, from(#FEDB2E), to(#543022)); 
            background: linear-gradient(to top, #FEDB2E, #543022);
            opacity: 0.7;
            &:nth-child(1) {
                transform: rotate(35deg) translateX(50px);
                right: 0;
            }
            &:nth-child(2) {
                transform: rotate(35deg) translateY(-100px);
                right: 15%;
            }
            &:nth-child(3) {
                transform: rotate(20deg) translateY(-150px);
                right: 30%;
            }
            &:nth-child(4) {
                transform: translateY(-150px);
                right: 40%;
            }
            &:nth-child(5) {
                transform: rotate(-5deg) translateY(-150px);
                right: 60%;
            }
            &:nth-child(6) {
                transform: rotate(-25deg) translateY(-100px);
                right: 75%;
            }
            &:nth-child(7) {
                transform: rotate(-35deg) translateX(-50px);
                left: 0;
            }
        }
        .container {
            position: absolute;
            z-index: 1;
            left: 0;
            right: 0;
            margin: auto;
            width: 529px;
            height: auto;
        }
        .popup-container {
            position: relative;
            margin-top: 40%;
            width: 100%;
            height: 510px;
            background-image: url('../../common/images/global/prize-popup-bg.png');
            background-size: 529px 502px;
            background-position: center bottom;
            background-repeat: no-repeat;
            .prize-info {
                // text-align: center;
                position: absolute;
                top: 180px;
                margin: 0 auto;
                left: 0;
                right: 0;
                color: black;
                font-size: $font-size-large;  /*no*/
                line-height: 2em;
                letter-spacing: 0.1em;
                >img { width: 170px; @include border-radius(0.5em) }
            }
            >img {
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
            }
        }
    }
    .btn-group {
        width: 100%;
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        div {
            display: inline-block;
            width: 210px;
            height: 80px;
            line-height: 80px;
            font-size: $font-size-normal;  /*no*/
            background-color: #f25b51;
            text-align: center;
            letter-spacing: .2em;
            @include border-radius(0.3em);
            &.active { 
                @include box-sizing;
                border: 1px solid red;  /*no*/
                animation: glow 800ms ease-out infinite alternate; 
            }
        }
    }
}
</style>

