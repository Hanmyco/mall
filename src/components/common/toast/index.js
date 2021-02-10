import Toast from "./Toast";

const obj = {

}
obj.install = function (Vue) {
  // Vue.extend(Toast)

  //
  //1.创建组件构造器
  const toastconstructor = Vue.extend(Toast)
  //2.根据组件构造器创建一个对象
  const toast = new toastconstructor()
  //3.将组件对象，手动挂载到某一个元素
  toast.$mount(document.createElement('div'))
  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj
