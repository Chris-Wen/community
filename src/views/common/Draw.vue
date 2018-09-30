<template>
    <div class="draw">
        <draw-popup v-if="toastParams.showToast" 
            :leftBtn="toastParams.leftBtn" 
            :rightBtn="toastParams.rightBtn" 
            :showCancleBtn="toastParams.canleBtn"
            @handleClick="_handleClick" >
            <!-- 插槽奖品内容 -->
            <p>{{toastSlot.name}}</p>
            <img :src="HOST + toastSlot.pic">
        </draw-popup>
        <div class="turnplate-box">
            <div style="position: relative">
                <div :class="['turnplate', {'plate-rotate':!hasOperatePage}]">
                    <div :class="['prize', prizeType==2 ? 'prize-image-2': 'prize-image-1' ]" ref="turnplate"></div>
                </div>
                <div class="btn-draw"  @click="startRotate"></div>
            </div>
        </div>
        
        <div v-if="true" class="lottery-times">今日免费：{{lotteryTicket}}次</div>
        <div class="rule">
            <h1 class="rule-name">抽奖规则</h1>
            <div>
                <ul class="decoration-bg">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <div>
                    <p>（1）每天首次登陆，免费抽奖1次。</p>
                    <p>（2）连续签到3天，额外免费抽奖3次。</p>
                    <p>（3）可通过消耗商城积分进行抽奖，20积分每次。</p>
                    <p>（4）抽奖次数达到50次，礼品池会刷新礼品类型。 </p>
                    <p>（5）抽中积分即刻到账；抽中虚拟物品请尽快使用，以免过期失效；抽中实物，点击【放弃】或在填写订单过程中出现关闭/返回等动作，视作放弃奖品。</p>
                    <p>（6）抽奖活动最终解释权归本平台所有，抽奖结果以后台数据为准。</p>
                </div>
            </div>    
        </div>
        <router-link tag="div" class="lottery-btn" to="/draw/record">中奖记录 》</router-link> 
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import DrawPopup from '../../components/DrawPopup/DrawPopup'

export default {
    components: { DrawPopup },
    data() {
        return {
            titleInfo: {
                title:  '幸运大转盘',
                hideReturnIcon: true,
                showIcon:   false
            },
            lotteryTicket: '',   //抽奖次数
            prizeType: 1,
            // prizeList: [
            //     {
            //         img: '',            //奖品图片
            //         name: '奖品1',      //奖品名称
            //         isPrize: 1          //是否为奖品
            //     },
            //     {   img: '',  name: '奖品2',   isPrize: 1  },
            //     {   img: '',  name: '奖品3',   isPrize: 1  },
            //     {   img: '',  name: '奖品4',   isPrize: 1  },
            //     {   img: '',  name: '奖品5',   isPrize: 1  },
            //     {   img: '',  name: '未中奖',   isPrize: 0 },
            //     {   img: '',  name: '未中奖',   isPrize: 0 },
            //     {   img: '',  name: '未中奖',   isPrize: 0 },
            //     {   img: '',  name: '未中奖',   isPrize: 0 },
            //     {   img: '',  name: '未中奖',   isPrize: 0 }
            // ],
            isRotating: false,
            toastParams: {
                showToast: false,
                leftBtn: '存入仓库',
                rightBtn: '申请邮寄',
                canleBtn: true,
            },
            toastSlot: {
                pic: '',
                name: ''
            },
            hasOperatePage: false,      //正在进行抽奖操作
            noticeUser: false,          //通知用户将使用积分进行抽奖
            unaffordable: false,        //用户积分不足
        }
    },
    created() {
        if (this.token) {           //登录状态，获取免费抽奖次数 , 积分不显示，由后台判断积分是否足够
            this.axios.get('/lottery/index').then(response => {
                if (response.code==200) {
                    var data = response.data
                    this.lotteryTicket = data.remain_times
                    // this.score = data.score
                    if (data.prize_type==2) this.prizeType = 2
                } 
            })
        } else {                    //非登录状态，使用cookie登录，cookie失效，则提示未登录
            if (!sessionStorage.getItem('checkUserLogin')) {
                this.cookieLogin().then( res => {
                    if (res.code==403) {
                        Toast('您还未登录')
                    } else if (res.code==405) {
                        Toast(res.msg)
                    }
                    sessionStorage.setItem('checkUserLogin', true) 
                })
            }
            this.lotteryTicket = 5
        }
    },
    computed: {
        ...mapGetters(['token', 'userInfo',])
    },
    methods: {
        ...mapActions([ 'handleTitle', 'cookieLogin']),
        changeStatusAfterDraw( index=Math.floor(Math.random()) ) {  //默认为随机抽奖结果
            //抽奖后状态改变
            if (this.lotteryTicket > 0) this.lotteryTicket --;
            this.isRotating = true;
            this.$refs.turnplate.style = "";

            // let final_rotate_deg = 360/this.prizeList.length * index;      //指针最终停止角度（奖品栏正中位置）
            let final_rotate_deg = 360/10 * index;      //指针最终停止角度（奖品栏正中位置）
            //转动6个整圈后 停在最终位置
            let total_rotate_deg = 360*6 + final_rotate_deg;

            setTimeout(()=>{              
                this.$refs.turnplate.style = `transform: rotate(${total_rotate_deg}deg); transition: all 5s ease`
            }, 30);
            setTimeout(() => {
                this.isRotating = false;
                // this.toastParams.toast = true
                if (!this.token) {
                    Toast('您还未登录')
                    setTimeout(() => {
                        this.$router.push('/login')
                    }, 3000);
                    return;
                }
                this.toastParams.showToast = true
                //积分-20

            }, 5500);
        },
        startRotate() {
            this.hasOperatePage = true
            if (this.isRotating) {  
                return Toast({
                    message: '正在抽奖中',
                    position: 'middle',
                    duration: 1000,
                    className: 'popup'
                })  
            }
            if (this.unaffordable) return Toast('您的积分不足');

            if (this.lotteryTicket==0  && !this.noticeUser) { 
                this.noticeUser = true
                return Toast({
                    message: '继续抽奖将耗费20积分每次',
                    position: 'middle',
                    duration: 3000
                }) 
            }
            let deg;
            
            if (!this.token) {      //未登录，模拟抽奖结果
                this.changeStatusAfterDraw();   //随机抽奖结果
            } else {                //后端获取抽奖结果
                this.axios.get('/lottery/getAwards', undefined, true).then( res => {
                    if (res.code==200) {
                        let result = res.data
                        deg = result.sort 

                        this.changeStatusAfterDraw(deg-1)
                        this.toastSlot.name = result.prize
                        this.toastSlot.pic = result.logo
                        if (result.prize_table==2) {    //切换抽奖图
                            this.prizeType = 2
                        }

                        if (res.code.prize_type==3) {       //实物奖励
                            this.toastParams.canleBtn = true
                        } else {
                            this.toastParams.canleBtn = false
                        }
                    } else if (res.code==201){          //积分不足
                        this.unaffordable = true
                        return Toast(res.msg)
                    }
                })
            }

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
            hideReturnIcon: this.titleInfo.hideReturnIcon,
            showIcon: this.titleInfo.showIcon, 
        });
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";


.plate-rotate {
    @include animate-rotate(50s);
}
.draw {
    position: relative;
    padding-bottom: 45px;
    background-image: url('../../common/images/global/bg-draw.jpg') ;
    background-size: 100% 100%;
    color: $text-color-w;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
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
            // @include background-image(url('../../common/images/global/turnplate.png'));
            // background-size: 436px 436px;
        }
        .prize-image-1 {
            @include background-image(url('../../common/images/global/turnplate.png'));
            background-size: 436px 436px;
        }
        .prize-image-2 {
            @include background-image(url('../../common/images/global/turnplate1.png'));
            background-size: 436px 436px;
        }
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
