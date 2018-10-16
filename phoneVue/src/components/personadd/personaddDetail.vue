<template>
    <div id="personaddDetail">
        <div class="mui-navbar-inner mui-bar mui-bar-nav">
            <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click="goBack">
                <span class="mui-icon mui-icon-left-nav"></span>通讯录
            </button>
            <h1 class="mui-center mui-title">好友详情</h1>
        </div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell">
                <div class="mui-slider-cell">
                    <div class="oa-contact-cell">
                        <div class="oa-contact-avatar mui-table-cell">
                            <img :src="item.uPortrait | picFilter" >
                        </div>
                        <div class="oa-contact-content mui-table-cell ">
                            <div class="mui-clearfix">
                                <h4 class="oa-contact-name">{{item.fName}}</h4>
                                <span class="oa-contact-position mui-h6">昵称：{{item.uName}}</span>
                            </div>
                            <p class=" mui-h6">
                                账号：{{item.uLoginID}}
                            </p>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <ul class="mui-table-view mui-table-view-chevron" @click="getSet">
            <li class="mui-table-view-cell">
                设置备注
            </li>
        </ul>
        <!--修改备注-->
        <transition name="model">
            <div id="detail" v-if="isShow">
                <input type="text" placeholder="修改备注" v-model="fName" @keyup.enter="setRemarks">
                <button @click="setRemarks">确定</button>
                <button @click="setRemove">取消</button>
            </div>
        </transition>
        <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
                邮箱：{{item.uEmail}}
            </li>
            <li class="mui-table-view-cell">
                个性签名：{{item.uIntro}}
            </li>
            <li class="mui-table-view-cell">
                性别：{{item.uSex.data[0] | sexFilter}}
            </li>
            <li class="mui-table-view-cell" data-type="1" @click="setBlack">
                设为特别关心
            </li>
            <li class="mui-table-view-cell" data-type="2" @click="setBlack">
                加入黑名单
            </li>
        </ul>
        <button class="sendMsg" @click="sendMsg(uid)">发送消息</button>
        <button class="videoMsg">视频通话</button>
    </div>
</template>

<script>
    import {Toast} from"mint-ui";
    export default {
        data(){
            return{
                item:{uSex:{data:[]}},
                uid:this.$route.params.uid,
                fName: null,
                isShow:false,
            }
        },
        created(){
            this.getMsg();
        },
        methods:{
            goBack(){
                this.$router.back();
            },
            sendMsg(id){
                this.$router.push('/chat/'+id);
            },
            getMsg(){
                this.$http.get('friend/detail',{params:{uid:this.uid,UID: localStorage.uid}}).then(res=>{
                    if(res.body.code == 1){
                        this.item=res.body.msg[0];
                    }else{
                        Toast('网络错误')
                    }
                })
            },
            getSet(){
                this.isShow=true;
            },
        //    设置备注
            setRemarks(){
                if(this.fName){
                    this.$http.post('friend/setRemarks',{uid:localStorage.uid,f_id:this.uid,fName:this.fName},{emulateJSON:true}).then(res=>{
                        this.isShow=false;
                        if(res.body.code == 1){
                            Toast('修改完成');
                            this.getMsg()
                        }else{
                            Toast('网络错误')
                        }
                    });
                }
            },
            setRemove(){
                this.isShow=false;
                this.fName=null;
            },
        //    设置黑名单 或特别关心
            setBlack(e) {
                let ft_id = e.currentTarget.dataset.type;
                this.$http.post('friend/line',{uid: localStorage.uid, f_id: this.uid, ft_id},{emulateJSON: true}).then(res => {
                    if(res.body.code == 1){
                        Toast('修改完成');
                        this.getMsg()
                    }else{
                        Toast('网络错误')
                    }
                })
            }
        }
    }
</script>

<style scoped>
    #personaddDetail{
        padding-top: 80px;
    }
    .oa-contact-content.mui-table-cell{
        left: 40px;
    }
    .oa-contact-avatar.mui-table-cell>img{
        width: 60px;height: 60px;
    }
    .mui-table-view.mui-table-view-chevron{
        margin-top: 20px;
    }
    #detail{
        background-color:rgba(192,192,192,0.5);
        font-size: 15px;
        z-index: 999;
        width: 100%;
        height: 50%;
        display: table;
        transition: opacity .3s ease;
        position: fixed;
        bottom:0;
        left: 0;
        padding: 15px;
    }
    #detail>input{
        position: absolute;
        top:20%;
        width: 80%;
        left: 10%;
    }
    #detail>button{
        position: absolute;
        width: 20%;
    }
    #detail>button:nth-child(2){
        background-color: #2ac845;
        color: #fff;
        top: 40%;
        left: 20%;
    }
    #detail>button:last-child{
        background-color:#dd524d;
        color: #fff;
        top: 40%;
        right: 25%;
    }
    .sendMsg{
        width: 70%;
        margin-top: 15px;
        background-color: #2ac845;
        color: #fff;
        left: 15%;
    }
    .videoMsg{
        width: 70%;
        margin-top: 15px;
        left: 15%;
    }
</style>
