<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swip-page swiper-slide" v-for="(list,index) in lists" :key="index">
                <a class="js-no-follow" :href="list.clickUrl">
                    <img class="goods-main-photo fadeIn" :src="list.img">
                </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'

    export default{
        name:'swiper',
        components:{
            Swiper
        },
        props:{
            lists:{
                type:Array,
                require:true
            },
            name
        },
        created() {
            
        },
        mounted() {
            new Swiper('.swiper-container', {
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                }
            });
        },
    }
</script>

<style>
    .swiper-slide img{
        width: 100%;
        height: 100%;
    }
</style>
