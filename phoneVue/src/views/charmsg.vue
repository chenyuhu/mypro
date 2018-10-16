<template>
    <div id="chatMsg">
        <div class="mui-navbar-inner mui-bar mui-bar-nav">
            <h1 class="mui-center mui-title">消息({{this.$store.getters.optCount}})</h1>
        </div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell" v-for="item in list" :key="item.uid" @click="goChat(item.id)">
                <div class="mui-slider-cell">
                    <div class="oa-contact-cell mui-navigate-right">
                        <div class="oa-contact-avatar mui-table-cell">
                            <img :src="item.uPortrait | picFilter" >
                        </div>
                        <!--<div class="oa-contact-content mui-table-cell ">-->
                            <!--<div class="mui-clearfix">-->
                                <!--<h4 class="oa-contact-name">{{item.uName}}</h4>-->
                            <!--</div>-->
                            <p class=" mui-h4">
                                {{item.fName}}+{{item.m_id}}
                            </p>
                        <!--</div>-->
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import {Toast} from "mint-ui";
    // 处理兄弟间通信的问题
    // import Bus from "@/assets/bus/eventBus"
    export default {
        data(){
            return{
                list:[],
            }
        },
        created(){
            this.getChat();
        },
        methods:{
            goChat(id){
                // console.log(id);
                this.$router.push('/chat/'+id);
            },
            getChat(){
              this.$http.get('msg/msg',{params:{uid:localStorage.uid}}).then(res=>{
                 if (res.body.code ==1){
                     for (let i = 0; i < res.body.msg.length; i++) {
                         for (let j =i+1; j <res.body.msg.length; ) {
                             if (res.body.msg[i].id == res.body.msg[j].id ) {//通过id属性进行匹配；
                                 res.body.msg.splice(j, 1);//去除重复的对象；
                             }else {
                                 j++;
                             }
                         }
                     }
                     for (let i = 0; i < res.body.msg.length; i++) {
                         for (let j =i+1; j <res.body.msg.length; ) {
                             if (res.body.msg[i].m_id == res.body.msg[j].m_id ) {//通过id属性进行匹配；
                                 res.body.msg.splice(j, 1);//去除重复的对象；
                             }else {
                                 j++;
                             }
                         }
                     }
                     this.list = res.body.msg;
                     this.list.sort((a,b)=>b.m_id-a.m_id);
                     // console.log(this.list);
                 } else{
                     Toast("网络故障！请检查")
                 }
              })
            }
        },
        
    }
</script>
<style scoped>
    #chatMsg{
        padding-top: 50px;
    }

    .oa-contact-avatar.mui-table-cell>img{
        width: 40px;height: 40px;
    }
    p.mui-h4{
        position: absolute;
        top: 5px;left: 50px;
    }
</style>
