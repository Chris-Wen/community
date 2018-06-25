<template>
    <div class="editor">
        <div @click="publish" class="nav">发布</div>
        <form>
            <input v-if="editorType=='theme'" v-model="themeTitle" class="top"  type="text" placeholder="加个标题，限40字符">
            <textarea class="textarea" v-model.lazy="textInput" style=" border: none;"></textarea>
        </form>
        <div class="upload">
            <div class="btn-group">
                <span class="self-icon-smile-o fa-lg"></span> <span class="self-icon-image fa-lg" @click="showPart == 'emoji'"></span>  
            </div>
            <!-- emoji -->
            <div class="emoji" ref="emoji">
                <span class="zd-sprite-smile"></span>
                <span class="zd-sprite-smiley"></span>
                <span class="zd-sprite-smirk"></span>
                <span class="zd-sprite-sob"></span>
                <span class="zd-sprite-angry"></span>
                <span class="zd-sprite-anguished"></span>
                <span class="zd-sprite-cry"></span>
                <span class="zd-sprite-cold_sweat"></span>
                <span class="zd-sprite-blush"></span>
                <span class="zd-sprite-sunglasses"></span>
                <span class="zd-sprite-coffee"></span>
                <span class="zd-sprite-broken_heart"></span>
                <span class="zd-sprite-heart"></span>
                <span class="zd-sprite-bomb"></span>
                <span class="zd-sprite-video_game"></span>
                <span class="zd-sprite-crescent_moon"></span>
                <span class="zd-sprite-sunny"></span>
                <span class="zd-sprite-confused"></span>
                <span class="zd-sprite-disappointed"></span>
                <span class="zd-sprite-disappointed_relieved"></span>
                <span class="zd-sprite-dizzy_face"></span>
                <span class="zd-sprite-flushed"></span>
                <span class="zd-sprite-weary"></span>
                <span class="zd-sprite-heart_eyes"></span>
                <span class="zd-sprite-kissing_heart"></span>
                <span class="zd-sprite-kissing"></span>
                <span class="zd-sprite-laughing"></span>
                <span class="zd-sprite-muscle"></span>
                <span class="zd-sprite-ok_hand"></span>
                <span class="zd-sprite-v"></span>
                <span class="zd-sprite-clap"></span>
                <span class="zd-sprite-hankey"></span>
                <span class="zd-sprite-pray"></span>
                <span class="zd-sprite-pill"></span>
                <span class="zd-sprite-fire "></span>
                <span class="zd-sprite-fire_engine"></span>
                <span class="zd-sprite-rage"></span>
                <span class="zd-sprite-thumbsup"></span>
                <span class="zd-sprite-thumbsdown "></span>
                <span class="zd-sprite-stuck_out_tongue"></span>
                <span class="zd-sprite-unamused"></span>
                <span class="zd-sprite-stuck_out_tongue_closed_eyes"></span>
                <span class="zd-sprite-stuck_out_tongue_winking_eye"></span>
                <span class="zd-sprite-zap"></span>
                <span class="zd-sprite-underage"></span>
                <span class="zd-sprite-pig"></span>
                <span class="zd-sprite-soccer"></span>
                <span class="zd-sprite-basketball"></span>
                <span class="zd-sprite-baseball"></span>
                <span class="zd-sprite-bear"></span>
                <span class="zd-sprite-cn"></span>
                <span class="zd-sprite-beer"></span>
                <span class="zd-sprite-beers"></span>
            </div>
            <!-- <input type="file"> -->
            <vue-core-image-upload v-if="showPart == 'upload'"
                :crop="false"
                @imageuploaded="imageuploaded"
                :max-file-size="5242880"
                url="http://101.198.151.190/api/upload.php" >
                <i class="self-icon-image fa-lg"></i>
            </vue-core-image-upload>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { textareaFormat, textUnformat } from 'common/js/tools'
import VueCoreImageUpload  from 'vue-core-image-upload'

export default {
    components: { 'vue-core-image-upload': VueCoreImageUpload },
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
            http://vanthink-ued.github.io/vue-core-image-upload/index.html#/cn/get-started
            `,
            showPart: 'emoji'
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
        },
        imageuploaded() {

        },
        initEmojiEvent() {
            this.$refs.emoji.addEventListener('click', function(e) {
                let ev = e || window.event
                console.log(e.target)
            })
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

        this.initEmojiEvent()
        this.handleTitle({
            title:  title, 
            showIcon: this.titleInfo.showIcon
        })

    }
}
</script>


<style lang="scss" scoped>
@import '../../common/css/index.scss';
@import '../../common/css/emoji-sprite.css';

.emoji {
    height: auto;
    padding: 20px;
    margin: auto;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    &::after {
        content: "";
        flex: auto;
    }
}

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
