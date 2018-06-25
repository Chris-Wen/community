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
						<input type="text" placeholder="账号" name="passport" maxlength="12" v-model.trim="inputParams.passport"  @blur="fastCheck('passport')" autofocus/> 
					</p>
					<p>{{ warning.passport }}</p>
				</li>
				<li>
				 	<p> <em>设置密码</em>：<input type="password" name="password" maxlength="12" placeholder="请输入密码" v-model.trim="inputParams.password" /> </p>
					<p>{{ warning.password }}</p>
				</li>
				<li>
				 	<p> <em>确认密码</em>：<input type="password" name="confirm" maxlength="12" placeholder="请确认密码" v-model.trim.lazy="inputParams.confirm" /> </p>
					<p>{{ warning.confirm }}</p>
				</li>
				<li>
				 	<p> <em>手机号码</em>：<input type="text" name="mobile" maxlength="11" placeholder="11位手机号" @blur="fastCheck('mobile')" v-model.trim="inputParams.mobile" /> </p>
					<p>{{ warning.mobile }}</p>
				</li>
				<!-- <li>
				 	<p> <em>邮箱</em>：<input type="email" placeholder="邮箱" /> </p>
					<p>{{ warning.email }}</p>
				</li> -->
				<li>
				 	<p> <em>昵称</em>：<input type="text" name="nickname" maxlength="8" placeholder="用户昵称" @blur="fastCheck('nickname')" v-model.trim="inputParams.nickname" /> </p>
					<p>{{ warning.nickname }}</p>
				</li>
				<li>
				 	<div> 
						<em>验证码</em>：
						<div>
							<input type="text" placeholder="验证码" v-model.trim="inputParams.verifycode" />
							<img class="verify" :src="verify" @click="changeVerify" alt="验证码图片">
						</div> 
					</div>
					<p>{{ warning.verifycode }}</p>
				</li>
			</ul>
			<div class="compact">
				<p ><input type="checkbox" v-model="inputParams.checkbox" checked/> 我已阅读并同意<a class="needsclick" href="http://www.baidu.com" >《掌动用户社区注册协议》</a> </p>
			</div>	
			<p><button :class="{'dark': !clickable}" @click="handleRegister" disabled>注 &nbsp;册</button></p>
		</form>
  	</div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import * as api from 'api/api'
import { hex_md5 } from 'common/js/md5'

export default {
    data() {
        return {
            titleInfo: {
                title: '注 册',
                showIcon: false,
                showBottomTab: true,  				/*true表示底部不显示*/
			},
			verify: 'http://shop.73776.com/index.php/home/login/verify',
			warning: {
				passport: '',
				password: '',
				confirm: '',
				mobile: '',
				nickname: '',
				verifycode: ''
			},
			rule: {
				passport: {
					tip: '字母开头，支持数字、字母,6~12位',
					reg: /^[a-zA-Z][a-zA-Z0-9_]{5,11}$/
				},
				password: {
					tip: '数字、字母、特殊字符的任意两种以上组合，6-12位',
					reg: /^((?=.*?\d)(?=.*?[A-Za-z])|(?=.*?\d)(?=.*?[!@#$%^&*=-_+])|(?=.*?[A-Za-z])(?=.*?[!@#$%^&*=-_+]))[\dA-Za-z!@#$%^&*=-_+]+$/
				},
				confirm: { tip: '两次密码不一致' },
				mobile: {
					tip: '11位手机号码',
					reg: /^1[23456789][0-9]{9}$/
				},
				email: {
					tip: '可暂不填写'
				},
				nickname: {
					tip: '不含特殊符号，空格，2~8位',
					reg: /^[\u4e00-\u9fa5A-Za-z0-9-_]*$/
				},
				verifycode: { tip: '必填项'}
			},
			inputParams: {
				passport: '',
				password: '',
				confirm: '',
				mobile: '',
				nickname: '',
				verifycode: '',
				checkbox: true
			},
			edited: {
				passport: false,
				password: false,
				confirm: false,
				mobile: false,
				nickname: false,
				verifycode: false,
				checkbox: true,
			},
			clickable: false,

        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        handleRegister() {
			console.log(123)
			if (!this.clickable) return;
			
			this.clickable = false			//防短时重复注册
			// this.inputParams.password = hex_md5(this.inputParams.password)
			// this.inputParams.confirm = hex_md5(this.inputParams.confirm)
            api.post('/login/user_register', this.inputParams).then( res => {	
				this.clickable = true

				console.log(res)
				if (res.code==200) {
					let instance = Toast('注册成功,跳转登录页面')
					setTimeout(() => {
						instance.close()
						
						this.$router.go(-1)
					}, 2000);
				} else if(res.code==402) {
					Toast({
						message: res.msg,
						position: 'middle',
						duration: 3000
					})
				} else if (res.code==407) {
					Toast({
						message: '注册失败，请稍候重试',
						position: 'middle',
						duration: 3000
					})
				}
			})
        },
		changeVerify(ev) {
			ev = ev || event
			let target = event.currentTarget
			target.src = this.verify + '/?timestamp=' + new Date().getTime()
		},
		fastCheck(payload) {
			// if (this.warning.passport || this.warning.mobile || this.warning.nickname) return;
			let data;

			switch(payload) {
				case 'passport': data = { passport: this.inputParams[payload] };
					break;
				case 'mobile': data = { mobile: this.inputParams[payload] };
					break;
				case 'nickname': data = { nickname: this.inputParams[payload] };
					break;
			}
			if (this.inputParams[payload] && !this.warning[payload]) {
				console.log(data)
				api.post('/login/check_' + payload, data ).then( res => {
					console.log(res.code==200)
					this.warning[payload] = res.code == 401 ? res.msg : ''
					this.edited[payload] = res.code === 200
				})
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
		edited: {
			handler(val) {
				// console.log(val)
				let allEdited = true;
				for(let i in val) {
					if (!val[i]) { 
						allEdited = false
						break;
					}
				}
				this.clickable = allEdited
			},
			deep: true
		},
		'inputParams.passport'(val) {
			let msg;
			if (val.length<6 || val.length>12) {
				msg = this.rule.passport.tip
			} else if (!this.rule.passport.reg.test(val)) {
				msg = '必须以字母开头，支持字母和数字'
			} else {
				msg = ''
			}
			this.edited.passport = msg === ''
			this.warning.passport = msg
		},
		'inputParams.password'(val) {
			// console.log(this.rule.password.reg.test(val))
			let msg;
			if (val.length<6 || val.length>12) {
				msg = this.rule.password.tip
			} else if (!this.rule.password.reg.test(val)) {
				msg = '密码必须是数字、字母、特殊字符的任意两种以上组合'
			} else {
				msg = ''
			}
			this.edited.password = msg === ''
			this.warning.password = msg
		},
		'inputParams.confirm'(val) {
			let	msg = val === this.inputParams.password  ? '' : this.rule.confirm.tip 

			this.edited.confirm =  msg === ''
			this.warning.confirm = msg
		},
		'inputParams.mobile'(val) {
			let msg;
			if (val.length != 11) {
				msg = this.rule.mobile.tip
			} else if (!this.rule.mobile.reg.test(val)) {
				msg = '手机格式不正确'
			} else {
				msg = ''
			}
			this.edited.mobile = msg === ''
			this.warning.mobile = msg
		},
		'inputParams.nickname'(val) {
			console.log(escape(val))
			let msg;
			if (val.length<2 || val.length>8) {
				msg = this.rule.nickname.tip
			} else if (!this.rule.nickname.reg.test(val)) {
				msg = '昵称不能包含特殊符号，空格'
			} else {
				msg = ''
			}
			this.edited.nickname = msg === ''
			this.warning.nickname = msg
		},
		'inputParams.verifycode'(val) {
			if (val==='') {
				this.warning.verifycode = this.rule.verifycode.tip
			} else {
				this.warning.verifycode = ''
			}
			this.edited.verifycode = val ? true : false
		},
		'inputParams.checkbox'(val) {
			if (!val) {
				Toast({
					message: '不勾选则无法注册',
					position: 'middle',
					duration: 3000
				})
			} 
			this.edited.checkbox = val
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
				>P {
					&:first-child {
						display: flex;
						height: 50px;
						line-height: 50px;
						em {
							display: inline-block;
							@include text-align-justify(4);
							min-width: 4em;
						}
						input {
							text-indent: 1em;
							width: 100%;
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
				&:last-child {
					line-height: 50px;
					>div {
						display: flex;
						em {
							display: inline-block;
							@include text-align-justify(4);
							min-width: 4em;
						}
						>div {
							width: 100%;
							@include box-sizing;
							display: flex;
							justify-content: space-between;
							input { width: 100%; text-indent: 1em; width: 7em;}
							.verify {	 width: 150px; height: 50px;  }
						}		
					}
					>p { width: 80% }
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
			.dark { background: gray; }
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



