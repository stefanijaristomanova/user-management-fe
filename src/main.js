import Vue from 'vue'
import App from '../App.vue'
import vuetify from '../plugins/vuetify';
import VueRouter from 'vue-router';
import router from './router';
import mixins from './mixin';
import config from '../config/development';
import VueTelInputVuetify from 'vue-tel-input-vuetify/lib';


Vue.config.productionTip = false

// This is a Webpack Aliased module, see webpack.config.js
// const config = require('src/config/development.js');
Vue.prototype.$config = config;

Vue.mixin({
  methods: [mixins]
});
Vue.use(VueTelInputVuetify, {
  vuetify,
});

Vue.use(VueRouter);


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
