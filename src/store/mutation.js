export default {
  addcount(state,payload){
    payload.count += 1//之前有该商品
  },
  createproduct(state,payload){
    payload.count = 1
    state.cartlist.push(payload)//之前没有该商品
  }
}
