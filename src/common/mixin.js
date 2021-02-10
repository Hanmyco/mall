import {debounce} from "./utils";
import backtop from "../components/content/backtop/backtop";

export const itemlistenermixin ={
  data(){
    return {
      itemimagelistener : null
    }
  },
  mounted() {
    //1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh,200)
    this.itemimagelistener = ()=>{
      console.log('imageloadok');
      refresh()
    }
    this.$bus.$on('itemimageload',this.itemimagelistener)
  },
}
export const backtotop = {
  components : {
    backtop
  },
  data(){
    return{
      isshow : false,
    }
  },
  methods : {
    backclick(){
      this.$refs.scroll.scrollto(0,0,500);//通过ref可以拿到scroll对象
    }
  }
}
