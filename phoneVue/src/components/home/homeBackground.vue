<template>
        <div id="homeBG">
            <div class="mui-navbar-inner mui-bar mui-bar-nav">
                <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click="goBack">
                    <span class="mui-icon mui-icon-left-nav"></span>返回
                </button>
                <h1 class="mui-center mui-title">我的背景</h1>
            </div>
            <ul class="mui-table-view mui-grid-view">
                <li class="mui-table-view-cell mui-media mui-col-xs-6" @click="setBackground">
                    <div  class="bgc-sty"  style="background-color:#cbbebe;" data-color="#cbbebe"></div>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-6" @click="setBackground">
                    <div  class="bgc-sty"  style="background-color:#cd5da3;" data-color="#cd5da3"></div>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-6" @click="setBackground">
                    <div  class="bgc-sty"  style="background-color:#31376f;" data-color="#31376f"></div>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-6" @click="setBackground">
                    <div  class="bgc-sty"  style="background-color:#6f816f;" data-color="#6f816f"></div>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-6" @click="setBackground">
                    <div  class="bgc-sty"  style="background-color:#4d4dae;" data-color="#4d4dae"></div>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-6" @click="setBackground">
                    <div class="bgc-sty" :data-color="detail.bh_bgc">
                        <img class="mui-media-object" :src="detail.bh_bgc | picFilter">
                    </div>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-6" @click="setBackground" v-for="item in list" :key="item.pb_id">
                    <div class="bgc-sty" :data-color="item.pb_img">
                        <img class="mui-media-object" :src="item.pb_img | picFilter">
                    </div>
                </li>
            </ul>
        </div>
</template>

<script>
    import {axios} from "axios";
    import {Toast} from "mint-ui"
    import Vue from 'vue';
    Vue.filter('bgcFilter',function (val) {
       val=val.slice(val.lastIndexOf("/")+1);
       return val;
    });
    export default {
        data(){
            return{
                name:'ch_bgc',
                detail:{},
                list:[],
            }
        },
        created(){
            this.getBackground();
            this.getpubbgc();
        },
        methods:{
            goBack(){
                this.$router.back();
            },
            setBackground(e){
                let url = e.currentTarget.children[0].dataset.color;
                this.$emit('home-background',url)
            },
            getBackground(){
                this.$http.get('background/myBgc',{params:{uid:localStorage.uid}}).then(res=>{
                   if(res.body.code == 1){
                        this.detail = res.body.msg[0];
                   }else{
                       Toast('网络错误')
                   }
                })
            },
            getpubbgc(){
                this.$http.get('background/list').then(res=>{
                    if(res.body.code == 1){
                        this.list = res.body.msg;
                    }else{
                        Toast('网络错误')
                    }
                })
            },
            changeBackground(){
                let formData = new FormData();
                formData.append('file',this.$refs.fileUpload.files[0]);
                formData.set("uid",localStorage.uid);
                formData.set('name',this.name);
                axios({
                    method:'post',
                    url:'http://localhost:3000/background/portrait',
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
            }
        }
    }
</script>

<style scoped>
    #homeBG{
        padding-top: 50px;
    }
    .bgc-sty{
        width: 170px;
        height: 170px;
    }
    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object{
        height: 100%;
    }
</style>
