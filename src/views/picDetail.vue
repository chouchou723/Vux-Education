<template>
  <div class="picDetail">
    <!-- swiper1 -->
    <div class="picTitle">
      <div class="picDate">2018年10月10日 17:25</div>
    </div>
    <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop" v-if="pics.length>0">
      <swiper-slide class="slide-1" v-for="(item,index) in pics" :key="index">
        <img :src="item.src" alt="" class="slideImgG">
      </swiper-slide>
    </swiper>
    <!-- swiper2 Thumbs -->
    <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs" v-if="pics.length>0">
      <swiper-slide class="slide-1" v-for="(item,index) in pics" :key="index">
        <img :src="item.src" alt="" class="slideImg">
      </swiper-slide>
    </swiper>
  </div>
</template>


<script>
  import 'swiper/dist/css/swiper.css'
  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper'
  // import {
  //   getMyPicture
  // } from '../api/api'
  export default {
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        pics: [],
        canShow: false,
        swiperOptionTop: {},
        swiperOptionThumbs: {}
      }
    },
    methods: {},
    mounted() {
      this.$nextTick(() => {
        const swiperTop = this.$refs.swiperTop.swiper
        const swiperThumbs = this.$refs.swiperThumbs.swiper
        swiperTop.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperTop
      })
    },
    created() {
      let num = this.$route.query.num;
      let pic = localStorage.getItem('pics');
      this.pics = pic.split(',').map((item, index) => {
        return {
          src: `${this.apiUrl}/attach/img/${item}`
        }
      })
      this.swiperOptionTop = {
          // spaceBetween: 10,
          loop: true,
          loopedSlides: num - 0>5?5:num-0, //looped slides should be the same
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        this.swiperOptionThumbs = {
          // spaceBetween: 10,
          slidesPerView: num - 0>5?5:num-0,
          touchRatio: 0.2,
          loop: true,
          loopedSlides: num - 0>5?5:num-0, //looped slides should be the same
          slideToClickedSlide: true,
        }
      this.setTitle('我的作品')
    },
    // watch:{
    //   pics(newVal){
    //   }
    // }
  }
</script>

<style lang="less" scoped>
  .picDetail {
    height: 100%;
  }
  .swiper-container {
    background-color: white;
  }
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }
  .slide-1 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .gallery-top {
    height: 77%!important;
    width: 100%;
  }
  .gallery-thumbs {
    height: 14%!important;
    background-color: #F4F4F4;
    box-sizing: border-box;
    padding: 10px 0;
    display: flex;
  }
  .gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }
  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
  .picTitle {
    width: 100%;
    height: 1.5rem;
    background-color: #fff;
  }
  .picDate {
    width: 90%;
    height: 1.4rem;
    line-height: 1.5rem;
    margin: 0 auto;
    border-bottom: 1px solid gainsboro;
    font-size: 16px;
  }
  .slideImg {
    width: 1.8rem;
    height: 1.8rem;
  }
  .slideImgG {
    max-width: 90%;
    max-height: 90%;
  }
</style>