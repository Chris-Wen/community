<template>
    <div class="editor">
        <div @click="publish" class="nav">发布</div>
        <div v-if="showScaleContainer" class="scale-cover" @click="handleScale">
            <img :src="targetImage" />
        </div>
        <form>
            <input v-if="editorType=='theme'" v-model="userInputParams.themeTitle" class="top"  type="text" placeholder="加个标题，限40字符" name="title" maxlength="40">
            <p class="top" style="height: 2em; line-height:2em" v-if="targetUname" >回复： <font color="blue">{{targetUname}}</font> </p>
            <textarea ref="textarea" id="textarea" class="textarea" v-model.lazy="userInputParams.textInput" style=" border: none;"/>
        </form>
        <div class="extentions">
            <div class="btn-group">
                <span class="self-icon-smile-o" @click="showPart = 'emoji'"></span> 
                <span v-if="editorType=='theme'" class="self-icon-image" @click="uploadInput"></span>  
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
                <upload v-if="editorType=='theme'" :previewImgArray="userInputParams.previewImages" :uploadFiles="uploadFiles"></upload>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { textareaFormat, textUnformat } from 'common/js/tools'
import Emoji from 'base/Emoji/emoji'
import Upload from 'base/Upload/Upload'
import { MessageBox } from 'mint-ui'
import * as api from 'api/api'
import { EMOJI_RULE } from 'common/js/emoji-data'

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
            uploadFiles: [],
            userInputing: false,            //用户是否已编辑
            showScaleContainer: false,      //全屏预览图片容器显隐
            targetImage: '',                 //全屏查看的图片
            targetUname: null,              //回复某人，nickname

        }
    },
    methods: {
        ...mapMutations({handleTitle : 'SET_TITLE'}),
        initEditor() {
            //若接受到参数，则为发布回复 type, targetPostId
            //type == theme  => 回复zhutie
            //type == reply  => 回复评论
            let type = this.$route.params.type;
            let title = type ? '发布回复' : '发布主题'
            this.editorType = type ? 'reply' : 'theme' 
            
            // console.log(this.$route.params)
            this.targetUname = type == 'reply' ? this.$route.params.uname : null
            
            this.handleTitle({
                title:  title, 
                showIcon: this.titleInfo.showIcon
            })
        },
        publish() {
            console.log('发表回复或文章')
            let textInput = this.userInputParams.textInput
            if (!this.userInputParams.themeTitle && this.editorType == 'theme') {
                return Toast('请输入标题')
            } else if (!textInput){
                return Toast('请输入主题内容')
            }
            this.userInputParams.textInput = textareaFormat(this.userInputParams.textInput)
            let payload = new FormData(),url;
            //页面参数
            payload.append("content", this.userInputParams.textInput)

            let reply_type = this.$route.params.type
            if (this.editorType == 'reply' && reply_type) {        //发布回复主贴

                payload.append('reply_type', reply_type)
                if (reply_type=='reply') {      //二级回复
                    payload.append('target_post_id', this.$route.params.commentId)
                    payload.append('reply_target_uid', this.$route.params.replyUserid)
                    payload.append('target_uname', this.$route.params.uname)
                } else {
                    payload.append('target_post_id', this.$route.params.targetPostId)
                }
                url = '/forum/reply'
            } else {                                            //发布帖子  目标板块
                payload.append('module', this.editType)
                payload.append("title", this.userInputParams.themeTitle)
                url = '/forum/post'
            }

            //批量上传图片
            for(let i=0; i<this.uploadFiles.length; i++) {
                payload.append("file"+i, this.uploadFiles[i])
            }

            // submitUploadImage()    //图片，视频 上传提交
            api.upload(url, payload).then( response => {
                if (response.code == 403 || response.code==405) this.userInputing = false;
                if (response.code == 200) {
                    this.userInputing = false
                    //清除帖子缓存
                    sessionStorage.removeItem('forum_activity_data')
                    sessionStorage.removeItem('forum_index_data')

                    let popup = Toast(response.msg)
                    setTimeout(() => {
                        popup.close();
                        this.$router.go(-1)
                    }, 1500)
                } else if (response.code == 400) {
                    Toast(response.msg)
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
            this.uploadFiles.splice(index, 1)
        },
        scaleImage(index) {     //全屏预览图片
            this.targetImage = this.userInputParams.previewImages[index]
            this.showScaleContainer = true
        },
        handleScale() {         //收起图片预览
            this.targetImage = ''
            this.showScaleContainer = false
        },
        transformEmoji(str) {
            let Reg = /:[a-zA-Z_]+:/g
            let data = EMOJI_RULE.emoji

            return str.replace(Reg, key => {
                if (data[key]) {
                    // return `<img src="../../../static/${data[key]}" />`
                    let url = require('../../../static/emoji/' + data[key])
                    return `<img style="width: 1.3em; margin: 0 3px" src="${url}"  />`
                } else {
                    return key
                }
            })
        }
    },
    beforeRouteLeave (to, from, next) {
        if (this.userInputing) {
            MessageBox.confirm('当前页面数据尚未提交，退出页面数据将丢失，是否退出？').then(action => {
                if (action) {
                    this.userInputParams = null
                    window.onbeforeunload = null
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
        // window.onbeforeunload = () => {     
        //     // this.userInputing && sessionStorage.setItem('editPageInput', JSON.stringify(this.userInputParams))
        //     return Toast('刷新页面，已修改数据将丢失')
        // }
    },
    computed: {
        ...mapState({ editType: state => state.editType })
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
