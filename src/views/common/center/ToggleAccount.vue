<template>
    <div class="account-manage">
        <ul class="list">
            <li v-for="(item,index) in data" :key="index" @click="toggleAccount(item.id)">
                <div>
                    <img src="http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172657362.jpg" alt="">
                </div>
                <div class="content">
                    {{item.nickname}}
                </div>
            </li>
            <li>
                <div class="plus">
                    <span>+</span>
                </div>
                <div class="content">添加账号</div>
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
                title: '账号管理',
                showIcon: false
            },
            msgIndex: 0,
            sliderDeleteParams: {
                lastTouch:　'',
                targetTouch: ''
            },
            data: [
                {id: 1, nickname: '猜猜我是谁'},
                {id: 2, nickname: '我是谁我在哪'}
            ],
            unread: 12
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        toggleAccount (index) {

        }
    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon
        });
    }
}
</script>

<style lang="scss" scoped>
@import "../../../common/css/index.scss";

.account-manage {  
    font-size: $font-size-normal;  /*no*/
    .list {
        li {
            height: 140px;
            position: relative;
            >div:first-child {
                width: 100px;
                height: 100px;
                position: absolute;
                margin: auto 30px;
                top: 0;
                bottom: 0;
                @include border-radius(50%);
                overflow: hidden;
                img { width: 100%;}
            }
            .content {
                height: 100%;
                line-height: 140px;
                margin-left: 80px;
                padding-left:  65px;
                border-bottom: 1px solid $border-color-d;  /*no*/
            }
            .plus {
                background: #d2d2d2;
                color: white;
                text-align: center;
                span { line-height: 100px; font-size: 2.2em; font-weight: 500 }
            }
        }
        
    }
}
</style>