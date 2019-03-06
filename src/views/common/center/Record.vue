<template>
    <div class="record-page">
        <div class="calendar-block">
            <div class="user-info">
                <img :src="userInfo.avatar ? (HOST + userInfo.avatar) : DefaultAvatar" /> 
                {{userInfo.uname}}
                <div class="record-date" v-if="serialCount">已连续签到<span>{{serialCount}}</span>天</div>
            </div>
            <div class="calendar" >
                <h1>{{formateDate()}}</h1>
                <table class="calendar-table" v-if="calendar.length" >
                    <tr v-for="(item, index) in calendar" :key="index" >
                        <td v-for="(val, key) in item" :key="key" :class="{'dark': !val.isCurrentMonth}">
                            <span>{{val.day}}</span>
                            <div v-if="val.isSigned" class="check-icon"></div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="color-grad-btn" @click="dailySign">{{isSigned ? '已签到' : '签 到'}} </div>
        </div>
        <div class="award">
            <h1>{{(new Date()).getMonth()+1}}月签到特殊奖励</h1>
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
import { mapMutations, mapGetters} from 'vuex'
import { getMonthDays } from 'common/js/tools'
import { addClass } from 'common/js/dom'
import * as api from 'api/api'

export default {
    data() {
        return {
            titleInfo: {
                title: '我的签到',
                showIcon: false
            },
            calendar: [],
            signRecord: [],
            isSigned: false,
            serialCount: 0,        //连续签到天数
        }
    },
    methods: {
        ...mapMutations({'handleTitle': 'SET_TITLE'}),
        formateDate (type=1) {
            const date = new Date();
            if (type==1) {
                return date.getFullYear() + '年' + (date.getMonth()+1) + '月'
            } else {
                return date.getFullYear()+String(date.getMonth())
            }
        },
        initCalendarTable() {
            const date = new Date()
            let month = date.getMonth() + 1, year = date.getFullYear();
            
            let days = getMonthDays(month),                 //当前月份天数
                lastMonthDays = getMonthDays( month-1 ),     //上月月份天数
                monthStartWeekday= new Date(date.getFullYear(), date.getMonth(), 1).getDay();     //月初星期几  

            let calendarTable = []
            monthStartWeekday = monthStartWeekday==0 ? 7 : monthStartWeekday

            for (let i=0; i<7; i++) {
                calendarTable[i] = new Array() 
            }
            for( let i=0; i<42; i++ ) {
                let dateObject = { }
                let j = Math.floor(i/7)
                dateObject.row = j              //列
                dateObject.key = i             
                dateObject.isSigned = false     //是否签到    
                if (i<monthStartWeekday) {
                    dateObject.isCurrentMonth = false           //是否为当前月
                    dateObject.day = lastMonthDays - (monthStartWeekday - i - 1)               
                } else {
                    dateObject.isCurrentMonth = !(i+1-monthStartWeekday > days)
                    dateObject.isNextMonth = true 
                    dateObject.day = i+1-monthStartWeekday > days 
                        ?   i +1 - monthStartWeekday - days
                        :   i + 1 - monthStartWeekday 
                } 
                //当天
                let currentDay = date.getDate()
                if (dateObject.isCurrentMonth && dateObject.day == currentDay) {
                    dateObject.isCurrentDay = true
                }

                let day = dateObject.day > 9 ? dateObject.day : ("0"+dateObject.day)
                if (!dateObject.isCurrentMonth && !dateObject.isNextMonth) {       //上月
                    if (month==1) {
                        dateObject.formateDate = String(year-1) + 12 + day
                    } else if (month<10){
                        dateObject.formateDate = year + "0" + (month-1) + day
                    } else {
                        dateObject.formateDate = String(year) + month + day
                    }
                } else if(dateObject.isCurrentMonth) {                                //本月
                    if (month<10){
                        dateObject.formateDate = year + "0" + month + day
                    } else {
                        dateObject.formateDate = String(year) + month + day
                    }
                }
                calendarTable[j].push(dateObject)
            }
            this.calendar = calendarTable.slice()       //拷贝
        },
        handleHasSigned() {             //处理已签到样式calendar
            this.calendar.forEach(array => {
                let count = array.length;
                for (let i=0; i<count; i++) {
                    if (this.signRecord.indexOf(array[i].formateDate) != -1) {
                        array[i].isSigned = true
                    }
                }
            });
        
        },
        dailySign() {           //签到
            if (!this.isSigned) {
                api.get("/member/dailySign").then( res =>{
                    if (res.code==200) {
                        this.isSigned = true
                        this.serialCount = res.serial_count
                        this.calendar.forEach(array => {
                            let count = array.length;
                            for (let i=0; i<count; i++) {
                                if (array[i].isCurrentDay) {
                                    array[i].isSigned = true
                                    return;
                                }
                            }
                        });
                        Toast('签到成功');
                    } else {
                        Toast(res.msg)
                    }
                })
            }
        }
    },
    created() {
        api.get("/member/dailySignShow").then(res => {
            if (res.code==200) {
                let data = res.data
                this.isSigned = data.sign_status == 1
                this.serialCount = data.serial_count
                this.signRecord = data.sign_times

                this.handleHasSigned()
            }
        })
    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon
        })

        this.initCalendarTable()
    },
    computed: {
        ...mapGetters(['userInfo']),
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
            margin-bottom:　25px;
            @include box-sizing;
            @include big-background-image(url('../../../common/images/global/bg-record.jpg'));
            h1 { text-align: center; margin-bottom: 30px; }
            .calendar-table {
                @include box-sizing;
                @include color-background;
                width: 100%;
                height: 295px;
                text-align: center;
                border-collapse: collapse;
                tr { border-bottom: 1px solid $border-color-d; /*no*/ }
                td { 
                    border-right: 1px solid $border-color-d; /*no*/
                    height: 49.15px;
                    vertical-align: middle; 
                    position: relative;
                    &:last-child { border: 0; }
                    .check-icon {
                        @include center;
                        width: 100%;
                        height: 85%;
                        @include background-image(url('../../../common/images/icons/check-circle.jpg'));
                    }
                }
                .dark { color: $text-color-ll; }
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

