<template>
    <div class="prize-record" >
        <ul class="user-prize">
            <!-- <li v-for="(item, index) in userPrize" :key="index" @touchstart="touchStart" @touchend="touchEnd"> -->
            <li v-for="(item, index) in userPrize" :key="index">
                <!-- <slider-delete @handleDelete="deleteItem(index)"> -->
                    <div class="prize-item">
                        <div class="img">
                            <img v-lazy="HOST + item.logo"/>
                        </div>
                        <div>
                            <h2>{{item.prize}}</h2>
                            <p>{{item.win_time | transformDate}}</p>
                        </div>
                    </div>
                <!-- </slider-delete> -->
            </li>
        </ul>

        <div class="roll-msg">
            <ul v-if="list.length" ref="wrapper">
                <li v-for="(item, index) in list" :key="index">
                    {{item.nickname || item.username}} 获得 <span>{{item.prize}}</span>   
                </li>
            </ul>
        </div>
    </div>    
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
// import SliderDelete from 'base/SliderDelete/SliderDelete'
import { removeClass } from 'common/js/dom'
import { formatDate } from 'common/js/tools'

export default {
    // components: { SliderDelete },
    data() {
        return {
            titleInfo: {
                title: '中奖记录',
                showIcon: false
            },
            userPrize: [
                {logo: this.DefaultLogo, prize: '物品名称', win_time: ''},
                {logo: this.DefaultLogo, prize: '物品名称', win_time: ''},
                {logo: this.DefaultLogo, prize: '物品名称', win_time: ''},
                {logo: this.DefaultLogo, prize: '物品名称', win_time: ''},
            ],
            sliderDeleteParams: {
                lastTouch: '',     
                targetTouch: ''
            },
            list: []
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        // touchStart(ev) {
        //     ev = ev || event;
        //     this.sliderDeleteParams.lastTouch = this.sliderDeleteParams.targetTouch;
        //     this.sliderDeleteParams.targetTouch = ev.currentTarget;
        // },
        // touchEnd(ev) {
        //     ev = ev || event;
        //     //若上一个左滑项与当前触摸项不是同一个。上一个左滑项右滑，不再显示删除按钮
        //     if ( this.sliderDeleteParams.lastTouch && (this.sliderDeleteParams.lastTouch !== this.sliderDeleteParams.targetTouch)) { 
        //         removeClass(this.sliderDeleteParams.lastTouch.children[0].children[0], 'left-slider')
        //     }   
        // },
        // deleteItem(index) {
        //     this.userPrize.splice(index, 1)
        // },
        initRollList() {
            if (this.list.length == 10) this.$refs.wrapper.className = 'animate'
        }
    },
    created() {
        this.axios.get('/lottery/getPrizeInfo').then(res=>{
            if (res.code ==200) {
                var arr = res.data.user_prize ? res.data.user_prize : [];
                var len = arr.length;
                if (len>=4) {
                    this.userPrize = arr
                } else{
                    this.userPrize = arr.concat(this.userPrize.slice(0, -len))
                }
                this.list = res.data.prize
                this.$nextTick(()=>this.initRollList())
            }
        })
    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon
        });
    },
    filters: {
        transformDate(time) {
            if (!time) return " "
            return formatDate(time, 'yyyy-MM-dd hh:mm')
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../common/css/index.scss";

.prize-record {
    font-size: $font-size-small;  /*no*/
    padding-top: 20px;
    >ul {
        &.user-prize {
            height: 600px;
            overflow: auto;   
        }
        li {
            width: 100%;
            @include color-background;
            height: 140px;
            margin-bottom: 10px;
            .prize-item {
                display: flex;
                width: 100%;
                padding:　20px 70px;
                @include box-sizing;
                .img {
                    width: 130px;
                    img { width: 100px; height: 100px; @include border-radius(.5em); }
                }
                >div:last-child {
                    h2 { margin:　20px 0 10px; }
                    p { color: $text-color-l; font-size: $font-size-min;  /*no*/ transform: scale(0.95) }
                }
            }
            
        }
    } 
        
    .roll-msg {
        margin:　20px 0;
        text-align: center;
        font-size: $font-size-min;  /*no*/
        line-height: 2em;
        max-height: 10em;
        overflow: hidden;
        ul {
            
            li span { color: $text-color-orange-d; }
            &.animate {
                @include animate-wrapper(20em);
                animation: move 12s linear infinite; 
            } 
        }

        // @include 
    }
}
</style>

