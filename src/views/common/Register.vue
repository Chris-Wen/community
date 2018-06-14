<template>
 	<div class="register">
		<div class="logo">
			<div>
				<img src="../../common/images/icons/LOGO(1).png" alt="">
				<p>掌动游戏，快乐生活</p>
			</div>
		</div>
		<form @submit.prevent>
			<ul>
				<li>
				 	<p> 
						<em>通行证</em>：
						<input type="text" placeholder="账号" v-model="inputParams.account"  @blur="checkAccount" autofocus/> 
					</p>
					<p>{{ warning.account }}</p>
				</li>
				<li>
				 	<p> <em>设置密码</em>：<input type="password" placeholder="请输入密码" /> </p>
					<p>{{ warning.password }}</p>
				</li>
				<li>
				 	<p> <em>确认密码</em>：<input type="password" placeholder="请确认密码" /> </p>
					<p>{{ warning.confrim }}</p>
				</li>
				<li>
				 	<p> <em>手机号码</em>：<input type="text" placeholder="11位手机号" /> </p>
					<p>{{ warning.phone }}</p>
				</li>
				<li>
				 	<p> <em>邮箱</em>：<input type="email" placeholder="邮箱" /> </p>
					<p>{{ warning.email }}</p>
				</li>
				<li>
				 	<p> <em>昵称</em>：<input type="text" placeholder="用户昵称" /> </p>
					<p>{{ warning.nickname }}</p>
				</li>
				<li>
				 	<p> 
						<img class="verify" :src="verify" @click="changeVerify" alt="验证码图片">
						<em>验证码</em>：<input type="text" placeholder="验证码" /> 
					</p>
					<p>{{ warning.verify }}</p>
				</li>
			</ul>
			<div class="compact">
				<p ><input type="radio" checked/> 我已阅读并同意<a class="needsclick" href="http://www.baidu.com" >《掌动用户社区注册协议》</a> </p>
			</div>	
			<p><button @click="handleLogin">注 &nbsp;册</button></p>
		</form>
  	</div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import * as api from 'api/loginApi.js'

export default {
    data() {
        return {
            titleInfo: {
                title: '注 册',
                showIcon: false,
                showBottomTab: true,  /*true表示底部不显示*/
			},
			verify: 'http://shop.73776.com/index.php/home/verify',
			warning: {
				account: '',
				password: '',
				confirm: '',
				phone: '',
				email: '',
				nickname: '',
				verify: ''
			},
			rule: {
				account: {
					tip: '支持数字、字母，不含空格及特殊符号,6~12位',
				},
				password: {
					tip: '不含空格，6~18位'
				},
				password: { tip: '与密码不一致' },
				phone: {
					tip: '11位手机号码'
				},
				email: {
					tip: '可暂不填写'
				},
				nickname: {
					tip: '不含特殊符号，空格，不超过8位',
				},
				code: { tip: '必填项'}
			},
			inputParams: {
				account: '',
			}
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        handleLogin() {
            console.log('login')
        },
		changeVerify() {

		},
		checkAccount() {
			if (this.inputParams.account) {
				// api.valiUserName(this.inputParams.account).then( res=> {
				// 	console.log(res)
				// })
			} 
		}
    },
    mounted() {
        this.handleTitle({ 
            title: this.titleInfo.title,
            showIcon: this.titleInfo.showIcon,
            showBottomTab: this.titleInfo.showBottomTab
		})

	},
	watch: {
		inputParams: {
			handler(val) {
				// console.log(val)
			},
			deep: true
		},
		'inputParams.account'(val) {
			if (val.length<6 || val.length>12) {
				this.warning.account = this.rule.account.tip
			} else {
				this.warning.account = ''
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.register {
    background-image: url('../../common/images/global/bg-register.jpg');
    background-repeat: no-repeat;
    background-size: 100%;
	padding: 0 80px;
	font-size: $font-size-small; /*no*/
	@include box-sizing;
    .logo {
        width: 100%;
        height: 290px;
        @include flex-colum;
        align-items: center;
        justify-content: space-around;
        div {
            text-align: center;
            img { width: 138px; height: 126px; margin-bottom: 12px }
            color: $text-color-orange;
            p { transform: scale(0.90); }
        }
	}
	form {
		ul {
			padding-top: 10px;
			li{
				P {
					&:first-child {
						em {
							display: inline-block;
							@include text-align-justify(4);
						}
						input {
							text-indent: 1em;
							height: 40px;
							width: 70%;
						}
					}
					&:nth-child(2) {
						text-align: center;
						color: red;
						font-size: $font-size-min; /*no*/
						min-height: 35px;
						line-height: 35px;
					}
				}
				&:last-child p {
					// padding-top: 10px;
					input {
						width: 35%;
					}
					.verify {	
						float: right;
						margin-right: 5%;
						width: 120px;
						margin-top: -5px;	
					}
					&:last-child { width: 80% }
				}
			}
		}
		>p {
			text-align: center;
			margin-top: 50px;
			button {
				@include color-grad-btn;
				border: 0;
				height: 60px;
				line-height: 60px;
				width: 50%;
				font-size: $font-size-normal; /*no*/
				font-weight: 600;
			}	
		}
		.compact {
			width: 100%;
			font-size: $font-size-min; /*no*/
			white-space: nowrap;
			position: relative; 
			height: 1em;
			color: $text-color-l; 
			a { text-decoration: underline }
		}
	}
}
</style>



