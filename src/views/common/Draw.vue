<template>
    <div class="draw">
        <self-toast v-if="toastParams.showToast" 
            leftBtn="存入仓库" 
            rightBtn="申请邮寄" 
            :showCloseBtn="false" 
            @handleClick="_handleClick" >
            <div class="toast-slot"> 
                <img :src="toastSlot.pic">
                <h1>{{toastSlot.name}}</h1>
                <p v-html="toastSlot.intro"></p>
            </div>
        </self-toast>
        <div class="turnplate-box">
            <div class="turnplate">
                <div class="prize" ref="turnplate"></div>
                <div class="btn-draw"  @click="startRotate"></div>
            </div>
        </div>
        
        <p style="font-size: 16px; color: red; font-weight: 800">抽奖次数： {{lotteryTicket}}</p>
        <div class="rule">
            <p>抽奖规则</p>
            <p>规则1:每天抽奖次数最多为5次</p>
            <p>规则1:每天抽奖次数最多为5次每天抽奖次数最多为5次每天抽奖次数最多为5次每天抽奖次数最多为5次</p>
            <p>规则1:每天抽奖次数最多为5次</p>
            <p>规则1:每天抽奖次数最多为5次</p>
        </div>
        <p> <router-link to="/draw/record">中奖记录</router-link> </p>
        
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { Toast } from 'mint-ui' 
import SelfToast from 'base/Toast/Toast'

export default {
    data() {
        return {
            titleInfo: {
                title:  '掌动社区',
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
                {   img: '',  name: '未中奖',   isPrize: 0 }
            ],
            isRotating: false,
            toastParams: {
                showToast:　false,
            },
            toastSlot: {
                pic: 'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172657362.jpg',
                name: '物品名称'
            }
        }
    },
    components: { Toast, SelfToast },
    methods: {
        ...mapActions([ 'handleTitle']),
        startRotate() {
            if (this.isRotating) {  console.log('正在抽奖中'); return;  }
            if (this.lotteryTicket==0) { console.log('您今天没有抽奖次数了'); return; }
            Toast({
                    message: '正在抽奖中',
                    position: 'middle',
                    duration: 1000,
                    className: 'popup'
                });
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
    background-image: url('../../common/images/global/bg-draw.jpg') ;
    background-size: 100% 100%;
    background-repeat: y; 
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
    .rule {
        width: 100%;
        padding: 0 100px;
        @include box-sizing;
        line-height: 1.5em;
        margin-top: 50px; 
        p {
            width: 100%;
            text-align: justify;
            font-size: $font-size-small; /*no*/
            &:first-child { 
                text-align: center; 
                font-size: $font-size-normal; /*no*/
                margin-bottom: 1em;
                font-weight: 600;
            }
        }
    }
    >p {
        text-align: center;
        margin-top: 30px;
        padding-bottom: 55px;
        a{ text-decoration: underline; color: #fff; padding: 10px 30px;}
    } 
}



</style>
