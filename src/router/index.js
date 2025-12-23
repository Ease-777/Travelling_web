import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue';
import List from '../views/List.vue';
import Detail from '../views/Detail.vue';
import User from '../views/User.vue';

const routes = [
    {path: '/', component: Home},//首页
    {path: '/list', component: List},//列表
    {path: '/detail/:id', component: Detail},//详情
    {path: '/user', component: User},//收藏
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router