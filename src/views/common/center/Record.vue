<template>
    <div class="record-page">
        <div class="calendar-block">
            <div class="user-info">
                <img src="http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172657362.jpg" alt=""> 
                {{'昵称昵称昵称昵称'}}
                <div class="record-date">已连续签到<span>{{22}}</span>天</div>
            </div>
            <div class="calendar">
                <h1>{{dateTime()}}</h1>
                <table class="calendar-table">
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                    </tr>
                </table>
            </div>
            <div class="color-grad-btn">签 到</div>
        </div>
        <div class="award">
            <h1>{{5}}月签到特殊奖励</h1>
            <ul>
                <li>签到1天：+1朵虚拟鲜花</li>
                <li>签到1天：+1朵虚拟鲜花</li>
                <li>签到1天：+1朵虚拟鲜花</li>
                <li>签到1天：+1朵虚拟鲜花</li>
                <li>签到1天：+1朵虚拟鲜花</li>
            </ul>
        </div>
    </div>    
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                title: '我的签到',
                showIcon: false
            },
            // dateTime: ''
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        dateTime () {
            const date = new Date();
            return date.getFullYear() + '年' + (date.getMonth()+1) + '月'
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

.record-page {
    font-size: $font-size-small;  /*no*/
    padding-top: 15px; 
    .calendar-block {
        @include color-background;
        padding: 20px 40px 30px;
        margin-bottom: 15px;
        position: relative;
        .user-info {
            margin-bottom: 20px;
            >img { width: 35px; @include border-radius(50%); margin-right: 10px; }
            .record-date {
                height: 1.8em;
                line-height: 1.8em;
                position: absolute;
                right: 0;
                top: 15px;
                transition: all .5s linear;
                padding-right: 8%;
                color: white;
                text-indent: 1em;
                box-shadow: 0px 5px 8px $text-color-ll;  /*no*/
                background: -webkit-gradient(linear, left top, right top, from(#ffa810), to(#ff8113)); 
                background: linear-gradient(to right, #ffa810, #ff8113);
                border-top-left-radius: .7em; 
                border-bottom-left-radius: .7em; 
                span {  font-size: 1.2em; font-weight: 800; }
            }
        }
        .calendar {
            height: 400px;
            padding: 25px 18px 0;
            @include big-background-image(url('../../../common/images/global/bg-record.jpg'));
            h1 { text-align: center; margin-bottom: 30px; }
            .calendar-table {
                @include box-sizing;
                @include color-background;
                width: 100%;
                height: 295px;
                text-align: center;
                border-collapse: collapse;
                th, td { border: 1px solid $border-color-d; /*no*/ }
                border: 1px solid #fff; /*no*/
                td { vertical-align: middle; }
            }
        }
        .color-grad-btn {
            margin: 0 auto;
            width: 35%;
            min-width: 195px;
            font-size: $font-size-normal;  /*no*/
            font-weight: 800;
            height: 2.4em;
            line-height: 2.5em;
        }
    }
    .award {
        @include color-background;
        text-align: center;
        padding: 20px 0 40px;
        h1 { color: $text-color-orange; text-align: center }
        ul {
            margin-top: 30px;
            line-height: 2em;
        }
    }
}
</style>

