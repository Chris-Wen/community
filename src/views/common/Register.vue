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
				 	<p> <em>通行证</em>：<input type="text" placeholder="" autofocus/> </p>
					<p>{{ text }}</p>
				</li>
				<li>
				 	<p> <em>设置密码</em>：<input type="password" placeholder="请输入密码" /> </p>
					<p>{{ text }}</p>
				</li>
				<li>
				 	<p> <em>确认密码</em>：<input type="password" placeholder="请确认密码" /> </p>
					<p>{{ text }}</p>
				</li>
				<li>
				 	<p> <em>真实姓名</em>：<input type="text" placeholder="可暂不填写" /> </p>
					<p>{{ text }}</p>
				</li>
				<li>
				 	<p> <em>身份证</em>：<input type="text" placeholder="可暂不填写" /> </p>
					<p>{{ text }}</p>
				</li>
				<li>
				 	<p> <em>邮箱</em>：<input type="email" placeholder="" /> </p>
					<p>{{ text }}</p>
				</li>
				<li>
				 	<p> 
						<img class="verify" :src="verify" @click="changeVerify" alt="验证码图片">
						<em>验证码</em>：<input type="text" placeholder="" /> 
					</p>
					<p>{{ text }}</p>
				</li>
			</ul>
			<div class="compact">
				<p ><input type="radio" checked/> 我已阅读并同意<a href="javascript:;">《掌动手游网通行证用户服务协议及隐私协议》</a> </p>
			</div>	
			<p><button @click="handleLogin">注 &nbsp;册</button></p>
		</form>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                title: '注 册',
                showIcon: false,
                showBottomTab: true,  /*true表示底部不显示*/
			},
			verify: 'http://community.73776.com/index.php/shop/WebShop/verify',
			text: '',
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        handleLogin() {
            console.log('login')
        },
		changeVerify() {

		}
    },
    mounted() {
        this.handleTitle({ 
            title: this.titleInfo.title,
            showIcon: this.titleInfo.showIcon,
            showBottomTab: this.titleInfo.showBottomTab
        })
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.register {
    background-image: url('../../common/images/global/bg-register.jpg');
    background-repeat: no-repeat;
    background-size: 100%;
	padding: 0 80px 50px;
	font-size: $font-size-small; /*no*/
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
			p {
				position: absolute;
				left: -15%;
				transform: scale(0.85);
			}
			a { text-decoration: underline }
		}
	}
}
</style>



