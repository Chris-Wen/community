<template>
    <div class="draw">
      <div class="block">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul>
          <li v-for="(item, index) in prizeList" :key="index">{{index}}</li>
        </ul>
        <!-- <ul>
          <li v-for="(item, index) in prizeList" :key="index">{{index}}</li>
        </ul> -->
        </mt-loadmore>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex' 
import * as api from 'api/api'
import { Loadmore } from 'mint-ui'

export default {
    components: { mtLoadmore: Loadmore },
    data() {
        return {
            titleInfo: {
                title:  '测试页面',
                showIcon:   false,
            },
            allLoaded: false,
            lotteryTicket: 5,   //抽奖次数
            prizeList: [
                {
                    img: '',            //奖品图片
                    name: '奖品1',      //奖品名称
                    isPrize: 1          //是否为奖品
                },
                {   img: '',  name: '奖品2',   isPrize: 1  },
                {   img: '',  name: '奖品3',   isPrize: 1  },
                {   img: '',  name: '奖品4',   isPrize: 1  },
                {   img: '',  name: '奖品5',   isPrize: 1  },
                {   img: '',  name: '未中奖',   isPrize: 0 },
                {   img: '',  name: '未中奖',   isPrize: 0 },
                {   img: '',  name: '未中奖',   isPrize: 0 },
                // {   img: '',  name: '未中奖',   isPrize: 0 },
                // {   img: '',  name: '未中奖',   isPrize: 0 }
            ],
            isRotating: false,
            toastParams: {
                showToast: false,
            },
            toastSlot: {
                pic: 'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109172657362.jpg',
                name: '物品名称'
            }
        }
    },
    created() {
        // api.get('/home/member/session_data').then( res => {
        //     console.log(res)

        // })
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        loadTop() {
          console.log('下拉加载');
          setTimeout(() => {
            this.$refs.loadmore.onTopLoaded();
          }, 1500);
        },
        loadBottom() {
          console.log('上拉加载');
          setTimeout(() => {
            // this.allLoaded = true
            let data = {   img: '',  name: '未中奖',   isPrize: 0 }
            this.prizeList.push(data )
            this.$refs.loadmore.onBottomLoaded();
          }, 1500);
        }
    },
    mounted() {     
        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon, 
        });
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.draw {
  width: 100%;
  height: 800px;
  .block {
    height: 100%;
    overflow: auto;
  }
  li { 
    line-height: 5em;
    border: 1px solid red;  

  }
}
</style>
