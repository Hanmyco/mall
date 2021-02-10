<template>
  <div class="goods">
    <goodlistitem v-for="items in goods" :goodsitem="items">
    </goodlistitem>
  </div>
</template>

<script>
  import goodlistitem from "./goodlistitem";
  export default {
    name: "goodslist",
    props : {
      goods : {
        type : Array,
        default() {
          return [];
        }
      }
    },
    components : {
      goodlistitem
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>
