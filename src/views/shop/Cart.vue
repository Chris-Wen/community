<template>
    <div class="cart">
        <div class="content" v-if="data">
            <ul class="list">
                <li v-for="(item, index) in data" :key="index" @touchstart="touchStart" @touchend="touchEnd">
                    <slider-delete @handleDelete="deleteItem(index)">
                        <div class="item">
                            <div class="check-box">
                                <div @click.stop="handlePlanPay($event, index)">
                                    <i name="checkbox" class="self-icon-circle-o"></i>
                                </div>
                                <router-link tag="div" to="">
                                    <img src="../../common/images/shop/hold/hotsale1.jpg" >
                                </router-link>
                            </div>
                            <div class="goods-cont">
                                <p>{{item.title}}</p>
                                <p class="price"> 
                                    <em class="zd-icon-score"></em>积分 
                                    <span class="item-score">{{item.score}}</span>
                                    <span v-if="item.price" class="item-price">+ ￥ <i>{{item.price}}</i> </span> 
                                </p>
                                <p>参考价：1233.00元 </p>
                                <div class="btn-group">
                                    <a href="javascript:;" class="btn" @click="add($event, index)">+</a>
                                    <input type="number" max="99" min="0" v-model="item.number" readonly/>
                                    <a href="javascript:;" class="btn" @click="reduce($event, index)">-</a>
                                </div>
                            </div>    
                        </div> 
                    </slider-delete>                   
                </li>
            </ul>
            <div class="bottom">
                <div class="select-all" @click="selectAll">
					<i :class="[isAllSelected ? 'self-icon-check-circle' : 'self-icon-circle-o']"></i>
					&nbsp;全选 
				</div>
				<div class="cart-total">
				    <div>合计:</div> 
                    <div>
                        <p> <span >{{totalScore}}</span> 积分</p>
					    <p><span >{{totalPrice}}</span> 元</p>
                    </div>
				</div>
				<div class="settlement" @click="submit">
					结算
				</div>
            </div>
        </div>
        <div class="none" v-else>
            <div class="status">
                <img src="../../common/images/shop/hold/cart1.jpg" >
                <p>购物车竟然是空的</p>
            </div>
        </div>
    </div>
</template>

<script>
import SliderDelete from 'base/SliderDelete/SliderDelete'
import { removeArrayelement } from 'common/js/tools'
import { toggleClass, removeClass, hasClass } from 'common/js/dom'
import { mapMutations, mapActions } from 'vuex'

export default {
    components: { SliderDelete },
    data() {
        return {
            titleInfo: {
                title: '购物车',
                showIcon: true,
                icon: 'self-icon-headphones fa-lg',
                link: '/',
                showBottomTab: true
            },
            sliderDeleteParams: {
                lastTouch: '',
                targetTouch: ''
            },
            data: [
                {id: 1, price: 123, number: 1, score: 1000 , title: '银杏叶片'},
                {id: 2, price: 9.99, number: 19, score: 2000 , title: '伊利股份'},
                {id: 3, price: 1.5, number: 3, score: 888 , title: '栀子金花丸'},
                {id: 1, price: 123, number: 1, score: 1000 , title: '银杏叶片'},
                {id: 2, price: 9.99, number: 19, score: 2000 , title: '伊利股份'},
                {id: 2, price: 9.99, number: 19, score: 2000 , title: '伊利股份'},
                {id: 3, price: 1.5, number: 3, score: 888 , title: '栀子金花丸'},
            ],       
            isAllSelected: false,       //是否全部选中
            num: {},                    //商品数量
            totalScore: 0,
            totalPrice: 0,
            needRecalculate: false,     //商品数量加减后是否需要重新计算总值
            planToPayData: [] 
        }
    },
    methods: {
        ...mapActions(['handleTitle']),
        submit() { console.log("跳转页面结算") } ,
        add(event, index) {
            if (this.data[index].number>=99) return; 
            this.data[index].number = this.data[index].number + 1;
            this.dataCalc()
        },
        reduce(event, index) {
            if (this.data[index].number<=1) return; 
            this.data[index].number = this.data[index].number - 1;
            this.dataCalc() 
        },
        dataCalc() {        //总价、总积分 计算
            this.totalPrice = this.totalScore = 0;
            let [price, score] = [0, 0]
            this.planToPayData.forEach(element => {
                price += element.price * element.number
                score += element.score * element.number
            })
            this.totalPrice = price ? price.toFixed(2) : 0
            this.totalScore = score
        },
        handlePlanPay(event, index) {
            let el = event.currentTarget.children[0]
            if ( this.planToPayData.indexOf(this.data[index]) == -1 ) {
                toggleClass(el, 'self-icon-circle-o', 'self-icon-check-circle')
                this.planToPayData.push(this.data[index])
            } else {
                toggleClass(el, 'self-icon-check-circle', 'self-icon-circle-o')
                removeArrayelement(this.planToPayData, this.data[index])
            }            
            //购物车数据全部选中
            this.isAllSelected = this.planToPayData.length === this.data.length
            this.dataCalc()
        },
        selectAll() {               //底部选中按钮function
            this.isAllSelected = !this.isAllSelected
            //arr.concat()  arr.slice(0) 数组深拷贝  es6 [...arr]
            this.planToPayData = this.isAllSelected ? this.data.concat() : []
            this.dataCalc()
            //样式修改
            let newClass = this.isAllSelected ? 'self-icon-check-circle' : 'self-icon-circle-o'
            document.getElementsByName("checkbox").forEach(element => {
                element.className = newClass
            })
        },

        // 左滑删除一系列操作
        deleteItem(index){
            let checkbox = document.getElementsByName("checkbox"),   checked = [];
            for (let i=index+1; i<checkbox.length; i++) {
                if (checkbox[i]) {
                    if (hasClass(checkbox[i], 'self-icon-check-circle')) {
                        checked.push(i)
                    }
                    checkbox[i].className = 'self-icon-circle-o'
                }
            }
            let deleteItem = this.data.splice(index, 1)
            //删除准备付款数据中对应数据
            for (let i=0; i<this.planToPayData.length; i++) {
                if (deleteItem[0]===this.planToPayData[i]) {
                    this.planToPayData.splice(i, 1);
                    break; 
                }
            }
            //####          api执行删除操作  参数： data[index].id
            //判断改变组件状态 （是否选中为准备付款） 样式修改
            if (checked.length>0) {
                for (let i=0; i<checked.length; i++) {
                    let j = checked[i] - 1;
                    checkbox[j] ? checkbox[j].className = 'self-icon-check-circle' : '' 
                }
            } else {
                for (let i=index; i<checkbox.length; i++) {
                    checkbox[i].className = 'check'
                }
            }
            
            this.isAllSelected = this.data.length !==0  && this.data.length  == this.planToPayData.length
            this.dataCalc()
        },
        touchStart(ev) {
            ev = ev || event;
            this.sliderDeleteParams.lastTouch = this.sliderDeleteParams.targetTouch;
            this.sliderDeleteParams.targetTouch = ev.currentTarget;
        },
        touchEnd(ev) {
            ev = ev || event;
            //若上一个左滑项与当前触摸项不是同一个。上一个左滑项右滑，不再显示删除按钮
            if ( this.sliderDeleteParams.lastTouch && (this.sliderDeleteParams.lastTouch !== this.sliderDeleteParams.targetTouch)) { 
                removeClass(this.sliderDeleteParams.lastTouch.children[0].children[0], 'left-slider')
            }   
        }
    },
    mounted() {
        this.handleTitle({
            title:  this.titleInfo.title,
            showIcon: this.titleInfo.showIcon,
            icon:   this.titleInfo.icon,
            link:   this.titleInfo.link,
            showBottomTab: this.titleInfo.showBottomTab
        })
    },
    watch: {

    }
}
</script>



<style lang="scss" scoped>
@import "../../common/css/index.scss";

// .check { 
//     border: 2px solid $border-color-d;  /*no*/
//     @include border-radius(50%);
//     display: inline-block;
//     width: 25px; height: 25px;
//     vertical-align: -5%;
// }
.cart {
    height: 100%;
    position: relative;
    font-size: $font-size-small; /*no*/
    .none {
        min-height: 800px;
        position: relative;
        .status {
            text-align: center;
            height: 150px;
            position: absolute;
            right: 0;
            left: 0;
            top: 40%;
            font-size: $font-size-min; /*no*/
            color: $text-color-l;
            img { @include border-radius(50%); margin-bottom: 30px; height: 95px; }
        }
    }
    .content {
        .list {
            li {
                @include color-background;
                margin-bottom: 6px;
                width: 100%;
                height: 150px;
            }
            .item {
                width: 100%;
                height: 100%;
                position: relative;
                display: flex;
                .check-box {
                    width: 30%;
                    min-width: 180px;
                    height: 100%;
                    line-height: 150px;
                    padding-right: 50px;
                    @include flex-between; 
                    align-items: center;
                    i { 
                        color: $text-color-ll; font-size: 1.5em;
                        &.self-icon-check-circle { color: $text-color-orange } 
                    }
                    div {
                        text-align: center;
                        height: 100%;
                        &:first-child { width: 80px; }
                        &:last-child { img { width: 100px; height: 100px; @include border-radius(0.5em); } }
                    }
                }
                .goods-cont {
                    max-width: 65%;
                    height: 150px;
                    padding: 25px 0;    
                    @include box-sizing;
                    >p {
                        @include no-wrap;
                        &:first-child { 
                            color: black; 
                            font-weight: 800;
                            font-size: $font-size-normal; /*no*/
                            line-height: 1.2em;
                        }
                        &.price {
                            margin: 10px 0 5px; 
                            color: $text-color-orange;
                            .zd-icon-score { 
                                width: 23px;
                                height: 23px;
                                margin-right: 5px;
                                @include background-image-center;
                            }
                            .item-score, .item-price i { font-size: 1.4em }
                            .item-price { color: red }
                        }
                        &:nth-child(3) {
                            color: $text-color-l;
                            font-size: $font-size-min; /*no*/
                        }
                    }
                    .btn-group {
                        position: absolute;
                        top: 100px;
                        right: 20px;
                        text-align: center;
                        span {
                            display: inline-block;
                            font-size: $font-size-small; /*no*/ 
                            min-width: 60px;
                            height: 35px;
                            line-height: 35px;
                            border: 1px solid $border-color-d; /*no*/
                            vertical-align: 4px;
                        }
                        input{ 
                            text-align:center;  
                            border: 1px solid $border-color-d; /*no*/
                            height: 35px;
                            line-height: 35px;
                            width: 3em;
                        } 
                        .btn {
                            font-size: $font-size-large;  /*no*/
                            display: inline-block;
                            height: 35px;
                            line-height: 35px;
                            width: 1.3em;
                            border: 1px solid $border-color-d; /*no*/
                            font-weight: 800;
                        }
                    }
                }
            }
        }
        .bottom {
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 95px;
            @include box-sizing;
            @include color-background;
            @include flex-between;
            line-height: 95px;
            color: $text-color-ll;
            .select-all {
                width: 20%;
                text-align: center;
                min-width: 130px;
                i { 
                    vertical-align: -8%; 
                    color: $text-color-ll;
                    font-size: 1.5em; 
                    &.self-icon-check-circle { color: $text-color-orange }
                }
                .self-icon-check { border:0; } 
            }
            .cart-total {
                max-width: 48%;
                overflow: hidden;
                @include flex-center;
                div {
                    min-width: 2.5em;
                    &:last-child {
                        line-height: 1.5em;
                        margin: 0 25px;
                        p {
                            @include no-wrap;
                            font-weight: 800;
                            font-size: $font-size-normal; /*no*/
                            &:first-child { color: $text-color-orange; }
                            &:nth-child(2) { color: red }
                        }
                    }
                }
                
            }
            .settlement {
                width: 30%;
                @include color-grad-btn;
            }
        }
    }   
}
</style>

