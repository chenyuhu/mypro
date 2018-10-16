<template>
    <div id="chat">
        <div class="mui-navbar-inner mui-bar mui-bar-nav">
            <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click="goBack">
                <span class="mui-icon mui-icon-left-nav"></span>返回
            </button>
            <h1 class="mui-center mui-title">{{msg[0].fName}}</h1>
        </div>
        <div v-for="item in msg" :key="item.m_id">
            <div  class="chatMsg" v-if="item.m_fromUserID == id">
                <img :src="item.uPortrait | picFilter">
                <div class="send">
                    {{item.m_postMessages}}
                    <div class="arrow"></div>
                </div>
            </div>
            <div class="chatMsgMy" v-else-if="item.m_fromUserID == uid">
                <img :src="item.uPortrait | picFilter">
                <div class="sendRight">
                    {{item.m_postMessages}}
                    <div class="arrowRight"></div>
                </div>
            </div>
        </div>
        <footer>
            <input type="text" v-model="message" @keyup.13="sendMsg">
            <button @click="sendMsg">发送</button>
        </footer>
    </div>
</template>

<script>
    import {Toast} from "mint-ui";
    // 处理兄弟间通信的问题
    // import Bus from "@/assets/bus/eventBus"
    export default {
        data(){
            return{
                msg:[{fName:""}],
                id:this.$route.params.uid,
                message:null,
                uid:localStorage.uid
            }
        },
        mounted(){
            this.setBgc();
            // setInterval(()=>{
                this.getMsg();
            // },1000)
           // ;
            this.$emit("show",false);
        },
        destroyed(){
            this.$emit("show",true);
        },
        methods:{
            goBack(){
                this.$router.back();
            },
            getMsg(){
                this.$http.get('msg/read',{params:{uid:localStorage.uid,fid:this.id}}).then(res=>{
                    if(res.body.code !=1){
                        Toast("网络故障！请检查")
                    }
                });
                this.$http.get("msg/details",{params:{uid:localStorage.uid,fid:this.id}}).then(res=>{
                    if(res.body.code ==1){
                        this.msg=res.body.msg;
                        this.msg.sort((a,b)=>a.m_id-b.m_id);
                    } else{
                        Toast("网络故障！请检查")
                    }
                });
            },
            setBgc(){
                let url = this.$store.getters.getColor;
                let chat = document.querySelector("div#chat");
                chat.style.background=url;
            },
            sendMsg(){
                if(!!this.message){
                    this.$http.post('msg/sendMsg',{uid:localStorage.uid,fid:this.id,msg:this.message},{emulateJSON:true}).then(res=>{
                        this.getMsg();
                        this.message = null;
                        this.$socket.emit('toggle', this.info);
                        this.$socket.on('toggle', value => {
                            this.changeInfo(value)
                        });
                    })
                }else{
                    Toast("不能发送空消息")
                }
                
            },
        //                webSocket 长连
        },
        sockets: {
            connect() {
                console.log('socket connected');
            },
            login(value) {
                console.log(value)
            },
        }
    }
</script>

<style scoped>
    #chat{
        padding-top: 50px;
    }
    img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
    .chatMsg{
        padding: 15px 0  0 15px;
    }
    .chatMsg img{
        float: left;
    }
    .send {
        position:relative;
        width:150px;
        /*height: 35px;*/
        min-height:35px;
        background:#F8C301;
        border-radius:5px; /* 圆角 */
        bottom:0;
        left:50px;
        padding: 5px 10px;
    }
    .send .arrow {
        position:absolute;
        top:5px;left:-16px; /* 圆角的位置需要细心调试哦 */
        width:0;height:0;
        font-size:0;
        border:solid 8px;
        border-color:transparent #F8C301 transparent transparent ;
    }
    .chatMsgMy{
        padding: 15px 0  0 15px;
    }
    .chatMsgMy img{
        float: right;
        margin-right: 15px;
    }
    .sendRight {
        position:relative;
        width:150px;
        min-height:35px;
        /*height:35px;*/
        background:#F8C301;
        border-radius:5px; /* 圆角 */
        padding: 5px 10px;
        bottom:0;
        right:-140px;
    }
    .sendRight .arrowRight {
        position:absolute;
        top:5px;right:-16px; /* 圆角的位置需要细心调试哦 */
        width:0;height:0;
        font-size:0;
        border:solid 8px;
        border-color:transparent  transparent transparent #F8C301;
    }
    footer{
        bottom: 0;
        position: fixed;
        width: 100%;
        height: 40px;
        padding: 0;
        table-layout: fixed;
        border-top: 0;
        border-bottom: 0;
    }
    footer>input{
        width: 80%;
        margin-bottom: 0;
        height: 100%;
    }
    footer>button{
        height: 100%;
        width: 20%;
        background-color: #57800b;
        color: #fff;
    }
</style>
