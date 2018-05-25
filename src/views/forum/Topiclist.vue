<template>
    <div class="topiclist">
        <ul class="recommend">
            <li>
                <p> <i>[分区]</i> Lorem ipsum dolor sit amet consectetur adipisicing elit.  aperiam fugiat. Nesciunt, deserunt.</p>
                <div>
                    <span><i></i> 用户id</span>
                    <span ><i></i> 999</span>
                    <span ><i></i> 4-26</span>
                </div>
            </li>
            <li>
                <p> <i>[分区]</i> Lorem ipsum dolor sit amet consectetur adipisicing elit.  aperiam fugiat. Nesciunt, deserunt.</p>
                <div>
                    <span><i></i> 用户id</span>
                    <span><i></i> 999</span>
                    <span><i></i> 4-26</span>
                </div>
            </li>
        </ul>
        <p class="part"> 用户帖子 </p>
        <ul class="article">
            <li>
                <p> <i>[分区]</i> Lorem ipsum dolor sit amet consectetur adipisicing elit.  aperiam fugiat. Nesciunt, deserunt.</p>
                <div>
                    <span><i></i> 用户id</span>
                    <span ><i></i> 999</span>
                    <span ><i></i> 4-26</span>
                </div>
            </li>
            <li>
                <p> <i>[分区]</i> Lorem ipsum dolor sit amet consectetur adipisicing elit.  aperiam fugiat. Nesciunt, deserunt.</p>
                <div>
                    <span><i></i> 用户id</span>
                    <span ><i></i> 999</span>
                    <span ><i></i> 4-26</span>
                </div>
            </li>
            <li>
                <p> <i>[分区]</i> Lorem ipsum dolor sit amet consectetur adipisicing elit.  aperiam fugiat. Nesciunt, deserunt.</p>
                <div>
                    <span><i></i> 用户id</span>
                    <span ><i></i> 999</span>
                    <span ><i></i> 4-26</span>
                </div>
            </li>
            <li>
                <p> <i>[分区]</i> Lorem ipsum dolor sit amet consectetur adipisicing elit.  aperiam fugiat. Nesciunt, deserunt.</p>
                <div>
                    <span><i></i> 用户id</span>
                    <span ><i></i> 999</span>
                    <span ><i></i> 4-26</span>
                </div>
            </li>
            <li>
                <p> <i>[分区]</i> Lorem ipsum dolor sit amet consectetur adipisicing elit.  aperiam fugiat. Nesciunt, deserunt.</p>
                <div>
                    <span><i></i> 用户id</span>
                    <span ><i></i> 999</span>
                    <span ><i></i> 4-26</span>
                </div>
            </li>
            <li>
                <p> <i>[分区]</i> Lorem ipsum dolor sit amet consectetur adipisicing elit.  aperiam fugiat. Nesciunt, deserunt.</p>
                <div>
                    <span><i></i> 用户id</span>
                    <span ><i></i> 999</span>
                    <span ><i></i> 4-26</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.topiclist {
    ul li {
        height: 142px;
        width: 100%;
        @include box-sizing;
        border-top: 1px solid $text-color-orange; /*no*/
        padding: 20px 40px 10px;
        &:first-child { border: 0; }
        p { 
            max-height: 2.1em;
            height: auto;
            overflow: hidden;
            @include text-justify(1.2em);
            margin-bottom: 30px;
        }
        div {
            span { 
                &:not(:first-child) { float: right }
                &:last-child { margin-right: 15px; }
                i {
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 8px;
                    width: 26px;
                    height: 26px;
                    background-position: center;
                    background-repeat: no-repeat;
                }
                &:first-child i {
                    background-image: url("../../common/images/icons/icon-user.jpg");
                    background-size: 18px 26px;
                    margin-top: -5px;                    
                }
                &:nth-child(2) i {
                    background-image: url("../../common/images/icons/icon-comment.jpg");
                    background-size: 26px 26px;
                }
                &:nth-child(3) i {
                    background-image: url("../../common/images/icons/icon-time.jpg");
                    background-size: 26px 26px;
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
