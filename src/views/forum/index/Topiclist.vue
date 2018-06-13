<template>
    <div class="topiclist">
        <ul class="recommend">
            <router-link tag="li" to="/forum/topic">
                <p> <i>[分区]</i> Lorem ipsum dolor sit amet consectetur adipisicing elit.  aperiam fugiat. Nesciunt, deserunt.</p>
                <div>
                    <span><i></i> 用户id</span>
                    <span ><i class="self-icon-comment-o"></i> 999</span>
                    <span ><i class="self-icon-clock"></i> 4-26</span>
                </div>
            </router-link>
            <router-link tag="li" to="/forum/topic">
                <p> <i>[分区]</i> Lorem ipsum dolor sit amet consectetur adipisicing elit.  aperiam fugiat. Nesciunt, deserunt.</p>
                <div>
                    <span><i></i> 用户id</span>
                    <span><i class="self-icon-comment-o"></i> 999</span>
                    <span><i class="self-icon-clock"></i> 4-26</span>
                </div>
            </router-link>
        </ul>
        <p class="part"> 用户帖子 </p>
        <ul class="article">
            <router-link tag="li" to="/forum/topic">
                <p> <i>[分区]</i> Lorem ipsum dolor sit amet consectetur </p>
                <div>
                    <span><i></i> 用户id</span>
                    <span ><i class="self-icon-comment-o"></i> 999</span>
                    <span ><i class="self-icon-clock"></i> 4-26</span>
                </div>
            </router-link>
            <router-link tag="li" to="/forum/topic">
                <p> <i>[分区]</i> Lorem ipsum dolor sit amet consectetur adipisicing elit.  aperiam fugiat. Nesciunt, deserunt.</p>
                <div>
                    <span><i></i> 用户id</span>
                    <span ><i class="self-icon-comment-o"></i> 999</span>
                    <span ><i class="self-icon-clock"></i> 4-26</span>
                </div>
            </router-link>
            <router-link tag="li" to="/forum/topic">
                <p> <i>[分区]</i> Lorem ipsum dolor sit amet consectetur adipisicing elit.  aperiam fugiat. Nesciunt, deserunt.</p>
                <div>
                    <span><i></i> 用户id</span>
                    <span ><i class="self-icon-comment-o"></i> 999</span>
                    <span ><i class="self-icon-clock"></i> 4-26</span>
                </div>
            </router-link>
            <router-link tag="li" to="/forum/topic">
                <p> <i>[分区]</i> Lorem ipsum dolor sit amet consectetur adipisicing elit.  aperiam fugiat. Nesciunt, deserunt.</p>
                <div>
                    <span><i></i> 用户id</span>
                    <span ><i class="self-icon-comment-o"></i> 999</span>
                    <span ><i class="self-icon-clock"></i> 4-26</span>
                </div>
            </router-link>
            <router-link tag="li" to="/forum/topic">
                <p> <i>[分区]</i> Lorem ipsum dolor sit amet consectetur adipisicing elit.  aperiam fugiat. Nesciunt, deserunt.</p>
                <div>
                    <span><i></i> 用户id</span>
                    <span ><i class="self-icon-comment-o"></i> 999</span>
                    <span ><i class="self-icon-clock"></i> 4-26</span>
                </div>
            </router-link>
            <router-link tag="li" to="/forum/topic">
                <p> <i>[分区]</i> Lorem ipsum dolor sit amet consectetur adipisicing elit.  aperiam fugiat. Nesciunt, deserunt.</p>
                <div>
                    <span><i></i> 用户id</span>
                    <span ><i class="self-icon-comment-o"></i> 999</span>
                    <span ><i class="self-icon-clock"></i> 4-26</span>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataList: []
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../common/css/index.scss";

.topiclist {
    ul li {
        height: 142px;
        width: 100%;
        @include box-sizing;
        border-top: 1px solid $text-color-orange; /*no*/
        padding: 20px 40px 10px;
        &:first-child { border: 0; }
        p { 
            max-height: 2.3em;
            height: 2.3em;
            @include lines-nowrap(2);
            @include text-justify(1.2em);
            margin-bottom: 25px;
        }
        div {
            span { 
                &:not(:first-child) { float: right }
                &:last-child { margin-right: 15px; }
                i {
                    display: inline-block;
                    margin-right: 8px;
                    background-position: center;
                    background-repeat: no-repeat;
                    color: $text-color-orange;
                    line-height: 28px;
                }
                &:first-child i {
                    width: 28px;
                    height: 28px;
                    @include background-image(url("../../../common/images/icons/icon-user.jpg"));
                    margin-top: -3px;    
                    vertical-align: bottom;              
                }
             }
        }
    }
    .recommend {
        // margin-top: 73px;
        @include color-background;
        border-bottom: 1px solid $text-color-orange-d;
        p { color: red }
        li:last-child { 
            p { font-weight: 600; }
        }
    }
    .part {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-indent: 2em;
        font-size: $font-size-small; /*no*/
        color: $text-color-orange-d;
        background-color: $bg-color-d;
    }
    .article {
        @include color-background;
    }
}
</style>
