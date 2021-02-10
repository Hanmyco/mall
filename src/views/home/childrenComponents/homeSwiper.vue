<template>
  <swiper >
    <swiper-item v-for="items in banners">
      <a :href="items.link">
        <img :src="items.image" @load="imageload">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: "homeSwiper",
    props : {
      banners : {
        type :Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        isload : false
      }
    },
    methods : {
      imageload(){
        if(!this.isload)
        {
          this.$emit('swiperimageload')
          this.isload = true
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

</style>
