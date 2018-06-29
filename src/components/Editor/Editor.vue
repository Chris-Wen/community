<template>
    <div class="editor">
        <div @click="publish" class="nav">发布</div>
        <div v-if="showScaleContainer" class="scale-cover" @click="handleScale">
            <img :src="targetImage" />
        </div>
        <form>
            <input v-if="editorType=='theme'" v-model="userInputParams.themeTitle" class="top"  type="text" placeholder="加个标题，限40字符" name="title" maxlength="40">
            <textarea ref="textarea" id="textarea" class="textarea" v-model.lazy="userInputParams.textInput" style=" border: none;"/>
        </form>
        <div class="extentions">
            <div class="btn-group">
                <span class="self-icon-smile-o" @click="showPart = 'emoji'"></span> 
                <span class="self-icon-image" @click="uploadInput"></span>  
            </div>
            <div>
                <!-- emoji -->
                <emoji v-show="showPart=='emoji' " @emojiEvent="emojiClick"></emoji>
                <!-- upload-image -->
                <ul class="upload-input" v-show="showPart == 'upload'" ref="uploadBody">
                    <li v-for="(item, key) in userInputParams.previewImages" :key="key" @click="scaleImage(key)">
                        <img :src="item"  style="display:none"/>
                        <span class="self-icon-times-circle" @click.stop.capture="cancleTargetImage(key)"></span>
                    </li>
                    <li @click="activateUpload" v-show="userInputParams.previewImages.length<6"> + </li>
                </ul>
                <upload :previewImgArray="userInputParams.previewImages"></upload>
            </div>
            <div v-html="test1"></div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { textareaFormat, textUnformat } from 'common/js/tools'
import Emoji from 'base/Emoji/emoji'
import Upload from 'base/Upload/Upload'
import { MessageBox } from 'mint-ui'
import * as api from 'api/api'
import EMOJI_RULE from 'common/js/emoji-data'

export default {
    components: { Emoji, Upload },
    data() {
        return {
            titleInfo: {
                title: '',
                showIcon: false
            },
            editorType: '',
            showPart: 'emoji',
            savedEdit: false,
            userInputParams: {
                themeTitle: '',
                textInput: '',
                previewImages: [],
            },
            userInputing: false,            //用户是否已编辑
            showScaleContainer: false,      //全屏预览图片容器显隐
            targetImage: '',                 //全屏查看的图片
            test: `你上课is发挥地方爱哭的爱看的就是付款没有my  love  :cold_sweat:where  you  are<br/><br/>我管你是贺岁<br/>沂水一看安康看<br/>啊看见对方假按揭:sunglasses:<br/>基尼你科技基尼看空间`,
            test1: ''
        }
    },
    methods: {
        ...mapMutations({handleTitle : 'SET_TITLE'}),
        initEditor() {
            let type = this.$route.params.type
            let title = type ? '发布回复' : '发布主题'
            this.editorType = type ? type : 'theme' 
            
            this.handleTitle({
                title:  title, 
                showIcon: this.titleInfo.showIcon
            })

            let editPageInput = JSON.parse(sessionStorage.getItem('editPageInput'))
            if (editPageInput) { 
                this.userInputParams = editPageInput
                this.userInputing = true
            }
        },
        publish() {
            console.log('发表回复或文章')
            let textInput = this.userInputParams.textInput
            if (!this.userInputParams.themeTitle) {
                return Toast('请输入标题')
            } else if (!textInput){
                return Toast('请输入主题内容')
            }
            this.userInputParams.textInput = textareaFormat(this.userInputParams.textInput)

            // submitUploadImage()    //图片，视频 上传提交
            
            api.post('/login/check_passport', this.userInputParams).then( response => {
                console.log(response)
                if (response.code == 200) {
                    let popup = Toast({
                        message: '发布成功',    
                        position: 'top'
                    })

                    setTimeout(() => {
                        popup.close();
                        // this.$router.go(-1)
                    }, 2000)
                } else if (response.code == 400) {
                    Toast('服务器错误，请稍候重试')
                } else if (response.code == 402) {
                    Toast('图片过大，无法上传')
                }
            })
        },
        uploadInput() {
            this.showPart = 'upload'
            if (this.userInputParams.previewImages.length >=6) {
                return Toast('最多上传六张图片')
            }
            setTimeout(() => { this.activateUpload() }, 20);
        },
        emojiClick(emoji) {
            this.userInputParams.textInput += emoji
            setTimeout(() => {
                this.$refs.textarea.focus()      
            }, 20);
        },
        activateUpload() {      //触发图片上传
            return document.getElementById('uploadFile').click()
        },
        cancleTargetImage(index) {      //取消上传图片（单张）
            this.userInputParams.previewImages.splice(index, 1)
            this.userInputParams.holdFiles.splice(index, 1)
        },
        scaleImage(index) {     //全屏预览图片
            console.log(index)
            this.targetImage = this.userInputParams.previewImages[index]
            this.showScaleContainer = true
        },
        handleScale() {
            this.targetImage = ''
            this.showScaleContainer = false
        }
    },
    beforeRouteLeave (to, from, next) {
        if (this.userInputing) {
            MessageBox.confirm('当前页面数据尚未提交，退出页面数据将丢失，是否退出？').then(action => {
                if (action) {
                    this.userInputParams = null
                    sessionStorage.removeItem('editPageInput')
                    next()
                } else {
                    next(false)
                }
            })
        } else {
            next()
        }
    },
    mounted() {
        this.initEditor()
        
        // 刷新页面自动判断保存用户编辑数据
        window.onbeforeunload = () => {     
            this.userInputing && sessionStorage.setItem('editPageInput', JSON.stringify(this.userInputParams))
        }

        // this.test = textUnformat(this.test)
        console.log(this.test)
        let Reg = /:[a-zA-Z_]+:/g
        let data = EMOJI_RULE.emoji

        this.test.replace(Reg, key => {
            if (data[key]) {
                console.log(key)

                return `<img src="../../../static/${data[key]}" />`
            } else {
                return key
            }
        })
        this.test1 = this.test
    },
    watch: {
        userInputParams: {      //判断用户是否已编辑数据
            handler: function(val) { this.userInputing = true  },
            deep: true
        },
        'userInputParams.previewImages'(val) {
            this.$nextTick().then(() => {       //图片预览加载
                // console.log(this.$refs.uploadBody.children)
                let images = this.$refs.uploadBody.children
                for(let i=0; i<images.length; i++) {
                    if (images[i].children.length>0) {
                        let url = images[i].children[0].src
                        images[i].style = `background-image: url(${url}); background-repeat: no-repeat; background-size: cover; background-position: center 20%;`
                    }
                }
            })
        },  
    }
}
</script>


<style lang="scss" scoped>
@import '../../common/css/index.scss';

.editor {
    font-size: $font-size-normal;  /*no*/
    @include color-background;
    position: relative;
    .nav {
        height: 100px;
        line-height: 100px;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 110;
        color: #fff;
        padding: 0 30px;
    }
    .scale-cover {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: black;
        opacity: 0.9;
        z-index: 10;
        text-align: center;
        img {
            width: auto;
            max-width: 100%;
            margin-top: 25%;
        }
    }
    form {
        .top { 
            width: 100%; 
            height: 100px; 
            &::-webkit-input-placeholder{  text-align: center }
            border-bottom: 1px solid $border-color-d;  /*no*/      
            text-indent: 1em;
        }
        textarea {
            @include box-sizing;
            width: 100%;
            min-height: 500px;
            border: none;
            outline: none;
            padding: 30px 60px;
            line-height: 1.5em;
            font-size: $font-size-normal;  /*no*/
        }
    }
    .extentions {
        border-top:　1px solid $border-color-d;  /*no*/
        .btn-group {
            height: 80px;
            padding: 0 30px; 
            border-bottom: 1px solid $border-color-d;  /*no*/
            span {
                color: $text-color-dark;
                display: inline-block;
                height: 100%;
                line-height: 80px;
                padding: 0 20px;
                font-size: 1.6em;
            }
        }

        .upload-input {
            display: flex;
            width: 100%;
            @include box-sizing;
            padding: 20px;
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            &::after {
                content: "";
                width: 150px;
                height: 150px;
                display: flex;
                justify-content: space-between;
            }
            li {
                border: 2px dashed $text-color-l;  /*no*/
                width: 150px;
                height: 190px;
                margin: 10px;
                position: relative;
                &:last-child {
                    font-size: 5em;
                    color: $text-color-ll;
                    line-height: 1.2;
                    text-align: center;
                    vertical-align: middle;
                }
                >span {
                    @include color-background;
                    @include border-radius(100%);
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    color: $text-color-ll;
                    font-size: 1.8em;
                    &::after {
                        content: "";
                        position: absolute;
                        top: -10px;
                        left: -10px;
                        right: -10px;
                        bottom: -10px;
                    }
                }
            }
        }
    }
    
}
</style>
