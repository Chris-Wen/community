<template>
    <div class="draw">
        <div class="turnplate">
            <div class="prize" ref="turnplate"></div>
            <div class="btn-draw"  @click="startRotate"></div>
        </div>
        <div class="rule">
            <p>抽奖规则</p>
            <p>规则1:每天抽奖次数最多为5次</p>
            <p>规则1:每天抽奖次数最多为5次每天抽奖次数最多为5次每天抽奖次数最多为5次每天抽奖次数最多为5次</p>
            <p>规则1:每天抽奖次数最多为5次</p>
            <p>规则1:每天抽奖次数最多为5次</p>
        </div>
        <p> <router-link to="/">中奖记录</router-link> </p>
        
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { Toast } from 'mint-ui' 

export default {
    data() {
        return {
            titleInfo: {
                title:  '掌动社区——快乐生活是我们的追求！',
                showIcon:   false
            },
            isRotating: false
        }
    },
    components: { Toast },
    methods: {
        ...mapActions([ 'handleTitle']),
        startRotate() {
            if (this.isRotating) { 
                console.log(123);
                return 
            }
            Toast({
                    message: '正在抽奖中',
                    position: 'middle',
                    duration: 8000*10
                });
            let deg = 0;
            console.log(this.isRotating)
            var timer = setInterval(()=>{
                this.isRotating = true;
                deg += 20;                
                this.$refs.turnplate.style = `transform:rotate(${deg}deg)`
            },30);
            setTimeout(() => {
                clearInterval(timer);
                this.isRotating = false;
            }, 4000);
        } 
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
@import "../../common/css/index.scss";

.draw {
    min-height: 1108px;
    background-image: url('../../common/images/global/bg-draw.png') ;
    background-size: 100% 1108px;
    background-repeat: y; 
    padding-top: 110px;
    margin-top: -55px;
    color: $text-color-w;
    @include box-sizing;
    .turnplate {
        width: 557px;
        height: 557px;
        margin: auto;
        background-image: url('../../common/images/global/git.png');
        background-size: 557px 557px;
        background-repeat: no-repeat;
        @include border-radius(50%);
        @include box-sizing;
        padding-top: 75px;
        position: relative;
        .prize {
            width: 409px;
            height: 409px;
            margin: auto;
            background-image: url('../../common/images/global/prize.png');
            background-size: 409px 409px;
            background-repeat: no-repeat;
            @include border-radius(50%);
        }
        .btn-draw {
            width: 142px;
            height: 176px;
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            top: 175px;
            background: url('../../common/images/global/btn-draw.png') no-repeat;
            background-position: center center;
            background-size: 142px 176px;
            img { width: 100%; height: 100%;  }
        }
    }
    .rule {
        width: 100%;
        padding: 0 100px;
        @include box-sizing;
        line-height: 1.5em;
        margin-top: 50px; 
        p {
            width: 100%;
            text-align: justify;
            font-size: $font-size-small; /*no*/
            &:first-child { 
                text-align: center; 
                font-size: $font-size-normal; /*no*/
                margin-bottom: 1em;
                font-weight: 600;
            }
        }
    }
    >p {
        text-align: center;
        margin-top: 30px;
        a{ text-decoration: underline; color: #fff; padding: 10px 30px;}
    } 
}
</style>
