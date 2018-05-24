<template>
    <div class="new-address">
        <ul>
            <li>
                <p><label for="name">收货人</label>：<input id="name" type="text" placeholder="请输入姓名"></p>  
            </li>
            <li>
                <p><label for="phone">联系方式</label>：<input v-model.lazy="phone" id="phone" type="text" placeholder="请输入11位手机号"></p>
            </li>
            <li class="selection">
                <span>所在地区</span>：
                <select name="province" v-model="selected.province" id="province">
                    <option v-for="(val, index) in database.province" :value="index" :key="index">{{val}}</option>
                </select>
                <select name="city" v-model="selected.city" id="city">
                    <option v-for="(val, index) in database.city" :value="index" :key="index">{{val}}</option>
                </select>
                <select name="area" v-model="selected.area" id="area">
                    <option v-for="(val, index) in database.area" :value="index" :key="index">{{val}}</option>
                </select>
            </li>
            <li>
                <label for="address">详细地址</label>：<textarea id="address" rows="4" placeholder="请填写详细地址（如门牌号/楼层号，限100字）"></textarea>
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
            addressData: [
                {area: "朝阳区", city: "市辖区", province: "北京市", phone: "18812315645", address: "朝阳小区，张朝阳投资基地", aid: '35', name: '张朝阳', selected: '1'},
            ],
            sliderDeleteParams: {
                lastTouch: '',
                targetTouch: ''
            },
            selected: {
                province: 110000,
                city: 110100,
                area: 110101
            },
            database: {
                province: '',
                city:　'',
                area: ''
            },
            phone: ''
        }
    },
    methods: {
        ...mapActions(['handleTitle']),
        deleteItem(aid) {

        },
        setDefaultAddress(aid) {
            
        },
        _initAddressOption() {
            this.database.province = addressDatabase['100000']
            this.database.city = addressDatabase['110000']
            this.database.area = addressDatabase['110100']
        },
        submit() {
            console.log('submit')
        }
    },
    mounted() {
        this.handleTitle({
            title:  this.titleInfo.title,
            showIcon: this.titleInfo.showIcon,
            showBottomTab: this.titleInfo.showBottomTab
        })

        this._initAddressOption()
    },
    watch: {
        'selected.province': function(newVal, oldVal) {
            let city = addressDatabase[newVal] || { "0": '暂无数据' }
            this.database.city = city

            this.selected.city = Object.keys(city)[0]
            if (this.selected.city==0) { this.selected.area = 0 }
        },
        'selected.city': function(newVal) {
            let area = addressDatabase[newVal] || { "0": '暂无数据' }
            this.database.area = area

            this.selected.area = Object.keys(area)[0]  

        },
        phone: function(newVal) {
            let reg = /^1[3-9]\d{9}$/
            if (!newVal.match(reg)) {
                console.log('弹窗手机号格式错误')
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
