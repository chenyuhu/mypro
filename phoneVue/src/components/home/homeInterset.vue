<template>
    <transition name="model">
        <div id="homeInterest">
            <div class="mui-navbar-inner mui-bar mui-bar-nav">
                <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click="goSet">
                    <span class="mui-icon mui-icon-left-nav"></span>功能
                </button>
                <h1 class="mui-center mui-title">特别关心</h1>
            </div>
            <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">
                <li class="mui-table-view-cell" v-for="item in interest" :key="item.id">
                    <div class="mui-slider-cell">
                        <div class="oa-contact-cell mui-table ">
                            <div class="oa-contact-avatar mui-table-cell">
                                <img :src="item[0].uPortrait | picFilter">
                            </div>
                            <div class="oa-contact-content mui-table-cell">
                                <div class="mui-clearfix">
                                    <h4 class="oa-contact-name">{{item[0].uName}}</h4>
                                </div>
                                <p class="oa-contact-email mui-h6">
                                    {{item[0].uLoginID}}
                                </p>
                            </div>
                        </div>
                    </div>
                    <button :data-uid="item[0].uid"  @click="removeinterest">取消特别关心</button>
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>
    import  {Toast} from "mint-ui";
    export default {
        data(){
            return{
                interest:[],
            }
        },
        created(){
            this.getinterest();
        },
        methods:{
            goSet(){
                // this.$router.push('/homeSet')
                this.$router.back();
            },
            getinterest(){
                this.$http.get("forget/blacklist",{params:{uid:localStorage.uid,ft_id:1}}).then(res=>{
                    if(res.body.code ==1){
                        this.interest=res.body.msg;
                    }else{
                        Toast("网络错误")
                    }
                })
            },
            removeinterest(e){
                let f_id = e.currentTarget.dataset.uid;
                this.$http.get("forget/removeBlacklist",{params:{uid:localStorage.uid,f_id,ft_id: 1}}).then(res=>{
                    if(res.body.code == 1){
                        Toast("已取消特别关心");
                        this.getinterest();
                    }else{
                        Toast("网络错误")
                    }
                });
            }
        }
    }
</script>

<style scoped>
    #homeInterest{
        padding-top: 80px;
    }
    #homeInterest img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
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
    li>button{
        position: absolute;
        top:15px;
        right: 20px;
    }
</style>