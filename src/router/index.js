import Vue from 'vue';
import VueRouter from 'vue-router';

import Landing from '../views/Landing.vue';
import SignUp from '../views/SignUp.vue';
import UserData from '../views/UserData.vue';

Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    component: Landing
  },
  {
    path: '/accounts',
    component: SignUp
  },
  {
    path: '/:alias',
    component: UserData
  },
  {
    path: '/:alias/:amount',
    component: UserData
  }
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
