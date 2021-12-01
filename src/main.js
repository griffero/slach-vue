import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core';

import VueClipboard from 'vue-clipboard2';
import { rutFilter, rutInputDirective } from 'vue-dni';
import {
  faEye, faEdit, faTrash, faPlus, faLock, faCog, faCopy, faBolt, faShieldAlt, faChevronLeft,
  faTimes, faBuilding, faUser, faDollarSign, faHandshake, faCheck, faKey, faUniversity,
  faMobile, faExclamationCircle, faQuestion, faSearch, faShare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.config.productionTip = false

import router from './router';
import store from './store';

library.add(
  faEye, faEdit, faPlus, faTrash, faLock, faCog, faCopy, faBolt, faShieldAlt, faChevronLeft,
  faTimes, faBuilding, faUser, faDollarSign, faHandshake, faCheck, faKey, faUniversity, faMobile,
  faExclamationCircle, faQuestion, faSearch, faShare,
);

Vue.use(VueClipboard);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.filter('rutFilter', rutFilter);
Vue.directive('rut', rutInputDirective);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

