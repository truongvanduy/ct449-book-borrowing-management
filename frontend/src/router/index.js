import { createRouter, createWebHistory } from 'vue-router'

let routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/books',
    name: 'books',
    component: () => import('@/views/BooksView.vue')
  },
  {
    path: '/books/:id',
    name: 'book-detail',
    component: () => import('@/views/BookDetailView.vue')
  },
  {
    path: '/borrowings/:id',
    name: 'borrowing.create',
    component: () => import('@/views/BookBorrowingView.vue'),
    props: true
  },
  {
    path: '/my-borrowings',
    name: 'borrowings',
    component: () => import('@/views/BorrowingsView.vue')
  },
  {
    path: '/auth',
    name: 'authentication',
    component: () => import('@/views/AuthenticationView.vue'),
    meta: {
      layout: 'EmptyLayout'
    },
    children: [
      {
        path: 'signin',
        name: 'sign-in-email',
        component: () => import('@/views/authentication_views/SignInEmail.vue')
      },
      {
        path: 'signin/:id',
        name: 'sign-in-password',
        component: () => import('@/views/authentication_views/SignInPassword.vue'),
        props: (route) => ({ id: route.params.id })
      },
      {
        path: 'signup',
        name: 'sign-up-email',
        component: () => import('@/views/authentication_views/SignUpEmail.vue')
      },
      {
        path: 'signup/:email',
        name: 'sign-up-password',
        component: () => import('@/views/authentication_views/SignUpPassword.vue'),
        props: (route) => ({ email: route.params.email })
      }
    ]
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/SettingsView.vue')
  },
  {
    path: '/users-management',
    name: 'users-management',
    component: () => import('@/views/UsersManagementView.vue')
  },
  // Admin routes
  {
    path: '/admin/borrowings',
    name: 'admin.borrowings',
    component: () => import('@/views/admin_views/BorrowingsManagement.vue')
  },
  {
    path: '/admin/books',
    name: 'admin.books',
    component: () => import('@/views/admin_views/BooksManagement.vue')
  },
  {
    path: '/admin/books/create',
    name: 'admin.books.create',
    component: () => import('@/views/admin_views/BookForm.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'FallBack',
    component: () => import('@/views/BorrowingsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active'
})

export default router
