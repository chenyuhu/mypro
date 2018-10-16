<template>
    <div id="privacy" class="mui-page">
        <div class="mui-navbar-inner mui-bar mui-bar-nav">
            <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click="goHome">
                <span class="mui-icon mui-icon-left-nav"></span>我
            </button>
            <h1 class="mui-center mui-title">隐私</h1>
        </div>
        <div class="mui-page-content">
                <div class="mui-scroll">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-divider">通讯录</li>
                        <li class="mui-table-view-cell">
                            加我为朋友时需要验证
                            <div class="mui-switch mui-active mui-switch-mini">
                                <div class="mui-switch-handle" @click="open"></div>
                            </div>
                        </li>
                    </ul>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            向我推荐QQ好友
                            <div class="mui-switch mui-switch-mini">
                                <div class="mui-switch-handle" @click="open"></div>
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            通过QQ号搜索到我
                            <div class="mui-switch mui-switch-mini">
                                <div class="mui-switch-handle" @click="open"></div>
                            </div>
                        </li>
                    </ul>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            可通过手机号搜索到我
                            <div class="mui-switch mui-active mui-switch-mini">
                                <div class="mui-switch-handle" @click="open"></div>
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            向我推荐通讯录朋友
                            <div class="mui-switch mui-switch-mini">
                                <div class="mui-switch-handle" @click="open"></div>
                            </div>
                        </li>
                        <li class="mui-table-view-divider">开启后，为你推荐已经开通MOMO的手机联系人</li>
                    </ul>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            通过MOMO账号搜索到我
                            <div class="mui-switch mui-active mui-switch-mini">
                                <div class="mui-switch-handle" @click="open"></div>
                            </div>
                        </li>
                        <li class="mui-table-view-divider">关闭后，其他用户将不能通过MOMO号搜索到你</li>
                    </ul>
                </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
            
            }
        },
        created(){
        
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
            }
        }
    }
</script>

<style scoped>
    #privacy{
        padding-top: 40px;
    }
    /*html,*/
    /*body {*/
        /*background-color: #efeff4;*/
    /*}*/
    .mui-page,
    .mui-page-content {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        /*background-color: #efeff4;*/
        padding-top: 40px;
    }
   
    .mui-scroll {
        /*background-color: #efeff4;*/
    }
    .mui-page.mui-transitioning {
        -webkit-transition: -webkit-transform 300ms ease;
        transition: transform 300ms ease;
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
    .mui-table-view-divider {
        /*background-color: #efeff4;*/
        font-size: 14px;
    }
    .mui-table-view-divider:before,
    .mui-table-view-divider:after {
        height: 0;
    }
    #feedback .mui-table-view:last-child {
        margin-bottom: 0px;
    }
    #feedback .mui-table-view:first-child {
        margin-top: 0px;
    }

</style>