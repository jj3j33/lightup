import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VeeValidate from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
// import 'bootstrap/dist/css/bootstrap.css'
import 'jquery'
import 'bootstrap'

import App from './App.vue'
import router from './router'
import './bus'

Vue.use(VueAxios, axios)
Vue.use(VeeValidate)
Vue.use(VueI18n)
Vue.component('Loading', Loading)

Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: 'zhTW',
});

Vue.use(VeeValidate, {
  events: 'input|blur',
  i18n,
  dictionary: {
    zhTW,
  },
});

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    const url = 'https://vue-course-api.herokuapp.com/api/user/check';
    axios.post(url).then((response) => {
      if(response.data.success) {
        next();
      }
      else {
        next({
          path: '/login'
        });
      }
    })
  }
  else {
    next();
  }
});
