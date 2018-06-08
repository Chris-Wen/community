<template>
    <div class="original">
        <div class="recommend">
            <i class="recommend-img"></i>
            <ul :class="{'unfold': isUnfold }">
                <li v-for="(item, index) in data" :key="index"> 
                    <div class="img"><img src="../../../common/images/fiction/fiction.jpg" alt=""></div>
                    <div>
                        <p>《斗破苍穹》</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas odio maxime eveniet eligendi </p>
                    </div>
                </li>
            </ul>
            <div v-if="!isUnfold" class="more" @click="isUnfold = true">
                    更多<i class="self-icon-angle-right fa-lg"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: [1,2,3,4],
            recommends: [
                {linkUrl: '#1', picUrl: 'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109173040544.jpg'},
                {linkUrl: '#2', picUrl: 'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109173040544.jpg'},
                {linkUrl: '#2', picUrl: 'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109173040544.jpg'}
            ],
            data: [1,2,3,4, 5],
            isUnfold: false
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../common/css/index.scss";

.original {
    .recommend {
        width: 100%;
        padding: 0 70px;
        position: relative;
        @include box-sizing;
        background-color: $bg-color-d;
        .recommend-img{
            display: inline-block;
            width: 110px;
            height: 33px;
            background-image: url("../../../common/images/fiction/recommend.png");
            background-size: 105px 33px;
            background-repeat: no-repeat;
            background-position: center;
            position: absolute;
            top: 0;
            right: 70px;
        }
        .more {
            text-align: center;
            padding-bottom: 10px;
            color: $text-color-orange;
            font-size: $font-size-min;  /*no*/
            line-height: 1.3em;
            i {  vertical-align: top; margin-left: 10px; }
            
        }
        ul {
            width: 100%;
            height: 100%;
            max-height: 750px;
            // padding-bottom: 40px;
            overflow: hidden;
            transition: all .5s linear;
            &.unfold {
                overflow: auto;
                max-height: 1000px;
            }
            li {    
                width: 100%;
                @include flex-center;
                margin-bottom: 35px;
                &:first-child{  padding-top: 50px;  }
                .img {
                        width: 120px;
                        height: 140px;
                        margin-right: 35px;
                        img { width: auto; height: 140px; @include border-radius(.5em); }
                    }
                div {
                    width: 100%;
                    height: 140px;
                    @include box-sizing;
                    p {
                        @include text-justify(1.2em);
                        max-height: 3.4em;
                        overflow: hidden;
                        &:first-child { 
                            max-width: 370px; 
                            font-weight: 600; 
                            margin: 10px 0 20px; 
                            @include no-wrap; 
                        }
                    }
                }
                
            }
        }    
    }
}
</style>

