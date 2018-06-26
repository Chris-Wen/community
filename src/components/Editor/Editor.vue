<template>
    <div class="editor">
        <div @click="publish" class="nav">发布</div>
        <form>
            <input v-if="editorType=='theme'" v-model="themeTitle" class="top"  type="text" placeholder="加个标题，限40字符">
            <textarea class="textarea" v-model.lazy="textInput" style=" border: none;"></textarea>
        </form>
        <div class="extentions">
            <div class="btn-group">
                <span class="self-icon-smile-o fa-lg" @click="showPart = 'emoji'"></span> 
                <span class="self-icon-image fa-lg" @click="uploadInput"></span>  
            </div>
            <div>
                <!-- emoji -->
                <emoji v-if="showPart=='emoji' " @emojiEvent="emojiClick"></emoji>
                <!-- upload-image -->
                <ul class="upload-input" v-if="showPart == 'upload'" ref="uploadBody">
                    <li v-for="(item, key) in previewImages" :key="key">
                        <img :src="item"  style="display:none"/>
                        <span class="self-icon-times-circle" @click="cancleTargetImage(key)"></span>
                    </li>
                    <li @click="activateUpload" v-show="previewImages.length<6"> + </li>
                </ul>
                <upload :previewImgArray="previewImages" :uploadFiles="holdFiles"></upload>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { textareaFormat, textUnformat } from 'common/js/tools'
import Emoji from 'base/Emoji/emoji'
import Upload from 'base/Upload/Upload'

export default {
    components: { Emoji, Upload },
    data() {
        return {
            titleInfo: {
                showIcon: false
            },
            editorType: '',
            themeTitle: '',
            textInput: `https://blog.csdn.net/qq_32786873/article/details/75125737    
            https://segmentfault.com/a/1190000010034177   
            https://github.com/xiangpaopao/blog/issues/7 &#128512;
            `,
            showPart: 'upload',
            previewImages: [],
            holdFiles: [],
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        initEditor() {
            let type = this.$route.params.type
            this.editorType = 'theme'

            return type=='reply' ? '发布回复' : '发布主题'
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
        activateUpload() {
            return document.getElementById('uploadFile').click()
        },
        cancleTargetImage(index) {
            this.previewImages.splice(index, 1)
            this.holdFiles.splice(index, 1)
        }
    },
    watch: {
        textInput: function(val) {
            window.localStorage.setItem('editorPageTextInput', escape(val))
        },
        themeTitle: function(val) {
            window.localStorage.setItem('editorPageThemeTitle', escape(val))
        },
        previewImages(val) {
            this.$nextTick(() => {
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
        
    },
    mounted() {
        const title = this.initEditor()

        // this.initEmojiEvent()
        this.handleTitle({
            title:  title, 
            showIcon: this.titleInfo.showIcon
        })
    },
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
