<template>
    <ul class="list">
        <li v-for="(item, index) in data" :key="index">
            <span class="status">连载中</span>
            <div>
                <h2>《斗破苍穹》</h2>
                <p>一个个个个个打的技术监督局发哦激动I就爱的风景</p>
                <p> <span>作者：EZ</span> <span>字数：121313213212</span> </p>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            data: [1,2,3,45,6,8,98,12,123]
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../common/css/index.scss";

.list {
    padding: 0 70px;
    li {
        width: 100%;
        height: 130px;
        position: relative;
        border-bottom: 1px solid $border-color-d;  /*no*/
        @include box-sizing;
        &:last-child { border: 0 }
        div {
            width: 80%;
            height: 100%;
            padding-top: 20px;
            @include box-sizing;
            h2 { margin-bottom: 10px; }
            p {
                @include no-wrap;
                &:last-child { 
                    font-size: $font-size-min;  /*no*/
                    color: $text-color-dark;        
                    margin-top: 15px ; 
                    span {
                        display: inline-block;
                        width: 45%;
                        vertical-align: middle;
                        &:first-child { width: 50%; @include no-wrap }
                    }
                }
            }
        }
        .status {
            float: right;
            line-height: 130px;
        }
    }
}
</style>

