<template>
    <div id="general" class="mui-page">
        <div class="mui-navbar-inner mui-bar mui-bar-nav">
            <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click="goHome">
                <span class="mui-icon mui-icon-left-nav"></span>我
            </button>
            <h1 class="mui-center mui-title">通用</h1>
        </div>
        <div class="mui-page-content">
                <div class="mui-scroll">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            多语言
                        </li>
                    </ul>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            听筒模式
                            <div class="mui-switch mui-switch-mini">
                                <div class="mui-switch-handle" @click="open"></div>
                            </div>
                        </li>
                    </ul>
                    <ul class="mui-table-view" @click="goSet">
                        <li class="mui-table-view-cell">
                            功能
                        </li>
                        <li class="mui-navigate-right">
                        </li>
                    </ul>
                </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{}
        },
        methods:{
            goHome(){
                this.$router.push("/homelogin")
            },
            open(e){
                if(e.currentTarget.style.transform == "translateX(16px)"){
                    e.currentTarget.style="transform:translateX(0px); transition: all .5s linear";
                    e.currentTarget.parentElement.style="background:white;border-color:#ddd";
                }
                else{
                    e.currentTarget.style="transform:translateX(16px); transition: all .5s linear";
                    e.currentTarget.parentElement.style="background:#4cd964;border-color:#4cd964";
                }
            },
            goSet(){
                this.$router.push("/homeSet")
            }
        }
    }
</script>

<style scoped>
    .mui-page,
    .mui-page-content {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        padding-top: 40px;
    }
    .mui-pages .mui-page {
        display: block;
    }
    .mui-page .mui-table-view:first-child {
        margin-top: 15px;
    }
    .mui-page .mui-table-view:last-child {
        margin-bottom: 30px;
    }
    .mui-table-view {
        margin-top: 20px;
    }
    #feedback .mui-table-view:last-child {
        margin-bottom: 0px;
    }
    #feedback .mui-table-view:first-child {
        margin-top: 0px;
    }
</style>