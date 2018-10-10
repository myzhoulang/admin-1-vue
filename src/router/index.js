import Vue from 'vue';
import Router from 'vue-router';

// 页面容器
const PageContainer = () => import(/* webpackChunkName: "PageContainer" */ '@/layout/PageContainer');

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
        {
          path: 'users',
          name: 'users.container',
          component: PageContainer,
          children: [
            { path: '', name: 'users.users', component: Users },
            { path: ':id', name: 'users.id', component: User },
          ],
        },
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
