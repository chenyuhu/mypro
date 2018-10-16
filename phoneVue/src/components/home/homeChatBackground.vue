<template>
    <div id="homeChatBG">
        <div class="mui-navbar-inner mui-bar mui-bar-nav">
            <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click="goBack">
                <span class="mui-icon mui-icon-left-nav"></span>返回
            </button>
            <h1 class="mui-center mui-title">聊天背景</h1>
        </div>
        <ul class="mui-table-view mui-grid-view">
            <li class="mui-table-view-cell mui-media mui-col-xs-6" >
                <div  class="bgc-sty"  style="background-color:#cbbebe;" data-color="#cbbebe"></div>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-6" @click="setChatBgc">
                <div  class="bgc-sty"  style="background-color:#cd5da3;" data-color="#cd5da3"></div>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-6" >
                <div  class="bgc-sty"  style="background-color:#31376f;" data-color="#31376f"></div>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-6" >
                <div  class="bgc-sty"  style="background-color:#6f816f;" data-color="#6f816f"></div>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-6" >
                <div  class="bgc-sty"  style="background-color:#4d4dae;" data-color="#4d4dae"></div>
            </li>
            <!--<li class="mui-table-view-cell mui-media mui-col-xs-6" >-->
                <!--<div class="bgc-sty" :data-color="detail.bh_bgc">-->
                    <!--<img class="mui-media-object" :src="detail.bh_bgc | picFilter">-->
                <!--</div>-->
            <!--</li>-->
            <!--<li class="mui-table-view-cell mui-media mui-col-xs-6"  v-for="item in list" :key="item.pb_id">-->
                <!--<div class="bgc-sty" :data-color="item.pb_img">-->
                    <!--<img class="mui-media-object" :src="item.pb_img | picFilter">-->
                <!--</div>-->
            <!--</li>-->
        </ul>
    </div>
</template>

<script>
    
    export default {
        data(){
            return{}
        },
        methods:{
            goBack(){
                this.$router.back();
            },
            setChatBgc(e) {
                let url = e.currentTarget.children[0].dataset.color;
                // Bus.$emit('change',url);
                this.$store.commit('setBgc',url);
                console.log(url);
            }
        }
    }
</script>

<style scoped>
    #homeChatBG{
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