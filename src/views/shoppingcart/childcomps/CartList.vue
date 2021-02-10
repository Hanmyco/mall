<template>
  <div class="cartlist">
    <cart-list-item v-for="item in cartList"
                    :key="item.iid"
                    :item-info="item"></cart-list-item>
  </div>

</template>

<script>
  import scroll from "../../../components/common/scroll/scroll";
  import CartListItem from './CartListItem'

	export default {
		name: "CartList",
    components: {
		  scroll,
      CartListItem
    },
    props: {
		  cartList: {
		    type: Array,
        default() {
		      return []
        }
      }
    }
	}
</script>

<style scoped>
  .cartlist{
    height: calc(100%- 44px-49px);
  }
  /*.content{*/
  /* height: 100%;*/
  /*  overflow: hidden;*/
  /*}*/
</style>
