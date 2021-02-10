import axios from "axios";

export function request(config) {
  const instance = axios.create({
    baseURL : 'http://152.136.185.210:7878/api/m5',
    timeout : 5000
  })
  //2.拦截器
  //2.1请求拦截（某些网络请求需要携带登录信息，希望在界面显示一个请求图标，config中的信息不符合服务器要求)
  // instance.interceptors.request.use(config=>{
  //   console.log(config);
  //   return config
  // },err=>{
  //   console.log(err);
  // })
  //2.2响应拦截
  instance.interceptors.response.use(res=>{
    // console.log(res);
    return res.data
  },err=>{
    // console.log(err);
  })

  return instance(config)//instance本身返回一个promise
}
