<template>
    <transition name="modal">
        <div class="modal-mask">
        
        </div>
    </transition>
</template>

<script>
    export default {
        name: "modal",
        data : function () {
            return {
                showModal: false
            }
        },
        props : ['modal_heading', 'modal_body']
    }
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .6);
        display: table;
        transition: opacity .3s ease;
    }
</style>