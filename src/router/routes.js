
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'Processo', component: () => import('pages/Processo.vue') },
      { path: 'cadprocesso', component: () => import('pages/CadProcesso.vue') },
      { path: 'danfe', component: () => import('pages/Danfe.vue') },
      { path: 'adiantamento', component: () => import('pages/Adiantamento.vue') }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
