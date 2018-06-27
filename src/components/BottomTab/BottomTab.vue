<template>
    <div v-if="showBottomTab ? false : true" class="footer">
        <router-link tag="li" to="/">
            <i @click=" setIconShowIndex('draw') " :class="{ active:  (index==undefined) || (getIconShowIndex() == 'draw') }"></i>
            <img src="../../common/images/icons/1-1.png"> 
            <p> 幸运转盘 </p>
        </router-link>
        <router-link tag="li" to="/forum">
            <i @click=" setIconShowIndex('forum') " :class="{ active: (index=='forum') || (getIconShowIndex() == 'forum') }"></i>
            <img src="../../common/images/icons/2-1.png"> 
            <p> 掌动论坛 </p>
        </router-link>
        <router-link tag="li" to="/fiction">
            <i @click=" setIconShowIndex('fiction') " :class="{ active: (index=='fiction') || (getIconShowIndex() == 'fiction') }"></i>
            <img src="../../common/images/icons/3-1.png"> 
            <p> 掌动小说 </p>   
        </router-link>
        <router-link tag="li" to="/shop">
            <i @click=" setIconShowIndex('shop') " :class="{ active: (index=='shop') || (getIconShowIndex() == 'shop') }"></i>
            <img src="../../common/images/icons/4-1.png"> 
            <p> 积分商城 </p>
        </router-link>
        <router-link tag="li" to="/center">
            <i @click=" setIconShowIndex('center') " :class="{ active: (index=='center') || (getIconShowIndex() == 'center') }"></i>
            <img src="../../common/images/icons/5-1.png"> 
            <p> 我的 </p>
        </router-link>
    </div>  
</template>

<script>
import { mapGetters } from 'vuex'

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
        getIconShowIndex() {  //确保页面刷新时，状态保持
            return window.sessionStorage.getItem("bottomTap")
        },
        
    },
    computed: {
        ...mapGetters(['showBottomTab'])
    },
    watch: {
        '$route': function() {
            // window.onhashchange = function() {
                let url = window.location.href,  page;

                switch(true) {
                    case /\/#\/center/.test(url):   page = 'center';
                        break;
                    case /\/#\/forum/.test(url):    page = 'forum';
                        break;
                    case /\/#\/fiction/.test(url):  page = 'fiction';
                        break;
                    case /\/#\/shop/.test(url):     page = 'shop';
                        break;
                    case /\/#\/draw/.test(url):     page = 'draw';
                        break;
                }
                if (page) this.setIconShowIndex(page);
            // }
        }
    }
}
</script>

<style lang="scss" scoped>
.footer {
    margin: auto;
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
