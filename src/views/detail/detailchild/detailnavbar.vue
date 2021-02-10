<template>
  <div id="detail">
    <nav-bar>
      <div slot="left" @click="backclick">
      <img src="~assets/img/common/back.svg" class="backimg">
      </div>

      <div slot="center" class="title" >
        <div v-for="(items,index) in titles"
          class="titleitem"
          :class='{active : currentindex === index}'
          @click="titleclick(index)">{{items}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";

  export default {
    name: "detailnavbar",
    data(){
      return{
        titles : ['商品','参数','评论','推荐'],
        currentindex : 0
      }
    },
    components : {
      NavBar
    },
    methods : {
      titleclick(index){
        this.currentindex = index
        this.$emit('titleclick',index)
      },
      backclick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }
  .titleitem {
    flex : 1;
  }
  .active{
    color : var(--color-high-text)
  }
  .backimg {
    margin-top: 12px;
  }
</style>
