import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import router from './scripts/router';
import mixins from './scripts/mixin';
import config from './config/development';
import VueTelInputVuetify from 'vue-tel-input-vuetify/lib';


Vue.config.productionTip = false

// for this use, only development config is available and it is assigned to the global config variable
Vue.prototype.$config = config;

Vue.mixin({
    methods: mixins
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
