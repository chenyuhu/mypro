<template>
    <div id="account" >
        <div class="mui-navbar-inner mui-bar mui-bar-nav">
            <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click="goHome">
                <span class="mui-icon mui-icon-left-nav" ></span>我
            </button>
            <h1 class="mui-center mui-title">账号与安全</h1>
        </div>
        <div class="mui-page-content">
            <div class="mui-scroll-wrapper">
                <div class="mui-scroll">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <a id="head" class="mui-navigate-right">头像
                                <span class="mui-pull-right head">
									<img class="head-img mui-action-preview" id="head-img1" :src="msg.uPortrait | picFilter">
                                        <input type="file" id="avatar" accept="image/*" @change="changeAvatar" name="file" capture="camera" ref="upload">
								</span>
                            </a>
                        </li>
                        <li class="mui-table-view-cell">
                            <div>昵称<span class="mui-pull-right">{{msg.uName}}</span></div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div>MOMO账号<span class="mui-pull-right">{{msg.uLoginID}}</span></div>
                        </li>
                    </ul>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">
                            <div>真实姓名
                                <span class="mui-pull-right" @click="changeMsg">{{msg.u_rName | rNameFilter}}</span>
                                <input type="text" :placeholder="msg.u_rName | rNameFilter" @blur="change">
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div>生日
                                <span class="mui-pull-right" @click="changeMsg">{{msg.uBirthday | brithFilter}}</span>
                                <input type="date" :placeholder="msg.uBirthday | brithFilter" @blur="change">
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div>手机号
                                <span class="mui-pull-right" @click="changeMsg">{{msg.uPhone}}</span>
                                <input type="number" :placeholder="msg.uPhone" @blur="change" oninput="if(value.length>11)value=value.slice(0,11)">
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div>邮箱地址
                                <span class="mui-pull-right" @click="changeMsg">{{msg.uEmail | emailFilter}}</span>
                                <input type="email" :placeholder="msg.uEmail | emailFilter" @blur="change">
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import {Toast} from "mint-ui"
    import axios from "axios"
    Vue.filter("brithFilter",function (val) {
        let year = new Date(val).getFullYear();
        if(year !="NaN"){
            let month=new Date(val).getMonth()+1;
            let day=new Date(val).getDate();
            return `${month}月${day}日`
        }else{
            return "未填写"
        }
    });
    Vue.filter("ageFilter",function (val) {
        let year = new Date(val).getFullYear();
        if(year != "NaN"){
            let now = new Date();
            let old=new Date(val);
            let age=now.getFullYear()-old.getFullYear();
            return age;
        }else{
            return "年龄未知"
        }
        
    });
    Vue.filter('emailFilter',function (val) {
        if(val){
            return val;
        }else{
            return "未填写邮箱"
        }
    });
    Vue.filter("rNameFilter",function (val) {
        if(val != ""){
            return val;
        }else{
            return "未填写"
        }
    });
    export default {
        data(){
            return{
                uid:localStorage["uid"],
                msg:{},
            }
        },
        created(){
            this.getMsg();
        },
        methods:{
            getMsg(){
                this.$http.get("login/msg",{params:{uid:this.uid}}).then(res=>{
                    if(res.body.code == 1){
                        this.msg=res.body.msg[0]
                    }
                });
            },
            goHome(){
                this.$router.push("/homelogin");
            },
            /*修改图片
           changeAvatar(e){
                let $target = e.currentTarget || e.srcElement;
               let file = $target.files;
                if(file[0].name.indexOf(".jpg")!=-1 || file[0].name.indexOf(".png")!=-1 || file[0].name.indexOf(".gif") !=-1 || file[0].name.indexOf(".jpeg") !=-1){
                    this.msg.uPortrait =`/img/uPortrait/${file[0].name}`;
                    let reader = new FileReader();
                    reader.onload= () => {
                        //     this.$http.post("login/portrait",{uid:this.uid,uPortrait:this.msg.uPortrait},{emulateJSON:true}).then(res=>{
                    //         Toast("修改成功")
                    //     })
                    
                    };
                    reader.readAsDataURL(file[0])
                }else{
                    Toast("图片的格式不正确");
                }
           },*/
            changeAvatar(){
                let formData = new FormData();
                formData.append('file',this.$refs.upload.files[0]);
                formData.set("uid",this.uid);
                axios({
                    method:'post',
                    url:'http://localhost:3000/login/portrait',
                    anync:true,
                    contentType:false,
                    processData:false,
                    data:formData
                        }).then((res)=>{
                        if(res.data.code==1){
                            this.msg.uPortrait=res.data.msg;
                            Toast("修改成功");
                        }
                    })
                },
                changeMsg(e){
                    e.currentTarget.nextElementSibling.setAttribute("style","display:inline-block");
                },
                change(e){
                    if(e.currentTarget.value){
                        this.$http.get("login/cEmail",{params:{uid:this.uid,uEmail:e.currentTarget.value}}).then(res=>{
                            Toast("修改完成");
                            setTimeout(()=>{
                                this.getMsg();
                                e.currentTarget.style.display="none"
                            },3000)
                        })
                    }else{
                        Toast("您未修改");
                        setTimeout(()=>{
                            this.getMsg();
                            e.currentTarget.style.display="none"
                        },3000)
                    }
                }
            }
    }
</script>

<style scoped>
    
    .mui-page-content {
        position: absolute;
        left: 0;
        right: 0;
        top: 40px;
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
    
    .mui-table-view span.mui-pull-right {
        color: #999;
    }
    .head {
        height: 40px;
    }
    #head {
        line-height: 40px;
        position: relative;
    }
    .head-img {
        width: 40px;
        height: 40px;
    }
    #avatar{
        position: absolute;
        bottom: 10px;
        right: 40px;
        width: 40px;
        height: 40px;
        opacity: 0;
    }
    #head-img1 {
        position: absolute;
        bottom: 10px;
        right: 40px;
        width: 40px;
        height: 40px;
    }
    #feedback .mui-table-view:last-child {
        margin-bottom: 0px;
    }
    #feedback .mui-table-view:first-child {
        margin-top: 0px;
    }
    li.mui-table-view-cell>div{
        position: relative;
    }
    li.mui-table-view-cell>div>input{
        position: absolute;
        top:-10px;
        right: -10px;
        width: 50%;
        display: none;
    }
</style>