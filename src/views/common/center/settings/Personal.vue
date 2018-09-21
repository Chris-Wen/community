<template>
    <div class="personal" >
        <div class="avatar flex-center">
            <label for="avatar" class="needsclick" @click="needsClick">
                <input type="file" id="avatar" ref="avatar" name="avatar" style="display:none">
                <img :src="userInfo.avatar || DefaultAvatar" />
                <span class="self-icon-camera fa-lg camera absolute-center"></span>
            </label>
        </div>
        <ul>
            <li>
                <label for="nickname">昵称：</label>
                <input type="text" name="nickname" value="11222">
            </li>
            <li>
                <label for="gender">性别：</label>
                <input type="text" name="gender" value="111111">
            </li>
            <li>
                <label for="email">邮箱：</label>
                <input type="text" name="email" value="11111111" readonly>
            </li>
            <li>
                <label for="mobile">手机号码：</label>
                <input type="text" name="mobile" value="11111111111" readonly>
            </li>
            <li>
                <label for="email">QQ号码：</label>
                <input type="text" name="email" value="11111111">
            </li>
            <li>
                <label for="email">微信账号：</label>
                <input type="text" name="email" value="11111111">
            </li>
            <li>
                <label for="email">真实姓名：</label>
                <input type="text" name="email" value="11111111">
            </li>
            <li>
                <label for="email">身份证号：</label>
                <input type="text" name="email" value="11111111">
            </li>
            <li>
                <label for="email">收货地址：</label>
                <input type="text" name="email" value="11111111">
            </li>
        </ul>
        <div class="color-grad-btn">{{isEditing ? "保&nbsp;&nbsp;&nbsp;&nbsp;存" : "编&nbsp;&nbsp;&nbsp;&nbsp;辑"}}</div>
    </div>   
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { setClientHeight } from 'common/js/dom'

export default {
    data() {
        return {
            titleInfo: {
                title: '个人资料',
                showIcon: false
            },
            userInfo: '123',
            isEditing: false,
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        initTabStyle() {
            let height = setClientHeight();
            document.querySelector('.personal').style.minHeight = height +　'px'
        },
        needsClick() {
            this.$refs.avatar.click()
        }
    },
    created(){
        // this.axios.get("/member/personalData").then(response => {
        //     // console.log(response)
        // })
    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon,
            icon: this.titleInfo.icon,
            link: this.titleInfo.link
        });
        this.$nextTick(()=> this.initTabStyle() )
    }
}
</script>

<style lang="scss" scoped>
@import "../../../../common/css/index.scss";

.personal {
    font-size: 16px;  /*no*/
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
        li { margin: 30px 0 }
        input { border-bottom: 1px solid $border-color-d;  height: 1.3em; outline: none}
    }
    .color-grad-btn {
        width: 6em;
        padding: .5em 0;
        margin: 2.5em auto;
        @include border-radius(.3em);
        border: 1px solid $border-color-d;  /*no*/  
    }
}
</style>

