<template>
    <div id="personaddFind">
        <div class="mui-navbar-inner mui-bar mui-bar-nav">
            <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click="goBack">
                <span class="mui-icon mui-icon-left-nav"></span>返回
            </button>
            <h1 class="mui-center mui-title">搜索</h1>
        </div>
        <div class="mui-input-row mui-search mui-active">
            <input type="search" class="mui-input-clear" data-input-clear="1" data-input-search="1"  v-model="friend" @keyup.13="findFriend">
            <span class="mui-icon mui-icon-clear" @click="search"></span>
            <span class="mui-placeholder">
                <span class="mui-icon mui-icon-search"></span>
                <span>搜索</span>
            </span>
        </div>
        <div class="m-search" @click="findFriend">
            搜索
        </div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell" v-for="item in list" :key="item.uid" @click="detail(item.uid)">
                <div class="mui-slider-cell">
                    <div class="oa-contact-cell mui-navigate-right">
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
    </div>
</template>

<script>
    import  $ from "jquery";
    import {Toast} from "mint-ui"
    export default {
       data(){
           return{
               friend:null,
               list:null,
           }
       },
        created(){
        
        },
        mounted(){
            $("input.mui-input-clear").focus();
        },
        methods:{
            search(){
                this.friend=null;
            },
            goBack(){
                this.$router.back();
            },
            findFriend(){
                if(!!this.friend){
                    this.$http.get('friend/search',{params:{uName:this.friend}}).then(res=>{
                        if(res.body.code == 1){
                            this.list = res.body.msg;
                        }else{
                            this.list = [];
                            Toast('未找到该用户');
                        }
                    })
                }
            },
            detail(uid){
                this.$router.push('/personaddFriend/'+uid)
            }
        }
    }
</script>

<style scoped>
    #personaddFind{
        padding: 50px 15px;
        
    }
    .mui-input-row.mui-search{
        width: 85%;
    }
    .m-search{
        position: absolute;
        top:60px;
        right: 15px;
        color: #007aff;
    }
    .oa-contact-avatar.mui-table-cell>img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .oa-contact-content.mui-table-cell{
        left: 15px;
    }
</style>