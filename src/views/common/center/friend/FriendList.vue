<template>
    <div class="friend-list">
        <div class="search">
            <i class="self-icon-search"></i> <input type="text" placeholder="搜索：关注的人">
        </div>
        <ul class="list">
            <li>
                <img src="http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172657362.jpg" alt="">
                <div class="content">
                    <router-link tag="div" to="/center/friend/info">
                        <h1>{{'昵称昵称昵称昵称昵称昵称昵称'}}</h1>
                        <p>{{'个人简介个人简介个人简介个人简介个人简介'}}</p>
                    </router-link>
                    <div>
                        <span >已关注</span>
                    </div>
                </div>
            </li>
            <li>
                <img src="http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172657362.jpg" alt="">
                <div class="content">
                    <router-link tag="div" to="/center/friend/info">
                        <h1>{{'昵称昵称昵称昵称昵称昵称昵称'}}</h1>
                        <p>{{'个人简介个人简介个人简介个人简介个人简介'}}</p>
                    </router-link>
                    <div>
                        <span >互相关注</span>
                    </div>
                </div>
            </li>
            <li>
                <img src="http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172657362.jpg" alt="">
                <div class="content">
                    <router-link tag="div" to="/center/friend/info">
                        <h1>{{'昵称昵称昵称昵称昵称昵称昵称'}}</h1>
                        <p>{{'个人简介个人简介个人简介个人简介个人简介'}}</p>
                    </router-link>
                    <div>
                        <span class="active">关 &nbsp; 注</span>
                    </div>
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
@import "../../../../common/css/index.scss";

.friend-list {
    .search {
        border-bottom: 1px solid $border-color-d;  /*no*/
        text-align: center;
        height: 60px;
        line-height: 60px;
        position: relative;
        input {
            width: 80%;
            text-indent: 2.5em;
            height: 1.5em;
            @include border-radius(2em);
            background: #ebebeb;
            outline: none;
        }
        i { 
            color: $text-color-l; 
            position: absolute;
            left: 13%;
        }
    }
    .list {
        li {
            height: 140px;
            position: relative;
            img { 
                width: 100px;
                height: 100px;
                @include border-radius(50%);
                position: absolute;
                margin: auto 30px;
                top: 0;
                bottom: 0;
            }
            .content {
                @include box-sizing;
                height: 100%;
                display: flex;
                flex-flow: row nowrap;   
                align-items: center;             
                margin-left: 80px;
                border-bottom: 1px solid $border-color-d;  /*no*/
                padding: 20px 0 20px 65px;
                div {
                    &:first-child {
                        @include no-wrap; 
                        p { margin-top: 15px; @include no-wrap; color: $text-color-l; }
                    }
                    &:last-child {
                        width: 6em;
                        margin: 0 25px 0 40px; 
                        text-align: center;
                        span {
                            display: block;
                            height: 1.65em;
                            line-height: 1.65em;
                            width: 5em;
                            border: 1px solid $text-color-l;  /*no*/
                            border-radius: 1em;
                            color: $text-color-dark;
                            &.active {
                                border: 0;
                                background: $text-color-orange;
                                color: white;
                            }
                        }
                    }
                }
            }
        }
        
    }
}
</style>

