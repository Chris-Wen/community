<template>
    <div class="personal" >
        <div v-if="userInfo">
            <div class="avatar flex-center">
                <!-- <label for="avatar" class="needsclick" @click="needsClick">
                    <input type="file" id="avatar" ref="avatar" name="avatar" style="display:none">
                    <img :src="userInfo.avatar || DefaultAvatar" />
                    <span class="self-icon-camera fa-lg camera absolute-center"></span>
                </label> -->
                <clip-image :avatar="userInfo.avatar || DefaultAvatar" @setAvatar="replaceAvatar"></clip-image>
            </div>
            <ul class="list">
                <li>
                    <label for="nickname"><font color="red">*</font>昵称：</label>
                    <input type="text" name="nickname" maxlength="10" v-model.trim.lazy="userInfo.nickname" >
                </li>
                <li>
                    <label for="gender"><font color="red" style="visibility: hidden">*</font>性别：</label>
                    <label for="man"><input value="1" type="radio" name="gender" id="man" :checked="userInfo.gender==1">  男</label> 
                    <label for="woman"><input value="2" type="radio" name="gender" id="woman" :checked="userInfo.gender==2">  女</label>
                </li>
                <li>    
                    <label for="email"><font color="red" style="visibility: hidden">*</font>邮箱：</label>
                    <input type="text" name="email" v-model.trim="userInfo.email" >
                </li>
                <li>
                    <label for="mobile"><font color="red">*</font>手机：</label>
                    <input type="text" name="mobile" v-model.trim.lazy="userInfo.mobile" maxlength="11">
                </li>
                <li>
                    <label for="email"><font color="red" style="visibility: hidden">*</font>QQ：</label>
                    <input type="text" name="email" v-model.trim="userInfo.qq">
                </li>
                <li>
                    <label for="email"><font color="red" style="visibility: hidden">*</font>微信：</label>
                    <input type="text" name="email" v-model.trim="userInfo.wechat">
                </li>
                <!-- <li>
                    <label for="email">真实姓名：</label>
                    <input type="text" name="email" v-model.trim="userInfo.relname">
                </li>
                <li>
                    <label for="email">身份证号：</label>
                    <input type="text" name="email" v-model.trim="userInfo.id_card">
                </li> -->
                <li>
                    <label for="signature"><font color="red" style="visibility: hidden">*</font>个性签名：</label>
                    <textarea name="signature"  cols="25" rows="4" maxlength="60" v-model="userInfo.signature" ></textarea>
                </li>
            </ul>
            <div :class="['color-grad-btn', { 'forbid' : !allowSubmit }]" @click="submit">保&nbsp;&nbsp;&nbsp;&nbsp;存</div>            
        </div>
    </div>   
</template>

<script>
import ClipImage from 'base/ClipImage/ClipImage'
import { mapMutations, mapActions } from 'vuex'
import { setClientHeight } from 'common/js/dom'

export default {
    components: { ClipImage },
    data() {
        return {
            titleInfo: {
                title: '个人资料',
                showIcon: false,
                // showBottomTab: true
            },
            userInfo: '',
            newAvatar: null,          //图片剪辑上传后的地址
            allowSubmit: true,
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        // initTabStyle() {
        //     let height = setClientHeight();
        //     document.querySelector('.personal').style.minHeight = height +　'px'
        // },
        
        checkRepeat(target, val) {
            var payload;
            if (target == 'nickname' ) {
                payload = { nickname : val }
            } else if (target== 'mobile'){
                payload = { mobile : val }
            }
            
            this.axios.get("/member/checkRepeat", { params: payload })
                .then( response => {
                    if (response.code == 400) { 
                        Toast(response.msg) 
                        this.allowSubmit = false
                    } else if (response.code == 200) {
                        this.allowSubmit = true
                    }
                })
        },
        submit() {
            if (!this.allowSubmit) return;  
            var gender = document.querySelector("input:checked")
            if (gender)  this.userInfo.gender = gender.value
            //上传头像处理
            if (this.newAvatar) this.userInfo.replaceAvatar = this.newAvatar 

            this.axios.post("/member/saveUserData", this.userInfo)
                .then(response => {
                    if (response.code == 200) {
                        var instance = Toast(response.msg)
                        setTimeout(() => {
                            instance.close()
                            this.$router.go(-1)
                        }, 1500);
                    }
                })
        },
        replaceAvatar(val) {
            this.newAvatar = val
        }
    },
    watch: {
        'userInfo.nickname'(val) {
            if (!val) { Toast("昵称不能为空");  this.allowSubmit = false }
            else { 
                if (/^[\u4e00-\u9fa5A-Za-z0-9-_]*$/.test(val)) this.checkRepeat("nickname", val);
                else Toast("不能含有特殊字符")
            }
        },
        'userInfo.mobile'(val) {
            if (!val) { Toast("手机号码不能为空");  this.allowSubmit = false }
            else { 
                if (/^1[23456789][0-9]{9}$/.test(val)) this.checkRepeat("mobile", val);
                else Toast("请填写正确格式手机号码")
            }
        }
    },
    created(){
        this.axios.get("/member/personalData").then(response => {
            if (response.code==200) {
                this.userInfo = response.data
            }
        })
    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon,
            // showBottomTab: this.titleInfo.showBottomTab
        });
        // this.$nextTick(()=> this.initTabStyle() )
    }
}
</script>

<style lang="scss" scoped>
@import "../../../../common/css/index.scss";

.personal {
    font-size: 15px;  /*no*/
    box-sizing: border-box;
    @include color-background;
    padding-bottom: 30px;
    .avatar { 
        height: 280px;
        border-bottom: 10px solid #ebebeb;
        >label {
            width: auto;
            position: relative;
            img { width: 150px; }
            .camera { color: #eee }
        }

    }
    ul {
        padding: 30px 70px;
        li { 
            margin: 30px 0; display: flex; 
            line-height: 1.3;
            label { width: 5.5em; min-width: 5.5em; }
            input { 
                height: 1.3em; 
                border-bottom: 1px solid $border-color-d;  
                outline: none;
            }
            input[type='text'], textarea { width: 100%;text-indent: 1em }
            input[type=radio] { vertical-align: middle }
        }
    }
    .color-grad-btn, .forbid {
        width: 6em;
        padding: .5em 0;
        margin: 2.5em auto;
        @include border-radius(.3em);
        border: 1px solid $border-color-d;  /*no*/  
    }
    .forbid { background: #ccc; }
}
</style>

