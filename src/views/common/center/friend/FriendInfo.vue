<template>
    <div class="friend-info">
        <div class="top">
            <div>
                <img src="../../../../common/images/global/bg-center1.jpg" alt="">    
            </div>
            <div class="info">
                <img src="http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172657362.jpg" alt="">
                <h1>昵称昵称昵称昵称昵称昵称昵称</h1>
                <div>
                    <span>关注：{{0}} </span> <span>粉丝：{{0}}</span> <span>发帖：{{0}}</span>
                </div>
            </div>
        </div>   
        <div class="content">
            <p>他的主题贴</p>
            <div v-if="data.length" class="main">
                <ul>
                    <li>
                        <p>[分区] 内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                        <div>
                            来自<i>{{'社区活动'}}</i>板块
                            <span><i class="self-icon-bubbles2"></i> {{120}}</span>
                            <span><i class="self-icon-eye"></i> {{111}}</span>
                        </div>
                    </li>
                    <li>
                        <p>[分区] 内容内容内容内容内容内容内容内容内容内容内容内</p>
                        <div>
                            来自<em>{{'社区活动'}}</em>板块
                            <span><i class="self-icon-bubbles2"></i> {{120}}</span>
                            <span><i class="self-icon-eye"></i> {{111}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="none" v-else>
                <img src="../../../../common/images/icons/none.jpg">
                <p>什么都没有</p>
            </div>
        </div> 
    </div>    
</template>

<script>
export default {
    data() {
        return {
            data: [1,2,4]
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../../common/css/index.scss";

.friend-info {
    .top {
        text-align: center;
        >div:first-child { 
            width: 100%; height: 200px; max-height: 200px;
            img { height: 200px; }
        }
        .info {
            position: relative;
            padding: 45px 0;
            img { 
                position: absolute;
                margin: auto;
                right: 0;
                left: 0;
                top: -100px;
                width: 125px; height: 125px; 
                @include border-radius(50%); 
                border: 1px solid white; /*no*/ 
            }
            h1 { text-align: center; margin-bottom: 20px; }
            div {
                display: flex;
                justify-content: center;
                span { margin: 0 10px; }
            }
        }
    }
    .content {
        >p {
            text-indent: 1em;
            border-bottom: 1px solid $border-color-d;  /*no*/
            line-height: 2em;
        }
        .main {
            ul li {
                @include box-sizing;
                height: 130px;
                border-bottom: 1px solid $border-color-d;  /*no*/
                padding: 20px 40px 15px;
                text-align: justify;
                p {
                    line-height: 1.2em;
                    height: 2.4em;
                    max-height: 2.4em;
                    overflow: hidden;
                }
                div {
                    margin-top: 15px;
                    i { color: $text-color-orange-d }
                    span {
                        float: right;
                        margin: 0 15px 0 30px;
                    }
                }
            }
        }
        .none {
            padding-top: 75px;
            text-align: center;
            color: $text-color-ll;  /*no*/
            img { width: 165px; }
            p { margin-top: 15px; }
        }
    }
}
</style>
