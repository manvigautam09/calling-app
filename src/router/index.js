import { createWebHistory, createRouter } from 'vue-router';

import Home from '../Views/Home';
import Room from '../Views/Room';
import Login from '../Views/Login';
import SignUp from '../Views/SignUp';
import PageNotFound from '../Views/PageNotFound';

const routes = [
  {
    path: '/dashboard',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/signup', component: SignUp },
  {
    path: '/room/:roomName/:id',
    name: 'Room',
    component: Room,
    meta: {
      requiresAuth: true
    }
  },
  { path: '/:pathMatch(.*)', component: PageNotFound },
  { path: '/:pathMatch(.*)*', component: PageNotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
