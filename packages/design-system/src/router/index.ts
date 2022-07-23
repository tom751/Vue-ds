import { createRouter, createWebHistory } from 'vue-router'
import ComponentList from '@/views/ComponentList.vue'
import ComponentDetail from '@/views/ComponentDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'component-list',
      component: ComponentList,
    },
    {
      path: '/:project/:component',
      name: 'component-detail',
      component: ComponentDetail,
    },
  ],
})

export default router
