import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/main.vue'
import Article from '../components/mainChild/Article.vue'
import ArticleList from '../components/mainChild/ArticleList.vue'
import Loading from '../components/Loading.vue'
import DashBoard from '../components/DashBoard.vue'
import AllArticle from '../components/DashChild/AllArticle.vue'
import ControlPage from '../components/DashChild/ControlPage.vue'
import Login from '../components/Login.vue'
import FnChoose from '../components/DashChild/FnChoose.vue'
import MessageList from '../components/DashChild/MessageList.vue'
import Message from '../components/DashChild/Message.vue'

Vue.use(VueRouter)

const routes = [{
  path: '*',
  redirect: '/'
},
{
  path: '/',
  name: 'main',
  component: Home,
  children: [{
    path: 'article',
    name: 'article',
    component: Article
  }, {
    path: 'article_list',
    name: 'article_list',
    component: ArticleList
  }, {
    path: 'loading',
    name: 'loading',
    component: Loading
  }]
}, {
  path: '/login',
  name: 'login',
  component: Login
}, {
  path: '/dashboard',
  name: 'dashboard',
  component: DashBoard,
  meta: {
    requiresAuth: true
  },
  children: [{
    path: 'allarticle',
    name: 'allarticle',
    component: AllArticle,
    meta: {
      requiresAuth: true
    },
  }, {
    path: 'controlpage',
    name: 'controlpage',
    component: ControlPage,
    meta: {
      requiresAuth: true
    },
  }, {
    path: 'fnchoose',
    name: 'fnchoose',
    component: FnChoose,
    meta: {
      requiresAuth: true
    },
  }, {
    path: 'messagelist',
    name: 'messagelist',
    component: MessageList,
    meta: {
      requiresAuth: true
    },
  }, {
    path: 'message',
    name: 'message',
    component: Message,
    meta: {
      requiresAuth: true
    }
  }]
}
]

const router = new VueRouter({
  routes
})

export default router
