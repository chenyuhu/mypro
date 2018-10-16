<template>
    <div id="find">
        <div class="mui-navbar-inner mui-bar mui-bar-nav">
            <h1 class="mui-center mui-title">发现</h1>
        </div>
        <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
                <div  class="mui-navigate-right" @click="goMoments">朋友圈</div>
            </li>
        </ul>
        <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
                <div  class="mui-navigate-right">扫一扫</div>
            </li>
            <li class="mui-table-view-cell">
                <div  class="mui-navigate-right">摇一摇</div>
            </li>
        </ul>
        <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
                <div  class="mui-navigate-right">看一看</div>
            </li>
            <li class="mui-table-view-cell">
                <div  class="mui-navigate-right">搜一搜</div>
            </li>
        </ul>
        <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
                <div  class="mui-navigate-right">购物</div>
            </li>
            <li class="mui-table-view-cell">
                <div  class="mui-navigate-right">游戏</div>
            </li>
        </ul>
        <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
                <div  class="mui-navigate-right">小程序</div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return{}
        },
        methods:{
            goMoments(){
                this.$router.push('/findMoments');
            }
        }
    }
</script>
<style scoped>
    #find{
        padding-top: 60px;
    }
    .mui-table-view.mui-table-view-chevron{
        margin-top: 15px;
    }
</style>