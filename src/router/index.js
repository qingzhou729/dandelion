import Vue from 'vue';
import Router from 'vue-router';
import test from '@/components/test/App.vue';
import login from '@/components/login/App.vue';
import register from '@/components/register/App.vue';
import index from '@/components/index/App.vue';
Vue.use(Router)

export default new Router({
    // 服务器部署会有问题history注释
    mode: 'history',
    routes: [
        {
          path: '/login',
          name: 'login',
          component: login,
        },
        {
          path: '/register',
          name: 'register',
          component: register,
        },
        {
          path: '/',
          name: 'index',
          component: index,
        },
        {
          path: '/index',
          name: 'index',
          component: index,
        },
        {
          path: '/test',
          name: 'test',
          component: test
        }
    ]
})
