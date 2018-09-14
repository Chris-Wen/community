<template>
    <div class="original">
        <div class="recommend" v-if="original && original.length">
            <div class="recommend-img">精品力荐•原创</div>
            <ul :class="{'unfold': isUnfold }">
                <router-link tag="li" v-for="(item, index) in original" :to="'/fiction/info/'+ item.nid + '/' + item.name" :key="index"> 
                    <div class="img"><img src="../../../common/images/fiction/fiction.jpg" alt=""></div>
                    <div>
                        <p>《{{item.name}}》</p>
                        <p>{{item.intro}}</p>
                    </div>
                </router-link>
            </ul>
            <div v-if="!isUnfold" class="more" @click="isUnfold = true">
                    更多<i class="self-icon-angle-right fa-lg"></i>
            </div>
        </div>
        <div v-else>暂无数据</div>
    </div>
</template>

<script>
export default {
    props: {
        original: { type: Array }
    },
    data() {
        return {
            isUnfold: true  
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
            font-size: $font-size-min;  /*no*/
            font-weight: 800;
            width: 8em;
            height: 33px;
            line-height: 33px;
            text-align: center;
            color: white;
            @include background-image(url("../../../common/images/fiction/fiction-tag.png"));
            position: absolute;
            top: 0;
            right: 55px;
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
            height: auto;
            // max-height: 750px;
            // padding-bottom: 40px;
            overflow: hidden;
            transition: all .5s linear;
            &.unfold {
                overflow: auto;
                // max-height: 1000px;
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
                        @include lines-nowrap(3);
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

