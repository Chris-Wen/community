<template>
    <div class="forum-index">
        <div class="top-tab">
            <p :class="{active: showIndex==1}"  @click="showIndex = 1">交流讨论</p>
            <p :class="{active: showIndex==2}"  @click="showIndex = 2">社区活动</p>
            <p :class="{active: showIndex==3}"  @click="showIndex = 3">掌动爆料站</p>
            <p :class="{active: showIndex==4}"  @click="showIndex = 4">新游推荐</p>
        </div>
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
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                title: '掌动社区——快乐生活是我们的追求！',
                showIcon: false
            },
            showIndex: 1
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']) 
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

.forum-index {
    position: relative;
    font-size: $font-size-small; /*no*/
    .top-tab {
        position: fixed;
        top: 100px;
        width: 100%;
        height: 70px;
        @include box-sizing;
        background-color: $bg-color-d;
        padding: 0 50px;
        @include flex-between;
        line-height: 70px;
        >p { 
            font-size: $font-size-normal; /*no*/
            font-weight: 500;
            &.active {
                color: $text-color-orange;
                font-weight: 800;
            }
        }
    }
    ul li {
        height: 142px;
        width: 100%;
        @include box-sizing;
        border-top: 1px solid $text-color-orange;
        padding: 20px 40px 10px;
        &:first-child { border: 0; }
        p { 
            height: 2.1em;
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
        margin-top: 73px;
        @include color-background;
        border-top: 1px solid $text-color-orange-d;
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
