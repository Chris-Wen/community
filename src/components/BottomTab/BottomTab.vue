<template>
    <div v-if="showBottomTab ? false : true" class="footer">
        <router-link tag="li" to="/">
            <i @click=" setIconShowIndex(1) " :class="{ active:  (index==undefined) || (getIconShowIndex() == 1) }"></i>
            <img src="../../common/images/icons/1-1.png"> 
            <p> 幸运转盘 </p>
        </router-link>
        <router-link tag="li" to="/forum">
            <i @click=" setIconShowIndex(2) " :class="{ active: (index==2) || (getIconShowIndex() == 2) }"></i>
            <img src="../../common/images/icons/2-1.png"> 
            <p> 掌动论坛 </p>
        </router-link>
        <router-link tag="li" to="/fiction">
            <i @click=" setIconShowIndex(3) " :class="{ active: (index==3) || (getIconShowIndex() == 3) }"></i>
            <img src="../../common/images/icons/3-1.png"> 
            <p> 掌动小说 </p>   
        </router-link>
        <router-link tag="li" to="/shop">
            <i @click=" setIconShowIndex(4) " :class="{ active: (index==4) || (getIconShowIndex() == 4) }"></i>
            <img src="../../common/images/icons/4-1.png"> 
            <p> 积分商城 </p>
        </router-link>
        <router-link tag="li" to="/center">
            <i @click=" setIconShowIndex(5) " :class="{ active: (index==5) || (getIconShowIndex() == 5) }"></i>
            <img src="../../common/images/icons/5-1.png"> 
            <p> 我的 </p>
        </router-link>
    </div>  
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'MFooter',
	data(){
		return{
            index: sessionStorage.getItem("bottomTap"),
        }
    },
    methods: {
        setIconShowIndex(key) {
            this.index = key
            window.sessionStorage.setItem("bottomTap", this.index)
        },
        getIconShowIndex() {
            return window.sessionStorage.getItem("bottomTap")
        },
        
    },
    computed: {
         ...mapState({ showBottomTab: state => state.bottomTab.showBottomTab })
    }
}
</script>

<style lang="scss" scoped>
.footer {
    position: fixed;
    z-index: 120;
    bottom: 0;
    width: 100%;
    height: 90px;
    display: flex;
    align-content: center;
    justify-content: center;
    font-size: 14px /*no*/;
    background-color: #fff;
    text-align: center;
    li {
        flex: 1;
        position: relative;
        i { 
            background: rgba(255, 255, 255, .6);
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
        }
        .active { display: none }
        img {
            height: 40px;
            width: auto;
            margin: 10px 0px;
        }
    }
    
}
</style>
