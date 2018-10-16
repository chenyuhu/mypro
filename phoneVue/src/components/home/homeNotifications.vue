<template>
    <div id="notifications" class="mui-page">
        <div class="mui-navbar-inner mui-bar mui-bar-nav">
            <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click="goHome">
                <span class="mui-icon mui-icon-left-nav"></span>我
            </button>
            <h1 class="mui-center mui-title">新消息通知</h1>
        </div>
        <div class="mui-page-content">
                <div class="mui-scroll">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <a>接收新消息通知<span class="mui-pull-right">已开启</span></a>
                        </li>
                    </ul>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            通知显示消息详情
                            <div class="mui-switch mui-active mui-switch-mini">
                                <div class="mui-switch-handle msg" @click="changeMsg(Msg)"></div>
                            </div>
                        </li>
                    </ul>
                    <div class="mui-content-padded">
                        <p>若关闭，当收到新消息时，通知提示将不显示发信人和内容摘要</p>
                    </div>
                    <ul class="mui-table-view mui-table-view-chevron">
                        <li class="mui-table-view-cell">
                            <a href="#notifications_disturb" class="mui-navigate-right">功能消息免打扰</a>
                        </li>
                    </ul>
                    <div class="mui-content-padded">
                        <p>设置系统功能消息提示声音和震动的时段</p>
                    </div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <a>接收新消息通知<span class="mui-pull-right">已开启</span></a>
                        </li>
                    </ul>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            声音
                            <div class="mui-switch mui-active mui-switch-mini">
                                <div class="mui-switch-handle vox" @click="changeVox(Vox)"></div>
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            震动
                            <div class="mui-switch mui-active mui-switch-mini">
                                <div class="mui-switch-handle shake" @click="changeShake(Shake)"></div>
                            </div>
                        </li>
                    </ul>
                    <div class="mui-content-padded">
                        <p>当MOMO在运行时，你可以设置是否需要声音或者震动</p>
                    </div>
                    <div></div>
                </div>
        </div>
    </div>
</template>

<script>
    import  $ from "jquery"
    export default {
        data(){
            return{
                Vox:"vox",
                Msg:"msg",
                Shake:"shake",
                vox:true,
                msg:true,
                shake:true,
            }
        },
        mounted(){
            this.isVox(this.Msg,);
            this.isVox(this.Vox);
            this.isVox(this.Shake);
            this.Open();
        },
        updated(){
        },
        methods:{
            goHome(){
                this.$router.push("/homelogin");
            },
            goLeft(Cla){
                $(`.${Cla}`).attr("style","transform:translateX(0px); transition: all .5s linear;");
                $(`.${Cla}`).parent().attr("style","background:red;border-color:red; transition: all .5s linear;");
            },
            goRight(Cla){
                $(`.${Cla}`).attr("style","transform:translateX(16px); transition: all .5s linear;");
                $(`.${Cla}`).parent().attr("style","background:#4cd964;border-color:#4cd964; transition: all .5s linear;");
            },
            changeVox(Cla){
                if(this.vox){
                    this.goLeft(Cla);
                    this.vox=false;
                    localStorage["vox"]=false;
                }else {
                    this.goRight(Cla);
                    this.vox=true;
                    localStorage["vox"]=true;
                }
            },
            isVox(Cla){
                if(localStorage[Cla] == "false"){
                    $(`.${Cla}`).attr("style","transform:translateX(0px)");
                    $(`.${Cla}`).parent().attr("style","background:red;border-color:red;");
                }else{
                    $(`.${Cla}`).attr("style","transform:translateX(16px)");
                    $(`.${Cla}`).parent().attr("style","background:#4cd964;border-color:#4cd964;");
                }
            },
            changeMsg(Cla){
                if(this.msg){
                    this.goLeft(Cla);
                    this.msg=false;
                    localStorage["msg"]=false;
                }else {
                    this.goRight(Cla);
                    this.msg=true;
                    localStorage["msg"]=true;
                }
            },
            changeShake(Cla){
                if(this.shake){
                    this.goLeft(Cla);
                    this.shake=false;
                    localStorage["shake"]=false;
                }else {
                    this.goRight(Cla);
                    this.shake=true;
                    localStorage["shake"]=true;
                }
            },
            Open(){
                if( localStorage["vox"] =="true" || localStorage["shake"]=="true" ){
                    $("#notifications>div:nth-child(2)>div>div>ul:nth-child(6)>li>a>span").html("已开启");
                }else{
                    $("#notifications>div:nth-child(2)>div>div>ul:nth-child(6)>li>a>span").html("未开启");
                }
                
            },
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
        /*background-color: #efeff4;*/
        padding-top: 40px;
    }
    .mui-scroll-wrapper,
    .mui-scroll {
        /*background-color: #efeff4;*/
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
    
    .mui-table-view span.mui-pull-right {
        color: #999;
    }
    #feedback .mui-table-view:last-child {
        margin-bottom: 0px;
    }
    #feedback .mui-table-view:first-child {
        margin-top: 0px;
    }

</style>