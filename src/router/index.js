import Vue from 'vue';
import Router from 'vue-router';

// admin
const Admin = () => import(/* webpackChunkName: "Admin" */ '@/pages');

// login
const Login = () => import(/* webpackChunkName: "Login" */ '@/pages/Login');

// users
const Users = () => import(/* webpackChunkName: "Users" */ '@/pages/Users');
const User = () => import(/* webpackChunkName: "User" */ '@/pages/Users/User');

// dashboard
const Dashboard = () => import(/* webpackChunkName: "Dashboard" */ '@/pages/Dashboard');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/admin',
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/dashboard',
      component: Admin,
      children: [
        { path: 'users', name: 'users', component: Users },
        { path: 'users/:id', name: 'users.id', component: User },

        // dashboard
        { path: 'dashboard', name: 'dashboard', component: Dashboard },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
});
