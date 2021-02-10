export default {
  addcart(context,payload){
    return new Promise((resolve, reject) => {
      let oldproduct = context.state.cartlist.find(item=> item.iid === payload.iid)
      if(oldproduct){
        context.commit('addcount',oldproduct)//使用commit对mutation重构
        resolve('购物车数量+1')
      }else{
        context.commit('createproduct',payload)
        resolve('加入购物车成功')
      }
    })
  }
}
