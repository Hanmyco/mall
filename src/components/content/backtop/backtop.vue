<template>
  <div class="backtop">
    <img src="~assets/img/common/top.png">
  </div>
</template>

<script>
  export default {
    name: "backtop",
    methods : {
    }
  }
</script>

<style scoped>
  .backtop {
    position: fixed;
    right: 10px;
    bottom: 60px;
  }
  .backtop img{
    width: 43px;
    height: 43px;
  }
</style>
