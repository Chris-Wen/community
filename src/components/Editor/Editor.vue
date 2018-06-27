<template>
    <div class="editor">
        <div @click="publish" class="nav">发布</div>
        <form>
            <input v-if="editorType=='theme'" v-model="userInputParams.themeTitle" class="top"  type="text" placeholder="加个标题，限40字符">
            <textarea class="textarea" v-model.lazy="userInputParams.textInput" style=" border: none;"></textarea>
        </form>
        <div class="extentions">
            <div class="btn-group">
                <span class="self-icon-smile-o fa-lg" @click="showPart = 'emoji'"></span> 
                <span class="self-icon-image fa-lg" @click="uploadInput"></span>  
            </div>
            <div>
                <!-- emoji -->
                <emoji v-show="showPart=='emoji' " @emojiEvent="emojiClick"></emoji>
                <!-- upload-image -->
                <ul class="upload-input" v-show="showPart == 'upload'" ref="uploadBody">
                    <li v-for="(item, key) in userInputParams.previewImages" :key="key">
                        <img :src="item"  style="display:none"/>
                        <span class="self-icon-times-circle" @click="cancleTargetImage(key)"></span>
                    </li>
                    <li @click="activateUpload" v-show="userInputParams.previewImages.length<6"> + </li>
                </ul>
                <upload :previewImgArray="userInputParams.previewImages" :uploadFiles="userInputParams.holdFiles"></upload>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { textareaFormat, textUnformat } from 'common/js/tools'
import Emoji from 'base/Emoji/emoji'
import Upload from 'base/Upload/Upload'
import { MessageBox } from 'mint-ui'

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
                holdFiles: [],
            },
            userInputing: false,        //是否已编辑
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

            let editPageInput = sessionStorage.getItem('editPageInput') && JSON.parse(sessionStorage.getItem('editPageInput'))
            if (editPageInput) { 
                this.userInputParams = editPageInput
                this.userInputing = true
            }
        },
        publish() {
            console.log('发表回复或文章')

        },
        uploadInput() {
            this.showPart = 'upload'
            this.activateUpload()
        },
        emojiClick(dom) {
            console.log(dom)
        },
        activateUpload() {      //触发图片上传
            return document.getElementById('uploadFile').click()
        },
        cancleTargetImage(index) {
            this.previewImages.splice(index, 1)
            this.holdFiles.splice(index, 1)
        },
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
    },
    watch: {
        userInputParams: {      //判断用户是否已编辑数据
            handler: function(val) {  this.userInputing = true  },
            deep: true
        },
        'userInputParams.previewImages'(val) {
            this.$nextTick().then(() => {
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
    min-height: 950px;
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
                flex: auto;
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
                    // @include extend-click;
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    color: $text-color-l;
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
