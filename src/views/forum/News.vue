<template>
    <div class="news">
        <div class="top-news">
            <p>{{'....'.repeat(40)}}</p>
            <ul>
                <li>
                    <div class="info">
                        <h1>{{"游民资讯游民资讯游民资讯游民资讯游民资讯游民资讯游民资讯"}}</h1>
                        <p>{{"内容简介内容简介内容简介内容简介内容简介内容简介内容简介"}}</p>
                        <p>{{'2018-05-01'}}   <span> <i class="self-icon-eye"></i> {{99999}}</span> </p>
                    </div>
                    <div class="img"><img src="" alt=""></div>
                </li>
            </ul>
        </div>
        <div class="game-news">
            <p>{{'....'.repeat(40)}}</p>
            <ul>
                <li></li>
            </ul>
        </div>
    </div>    
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.news {
    .top-news { @include color-background; }
    ul {
        padding: 0 40px;
        li {
            @include flex-around;
            @include box-sizing; 
            border-bottom: 1px solid $text-color-orange;  /*no*/
            .info {

                p:first-child { 
                    height: 2.5em;
                }
            }
            .img {
                width: 200px;
                height: 150px;
            }
            &:last-child { border: 0; }
        }
    }
}
</style>

