<template>
    <div id="personadd">
        <div class="mui-navbar-inner mui-bar mui-bar-nav">
            <h1 class="mui-center mui-title">通讯录</h1>
        </div>
        <div class="mui-input-row mui-search" @click="find">
            <input type="search" class="mui-input-clear" data-input-clear="1" data-input-search="1"  v-model="friend">
            <span class="mui-icon mui-icon-clear mui-hidden"></span>
            <span class="mui-placeholder">
                <span class="mui-icon mui-icon-search"></span>
                <span>搜索</span>
            </span>
        </div>
        <ul class="mui-table-view">
            <li v-for="item in group" :key="item.fg_id" @click="slide">
               <span class="m-title">{{item.fg_name}}</span>
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell" v-for="i in list" :key="i.id" v-if="item.fg_id == i[0].fg_id && i[0].ft_id
 != 2"  :data-uid="i[0].uid" @click="detail">
                        <div class="mui-slider-cell">
                            <div class="oa-contact-cell mui-table ">
                                <div class="oa-contact-avatar mui-table-cell">
                                    <img :src="i[0].uPortrait | picFilter">
                                </div>
                                <div class="oa-contact-content mui-table-cell">
                                    <div class="mui-clearfix">
                                        <h4 class="oa-contact-name">{{i[0].fName}}</h4>
                                        <span class="oa-contact-position mui-h6">{{i[0].uName}}</span>
                                        <span class="oa-contact-position mui-h6" style="color: #fc0;font-size: 18px; margin-left:15px" v-if="i[0].ft_id == 1">★</span>
                                    </div>
                                    <p class="oa-contact-email mui-h6">
                                        账号：{{i[0].uLoginID}}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
    import $ from "jquery"
    export default {
        data(){
            return{
                list:[],
                group:[],
                friend:'',
                
            }
        },
        created(){
            this.getPerson();
            this.getGroup();
        },
        mounted(){
        
        },
        methods:{
            getPerson(){
                this.$http.get("friend/list",{params:{uid:localStorage.uid}}).then(res=>{
                    if(res.body.code == 1){
                        this.list = res.body.msg;
                    }
                })
            },
            getGroup(){
                this.$http.get("friend/getGroup",{params:{uid:localStorage.uid}}).then(res=>{
                   this.group=res.body.msg;
                })
            },
            find(){
                this.$router.push('/personaddFind')
            },
            slide(e){
                if($(e.currentTarget).children('ul').is(':hidden')){
                    $(e.currentTarget).children('ul').slideDown();
                }else{
                    $(e.currentTarget).children('ul').slideUp();
                }
            },
            detail(e){
                let uid = e.currentTarget.dataset.uid
                this.$router.push('/personaddDetail/' +uid );
            }
        }
    }
</script>
<style scoped>
    #personadd{
        padding-top: 50px;
    }
    .oa-contact-avatar.mui-table-cell>img{
        width: 40px;height: 40px;
    }
    html,body {
        background-color: #efeff4;
    }
    .oa-contact-cell.mui-table .mui-table-cell {
        padding: 11px 0;
        vertical-align: middle;
    }

    .oa-contact-cell {
        position: relative;
        margin: -11px 0;
    }

    .oa-contact-avatar {
        width: 75px;
    }
    .oa-contact-avatar img {
        border-radius: 50%;
    }
    .oa-contact-content {
        width: 100%;
    }
    .oa-contact-name {
        margin-right: 20px;
    }
    .oa-contact-name, oa-contact-position {
        float: left;
    }
    .m-title{
        display: inline-block;
        padding:15px;
    }
    .bgc{
        background-color: #aaaaaa;
    }
</style>