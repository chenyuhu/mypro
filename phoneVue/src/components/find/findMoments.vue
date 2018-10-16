<template>
    <div id="findMoments">
        <div class="mui-navbar-inner mui-bar mui-bar-nav">
            <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click="goBack">
                <span class="mui-icon mui-icon-left-nav"></span>发现
            </button>
            <h1 class="mui-center mui-title">朋友圈</h1>
        </div>
        <div class="bgi"></div>
        <div class="mui-card" v-for="item in msg" :key="item.um_id">
            <div class="mui-card-header mui-card-media">
                <div class="mui-media-body">
                    {{item.uName}}
                    <p>{{item.um_time}}</p>
                </div>
            </div>
            <div class="mui-card-content" >
                {{item.um_messages}}
            </div>
            <div class="mui-card-footer">
                <div class="mui-card-link">Like</div>
                <div class="mui-card-link">Comment</div>
                <div class="mui-card-link">Read more</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from "mint-ui"
    export default {
        data(){
            return{
                msg:[],
            }
        },
        created(){
            this.getMsg();
        },
        methods:{
            goBack(){
                this.$router.back();
            },
            getMsg(){
                this.$http.get('find/msg',{params:{uid:localStorage.uid}}).then(res=>{
                    if(res.body.code == 1){
                        this.msg = res.body.msg;
                        console.log(this.msg);
                    }else{
                        Toast('网络错误');
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .bgi{
        background: url(/82.jpg) no-repeat fixed;
        background-size:100% 41%;
        width: 100%;
        height: 300px;
    }
</style>