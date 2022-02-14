import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import Vuelidate from 'vuelidate';

import VueClipboard from 'vue-clipboard2';
import { rutFilter, rutInputDirective } from 'vue-dni';
import {
  faEye, faEdit, faTrash, faPlus, faLock, faCog, faCopy, faBolt, faShieldAlt, faChevronLeft,
  faTimes, faBuilding, faUser, faDollarSign, faHandshake, faCheck, faKey, faUniversity,
  faMobile, faExclamationCircle, faQuestion, faSearch, faShare, fa1, fa2,
} from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueTypedJs from 'vue-typed-js'
import VueMeta from 'vue-meta'

Vue.config.productionTip = false

import router from './router';
import store from './store';

library.add(
  faEye, faEdit, faPlus, faTrash, faLock, faCog, faCopy, faBolt, faShieldAlt, faChevronLeft,
  faTimes, faBuilding, faUser, faDollarSign, faHandshake, faCheck, faKey, faUniversity, faMobile,
  faExclamationCircle, faQuestion, faSearch, faShare, faTwitter, fa1, fa2
);

Vue.use(VueMeta)
Vue.use(VueClipboard);
Vue.use(VueTypedJs)
Vue.use(Vuelidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.filter('rutFilter', rutFilter);
Vue.directive('rut', rutInputDirective);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

