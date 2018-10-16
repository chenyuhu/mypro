<template>
    <transition name="model">
        <div id="homeSet">
            <div class="mui-navbar-inner mui-bar mui-bar-nav">
                <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click="goGeneral">
                    <span class="mui-icon mui-icon-left-nav"></span>通用
                </button>
                <h1 class="mui-center mui-title">功能</h1>
            </div>
            <div class="mui-page-content">
                <div class="mui-scroll">
                    <!--设置背景-->
                    <ul class="mui-table-view mui-table-view-chevron">
                        <li class="mui-table-view-cell" @click="goBG">
                            <div  class="mui-navigate-right">我的背景</div>
                        </li>
                    </ul>
                    <!--聊天背景-->
                    <ul class="mui-table-view mui-table-view-chevron">
                        <li class="mui-table-view-cell" @click="goChatBG">
                            <div  class="mui-navigate-right">聊天背景</div>
                        </li>
                    </ul>
                    <!--修改密码-->
                    <ul class="mui-table-view mui-table-view-chevron" @click="goForget">
                        <li class="mui-table-view-cell">
                            <div  class="mui-navigate-right">修改密码</div>
                        </li>
                    </ul>
                    <!--查看黑名单-->
                    <ul class="mui-table-view mui-table-view-chevron" @click="goBlacklist">
                        <li class="mui-table-view-cell">
                            <div  class="mui-navigate-right">黑名单</div>
                        </li>
                    </ul>
                    <!--白名单-->
                    <ul class="mui-table-view mui-table-view-chevron" @click="goWhitelist">
                        <li class="mui-table-view-cell">
                            <div  class="mui-navigate-right">特别关心</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        data(){
            return{
            
            }
        },
        mounted(){
        
        },
        methods:{
            goGeneral(){
                this.$router.push("/homeGeneral")
            },
            goForget(){
                this.$router.push("/homeForget");
            },
            goBlacklist(){
                this.$router.push("/homeBlacklist")
            },
            goWhitelist(){
                this.$router.push("/homeInterset")
            },
            goChatBG(){
                this.$router.push("/homeChatBG")
            },
            goBG(){
                this.$router.push("/homeBG")
            }
        }
    }
</script>

<style scoped>
    #homeSet{
        padding-top: 50px;
    }
    .mui-scroll>ul:nth-child(1){
        margin-top: 5px;
    }
    .mui-scroll>ul:nth-child(3){
        margin-top: 15px;
        margin-bottom: 15px;
    }
</style>