<template>
  <div id="detail">
    <detailnavbar class="detailnav"
                  @titleclick="titleclick"
                  ref="nav"/>
    <scroll class="content" ref="scroll"
            :probetype= 3
            @scroll="detailscroll">
      <detailswiper :topimages="topimages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageload"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <detail-recommend-info :recommend-list="recommendList" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addtocart"/>
    <backtop @click.native="backclick" v-show="isshow"/>
<!--    <toast :message="toastmessage" :show="toastshow"/>-->
  </div>
</template>

<script>
  import detailnavbar from "./detailchild/detailnavbar";
  import {getdetail,getRecommend,Goods,Shop,GoodsParam} from "../../network/detail";
  import detailswiper from "./detailchild/detailswiper";
  import DetailBaseInfo from "./detailchild/DetailBaseInfo";
  import DetailShopInfo from "./detailchild/DetailShopInfo";
  import scroll from "../../components/common/scroll/scroll";
  import DetailGoodsInfo from "./detailchild/DetailGoodsInfo";
  import DetailParamInfo from "./detailchild/DetailParamInfo";
  import DetailCommentInfo from "./detailchild/DetailCommentInfo";
  import DetailRecommendInfo from "./detailchild/DetailRecommendInfo";
  import DetailBottomBar from "./detailchild/DetailBottomBar";
  import Toast from "../../components/common/toast/Toast";

  import {itemlistenermixin,backtotop} from "../../common/mixin";
  import {debounce} from "../../common/utils";

  export default {
    name: "detail",
    mixins : [itemlistenermixin,backtotop],
    data(){
      return {
        iid : null,
        topimages : [],
        goods : {},
        shop : {},
        detailInfo : {},
        paramInfo : {},
        commentInfo : {},
        recommendList :[],
        themetopy : [],
        getthemetop : null,
        detailindex :0,
        // toastshow : false,
        // toastmessage : ''
      }
    },
    components : {
      detailnavbar,
      detailswiper,
      DetailBaseInfo,
      DetailShopInfo,
      scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo,
      DetailBottomBar,
      // Toast

    },
    created(){
      this.iid = this.$route.params.iid
      // console.log(this.iid);
      //获取详情页数据
      getdetail(this.iid).then(res=>{
        const data = res.result
        // console.log(res);
        this.topimages = res.result.itemInfo.topImages
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        this.shop = new Shop(data.shopInfo)
        this.detailInfo = data.detailInfo
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })
      //获取推荐页数据
      getRecommend().then(res=>{
        // console.log(res);
        this.recommendList = res.data.list
      })
      this.getthemetop = debounce(()=>{
        this.themetopy=[]
        this.themetopy.push(0)
        this.themetopy.push(-this.$refs.params.$el.offsetTop)
        this.themetopy.push(-this.$refs.comment.$el.offsetTop)
        this.themetopy.push(-this.$refs.recommend.$el.offsetTop)
        this.themetopy.push(-Number.MAX_VALUE)
        // console.log(this.themetopy);
      },100)

    },
    mounted() {

    },
    updated() {

    },
    destroyed() {
     this.$bus.$off('itemimageload',this.itemimagelistener)
   },
    methods : {
      imageload(){
        this.$refs.scroll.refresh()
        this.getthemetop()
      },
      titleclick(index){
        // console.log(index);
        this.$refs.scroll.scrollto(0,this.themetopy[index],0)
      },
      addtocart(){
        const product = {}
        product.image = this.topimages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        product.checked = true
        //把action中的内容转移到detail里面
        this.$store.dispatch('addcart',product).then(res=>
          {
            // this.toastshow = true
            // this.toastmessage = '加入购物车成功'
            this.$toast.show(res,2000)
          })

      },
      detailscroll(position){
        this.isshow = (-position.y) > 1000
        let positiony = position.y
        let length = this.themetopy.length;
        for (let i = 0; i < length; i++) {
          let iPos = this.themetopy[i];
          /**
           * 判断的方案:
           *  方案一:
           *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTops[i+1]) || (i === (length-1) && currentPos >= iPos),
           *    优点: 不需要引入其他的内容, 通过逻辑解决
           *    缺点: 判断条件过长, 并且不容易理解
           *  方案二:
           *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
           *    优点: 简洁明了, 便于理解
           *    缺点: 需要引入一个较大的int数字
           * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
           * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
           */
          if (positiony <= iPos && positiony > this.themetopy[i+1]) {
            if (this.detailindex !== i) {
              this.detailindex = i;
            }
            break;
          }
        }
        this.$refs.nav.currentindex = this.detailindex
      }
    }
  }
</script>

<style scoped>
 #detail{
   height: 100vh;
   position: relative;
   /*z-index: 1;*/
   /*background-color: #fff;*/

 }
 .content {
   position: absolute;
   top: 44px;
   bottom:60px;
   overflow: hidden;
   left: 0;
   right: 0;
 }
 .detailnav {
   /*z-index: 9;*/
   background-color: #fff;
 }
</style>
