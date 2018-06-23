<template>
    <div class="draw">
        <draw-popup v-if="toastParams.showToast" 
            leftBtn="存入仓库" 
            rightBtn="申请邮寄" 
            @handleClick="_handleClick" >
            <!-- 插槽奖品内容 -->
            <p>{{toastSlot.name}}</p>
            <img :src="toastSlot.pic">
            
        </draw-popup>
        <div class="turnplate-box">
            <div class="turnplate">
                <div class="prize" ref="turnplate"></div>
                <div class="btn-draw"  @click="startRotate"></div>
            </div>
        </div>
        
        <div v-if="true" class="lottery-times">抽奖次数： {{lotteryTicket}}</div>
        <div class="rule">
            <h1 class="rule-name">抽奖规则</h1>
            <div>
                <ul class="decoration-bg">
                    <li class=""></li>
                    <li class=""></li>
                    <li class=""></li>
                    <li class=""></li>
                    <li class=""></li>
                </ul>
                <div>
                    <p>规则1:每天抽奖次数最多为5次</p>
                    <p>规则1:每天抽奖次数最多为5次每天抽奖次数最多为5次每天抽奖次数最多为5次每天抽奖次数最多为5次</p>
                    <p>规则1:每天抽奖次数最多为5次</p>
                    <p>规则1:每天抽奖次数最多为5次</p>
                </div>
            </div>    
        </div>
        <router-link tag="div" class="lottery-btn" to="/draw/record">中奖记录 》</router-link> 
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import DrawPopup from '../../components/DrawPopup/DrawPopup'
import * as api from 'api/api'

export default {
    components: { DrawPopup },
    data() {
        return {
            titleInfo: {
                title:  '幸运大转盘',
                showIcon:   false
            },
            lotteryTicket: 5,   //抽奖次数
            prizeList: [
                {
                    img: '',            //奖品图片
                    name: '奖品1',      //奖品名称
                    isPrize: 1          //是否为奖品
                },
                {   img: '',  name: '奖品2',   isPrize: 1  },
                {   img: '',  name: '奖品3',   isPrize: 1  },
                {   img: '',  name: '奖品4',   isPrize: 1  },
                {   img: '',  name: '奖品5',   isPrize: 1  },
                {   img: '',  name: '未中奖',   isPrize: 0 },
                {   img: '',  name: '未中奖',   isPrize: 0 },
                {   img: '',  name: '未中奖',   isPrize: 0 },
                {   img: '',  name: '未中奖',   isPrize: 0 },
                {   img: '',  name: '未中奖',   isPrize: 0 }
            ],
            isRotating: false,
            toastParams: {
                showToast: false,
            },
            toastSlot: {
                pic: 'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172657362.jpg',
                name: '物品名称'
            }
        }
    },
    created() {
        // api.get('/home/member/session_data').then( res => {
        //     console.log(res)

        // })
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        initDraw() {

        },
        startRotate() {
            if (this.isRotating) {  
                return Toast({
                    message: '正在抽奖中',
                    position: 'middle',
                    duration: 1000,
                    className: 'popup'
                })  
            }
            if (this.lotteryTicket==0) { 
                return Toast({
                    message: '您今天抽奖次数用完了',
                    position: 'middle',
                    duration: 3000
                }) 
            }
            // api.get('/lottery/getAwards').then( res => {
            //     console.log(res)

            // })

            this.lotteryTicket --;
            this.isRotating = true;
            this.$refs.turnplate.style = "";
            
            let deg, index = Math.random(1);
            switch (true) {
                case 0<= index < 1/6:   deg = 0; 
                        break;
                case 1/6<= index < 2/6: deg = 1;
                        break;
                case 2/6<= index < 3/6: deg = 2;
                        break;
                case 3/6<= index < 4/6: deg = 3;
                        break;
                case 4/6<= index < 5/6: deg = 4;
                        break;
                case 5/6<= index <= 1:  deg = 5;
                        break;
            }

            let final_rotate_deg = 360/this.prizeList.length * deg;      //指针最终停止角度（奖品栏正中位置）
            //转动6个整圈后 停在最终位置
            let total_rotate_deg = 360*6 + final_rotate_deg;

            setTimeout(()=>{              
                this.$refs.turnplate.style = `transform: rotate(${total_rotate_deg}deg); transition: all 5s ease`
            }, 30);
            setTimeout(() => {
                this.isRotating = false;

                this.toastParams.toast = true
                this.toastParams.showToast = true
            }, 5500);
        },
        _handleClick(index) {
            if (index) {
                console.log('确定操作')
            } else {
                console.log('暂存操作')
            }
            setTimeout(() => {
                this.toastParams.showToast = false
            }, 800);
        }, 
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

.draw {
    position: relative;
    padding-bottom: 45px;
    background-image: url('../../common/images/global/bg-draw.jpg') ;
    background-size: 100% 100%;
    color: $text-color-w;
    .turnplate-box { padding-top: 240px; }
    .turnplate {
        width: 547px;
        height: 547px;
        margin: auto;
        @include background-image(url('../../common/images/global/bg-draw.gif'));
        @include box-sizing;
        position: relative;
        .prize {
            width: 100%;
            height: 100%;
            @include background-image(url('../../common/images/global/turnplate.png'));
            background-size: 436px 436px;
        }
        .btn-draw {
            width: 211px;
            height: 211px;
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            top: 160px;
            @include background-image(url('../../common/images/global/btn-draw.png'));
        }
    }
    .lottery-times {
        background: #ffd258;
        height: 70px;
        line-height: 70px;
        width: 39%;
        margin: 15px auto 25px;
        text-align: center;
        font-size: $font-size-normal;  /*no*/
        color: #621e00;
        font-weight: 1000;
        @include border-radius(0.5em);
    }
    .rule {
        position: relative;
        height: auto;
        margin:　0 35px;
        @include box-sizing;
        @include border-radius(0.5em);
        line-height: 1.8em;
        background-color: #fe6c42;
        .rule-name { height: 50px; line-height: 50px; text-align: center; font-size: $font-size-normal; /*no*/}
        >div {
            width: 100%;
            @include box-sizing;
            padding: 0 10px 10px;
            text-align: justify;
            font-size: $font-size-small; /*no*/
            @include border-radius(0.5em);
            >div {
                @include border-radius(0.5em);
                width: 100%;
                padding: 15px;
                padding-top: 35px;
                @include box-sizing;
                @include color-background;
                color: #601c02;
            }
        }
        
    }
    .lottery-btn{
        text-indent: 0.5em;
        margin: 35px auto;
        background: #f66349;
        text-align: center;
        width: 28%;
        height: 65px;
        line-height: 65px;
        font-size: 15px;  /*no*/
        @include border-radius(0.5em);
    } 
    //规则栏小三角特效
    .decoration-bg {
        position: absolute;
        li {
            position: absolute;
            top: 0;
            width:0; 
            height:0; 
            border-left:25px solid transparent;
            border-right:15px solid transparent;
            &:nth-child(1) { 
                right: -70px;   
                border-top:20px solid #f9ce24; 
            }
            &:nth-child(2) { 
                right: -140px;   
                border-top:15px solid #aac85a; 
            }
            &:nth-child(3) { 
                right: -210px;   
                border-top:20px solid #e2432e; 
            }
            &:nth-child(4) { 
                right: -280px;   
                border-top:15px solid #ffd73c; 
            }
            &:nth-child(5) { 
                right: -350px;   
                border-top:16px solid #99a3f6; 
            }

        }
    }
}
</style>
