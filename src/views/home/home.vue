<template>
  <div id="home">
    <nav-bar class="home-nav"><template #center><div>购物街</div></template></nav-bar>
    <tabcontrol :titles="['流行','新款','精选']"
                @tabclick="tabclick"
                ref="tabcontrol1"
                class="tabcontrolstyle"
                v-show="istabfixed"
    /><!--动态绑定样式，使用对象语法-->
    <scroll class="content" ref="scroll"
            :probetype= 3
            @scroll="contentscroll"
            :pullupload="true"
            @pullingup="loadmore">
      <home-swiper :banners="banners" @swiperimageload="swiperimageload"/>
      <recommendview :recommends="recommends"/>
      <feature/>
      <tabcontrol :titles="['流行','新款','精选']"
                  @tabclick="tabclick"
                  ref="tabcontrol"
                /><!--动态绑定样式，使用对象语法-->
      <goodslist :goods='showgoods'/>
    </scroll>
<!--   不能直接监听，要加。native-->
    <backtop @click.native="backclick" v-show="isshow"/>
  </div>
</template>

<script>
  import homeSwiper from "./childrenComponents/homeSwiper";
  import recommendview from "./childrenComponents/recommendview";
  import feature from "./childrenComponents/feature";

  import NavBar from "../../components/common/navbar/NavBar";
  import tabcontrol from "../../components/content/tabcontrol/tabcontrol";
  import goodslist from "../../components/content/goods/goodslist";
  import scroll from "../../components/common/scroll/scroll";

  import {gethomemultidata,gethomegoods} from "../../network/home";
  import {itemlistenermixin,backtotop} from "../../common/mixin";

  export default {
    name: "home",
    components : {
      homeSwiper,
      recommendview,
      feature,
      NavBar,
      tabcontrol,
      goodslist,
      scroll,
    },
    mixins :[itemlistenermixin,backtotop],
    data(){
      return {
        result : null,
        banners : [],
        recommends : [],
        title : [],
        goods : {
          'pop' : {page : 0,list : []},
          'new' : {page : 0,list : []},
          'sell' : {page : 0,list : []}
        },
        currenttype : 'pop',
        taboffsettop : 0,
        istabfixed : false,
        saveY : 0,
      }
    },
    computed : {
      showgoods(){
        return this.goods[this.currenttype].list
      },
    },
    created() {
    //1.请求多个数据
      this.gethomemultidata()
    //2.请求商品数据
      this.gethomegoods('pop')
      this.gethomegoods('new')
      this.gethomegoods('sell')
    },
    activated() {
      this.$refs.scroll.scrollto(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.$bus.$off('itemimageload',this.itemimagelistener)
    },
    methods : {
      //业务逻辑
      loadmore(){
        this.gethomegoods(this.currenttype)
      },
      tabclick(index){
       switch (index) {
        case 0 :
          this.currenttype = 'pop'
           break
        case 1 :
          this.currenttype = 'new'
          break
        case 2 :
          this.currenttype = 'sell'
          break
       }
       this.$refs.tabcontrol1.currentindex = index
       this.$refs.tabcontrol.currentindex = index
      },
      contentscroll(position){
        //1判断回顶部原件是否起作用
        this.isshow = (-position.y) > 1000
        //2.判断是否吸顶
        this.istabfixed = (-position.y) > this.taboffsettop
        //3.记录离开的位置
        this.saveY = position.y
        // console.log(position.y);
      },
      swiperimageload(){
        this.taboffsettop = this.$refs.tabcontrol.$el.offsetTop
      },
      ///网络请求
      gethomemultidata(){
        gethomemultidata().then(res=>{
          this.banners = res.data.banner.list//根据数据结构处理数据
          this.recommends = res.data.recommend.list
          // console.log(res);
        })
      },
      gethomegoods(type){
        const page = this.goods[type].page + 1//在取东西时，对于已知使用.来取，对于未知使用[]来取
        gethomegoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page +=1
          // console.log(res);
          this.$refs.scroll.finishpullup()
        })
      },

    }
  }
</script>

<style scoped>
  @import "../../assets/css/base.css";
  #home {
    height: 100vh;
    position: relative;
  }
 .home-nav{
   background-color: var(--color-tint);
   color: #fff;
 }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tabcontrolstyle{
    position : relative;
    z-index: 9;
  }
</style>
