// import Vue from 'vue'
// [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
// 而 vue 的 package.json 中的 main 指向的是 dist/vue.common.js。 这里webpack的base配置中使用了别名，实际指向vue/dist/vue.js
import Vue from 'vue' 
import App from './App'

Vue.config.productionTip = false // 阻止启动时产生的信息

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
