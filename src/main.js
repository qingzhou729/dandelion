// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource';
import router from './router'
import ElementUI from 'element-ui';
import axios from 'axios';
import VueAxios from 'vue-axios';
// hehehheheheh
// 分支测试我是远程
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueResource);
// Vue.use(Axios, VueAxios);
// Vue.prototype.axios = axios;
// Vue.http.options.xhr = { withCredentials: true }

// Vue.http.interceptors.push((request, next) => {
//     request.credentials = true;
//     next();
// });

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App),
    // components: { App },
    template: '<App/>'
})

