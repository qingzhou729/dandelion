// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource';
import router from './router'
import ElementUI from 'element-ui';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App),
    template: '<App/>'
})

