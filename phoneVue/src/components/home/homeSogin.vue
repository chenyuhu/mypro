<template>
    <transition name="model">
        <div id="sogin">
            <div class="mui-navbar-inner mui-bar mui-bar-nav">
                <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click="gologout">
                    <span class="mui-icon mui-icon-left-nav"></span>登录
                </button>
                <h1 class="mui-center mui-title">注册账号</h1>
            </div>
            <div class="register">
                <div class="mui-input-row">
                    <label>用户名<span>*:</span></label>
                    <input type="text" class="mui-input-clear" placeholder="请输入以字母开头的用户名" maxlength="16" v-model="uName">
                    <div class="verify">
                        <div class="false">X</div>
                        <div class="true"></div>
                    </div>
                </div>
                <div class="mui-input-row">
                    <label>密码<span>*:</span></label>
                    <input type="password" class="mui-input-clear" placeholder="请输入8-16为密码" maxlength="16" v-model="uPwd" @blur="verifyPwd">
                    <div class="verify">
                        <div class="false">X</div>
                        <div class="true"></div>
                    </div>
                </div>
                <div class="mui-input-row">
                    <label>确认密码<span>*:</span></label>
                    <input type="password" class="mui-input-clear" placeholder="请输入8-16为密码" maxlength="16" v-model="reuPwd" @blur="rePwd">
                    <div class="verify">
                        <div class="false">X</div>
                        <div class="true"></div>
                    </div>
                </div>
                <div class="mui-input-row">
                    <label>手机号<span>*:</span></label>
                    <input type="number"
                           class="mui-input-clear" placeholder="请输入11位手机号"
                           oninput="if(value.length>11)value=value.slice(0,11)" v-model="uPhone" @blur="verifyPhone">
                    <div class="verify">
                        <div class="false">X</div>
                        <div class="true"></div>
                    </div>
                </div>
                <div class="mui-input-row">
                    <label>邮箱:</label>
                    <input type="email" class="mui-input-clear" placeholder="请输入邮箱" v-model="uEmail">
                </div>
                <div class="mui-input-row">
                    <label>真实姓名:</label>
                    <input type="text" class="mui-input-clear" placeholder="请输入真实性名" maxlength="11" v-model="u_rName">
                </div>
                <div class="mui-input-row">
                    <label>年龄:</label>
                    <input type="number"
                           class="mui-input-clear" placeholder="请输入您的年龄" oninput="if(value.length>2)value=value.slice(0,2)" v-model="uAge">
                    <!--限制数字的长度-->
                </div>
                <div class="mui-input-row">
                    <label>出生日期:</label>
                    <input type="date" class="mui-input-clear" placeholder="请输入出生日期" maxlength="11" v-model="uBirthday">
                </div>
                <div class="mui-input-row" @click="getSex">
                    <label>性别:</label>
                    <input type="radio" name="sex" value="1" id="man" checked class="sex">
                    <label for="man" class="labelSex">男</label>
                    <input type="radio" name="sex" value="0" id="women" class="sex">
                    <label for="women" class="labelSex">女</label>
                </div>
                <div class="agree">
                    <input type="checkbox" id="sae" @change="getDis"><label for="sae">同意 <span>《MOMO使用条例》</span></label>
                </div>
                <button class="mui-btn mui-btn-primary" @click="getSogin">
                    注册
                </button>
                <button class="mui-btn mui-btn-danger" @click="clearAll">
                    清空
                </button>
            </div>
            <div class="toast" v-if="showtoast">{{toastmessage}}</div>
        </div>
    </transition>
</template>

<script>
    import $ from "jquery";
    export default {
        data(){
            return{
                uLoginID:0,
                uName:"",
                uPwd:"",
                u_rName:"",
                uPhone:"",
                uEmail:"",
                uAge:"",
                uBirthday:"",
                reuPwd:"",
                uSex:1,
                toastmessage:"",
                showtoast:false,
            }
        },
        mounted(){
            this.getUloginID();
            $(".mui-btn.mui-btn-primary").attr("disabled",true);
        },
        methods:{
            gologout(){
                this.$router.push("/homelogout")
            },
            // 生成用户的账号
            getUloginID(){
                let uLoginID=Math.floor(Math.random()*89999999+10000000);
                this.$http.get("login/reuLid",{params:{uLoginID}}).then(res=>{
                    if(res.body.code == 1){
                        this.uLoginID=uLoginID;
                    }else{
                        this.getUloginID();
                    }
                })
            },
            clearAll(){
                this.uName="";this.uPwd="";this.u_rName="";this.uPhone="";this.uEmail="";this.uAge="";this.uBirthday="";this.reuPwd="";
                $(".false,.true").attr('style','display: none');
            },
            getDis(e){
                if(e.currentTarget.checked){
                    $(".mui-btn.mui-btn-primary").attr("disabled",false);
                }else{
                    $(".mui-btn.mui-btn-primary").attr("disabled",true);
                }
            },
            getSogin(){
                this.$http.post('login/signIn',{
                    uLoginID:this.uLoginID,
                    uName:this.uName,
                    uPwd:this.uPwd,
                    u_rName:this.u_rName,
                    uPhone:this.uPhone,
                    uEmail:this.uEmail,
                    uAge:this.uAge,
                    uBirthday:this.uBirthday,
                    uSex:this.uSex
                },{emulateJSON:true}).then(res=>{
                    if(res.body.code == 1 ){
                        this.presentToast("注册成功，您的账号为："+this.uLoginID);
                        setTimeout(()=>{
                            this.$router.push('/homelogout');
                            localStorage["uName"]=this.uLoginID;
                            localStorage["uPwd"]="";
                        },2000)
                    }else{
                        this.presentToast(res.body.msg)
                    }
                })
            },
            rePwd(e){
                if(this.reuPwd != this.uPwd){
                    e.currentTarget.nextElementSibling.firstElementChild.setAttribute('style','display: block');
                    e.currentTarget.nextElementSibling.firstElementChild.nextElementSibling.setAttribute('style','display: none');
                }else{
                    e.currentTarget.nextElementSibling.firstElementChild.nextElementSibling.setAttribute('style','display: block');
                    e.currentTarget.nextElementSibling.firstElementChild.setAttribute('style','display: none');
                }
            },
            verifyPhone(e){
                if(this.uPhone.length != 11){
                    e.currentTarget.nextElementSibling.firstElementChild.setAttribute('style','display: block');
                    e.currentTarget.nextElementSibling.firstElementChild.nextElementSibling.setAttribute('style','display: none');
                }else{
                    e.currentTarget.nextElementSibling.firstElementChild.nextElementSibling.setAttribute('style','display: block');
                    e.currentTarget.nextElementSibling.firstElementChild.setAttribute('style','display: none');
                }
            },
            verifyPwd(e){
                if(this.uPwd.length < 8 || this.uPwd.length > 16){
                    e.currentTarget.nextElementSibling.firstElementChild.setAttribute('style','display: block');
                    e.currentTarget.nextElementSibling.firstElementChild.nextElementSibling.setAttribute('style','display: none');
                    this.presentToast("请输入8-16位密码")
                }else{
                    e.currentTarget.nextElementSibling.firstElementChild.nextElementSibling.setAttribute('style','display: block');
                    e.currentTarget.nextElementSibling.firstElementChild.setAttribute('style','display: none');
                }
            },
            getSex(){
                this.uSex=$("[name=sex]:checked").val();
            },
            presentToast(msg) {
                this.showtoast = true;
                this.toastmessage = msg;
                setTimeout(() => {
                    this.toastmessage = "";
                    this.showtoast = false;
                }, 2000);
            },
        }
    }
</script>

<style scoped>
    #sogin{
        position: fixed;
        /*background:rgb(255,255,255);*/
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: table;
        transition: opacity .3s ease;
    }
    .register{
        margin-top: 60px;
    }
    .mui-input-row{
        background-color: rgba(255,255,255,.6);
        margin: 10px 5px;
        border-radius: 5px;
    }
    .mui-input-row>label{
        width: 25%;
        padding: 11px 0;
        text-align: right;
    }
    .mui-input-row>label>span{
        color: red;
    }
    .mui-input-row>input{
        width: 70%;
        border: 1px solid #919191;
        float: left;
        height: 30px;
        margin-top: 5px;
    }
    .mui-input-row>.sex{
        width: 5%;
    }
    .mui-input-row>.labelSex{
        width: 5%;
        margin-right: 15px;
    }
    .agree{
        text-align: center;
        margin-top: 15px;
    }
    .agree input{
        margin-right: 15px;
    }
    .agree span{
        color: #007aff;
    }
    .mui-btn{
        width: 30%;
        margin:5% 1%;
    }
    .mui-btn-primary.mui-btn{
        margin:5% 1% 5% 18% ;
    }
    .verify{
        position: relative;
        padding: 11px 0;
        display: flex;
    }
    .verify>.false{
        color: red;
        padding-left: 5px;
        display: none;
    }
    .verify>.true{
        width: 10px;
        height: 15px;
        border-bottom: 1px solid green;
        border-right: 1px solid green;
        transform: rotate(45deg);
        margin-left: 5px;
        display: none;
    }
    div#sogin>div.mui-bar>button.mui-btn{
        width: 5%;
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