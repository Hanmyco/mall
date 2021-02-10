<template>
  <div class="tabcontrol">
    <div v-for="(items,index) in titles"
         class="tabcontrolitems"
         :class="{active:index === currentindex}"
         @click="itemclick(index)">
      <span>{{items}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tabcontrol",
    props : {
      titles : {
        type : Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        currentindex : 0
      }
    },
    methods : {
      itemclick(index){
        this.currentindex = index
        this.$emit('tabclick',index)
      }
    }
  }
</script>

<style scoped>
  .tabcontrol {
    display: flex;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
  }
  .tabcontrolitems {
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .tabcontrolitems span {
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 3px solid var(--color-high-text);
  }
</style>
