<template>
    <div id="personaddFriend">
        <div class="mui-navbar-inner mui-bar mui-bar-nav">
            <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click="goBack">
                <span class="mui-icon mui-icon-left-nav"></span>返回
            </button>
            <h1 class="mui-center mui-title">个人信息</h1>
        </div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell"  @click="detail(item.uid)">
                <div class="mui-slider-cell">
                    <div class="oa-contact-cell">
                        <div class="oa-contact-avatar mui-table-cell">
                            <img :src="item.uPortrait | picFilter" >
                        </div>
                        <div class="oa-contact-content mui-table-cell ">
                            <div class="mui-clearfix">
                                <h4 class="oa-contact-name">{{item.uName}}</h4>
                            </div>
                            <p class=" mui-h6">
                                账号：{{item.uLoginID}}
                            </p>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
                邮箱：{{item.uEmail}}
            </li>
            <li class="mui-table-view-cell">
                个性签名：{{item.uIntro}}
            </li>
        </ul>
        <button class="add" @click="addFriend">添加到通讯录</button>
    </div>
</template>

<script>
    import {Toast} from "mint-ui"
    export default {
       data(){
           return{
               item:{},
               uid:this.$route.params.uid,
           }
       },
        mounted(){
            this.getMsg();
        },
        methods:{
            goBack(){
                this.$router.back();
            },
            getMsg(){
                this.$http.get('friend/detail',{params:{uid:this.uid}}).then(res=>{
                    if(res.body.code == 1){
                        this.item=res.body.msg[0];
                    }else{
                        Toast('网络错误')
                    }
                })
            },
            addFriend(){
                this.$http.post("friend/add",{f_id:this.uid,uid:localStorage.uid},{emulateJSON:true}).then(res=>{
                    if(res.body.code == 1){
                        Toast('添加成功')
                    }else{
                        Toast('已是您的好友')
                    }
                })
            }
        }
    }
</script>

<style scoped>
    #personaddFriend{
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
    button.add{
        background-color: #2ac845;
        color: #fff;
        width: 60%;
        left: 20%;
        top:40px;
    }
</style>