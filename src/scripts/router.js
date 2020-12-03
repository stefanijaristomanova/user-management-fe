'use strict';
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Users from './views/Users.vue'
// import Vue from "vue";

// Vue.use(Router)

// mode: 'history',
//     base: process.env.BASE_URL,
// const routes =  new Router({

 const routes = [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/users',
            name: 'Users',
            component: Users
        },
    ]
// })

// eslint-disable-next-line no-undef
const router =  new VueRouter({
    mode: 'history',
    routes: routes
});

export default router;
