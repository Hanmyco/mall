<template>
  <div class="recommends">
    <div v-for="items in recommends" class="recommenditem">
      <a :href="items.link">
        <img :src="items.image">
        <div>{{items.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "recommendview",
    props : {
      recommends : {
        type : Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
.recommends {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0px 20px;
  border-bottom: 10px solid #e9e9e9;
}
.recommenditem{
  flex : 1;
}
  .recommenditem img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>
