<template>
  <div class="warpper" ref="warpper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "scroll",
    props : {
      probetype : {
          type : Number,
          default() {
            return 0;
          }
      },
      pullupload : {
        type : Boolean,
        default : true
      }
    },
    data(){
      return {
        scroll :null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.warpper,{
        click : true,
        probeType : this.probetype,
        pullUpLoad : this.pullupload
      })
      if (this.probetype === 2 || this.probetype === 3){
        this.scroll.on('scroll',position=>{
          this.$emit('scroll',position)
          // console.log(position);
        })
      }
      if (this.pullupload){
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingup')
        })
      }
      this.scroll.refresh()
    },
    methods : {
      scrollto(x,y,time){
        //做优化，保证有scroll对象，再进行操作
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
    },
      finishpullup(){
        this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
      },
      refresh(){
        // console.log('---');
        this.scroll && this.scroll.refresh && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
