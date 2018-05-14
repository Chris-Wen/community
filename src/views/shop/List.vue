<template>
    <div class="list">
        <div class="mask" v-show="isOption" @click="showMenu()"></div>
		<div class="select-box">
			<span @click="showMenu()">调整排序&nbsp;&nbsp;<i class="fa fa-angle-down fa-lg"></i></span>
		</div>
		<ul class="pop-options" v-show="isOption">
            <li v-for="(value,key) in ruleList" :key="key"  @click="changeRule( key+1 )">
                {{value}}
                <i v-bind:class="{'fa fa-check fa-1x icon-check' : (rule==key+1) }"></i>
            </li>
		</ul>

        <!-- 数据循环部分 -->
        <ul class="goods-list">
			<router-link tag="li" v-for="(value,key) in list" :key='key'  :to="'/shop/details/'+key" :event="['click']">
				<dl>
					<dt> <img :src=" preSrc + value.logo " alt=""></dt>
					<dd class="goods-cont">
						<em>{{value.sname}}</em>
                        <div>
                            <p class="score"> 
                                <span><i></i>积分 </span> <span class="goods-score">{{value.score}}</span>
                                <i v-if=" value.price && parseInt(value.price)>0 ">+</i>
                                <span  v-if=" value.price && parseInt(value.price)>0 " class="goods-price">
                                    <i>￥</i>{{value.price}}
                                </span>
                            </p>
                            <p>市场参考价：{{value.realprice}}元 </p>
                        </div>
					</dd>
				</dl>
			</router-link>
		</ul>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    name: 'goodsList',
    data() {
        return { 
            titleInfo: {
                title:'商品列表',
                showIcon: false
            },
            type:'',
            rule:'',
            page:1,         //分页，当前页码
            num: 20,        //每次请求显示数据量
            totalPage:'',
            list1:[
                {id: "10", sname: "王者荣耀手机手柄王者荣耀手机手柄王者荣耀手机手柄王者荣耀手机手柄", logo: "20180110204525329.jpg", num: "100", price: "1300", score: "3000", realprice: "123"},
                {id: "14", sname: "王者荣耀手机手柄", logo: "20180110204525329.jpg", num: "100", price: "0", score: "3000", realprice: "123"},
            ],
            list:[
                {id: "10", sname: "王者荣耀手机手柄", logo: "20180110204525329.jpg", num: "100", price: "1300", score: "3000", realprice: "123"},
                {id: "14", sname: "王者荣耀手机手柄", logo: "20180110204525329.jpg", num: "100", price: "1", score: "3000", realprice: "123"},
                {id: "18", sname: "王者荣耀手机手柄", logo: "20180110204525329.jpg", num: "100", price: "1", score: "3000", realprice: "13"},
                {id: "22", sname: "王者荣耀手机手柄", logo: "20180110204525329.jpg", num: "100", price: "1", score: "3000", realprice: "123"},
                {id: "26", sname: "王者荣耀手机手柄", logo: "20180110204525329.jpg", num: "100", price: "1", score: "3000", realprice: "13"},
                {id: "30", sname: "王者荣耀手机手柄", logo: "20180110204525329.jpg", num: "100", price: "1", score: "3000", realprice: "123"},
                {id: "34", sname: "王者荣耀手机手柄", logo: "20180110204525329.jpg", num: "100", price: "1", score: "3000", realprice: "1"},
                {id: "38", sname: "王者荣耀手机手柄", logo: "20180110204525329.jpg", num: "100", price: "1", score: "3000", realprice: "13"},
                {id: "42", sname: "王者荣耀手机手柄", logo: "20180110204525329.jpg", num: "100", price: "1", score: "3000", realprice: "23"},
                {id: "46", sname: "王者荣耀手机手柄", logo: "20180110204525329.jpg", num: "100", price: "1", score: "3000", realprice: "123"},
                {id: "50", sname: "王者荣耀手机手柄", logo: "20180110204525329.jpg", num: "100", price: "1", score: "3000", realprice: "23"},
                {id: "54", sname: "王者荣耀手机手柄", logo: "20180110204525329.jpg", num: "100", price: "1", score: "3000", realprice: "113"},
                {id: "58", sname: "王者荣耀手机手柄", logo: "20180110204525329.jpg", num: "100", price: "1", score: "3000", realprice: "1223"},
                {id: "62", sname: "王者荣耀手机手柄", logo: "20180110204525329.jpg", num: "100", price: "1", score: "3000", realprice: "1223"},
                {id: "66", sname: "王者荣耀手机手柄", logo: "20180110204525329.jpg", num: "100", price: "1", score: "3000", realprice: "122"}
            ],
            isOption: false,
            check:'fa fa-check icon-check',
            ruleList:['积分由低到高','价格由低到高','价格由高到低','积分由高到低'],
            params: {
                    page: this.page,
                    type: this.type,
                    rule: this.rule,
                    num: this.num
                }
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        jumpToDetail(link){
            console.log(link)
            console.log(this.$router)
        },
        changeRule(index){
            this.rule = index;
            this.isOption = !this.isOption;
            var params = {
                    page: this.page,
                    type: this.type,
                    rule: this.rule,
                    num: this.num
                };
            // this.getList(params);
        },
        showMenu(){ this.isOption = !this.isOption }
    },
    mounted(){
        this.handleTitle({ 
            title: this.titleInfo.title,
            showIcon: this.titleInfo.showIcon
        })
        // this.getList({
        //         page: this.page,
        //         type: this.type,
        //         rule: this.rule,
        //         num: this.num
        //     }).then(res => {
        //         this.page = res.page
        //         this.totalPage = res.totalPage
        //     }).catch(err => reject(err) )
    },
    watch: {
        // page: function(){
        //         this.getList({
        //             page: this.page,
        //             type: this.type,
        //             rule: this.rule,
        //             num: this.num
        //         })
        //     }
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.list {
    font-size: $font-size-small; /*no*/
    .mask{
        position: absolute;      
        width: 100%;
        height: 100%;
        @include color-background;
        opacity: .1; 
    }
    .select-box{ 
        height: 70px; 
        line-height: 70px; 
        text-align: right;  
        font-size: $font-size-normal; /*no*/
        color: $text-color-l; 
        span{ padding: 10px 60px 10px 30px }
    }
    .pop-options{
        background-color: #fff; 
        color: $text-color-l; 
        width: 55%; 
        min-width: 315px;
        max-width: 500px;
        position: absolute;
        top: 170px; 
        right: 30px; 
        z-index: 10; 
        border-top:0; 
        box-shadow: -3px 0 10px #b2b2b2, 3px 0 10px #b2b2b2, 0 -3px 0px white, 3px 0 10px #b2b2b2;
        li{ 
            height: 50px; 
            line-height: 50px;  
            border-bottom: 3px solid $border-color-d; 
            padding-left: 90px;
            .icon-check{ 
                color: orange; 
                float: right; 
                margin: 10px 30px 0 0; 
            }
            &:last-child{ border:0 }
        }
    }
    .goods-list{ 
        li{ 
            @include color-background;
            margin-bottom: 8px; 
            padding: 20px 60px;
            height: 110px;
            dl { 
                width: 100% ;
                height: 110px;
                @include box-sizing;
                display: flex;
                dt{ 
                    width: 120px; 
                    height: 110px; 
                    margin-right: 40px;
                    img { 
                        height: 100px; 
                        width: auto; 
                        @include border-radius(0.5em);
                    }
                }
                dd { 
                    height: 100%;
                    @include flex-colum;
                    justify-content: space-between;
                    width: 70%; 
                    @include box-sizing;
                    em { 
                        @include no-wrap; 
                        font-size: $font-size-normal; /*no*/  
                        font-weight: 800;
                    }
                    div p { 
                        &.score {
                            //  margin: 15px 0;
                            color: red;
                            span:first-child {
                                color: $text-color-orange; 
                                margin-right: 5px;
                                i {
                                    display: inline-block;
                                    width: 23px;    
                                    height: 23px;
                                    @include background-image(url('../../common/images/icons/icon_zd.jpg'));                             
                                    margin-right: 5px;
                                }
                            }
                            span.goods-score, .goods-price{ 
                                margin-right: 5px; 
                                color: $text-color-orange;
                                font-size: $font-size-large; /*no*/ 
                                font-weight: 600;
                            }
                            .goods-price{ 
                                color: red;
                                i { font-size: $font-size-small; /*no*/ }
                            }
                        }
                        &:last-child { 
                            color: $text-color-dark; 
                            font-size: $font-size-min; /*no*/ 
                            margin-top: 8px;
                        }
                    }
                }
            }
        }
    }
}
</style>


