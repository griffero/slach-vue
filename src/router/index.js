import Vue from 'vue';
import VueRouter from 'vue-router';

import UserData from '../views/UserData.vue';
import SignUp from '../views/SignUp.vue';

Vue.use(VueRouter);
const routes = [
  {
    path: '/',
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
