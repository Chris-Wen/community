<template>
    <div class="new-address">
        <ul>
            <li>
                <p><label for="name">收货人</label>：<input id="name" v-model="addressData.name" type="text" placeholder="请输入姓名"></p>  
            </li>
            <li>
                <p><label for="phone">联系方式</label>：<input v-model.lazy="addressData.phone" id="phone" type="text" placeholder="请输入11位手机号"></p>
            </li>
            <li class="selection">
                <span>所在地区</span>：
                <select name="province" v-model="addressData.province" id="province">
                    <option v-for="(val, index) in database.province" :value="index" :key="index">{{val}}</option>
                </select>
                <select name="city" v-model="addressData.city" id="city">
                    <option v-for="(val, index) in database.city" :value="index" :key="index">{{val}}</option>
                </select>
                <select name="area" v-model="addressData.area" id="area">
                    <option v-for="(val, index) in database.area" :value="index" :key="index" >{{val}}</option>
                </select>
            </li>
            <li>
                <label for="address">详细地址</label>：<textarea id="address" rows="4" v-model="addressData.address" placeholder="请填写详细地址（如门牌号/楼层号，限100字）"></textarea>
            </li>
        </ul>

        <p class="save" @click="submit">保存并使用</p>
    </div>    
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import SliderDelete from 'base/SliderDelete/SliderDelete'
import { removeClass } from 'common/js/dom'
import { addressDatabase } from 'common/js/address_database'

export default {
    components: { SliderDelete },
    data() {
        return {
            titleInfo: {
                title: '新建地址',
                showIcon: false,
                showBottomTab: true
            },
            addressData: {
                    area: '110101', 
                    city: '110100', 
                    province: '110000', 
                    phone: "", 
                    address: "", 
                    aid: '', 
                    name: '', 
                    selected: ''
                },
            sliderDeleteParams: {
                lastTouch: '',
                targetTouch: ''
            },
            database: {                 //具体地址选项数据
                province: '',
                city:　'',
                area: ''
            },
        }
    },
    methods: {
        ...mapActions(['handleTitle']),
        _initAddressOption() {
            var aid = this.$route.query.aid
            if (aid) {        //已有地址编辑
                this.titleInfo.title = "修改地址"
                this.axios.get("/Mall/getAddressInfo?aid=" + aid)
                    .then( response => {
                        if (response.code == 200) {
                            this.addressData = response.data
                            this.addressData.province = response.data.province
                            this.addressData.city = response.data.city
                            this.addressData.area = response.data.area
                        }
                    })
            } 
            // 地址选项数据初始化
            this.database.province = addressDatabase['100000']
            this.database.city = addressDatabase[this.addressData.province]
            this.database.area = addressDatabase[this.addressData.city]

            this.handleTitle({
                title:  this.titleInfo.title,
                showIcon: this.titleInfo.showIcon,
                showBottomTab: this.titleInfo.showBottomTab
            })
        },
        submit() {
            if (!this.addressData.name || !this.addressData.phone || !this.addressData.address)  return Toast('请填写完整收货地址');

            this.axios.post("/Mall/saveAddress", this.addressData)
                .then( response => {
                    if (response.code == 200) {
                        let instance = Toast(response.msg);
                        setTimeout(() => {
                            instance.close();
                            this.$router.go(-1)
                        }, 2000);    
                    } else {
                        Toast(response.msg)
                    } 
                })
        }
    },
    mounted() {

        this._initAddressOption()
    },
    watch: {
        'addressData.province': function(newVal, oldVal) {
            let city = addressDatabase[newVal] || { "0": '暂无数据' }
            this.database.city = city

            // this.addressData.city = Object.keys(city)[0]
            if (this.addressData.city==0) { this.addressData.area = 0 }
        },
        'addressData.city': function(newVal) {
            console.log(1)
            let area = addressDatabase[newVal] || { "0": '暂无数据' }
            this.database.area = area

            // this.addressData.area = Object.keys(area)[0]  
        },
        phone: function(newVal) {
            let reg = /^1[3-9]\d{9}$/
            if (!newVal.match(reg)) {
                Toast('手机号格式错误')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/css/index.scss";

.new-address {
    font-size: $font-size-small;  /*no*/
    padding-top: 8px;
    ul {
        padding: 10px 60px;
        @include color-background;
        li {
            border-bottom: 1px solid $border-color-d;  /*no*/
            line-height: 2.5em;
            label { 
                display: inline-block; 
                min-width: 4em;
                max-width: 4em;
                @include text-align-justify(4);
            }
            input {
                width: 65%;
                height: 2em;
                text-indent: 1em;
            }
            &:last-child {
                border: 0;
                min-height: 150px;
                display: flex;
                textarea {
                    width: 65%;
                    // height: 4em;
                    border: 0;
                    padding: .5em 1em;
                    // border: 1px solid red;  /*no*/
                }
            }
            &.selection {
                select {
                    outline: 0;
                    border: 0;
                    width: 24%;
                    height: 2em;
                    border-right: 1px solid $border-color-d;  /*no*/
                    &:last-child { border: 0; }
                    option { @include no-wrap }
                }
            }
        }
    }
    .save {
        font-size: $font-size-normal;  /*no*/
        width: 100%;
        height: 60px;
        line-height: 60px;
        position: fixed;
        bottom: 0;
        @include color-grad-btn;
    }
}
</style>
