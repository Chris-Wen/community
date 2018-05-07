<template>
	<header>
		{{ title }}
		<div class="icon">
			<a href="javascript:history.go(-1);" >
				<i class="fa fa-angle-left fa-2x"></i>
			</a>
			<router-link :to="link" v-if="showIcon" >
				<i :class="[icon]"></i>
			</router-link>
		</div>
	</header>
</template>

<script>
import 'font-awesome/css/font-awesome.css'
import { mapState } from 'vuex'

export default {
	name: 'MHeader',
	data(){
		return{}
	},
	methods:{

	},
	computed: {
		...mapState({
			title: 		state => state.titleGroup.title ,
			showIcon: 	state => state.titleGroup.showIcon ,
			icon: 		state => state.titleGroup.icon ,
			link: 		state => state.titleGroup.link
		})

	}
}
</script>


<style lang="scss" scoped>
// @import "~common/css/variable.scss";

header{
	box-sizing: border-box;
	position: fixed;
	z-index: 100;
	top: 0;
	width:100%;
	height:100px;
	overflow: hidden;
	line-height:100px;
	font-size: 18px;	/*no*/
	font-weight: bold;
	text-align: center;
	color:white;
	background: -webkit-linear-gradient(left, #31070a, black); 
    background: -o-linear-gradient(right, #31070a, black); 
    background: -moz-linear-gradient(right, #31070a, black); 
    background: linear-gradient(to right, #31070a, black);
	.icon{
		position: absolute;
		z-index: 100;
		top: 0;
		width: 100%;
		height: 100px;
		a{
			padding:0 30px;
			float: right;
			i { 
				color:white; 
				vertical-align: middle 
			}
		}
		a:first-child{  float: left;}
	}
}
</style>
