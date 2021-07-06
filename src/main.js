import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import { auth } from './firebase';

let app;
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user');

  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser && user === null) {
    next('/login');
  } else {
    next();
  }
});

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(router)
      .mount('#app');
  }
});
