<template>
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
</template>

<script>
export default {
    methods: {
        initEmojiEvent() {
            this.$refs.emoji.addEventListener('click', e => {
                let ev = e || window.event
                this.$emit('emojiEvent', e.target)
            })
        }
    },
    mounted() {
        this.$nextTick(()=>{
            this.initEmojiEvent()
        })
    }
}
</script>

<style lang="scss">
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
</style>
