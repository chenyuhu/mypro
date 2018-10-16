<template>
    <transition name="model">
        <div id="homeForget">
            <div class="mui-navbar-inner mui-bar mui-bar-nav">
                <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click="gologout">
                    <span class="mui-icon mui-icon-left-nav"></span>返回
                </button>
                <h1 class="mui-center mui-title">修改密码</h1>
            </div>
            <div class="sub-nav">
                <div class="sub-item">
                    <span class="sub-title">账号</span>
                    <input type="text" class="sub-input" placeholder="请输入用户名或账号" v-model="uName">
                </div>
                <div class="sub-item">
                    <span class="sub-title">新密码</span>
                    <input type="password" class="sub-input" maxlength="16" placeholder="请输入8-16位密码" id="pwd">
                </div>
                <div class="sub-item">
                    <span class="sub-title">重复密码</span>
                    <input type="password" class="sub-input" maxlength="16" placeholder="请输入8-16位密码" v-model="uPwd" @blur="rePwd">
                    <div class="verify upwd">
                        <div class="false">X</div>
                        <div class="true"></div>
                    </div>
                </div>
                <div class="sub-item">
                    <span class="sub-title">手机号</span>
                    <input type="number" class="sub-input" oninput="if(value.length>11)value=value.slice(0,11)" placeholder="请输入11位手机号" v-model="uPhone">
                </div>
                <div class="sub-item">
                    <span class="sub-title">验证码</span>
                    <input type="text" class="sub-re" @blur="verRe" placeholder="验证码">
                    <div class="verify">
                        <div class="false">X</div>
                        <div class="true"></div>
                    </div>
                    <canvas id="ca3"></canvas>
                    <span @click="verification">换一个</span>
                </div>
                <div class="sub-item">
                    <button @click="changeUpwd">提交</button>
                </div>
            </div>
            <div class="toast" v-if="showtoast">{{toastmessage}}</div>
        </div>
    </transition>
</template>
<script>
    import $ from "jquery";
    export default {
        name:'homeForget',
        data(){
            return{
                str:'',
                uName:'',
                uPhone:"",
                uPwd:"",
                reUPwd:"",
                toastmessage:"",
                showtoast:false,
                // url:this.$route.params.url,
            }
        },
        mounted(){
            this.verification();
            $(".sub-item button").attr("disabled",true);
        },
        methods:{
            //返回登录界面
            gologout(){
                // this.$router.push("/"+this.url);
                this.$router.back();
            },
            //绘制验证码
            verification(){
                let str="asdgfjhhjlkjyweiuqogbjkacouiasghfwebhglfks79846164985646943643964513ghfvbvuyhkwgaidawdfawegwegdsfweq";
                let can=document.getElementById("ca3");
                let ctx=can.getContext("2d");
                // 随机整数
                ctx.clearRect(0,0,1400,400);
                this.str="";
                function rn(min,max) {
                    let num = Math.floor(Math.random()*(max-min)+min);
                    return num;
                };
                ctx.fillStyle=`rgb(${rn(180,250)},${rn(180,250)},${rn(180,250)})`;
                for(let i=0;i<50;i++){
                    ctx.beginPath();
                    ctx.arc(rn(5,300),rn(5,150),10,0,Math.PI*2);
                    ctx.fill();
                }
                ctx.fillStyle=`rgb(${rn(0,50)},${rn(0,50)},${rn(0,50)})`;
                ctx.font="100px sans-serif";
                ctx.textBaseline="top";
                let arr1=[];
                for(let i=0;i<4;i++){
                    arr1[i]=str[rn(0,str.length)];
                    ctx.fillText(arr1[i],rn(10+i*50,50+i*50),rn(5,10))
                }
                this.str=arr1.join("");
            },
            // 验证是否正确
            verRe(e){
                if(e.currentTarget.value == this.str){
                    $(e.currentTarget).next().children(".true").attr("style","display:block");
                    $(e.currentTarget).next().children(".false").attr("style","display:none");
                    $(".sub-item button").attr("disabled",false);
                }else{
                    $(e.currentTarget).next().children(".false").attr("style","display:block");
                    $(e.currentTarget).next().children(".true").attr("style","display:none");
                    $(".sub-item button").attr("disabled",true);
                    this.verification();
                }
            },
            //修改密码提交
            changeUpwd(){
                this.$http.post("forget/forgetPwd",{uName:this.uName,uPhone:this.uPhone,uPwd:this.uPwd},{emulateJSON:true}).then(res=>{
                    if(res.body.code == 1){
                        this.presentToast("修改完成，即将返回登录界面");
                        setTimeout(()=>{
                            this.$router.push("/homelogout");
                            localStorage["uName"]=this.uName;
                            localStorage["uPwd"]=this.uPwd;
                        },2000)
                    }else{
                        this.presentToast("账号或手机号错误")
                    }
                })
            },
            //自定义的Toast
            presentToast(msg) {
                this.showtoast = true;
                this.toastmessage = msg;
                setTimeout(() => {
                    this.toastmessage = "";
                    this.showtoast = false;
                }, 2000);
            },
            //验证重复密码
            rePwd(e){
                if(e.currentTarget.value ==  $("#pwd").val()){
                    $(e.currentTarget).next().children(".true").attr("style","display:block");
                    $(e.currentTarget).next().children(".false").attr("style","display:none");
                    $(".sub-item button").attr("disabled",false);
                }else{
                    $(e.currentTarget).next().children(".false").attr("style","display:block");
                    $(e.currentTarget).next().children(".true").attr("style","display:none");
                    $(".sub-item button").attr("disabled",true);
                }
            }
        }
    }
</script>
<style scoped>
    #homeForget{
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: table;
        /*background-color: #eee;*/
        transition: opacity .3s ease;
    }
    .sub-nav{
        margin-top: 90px;
        padding: 0 10px;
    }
    .sub-item{
        display: flex;
        justify-content: space-around;
    }
    .sub-item .sub-title{
        width: 20%;
        padding:10px 0 ;
        text-align: right;
    }
    .sub-item .sub-input{
        width: 75%;
    }
    .sub-item button{
        width: 50%;
       background-color: #007aff;
        color: #fff;
    }
    .sub-item canvas{
        width: 40%;
        height: 40px;
        background-color: #ddd;
    }
    .sub-item .sub-re{
        width: 25%;
    }
    canvas+span{
        padding: 10px 0;
        font-size: 12px;
        color: #007aff;
    }
    .verify{
        position: absolute;
        padding: 11px 0;
        display: flex;
        left: 40%;
    }
    .verify.upwd{
        left: 90%;
    }
    .verify>.false{
        color: red;
        padding-left: 5px;
        display: none;
        font-weight: bolder;
    }
    .verify>.true{
        width: 10px;
        height: 15px;
        border-bottom: 3px solid green;
        border-right: 3px solid green;
        transform: rotate(45deg);
        margin-left: 5px;
        display: none;
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