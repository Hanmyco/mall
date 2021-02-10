<template>
    <swiper class="detailswiper">
      <swiper-item v-for='items in topimages'>
        <img :src="items">
      </swiper-item>
    </swiper>
</template>

<script>
  import Swiper from "../../../components/common/swiper/Swiper";
  import SwiperItem from "../../../components/common/swiper/SwiperItem";

  export default {
    name: "detailswiper",
    props : {
      topimages : {
        type : Array,
        default(){
          return []
        }
      }
    },
    components : {
      SwiperItem,
      Swiper
    }
  }
</script>

<style scoped>
  .detailswiper{
    height :300px;
    overflow: hidden;
  }
</style>
