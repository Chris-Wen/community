<template>
    <div class="new-address">
        <ul>
            <li>
                <p><label for="name">收货人</label>：<input id="name" type="text"></p>  
            </li>
            <li>
                <p><label for="phone">联系方式</label>：<input id="phone" type="text"></p>
            </li>
            <li class="selection">
                <span>所在地区</span>：
                <select name="province">
                    <option value="1">请选择省份市级</option>
                    <option value="1">请选择省份市级</option>
                    <option value="1">请选择省份市级</option>
                    <option value="1">请选择省份市级</option>
                    <option value="1">请选择省份市级</option>
                    <option value="1">请选择省份市级</option>
                    <option value="1">请选择省份市级</option>
                    <option value="1">请选择省份市级</option>
                    <option value="1">请选择省份市级</option>
                    <option value="1">请选择省份市级</option>
                    <option value="1">请选择省份市级</option>
                    <option value="1">请选择省份市级</option>
                </select>
                <select name="city">
                    <option value="1">请选择</option>
                </select>
                <select name="area">
                    <option value="1"></option>
                </select>
            </li>
            <li>
                <label for="address">详细地址</label>：<textarea id="address" rows="4"></textarea>
            </li>
        </ul>

        <p class="save">保存并使用</p>
    </div>    
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import SliderDelete from 'base/SliderDelete/SliderDelete'
import { removeClass } from 'common/js/dom'

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
            }
        }
    },
    methods: {
        ...mapActions(['handleTitle']),
        deleteItem(aid) {

        },
        setDefaultAddress(aid) {
            
        },
    },
    mounted() {
        this.handleTitle({
            title:  this.titleInfo.title,
            showIcon: this.titleInfo.showIcon,
            showBottomTab: this.titleInfo.showBottomTab
        })
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
