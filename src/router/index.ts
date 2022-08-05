import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { mapGetters } from 'vuex';
import UserListsView from '../views/UserListsView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import CreateUserView from '../views/CreateUserView.vue'
import UpdateUserView from '../views/UpdateUserView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import UserUploadView from '../views/UserUploadView.vue'
import PostUploadView from '../views/PostUploadView.vue'
import PostListsView from '../views/PostListsView.vue'
import CreatePostView from '../views/CreatePostView.vue'
import UpdatePostView from '../views/UpdatePostView.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: UserListsView
  },
  {
    path: '/',
    name: 'login',
    component: LoginView
    
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/createuser',
    name: 'createuser',
    component: CreateUserView
  },
  {
    path: '/updateuser/:id',
    name: 'updateuser',
    component: UpdateUserView
  },
  {
    path: '/userprofile',
    name: 'userprofile',
    component: UserProfileView
  },
  {
    path: '/userupload',
    name: 'userupload',
    component: UserUploadView
  },
  {
    path: '/postupload',
    name: 'postupload',
    component: PostUploadView
  },
  {
    path: '/posts',
    name: 'posts',
    component: PostListsView
  },
  {
    path: '/createpost',
    name: 'createpost',
    component: CreatePostView
  },
  {
    path: '/updatepost/:id',
    name: 'updatepost',
    component: UpdatePostView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



router.beforeEach((to, from, next) => {
  if (to.name === 'createuser' || to.name === 'userupload' ) {
    let userType:any = localStorage.getItem('type');
    if (userType==0) {next()}
    else {next({ name: 'dashboard' })}
  }
  else {
    next();
 }
})

export default router
