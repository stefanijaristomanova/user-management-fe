'use strict';
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Users from '../views/Users.vue'
import User from '../views/User.vue'

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
    {
        path: '/users/:id',
        name: 'User',
        component: User
    },
]
// })

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

export default router;
