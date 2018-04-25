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
      redirect: '/member'
    },
    {
      name: 'member',
      path: '/member',
      component: member
    }
  ]
});

export default router;
