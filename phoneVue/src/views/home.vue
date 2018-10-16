<template>
    <div id="home">
        <div id="homeView">
            <transition :name="transitionName">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                transitionName:""
            }
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
            }
        }
    }
</script>
<style scoped>
    #homeView{
        padding-top: 40px;
        padding-bottom: 50px;
        height: 100%;
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
</style>