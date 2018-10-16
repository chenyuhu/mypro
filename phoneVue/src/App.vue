<template>
   <div id="app"  class="app-container">
	   <transition :name="transitionName">
		   <router-view @home-background="backgroundUrlCtrl" @show="showNav"></router-view>
	   </transition>
       <nav class="mui-bar mui-bar-tab" v-show="show">
		   <router-link class="mui-tab-item-tao" to="/charmsg">
				<span class="mui-icon mui-icon-chatbubble">
         <span class="mui-badge">{{$store.getters.optCount}}</span>
        </span>
			   <span class="mui-tab-label">消息</span>
		   </router-link>
			<router-link class="mui-tab-item-tao" to="/personadd">
				<span class="mui-icon mui-icon-personadd"></span>
				<span class="mui-tab-label">通讯录</span>
			</router-link>
			<router-link class="mui-tab-item-tao" to="/find">
				<span class="mui-icon mui-icon-navigate"></span>
				<span class="mui-tab-label">发现</span>
			</router-link>
		   <router-link class="mui-tab-item-tao" :to="url | toFilter">
			   <span class="mui-icon mui-icon-contact"></span>
			   <span class="mui-tab-label">我</span>
		   </router-link>
		</nav>
  </div>
</template>

<script>
	import Vue from "vue";
	Vue.filter("toFilter",function (val) {
		if(localStorage["uid"]){
		    return "/homelogin"
		}else{
		    return "/homelogout"
		}
    });
	export default {
	    data(){
	        return{
	            url:'',
				transitionName:"",
                backgroundUrl : '',
				show:true
			}
		},
		mounted(){
            let nav1=document.querySelector('.mui-bar.mui-bar-tab');
            nav1.style.background='#fff';
            nav1.style.color="#000";
            let As = document.querySelectorAll('.mui-bar-tab .mui-tab-item-tao');
            for(let a of As){
                a.style.color="#000";
			}
		},
		methods:{
	        showNav(val){
                this.show=val;
            },
            backgroundUrlCtrl(url){
                this.backgroundUrl=url;
                let body=document.body;
                let nav1=document.querySelector('.mui-bar.mui-bar-tab');
                let As = document.querySelectorAll('.mui-bar-tab .mui-tab-item-tao');
                if(url.indexOf('/') == -1){
                    body.style.background=url;
                    body.style.color='#fff';
                    nav1.style.background=url;
                    nav1.style.color="#fff";
                    for(let a of As){
                        a.style.color="#fff";
                    }
				}else{
                    body.style.background=`url(http://172.242.10.59:3000${url})`;
                    body.style.color='#000';
                    nav1.style.background=`url(http://172.242.10.59:3000${url})`;
                    nav1.style.color="#000";
                    for(let a of As){
                        a.style.color="#000";
                    }
				}
            },
		},
		watch:{ //使用watch 监听$router的变化
            $route(to,from){
                if(to.meta.index>0){
                    //如果to的索引值为0，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
                    if(to.meta.index< from.meta.index){
                        this.transitionName="slide-right"
					}
				}else if(to.meta.index == 0 && from.meta.index > 0){
					this.transitionName = 'slide-right';
    			}
            },
            
        }
	}
</script>

<style>
   .app-container{
     padding-bottom:50px;
     overflow-x:hidden;
   }

 .mui-bar-tab .mui-tab-item-tao.mui-active {
    color: #007aff;
 }
.mui-bar-tab .mui-tab-item-tao {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.mui-bar-tab .mui-tab-item-tao .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
   font-size:11px;
   display:block;
   overflow:hidden;
   text-overflow:ellipsis;
}
   .slide-right-enter-active,
 .slide-right-leave-active,
 .slide-left-enter-active,
 .slide-left-leave-active {
	 will-change: transform;
	 transition: all .3s;
	 position: absolute;
	 width:100%;
	 left:0;
 }
   .slide-right-enter {
	   transform: translateX(-100%);
   }
   .slide-right-leave-active {
	   transform: translateX(100%);
   }
   .slide-left-enter {
	   transform: translateX(100%);
   }
   .slide-left-leave-active {
	   transform: translateX(-100%);
   }
   .mui-navbar-inner.mui-bar.mui-bar-nav{
	   background-color: #5b5b75;
	   color: #fff;
   }
	h1.mui-title{
		color: #fff;
	}
	.mui-bar button.mui-btn-link{
		color: #fff;
	}
   .mui-bar-tab .mui-tab-item-tao{
	  
   }
</style>
