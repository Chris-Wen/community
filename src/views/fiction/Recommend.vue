<template>
    <div class="recommend">
        <ul >
            <router-link tag="li"  v-for="(item, index) in data"  :to="'/fiction/article/'+ index " :key="index"> 
                <div class="img"><img src="../../common/images/fiction/fiction.jpg" alt=""></div>
                <div>
                    <h2>《斗破苍穹》</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas odio maxime eveniet eligendi </p>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            titleInfo: {
                title: '推文/评荐/书单',
                showIcon: false
            },
            data: [12,3,34,5,6,7]
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),

    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon,
        })

    }
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.recommend {
    padding: 30px 70px;
    @include box-sizing;
    @include color-background;
    ul {
        width: 100%;
        li {    
            width: 100%;
            display: flex;
            margin-bottom: 40px;
            // &:last-child{  margin: 0;  }
            .img {
                    width: auto;
                    height: 140px;
                    margin-right: 35px;
                    img { width: auto; height: 140px; @include border-radius(.5em); }
                }
            >div:last-child {
                width: 100%;
                height: 140px;
                @include box-sizing;
                h2 { margin: 10px 0 15px; @include no-wrap; }
                p {
                    @include text-justify(1.2em);
                    max-height: 3.4em;
                    overflow: hidden;
                    &:first-child { 
                        max-width: 370px; 
                        font-weight: 600; 
                        margin: 10px 0 20px; 
                        @include no-wrap; 
                    }
                }
            }
            
        }
    }  
}
</style>
