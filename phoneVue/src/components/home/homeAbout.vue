<template>
    <div id="app">
        <div id="about" class="mui-page" v-if="show">
            <div class="mui-navbar-inner mui-bar mui-bar-nav">
                <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click="goHome">
                    <span class="mui-icon mui-icon-left-nav"></span>我
                </button>
                <h1 class="mui-center mui-title">关于MOMO</h1>
            </div>
            <div class="mui-page-content">
                    <div class="mui-scroll">
                        <ul class="mui-table-view">
                            <li class="mui-table-view-cell">
                                <div id="tel" class="mui-navigate-right" @click="tel">客服电话</div>
                            </li>
                            <li class="mui-table-view-cell">
                                <div id="feedback-btn" class="mui-navigate-right" @click="goFeedback">问题反馈</div>
                            </li>
                            <li id="check_update" class="mui-table-view-cell">
                                <div id="update" class="mui-navigate-right" @click="upDate">检查更新</div>
                            </li>
                        </ul>
                    </div>
                </div>
        </div>
        <div id="feedback" class="mui-page feedback" v-else>
            <div class="mui-navbar-inner mui-bar mui-bar-nav">
                <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click="goAbout">
                    <span class="mui-icon mui-icon-left-nav"></span>关于MOMO
                </button>
                <h1 class="mui-center mui-title">问题反馈</h1>
                <button type="button" class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @click="forward">发送</button>
            </div>
            <div class="mui-page-content">
                <div class="mui-content-padded">
                    <div class="mui-inline">问题和意见</div>
                    <div class="mui-pull-right mui-inline" @click="goPopover">
                        快捷输入
                        <span class="mui-icon mui-icon-arrowdown"></span>
                    </div>
                    <!--快捷输入具体内容，开发者可自己替换常用语-->
                    <transition name="model">
                        <div id="feed" v-if="Ishow" @click="Ishow = false">
                            <div class="feed-popover-arrow"></div>
                            <ul class="feed-view">
                        <!--仅流应用环境下显示-->
                                <li class="feed-cell" @click="feedblock"><div>界面显示错乱</div></li>
                                <li class="feed-cell" @click="feedblock"><div>启动缓慢，卡出翔了</div></li>
                                <li class="feed-cell" @click="feedblock"><div>偶发性崩溃</div></li>
                                <li class="feed-cell" @click="feedblock"><div>UI无法直视，丑哭了</div></li>
                            </ul>
                        </div>
                    </transition>
                </div>
                <div class="row mui-input-row">
                    <textarea id='question' class="mui-input-clear question" placeholder="请详细描述你的问题和意见..."></textarea>
                </div>
                <p>图片(选填,提供问题截图,总大小10M以下)</p>
                <div id='image-list' class="row ">
                    <div class="image-list">+
                        <input type="file" accept="image/*" @change="imageList" name="file" capture="camera" ref="fileUpload" style="width: 60px">
                    </div>
                </div>
                <p>QQ/邮箱</p>
                <div class="mui-input-row">
                    <input id='contact' type="text" class="mui-input-clear contact" placeholder="(选填,方便我们联系你 )" />
                </div>
                <div class="mui-content-padded">
                    <div class="mui-inline">应用评分</div>
                    <div class="icons mui-inline" style="margin-left: 6px;" @click="startFill">
                        <i data-index="1" class="mui-icon mui-icon-star"></i>
                        <i data-index="2" class="mui-icon mui-icon-star"></i>
                        <i data-index="3" class="mui-icon mui-icon-star"></i>
                        <i data-index="4" class="mui-icon mui-icon-star"></i>
                        <i data-index="5" class="mui-icon mui-icon-star"></i>
                    </div>
                </div><br>
            </div>
        </div>
    </div>
    
</template>

<script>
    import {Toast} from "mint-ui";
    import $ from "jquery";
    import axios from "axios";
    export default {
        data(){
            return{
                show:true,
                src:'',
                Ishow:false,
            }
        },
        methods:{
            goHome(){
                this.$router.push("/homelogin")
            },
            tel(){
                Toast("客服电话：400-400-400")
            },
            upDate(){
                Toast("已是最新版本")
            },
            goFeedback(){
                this.show=false;
            },
            goAbout(){
                this.show=true;
            },
            goPopover(){
                // this.$router.push("/model");
                this.Ishow=true;
            },
            feedblock(e){
                if(e.currentTarget.nodeName == "LI"){
                    document.getElementById("question").value += e.currentTarget.firstElementChild.innerHTML;
                }else{
                    document.getElementById("question").value += e.currentTarget.innerHTML;
                }
                
            },
            forward(){
                Toast("您的反馈的问题，已发送给我们");
                setTimeout(()=>{
                    this.show=true;
                },3000)
            },
           /* imageList(e){
                let $target = e.currentTarget || e.srcElement;
                let file = $target.files[0];
                if(file.name.indexOf(".jpg")!=-1 || file.name.indexOf(".png")!=-1 || file.name.indexOf(".gif") !=-1 || file.name.indexOf(".jpeg") !=-1){
                    this.src=`/img/uPortrait/${file.name}`;
                    let reader = new FileReader();
                    reader.onload= () => {
                        $(`<img src="http://localhost:3000${this.src}" width="60" height="60" style="margin: 10px;border-radius: 5px;">`).prependTo("#image-list")
                    };
                    reader.readAsDataURL(file)
                }else{
                    Toast("图片的格式不正确");
                }
            },*/
           imageList(){
               let fileData = new FormData();
               fileData.append("file",this.$refs.fileUpload.files[0]);
               console.log(this.$refs.fileUpload.files[0]);
               axios({
                   method:'post',
                   url:'http://172.242.10.59:3000/login/aboutImg',
                   anync:true,
                   contentType:false,
                   processData:false,
                   data:fileData
               }).then((res)=>{
                    if(res.data.code == 1){
                        $(`<img src="http://localhost:3000${res.data.msg}" width="60" height="60" style="margin: 10px;border-radius: 5px;" >`).prependTo("#image-list")
                    }
               })
           },
            startFill(e){
                $(e.target).addClass("mui-icon-star-filled").prevAll().addClass("mui-icon-star-filled");
                $(e.target).nextAll().removeClass("mui-icon-star-filled");
            },
           },
    }
</script>

<style scoped>
    .mui-icon-star-filled{
        color: #f0ad4e;
        font-size: 24px
    }
    #feedback{
        color: #929292;
    }
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
    #feedback>div:nth-child(2)>div:nth-child(1)>div:nth-child(2){
        font-size: 13px;
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
    /*问题反馈在setting页面单独的css*/
   
    #image-list{
        border-radius: 5px;
        border: 1px solid #ddd;
        display: flex;
        flex-wrap: wrap;
    }
    #image-list>.image-list{
        position: relative;
        border: 1px solid #aaa;
        border-radius: 5px;
        width: 60px;
        height: 60px;
        margin: 10px;
        font-size: 70px;
        text-align: center;
        line-height: 60px;
        top: 0;
        left: 0;
    }
    .image-list>input{
        position: absolute;
        top: 15px;
        left: 0;
        opacity: 0;
    }
    #feed{
        background-color:rgba(192,192,192,0.5);
        font-size: 15px;
        z-index: 999;
        width: 100%;
        height: 100%;
        display: table;
        transition: opacity .3s ease;
        position: fixed;
        top:0;
        left: 0;
    }
    #feed .feed-popover-arrow{
        width: 20px;
        height: 20px;
        transform: rotate(45deg);
        /*background-color: #fff;*/
        position: absolute;
        right: 60px;
        top:75px;
    }
    #feed .feed-view{
        list-style: none;
        padding: 0 10px;
        /*background-color: #fff;*/
        width: 280px;
        height: 180px;
        border-radius: 20px;
        position: absolute;
        right: 20px;
        top:70px;
    }
    #feed .feed-cell{
        position: relative;
        overflow: hidden;
        padding: 11px 15px;
        border-bottom: 1px solid #919191;
    }
</style>
