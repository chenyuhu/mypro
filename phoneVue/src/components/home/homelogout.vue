<template>
    <transition name="model">
        <div id="logout">
            <div id="logo">
                <img src="/timg.jpg">
            </div>
            <div class="mui-input-row">
                <label>账&nbsp;&nbsp;号</label>
                <input type="text" class="mui-input-clear" placeholder="请输入账号或用户名" maxlength="16" v-model="uname" @focus="reC" >
                <span class="mui-icon mui-icon-clear mui-hidden" @click="removU"></span>
            </div>
            <div class="mui-input-row mui-password">
                <label>密&nbsp;&nbsp;码</label>
                <input type="password" class="mui-input-password" placeholder="请输入8-16位有效密码" maxlength="16" minlength="8" v-model="upwd" @keyup.13="login">
                <span class="mui-icon mui-icon-eye" @click="seeUpwd"></span>
            </div>
            <div class="mui-input-row mui-checkbox auto">
                <label>记住密码</label>
                <span>
                <span class="on">on</span>
                <span class="off">off</span>
                <span @click="isRemember" class="remember"></span>
            </span>
            </div>
            <!--<div class="mui-input-row mui-checkbox auto">-->
            <!--<label>自动登录</label>-->
            <!--<span>-->
            <!--<span class="on2">on</span>-->
            <!--<span class="off2">off</span>-->
            <!--<span @click="isAuto" class="isauto"></span>-->
            <!--</span>-->
            <!--</div>-->
            <div class="mui-btn mui-btn-primary" @click="login">
                登录
            </div>
            <div id="signin">
                <span @click="isSogin">注册账号</span><span>|</span><span @click="forget">忘记密码</span>
            </div>
            <div class="toast" v-if="showtoast">{{toastmessage}}</div>
        </div>
    </transition>
   
</template>

<script>
    import {Toast} from "mint-ui";
    import $ from "jquery"
    export default {
        data(){
            return{
                uname:localStorage["uName"],
                upwd:localStorage["uPwd"],
                // url:location.href.slice(location.href.lastIndexOf("/")+1),
                toastmessage:"",
                showtoast:false,
            }
        },
        mounted(){
            // 记住密码
            this.remember();
        },
        methods:{
            //记住密码
            remember(){
                if(localStorage["show"]){
                    $(".on").show();
                    $(".off").hide();
                    $(".remember").attr("style","transform:translateX(40px)");
                    $(".remember").parent().attr("style","padding: 3px 30px 3px 15px;background-color:#2187e7");
                }else{
                    $(".remember").attr("style","transform:translateX(0px)");
                    $(".off").show();
                    $(".on").hide();
                    $(".remember").parent().attr("style","padding: 3px 15px 3px 30px;background-color:#dd524d");
                }
            },
            isRemember(e){
                if($(".on").is(":hidden")){
                    $(e.currentTarget).attr("style","transform:translateX(40px); transition: all .5s linear;");
                    $(e.currentTarget).siblings(".off").hide();
                    $(e.currentTarget).siblings(".on").show();
                    $(e.currentTarget).parent().attr("style","padding: 3px 30px 3px 15px;background-color:#2187e7;transition: all .5s linear;");
                    localStorage["uName"]=this.uname;
                    localStorage["uPwd"]=this.upwd;
                    localStorage["show"]=true;
                }else {
                    $(e.currentTarget).attr("style","transform:translateX(0px); transition: all .5s linear;");
                    $(e.currentTarget).siblings(".on").hide();
                    $(e.currentTarget).siblings(".off").show();
                    $(e.currentTarget).parent().attr("style","padding: 3px 15px 3px 30px;background-color:#dd524d;transition: all .5s linear;");
                    localStorage.clear();
                }
            },
            login(){
                this.$http.get("login/login",{params:{uName:this.uname,uPwd:this.upwd}}).then(res=>{
                    if(res.body.code == 1){
                        // this.$store.commit("changeUid",res.body.msg[0].uid);
                        // sessionStorage["uid"]=res.body.msg[0].uid;
                        localStorage["uid"]=res.body.msg[0].uid;
                        this.$router.push("/homelogin");
                        if(!$(".on").is(":hidden")){
                            localStorage["uName"]=this.uname;
                            localStorage["uPwd"]=this.upwd;
                        }
                    }else{
                        // Toast("用户名或密码错误");
                        this.presentToast("用户名或密码错误")
                    }
                })
            },
            reC(){
                if(!this.uName){
                    $(".mui-icon.mui-icon-clear").removeClass("mui-hidden");
                }else{
                    $(".mui-icon.mui-icon-clear").addClass("mui-hidden");
                }
            },
            removU(){
                $(".mui-input-clear").val("")
            },
            seeUpwd(e){
                if($(".mui-input-password").attr("type")=="password"){
                    e.currentTarget.className += " mui-active";
                    $(".mui-input-password").attr("type","text");
                }else{
                    $(e.currentTarget).removeClass("mui-active");
                    $(".mui-input-password").attr("type","password");
                }
            },
            /*自动登录
            isAuto(e){
                if($(".on2").is(":hidden")){
                    $(e.currentTarget).attr("style","transform:translateX(40px); transition: all .5s linear;");
                    $(e.currentTarget).siblings(".off2").hide();
                    $(e.currentTarget).siblings(".on2").show();
                    $(e.currentTarget).parent().attr("style","padding: 3px 30px 3px 15px;background-color:#2187e7;transition: all .5s linear;");
                    localStorage["auto"]=true;
                }else {
                    $(e.currentTarget).attr("style","transform:translateX(0px); transition: all .5s linear;");
                    $(e.currentTarget).siblings(".on2").hide();
                    $(e.currentTarget).siblings(".off2").show();
                    $(e.currentTarget).parent().attr("style","padding: 3px 15px 3px 30px;background-color:#dd524d;transition: all .5s linear;");
                    localStorage["auto"]="";
                }
            },
            Auto(){
              if(localStorage["auto"]){
                  $(".on2").show();
                  $(".off2").hide();
                  $(".isauto").attr("style","transform:translateX(40px)");
                  $(".isauto").parent().attr("style","padding: 3px 30px 3px 15px;background-color:#2187e7");
                  setTimeout(this.login,3000)
              }else{
                  $(".isauto").attr("style","transform:translateX(0px)");
                  $(".off2").show();
                  $(".on2").hide();
                  $(".isauto").parent().attr("style","padding: 3px 15px 3px 30px;background-color:#dd524d");
              }
            }*/
            isSogin(){
                this.$router.push("/homeSogin");
            },
            forget(){
                // this.$router.push({name:"homeForget",params:{url:this.url}})
                this.$router.push("/homeForget");
            },
            presentToast(msg) {
                this.showtoast = true;
                this.toastmessage = msg;
                setTimeout(() => {
                    this.toastmessage = "";
                    this.showtoast = false;
                }, 2000);
            },
        },
    }
</script>

<style scoped>
    #logout{
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url(/82.jpg) no-repeat ;
        background-size: 100% 100%;
        display: table;
        transition: opacity .3s ease;
    }
    #logo{
        margin-top: 30px;
        text-align: center;
        margin-bottom: 15px;
    }
    #logo>img{
        width: 50%;
        height: 50%;
    }
    #logout>.mui-input-row{
        border-bottom: 1px solid #999;
        background: rgba(255,255,255,.5);
        width: 80%;
        margin: 0 auto;
    }
    #logout>.mui-input-row>label{
        width: 20%;
    }

    #logout>.mui-input-row>input{
        width: 80%;
    }
    #logout>.mui-btn{
        margin:20px 10%;
        width: 80%;
    }
    #logout>.auto{
        margin-top: 15px;
    }
    #logout>.auto>label{
        width: 50%;
    }
    #logout>.auto>span{
        display: inline-block;
        margin: 6px 20px;
        padding: 3px 15px 3px 30px;
        border-radius: 13.5px;
        float: right;
        background-color: #dd524d;
        position: relative;
        color: #fff;
       
    }
    #logout>.auto>span>span:nth-child(1){
        display: none;
    }
    #logout>.auto>span>span:nth-child(3){
        display: inline-block;
        width: 25px;height: 25px;
        border-radius: 50%;
        position: absolute;
        background-color: #fff;
        top: 1px;
        left: 0;
        z-index: 1;
        /*transition: all .5s linear;*/
    }
    #signin{
        text-align: center;
        vertical-align:text-bottom;
        color:#fff;
    }
    #signin>span:nth-child(2){
        margin: 0 15px;
    }
    .toast {
        z-index: 9999;
        position: fixed;
        width: 90%;
        border-radius: 3px;
        top: 50%;
        left: 5%;
        height: 3em;
        line-height: 3em;
        margin-top: -1.5em;
        text-align: center;
        background: rgba(0, 0, 0, 0.5);
        color: #FFFFFF;
        text-align: center;
    }
</style>