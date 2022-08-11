import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { mapGetters } from 'vuex';
import UserListsView from '../views/UserListsView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import CreateUserView from '../views/CreateUserView.vue'
import UpdateUserView from '../views/UpdateUserView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import UserDetailView from '../views/UserDetailView.vue'
import UserUploadView from '../views/UserUploadView.vue'
import PostUploadView from '../views/PostUploadView.vue'
import PostListsView from '../views/PostListsView.vue'
import CreatePostView from '../views/CreatePostView.vue'
import UpdatePostView from '../views/UpdatePostView.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: UserListsView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    name: 'login',
    component: LoginView,
   
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView,
    
  },
  {
    path: '/createuser',
    name: 'createuser',
    component: CreateUserView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/updateuser/:id',
    name: 'updateuser',
    component: UpdateUserView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/userprofile/:id',
    name: 'userprofile',
    component: UserProfileView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/userdetail/:id',
    name: 'userdetail',
    component: UserDetailView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/userupload',
    name: 'userupload',
    component: UserUploadView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/postupload',
    name: 'postupload',
    component: PostUploadView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/posts',
    name: 'posts',
    component: PostListsView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/createpost',
    name: 'createpost',
    component: CreatePostView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/updatepost/:id',
    name: 'updatepost',
    component: UpdatePostView,
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



router.beforeEach((to, from, next) => {
  if (to.name === 'createuser' || to.name === 'userupload'  ||  to.name === 'dashboard' ||  to.name === 'userdetail') {
    let userType:any = localStorage.getItem('type');
    if (userType== 0) {next()}
    else {next({ name: 'posts' })}
  }
  else {
    next();
 }

})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let token:any= localStorage.getItem('token');
    if (!token) {
      next({
        name: "login"
      })
    } else {
      next()
    }
   }
  //else if (to.matched.some(record => record.meta.visitor)) {
  //   let token:any= localStorage.getItem('token');
  //   if (token) {
  //     next({
  //       name: "posts"
  //     })
  //   } else {
  //     next()
  //   }
  // }
  else {
    next()
  }
})





export default router
