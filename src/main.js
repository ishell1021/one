import Vue from 'vue';
import App from './App';
import router from './router';
import axios from './config/axios_config';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import MenuUtils from '@/common/MenuUtils'

Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;

let data = JSON.parse(window.sessionStorage.getItem('user_dynmRd'))
if (data){
  //这里是防止用户手动刷新页面，整个app要重新加载,动态新增的路由，会消失，所以我们重新add一次
  let routers = []
  MenuUtils(routers,data)
  router.addRoutes(routers)//添加路由
  window.sessionStorage.removeItem('isLoadNodes')
}
router.beforeEach((route, redirect, next) => {
  // let data = JSON.parse(window.sessionStorage.getItem('user_dynmRd'))
  let data = window.sessionStorage.getItem('user_login')
  
  if(data&&route.path === '/login'){//已登录但path为login
    //这里不使用router进行跳转，是因为，跳转到登录页面的时候，是需要重新登录，获取数据的，这个时候，会再次向router实例里面add路由规则，
    //而next()跳转过去之后，没有刷新页面，之前的规则还是存在的，但是使用location的话，可以刷新页面，当刷新页面的时候，整个app会重新加载
    //而我们在刷新之前已经把sessionStorage里的user_data移除了，所以上面的添加路由也不执行
    // window.sessionStorage.removeItem('user_dynmRd')
    // window.sessionStorage.removeItem('isLoadNodes')
    // window.sessionStorage.removeItem('user_login')
    window.sessionStorage.clear();//删除全部sessionStorage
    window.location.href = '/'
    return false
  }
  if (!data && route.path !== '/login') {//未登录且path不是login
    sessionStorage.setItem('targetPath',route.path);
    next({ path: '/login' })
  } else {//已登录且path不为login
    
    if (route.path) {
      next()
      
    } else {
      next({ path: '/404' })
    }
  }
})

//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//     const role = localStorage.getItem('ms_username');
//     if(!role && to.path !== '/login'){
//         next('/login');
//     }else if(to.meta.permission){
//         // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//         role === 'admin' ? next() : next('/403');
//     }else{
//         // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
//         if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
//             Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
//                 confirmButtonText: '确定'
//             });
//         }else{
//             next();
//         }
//     }
// })

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');