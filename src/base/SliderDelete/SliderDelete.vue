<template>
    <div class="delete" >
        <div :class="['slider', {'left-slider': showDelBtn}]" @touchstart='touchStart'  @touchend='touchEnd' >
            <div class="content" >
                <!-- 插槽中放具体项目中需要内容         -->   
                <slot></slot> <!-- 根据需要可命名插槽 -->
            </div>
            <div class="remove" ref="remove" @click.stop="deleteItem(index)"><p>删除</p> </div>
        </div>
    </div>
</template>

<script>
import { hasClass } from 'common/js/dom'

export default {
    name: 'SliderDelete',
    props: { index: { type: Number } },
    data() {
        return {
            start: {X:0, Y:0},          //触摸位置
            deleteBlock: {X:0, Y:0},    //删除按钮的尺寸
            showDelBtn: false,          //是否显示删除按钮
        }
    },
    methods:{
        touchStart(ev) {
            ev= ev || event
            //tounches类数组，等于1时表示此时有只有一只手指在触摸屏
            if (ev.touches.length == 1) {
                this.showDelBtn = hasClass(ev.currentTarget.children[0], 'left-slider')

                this.start = { X: ev.touches[0].clientX, Y: ev.touches[0].clientY }
                this.deleteBlock = {
                        X: (this.$refs.remove.offsetWidth), 
                        Y: (this.$refs.remove.offsetHeight)
                    };
            }
        },
        touchEnd(ev) {
            ev = ev || event 
                if (ev.changedTouches.length == 1) {
                    let end = {
                            X: ev.changedTouches[0].clientX,
                            Y: ev.changedTouches[0].clientY
                        }; 
                    let dis = { 
                            X: end.X - this.start.X,   
                            Y: Math.abs(end.Y - this.start.Y)  
                        };
                    if (dis.Y < 3*(this.deleteBlock.Y)/4) {         //结束时上下移动距离不超过删除按钮宽度的2/3，视为有效动作
                        if(dis.X<0 && Math.abs(dis.X) > (this.deleteBlock.X)/2 ){        //左滑满足条件
                            this.showDelBtn = true
                        } else if (dis.X>0 && dis.X > (this.deleteBlock.X)/2 && this.showDelBtn ){       //向右滑动
                            this.showDelBtn = false
                        }       
                    }
                }
            },    
        deleteItem(index) {
            this.$emit('handleDelete', index)
        }  
    }
     

}
</script>


<style lang="scss" scoped>
@import "../../common/css/index.scss";

.delete{
    width: 100%;
    height: auto;
    overflow: hidden;
    @include box-sizing;
    .slider{
        width: 130%;
        height:auto;
        display: flex;
        align-items: stretch;
        flex-flow: row nowrap;
        transition: all 0.2s linear;        
        .content{
            display: inline-block;
            width: 100%;
            @include box-sizing;
        }
        .remove{
            display: inline-block;
            width: 30%;
            background:red;
            color: #fff;
            text-align: center;
            font-size: 1.2em;
            position: relative;
            p { 
                height: 1em;
                @include center;
            }
        }
    }
    .left-slider {
        margin-left: -30%;
    }
}
</style>

