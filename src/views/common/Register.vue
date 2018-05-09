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
					<p v-if="text">{{ text }}</p>
				</li>
				<li>
				 	<p> <em>设置密码</em>：<input type="password" placeholder="请输入密码" /> </p>
					<p v-if="text">{{ text }}</p>
				</li>
				<li>
				 	<p> <em>确认密码</em>：<input type="password" placeholder="请确认密码" /> </p>
					<p v-if="text">{{ text }}</p>
				</li>
				<li>
				 	<p> <em>真实姓名</em>：<input type="text" placeholder="可暂不填写" /> </p>
					<p v-if="text">{{ text }}</p>
				</li>
				<li>
				 	<p> <em>身份证</em>：<input type="text" placeholder="可暂不填写" /> </p>
					<p v-if="text">{{ text }}</p>
				</li>
				<li>
				 	<p> <em>邮箱</em>：<input type="email" placeholder="" /> </p>
					<p v-if="text">{{ text }}</p>
				</li>
				<li>
				 	<p> <em>验证码</em>：<input type="text" placeholder="" /> </p>
					<p v-if="text">{{ text }}</p>
				</li>
			</ul>
			<button @click="handleLogin">登录</button>
		</form>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                tilte: '注册',
                showIcon: false,
                showBottomTab: true,  /*true表示底部不显示*/
			},
			text: ''
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        handleLogin() {
            console.log('login')
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
    padding: 0 80px;
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
}
</style>



