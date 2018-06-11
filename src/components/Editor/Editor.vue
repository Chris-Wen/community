<template>
    <div class="editor">
        <div @click="publish" class="nav">发布</div>
        <form>
            <input v-if="editorType=='theme'" v-model="themeTitle" class="top"  type="text" placeholder="加个标题，限40字符">
            <textarea class="textarea" v-model.lazy="textInput" style=" border: none;"></textarea>
        </form>
        <div class="upload">
            <div class="btn-group">
                <span class="self-icon-camera fa-lg"></span> <span class="self-icon-image fa-lg"></span> <span class="self-icon-smile-o fa-lg"></span> 
            </div>
            <!-- <input type="file"> -->
            <span class="upload-img">
                
            </span>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { textareaFormat, textUnformat } from 'common/js/tools'

export default {
    data() {
        return {
            titleInfo: {
                showIcon: false
            },
            editorType: '',
            themeTitle: '',
            textInput: 'https://blog.csdn.net/qq_32786873/article/details/75125737    https://segmentfault.com/a/1190000010034177   https://github.com/xiangpaopao/blog/issues/7',
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        initEditor() {
            let type = this.$route.params.type
            this.editorType = 'theme'

            // this.themeTitle = localStorage.getItem('editorPageThemeTitle') ? unescape(localStorage.getItem('editorPageThemeTitle')) : ''
            // this.textInput = localStorage.getItem('editorPageTextInput') ? unescape(localStorage.getItem('editorPageTextInput')) : ''

            return type=='reply' ? '发布回复' : '发布主题'
        },
        publish() {
            console.log('发表回复或文章')

            localStorage.removeItem('editorPageThemeTitle').removeItem('editorPageTextInput')
            // this.$router.go(-1)  
        }
    },
    watch: {
        textInput: function(val) {
            window.localStorage.setItem('editorPageTextInput', escape(val))
        },
        themeTitle: function(val) {
            window.localStorage.setItem('editorPageThemeTitle', escape(val))
        }
    },
    mounted() {
        const title = this.initEditor()

        this.handleTitle({
            title:  title, 
            showIcon: this.titleInfo.showIcon
        })


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
    .upload {
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
    }
    
}
</style>
