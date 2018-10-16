import Vue from 'vue'
import Router from 'vue-router';
import charmsg from "@/views/charmsg.vue";
import home from "@/views/home.vue";
import personadd from "@/views/personadd.vue";
import find from "@/views/find.vue";
import homeLogin from "@/components/home/homeLogin.vue";
import homelogout from "@/components/home/homelogout.vue";
import homeMsg from "@/components/home/homeMsg.vue";
import homeNotifications from "@/components/home/homeNotifications.vue";
import homePrivacy from "@/components/home/homePrivacy.vue";
import homeGeneral from "@/components/home/homeGeneral.vue";
import homeAbout from "@/components/home/homeAbout.vue";
import homeSogin from "@/components/home/homeSogin.vue";
import homeForget from "@/components/home/homeForget.vue";
import homeSet from "@/components/home/homeSet.vue";
import homeBlacklist from "@/components/home/homeBlacklist.vue";
import homeInterset from "@/components/home/homeInterset.vue";
import homeBackground from '@/components/home/homeBackground.vue';
import homeChatBackground from '@/components/home/homeChatBackground.vue';
import personaddFind from '@/components/personadd/personaddFind.vue';
import personaddFriend from '@/components/personadd/personaddFriend.vue';
import personaddDetail from '@/components/personadd/personaddDetail.vue';
import findMoments from '@/components/find/findMoments.vue';
import chat from '@/components/chat/chat.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {path:"/",redirect:"/homelogout"},
        {path:'/charmsg',component:charmsg,meta:{index:10,title:"消息"}},
        {path:'/chat/:uid',component:chat,meta:{index:11}},
        {path:'/home',component:home,meta:{index:20}},
        {path:"/homelogin",component:homeLogin,meta:{index:20}},
        {path:"/homeMsg",component:homeMsg,meta:{index:21}},
        {path:"/homeNs",component:homeNotifications,meta:{index:22}},
        {path:"/homePrivacy",component:homePrivacy,meta:{index:23}},
        {path:"/homeGeneral",component:homeGeneral,meta:{index:24}},
        {path:"/homeAbout",component:homeAbout,meta:{index:25}},
        {path:"/homeSet",component:homeSet,meta:{index:26}},
        {path:"/homeBlacklist",component:homeBlacklist,meta:{index:27}},
        {path:"/homeInterset",component:homeInterset,meta:{index:28}},
        {path:"/homeSogin",component:homeSogin,meta: {index: 99}},
        {path:"/homelogout",component:homelogout,meta: {index: 100}},
        {path:"/homeForget",component:homeForget,meta: {index: 101},name:'homeForget'},
        {path:"/homeChatBG",component:homeChatBackground,meta:{index:29}},
        {path:'/homeBG',component:homeBackground,meta:{index:29}},
        {path:'/personadd',component:personadd,meta:{index:30}},
        {path:'/personaddFind',component:personaddFind,meta:{index:31}},
        {path:'/personaddFriend/:uid',component:personaddFriend,meta:{index:32}},
        {path:'/personaddDetail/:uid',component:personaddDetail,meta:{index:33}},
        {path:'/find',component:find,meta:{index:40}},
        {path:'/findMoments', component:findMoments,meta:{index:41}},
    ],linkActiveClass:"mui-active"
    })
