<template>
    <div class="repository">
        <self-toast v-if="showToast" 
            leftBtn="丢弃" rightBtn="立即使用" 
            :showCloseBtn="true" 
            @handleClick="_handleClick"
            @cancle="showToast = false" >
            <div class="toast-slot"> 
                <img :src="toastSlot.pic">
                <h1>{{toastSlot.name}}</h1>
                <p v-html="toastSlot.intro"></p>
            </div>
        </self-toast>
        <div class="top">
            <div><img src="../../../common/images/global/user.jpg" ></div>
            <div>
                <h2>{{uname}}</h2>
                <p><span>论坛币：{{attent}}</span> <span>商城积分：{{fans}}</span></p>
            </div>
        </div>
        <div class="stuff">
            <ul :class="{'unfold': isUnfold }">
                <li v-for="(item, index) in data" :key="index" @click="toastShow(item)">
                    <img src="../../../common/images/global/repository.jpg" alt="">
                    <div>{{999}}</div>
                </li>
            </ul>
            <div class="more" @click="isUnfold = !isUnfold">
                <div v-if="isUnfold">
                    <i class="self-icon-angle-up"></i>
                    <p>收起</p>
                </div>
                <div v-else>
                    <p>展开</p>
                    <i class="self-icon-angle-down"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import SelfToast from 'base/Toast/Toast'
 
export default {
    components: { SelfToast },
    data() {
        return {
            titleInfo: {
                title: "仓库",
                showIcon: false
            },
            uname: "昵称昵称昵称昵称昵称昵称昵称昵称昵称昵称昵称昵称",
            score: 1132135123,    
            attent: 0,
            fans: 0,
            isUnfold: false,
            data: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            showToast:　false,
            toastSlot: {
                pic: 'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172657362.jpg',
                name: '物品名称',
                intro: '物品介绍物品介绍物品介绍物品介绍物品介绍'
            }
            
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        unfold () {

        },
        _handleClick(index) {
            if (index) {
                console.log('立即使用操作')
            } else {
                console.log('丢弃操作')
            }
            setTimeout(() => {
                    this.showToast = false
                }, 800)
        },
        toastShow() {
            this.showToast = true
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
@import "../../../common/css/index.scss";

.repository {
    width: 100%;
    height: auto;
    font-size: $font-size-normal;  /*no*/
    .top {
        width: 100%;
        height: 200px;
        padding: 0 60px;
        @include box-sizing;
        @include big-background-image(url('../../../common/images/global/bg-center.png'));
        @include flex-center;
        div {
            height: 125px;
            @include flex-colum;    
            justify-content: space-around;
            img {
                height: 125px;
                margin-right: 20px;
                @include border-radius(50%);
            }
            h2,p { 
                @include no-wrap; 
                width: 350px; 
                span { 
                    margin-right: 20px; 
                    color: $text-color-dark;
                }
            }
            
        }
    }
    .stuff {
        min-height: 260px;
        @include color-background;
        margin-top: 20px;
        padding: 35px 0;
        position: relative;
        ul {
            display: flex;
            flex-flow: row wrap;
            padding: 0 45px;
            max-height: 210px;
            overflow: hidden;
            transition: all .5s linear;
            &.unfold {
                overflow: auto;
                max-height: 1000px;
            }
            li {
                position: relative;
                margin-bottom: 25px;
                text-align: center;
                width: 20%;
                img {
                    width: 80px;
                    height: 80px;
                    @include border-radius(0.5em);
                }
                div {
                    width: 3em;
                    transform: scale(0.90);
                    font-size: $font-size-min;  /*no*/
                    color: white;
                    background: $text-color-orange;
                    @include border-radius(1em);
                    position: absolute;
                    margin: auto;
                    bottom: 3px;
                    right: 0;
                    left: 0;
                }
            }
        }
        .more {
            position: absolute;
            text-align: center;
            margin: 0 auto;
            left: 0;
            right: 0;
            bottom: 5px;
            color: $text-color-orange;
            font-size: $font-size-min;  /*no*/
            i { font-size: 1.5em; }
        }
    }
}
</style>
