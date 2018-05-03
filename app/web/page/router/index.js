import Vue from 'vue';

import VueRouter from 'vue-router';

import member from '../view/member/member.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/home'
    },
    {
      name: 'home',
      path: '/home',
      component: () => import('../view/home/home.vue')
    },
    {
      name: 'member',
      path: '/member',
      component: member
    }
  ]
});

export default router;
