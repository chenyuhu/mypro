<template>
    <div class="mui-page-content" id="homeLogin">
        <div class="mui-navbar-inner mui-bar mui-bar-nav">
            <h1 class="mui-center mui-title">我</h1>
        </div>
            <div class="mui-scroll">
                <ul class="mui-table-view mui-table-view-chevron">
                    <li class="mui-table-view-cell mui-media">
                        <div class="mui-navigate-right" @click="srcoll">
                            <img class="mui-media-object mui-pull-left head-img" id="head-img" :src="msg.uPortrait | picFilter">
                            <div class="mui-media-body">
                                {{msg.uName}}
                                <p class='mui-ellipsis'>账号:{{msg.uLoginID}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul class="mui-table-view mui-table-view-chevron">
                    <li class="mui-table-view-cell">
                        <div  class="mui-navigate-right"  @click="srcoll">账号与安全</div>
                    </li>
                </ul>
                <ul class="mui-table-view mui-table-view-chevron">
                    <li class="mui-table-view-cell">
                        <div class="mui-navigate-right" @click="Notifications">新消息通知</div>
                    </li>
                    <li class="mui-table-view-cell">
                        <div @click="privacy" class="mui-navigate-right">隐私</div>
                    </li>
                    <li class="mui-table-view-cell">
                        <div @click="general" class="mui-navigate-right">通用</div>
                    </li>
                </ul>
                <ul class="mui-table-view mui-table-view-chevron">
                    <li class="mui-table-view-cell">
                        <div @click="about" class="mui-navigate-right">关于MOMO <i class="mui-pull-right update">V3.1.0</i></div>
                    </li>
                </ul>
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell" style="text-align: center;">
                        <div @click="removeLogin">退出登录</div>
                    </li>
                </ul>
            </div>
    </div>
</template>

<script>
    import {Toast} from  "mint-ui";
    export default {
        data(){
            return{
                // uid:this.$store.getters.getUid,
                uid:localStorage["uid"],
                msg:{},
            }
        },
        created(){
            this.getMsg();
            this.getChat();
        },
        methods:{
            getMsg(){
                this.$http.get('login/msg',{params:{uid:this.uid}}).then(res=>{
                    if(res.body.code==1){
                        this.msg=res.body.msg[0];
                    }else{
                        Toast("网络故障！请检查")
                    }
                });
            },
            removeLogin(){
                // this.$store.commit("changeUid","");
                localStorage["uid"]="";
                this.$router.push("/homelogout");
            },
            srcoll(){
                this.$router.push("/homeMsg");
            },
            Notifications(){
                this.$router.push("/homeNs")
            },
            privacy(){
                this.$router.push("/homePrivacy")
            },
            general(){
                this.$router.push("/homeGeneral")
            },
            about(){
                this.$router.push("/homeAbout")
            },
            getChat(){
                this.$http.get('login/chat',{params:{uid:this.uid}}).then(res=>{
                    if(res.body.code !=0){
                        this.$store.commit('increment',res.body.msg[0].num)
                    }else{
                        Toast("网络故障！请检查")
                    }
                })
            }
        }
    }
</script>

<style scoped>
    #homeLogin{
        padding-top: 40px;
    }
    .mui-page-content {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
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
    .head-img {
        width: 40px;
        height: 40px;
    }
    .update {
        font-style: normal;
        color: #999999;
        margin-right: -25px;
        font-size: 15px
    }
</style>