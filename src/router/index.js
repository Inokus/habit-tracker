import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const today = new Date().toISOString().slice(0, 10);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: `/day/${today}`
    },
    {
      path: '/day/',
      redirect: `/day/${today}`
    },
    {
      path: '/day/:date',
      name: 'home',
      props: true,
      component: HomeView
    }
  ]
});

export default router;
