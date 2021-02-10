<template>
  <div class="cart">
    <nav-bar class="navbar">
      <div slot="center">购物车({{cartlength}})</div>
    </nav-bar>
    <scroll class="content">
<!--      <ul class="ull">-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--        <li>11111111111</li>-->
<!--      </ul>-->
    <cart-list :cart-list="$store.state.cartlist"/>
    </scroll>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childcomps/CartList";
  import BottomBar from "./childcomps/BottomBar";
  import scroll from "../../components/common/scroll/scroll";

  import {mapGetters} from 'vuex'

  export default {
    name: "shoppingcart",
    computed : {
      ...mapGetters(['cartlength'])//使用vuex的计算属性
    },
    components : {
      NavBar,
      CartList,
      BottomBar,
      scroll
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
    position: relative;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 90px;
    left: 0;
    right: 0;
  }
  .ull{
    background-color: red;
  }
  .navbar{

    background-color: var(--color-tint);
    color: #fff;
  }
</style>
