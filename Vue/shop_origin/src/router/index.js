import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/Main.vue'
import MainPage from '../components/MainPage.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Product from '../components/Product.vue'
import Dashboard from '../components/Dashboard'
import AddProduct from '../components/DashChild/AddProduct.vue'
import OnProduct from '../components/DashChild/OnProduct.vue'
import OffProduct from '../components/DashChild/OffProduct.vue'
import Coupon from '../components/DashChild/Coupon.vue'
import OrderList from '../components/DashChild/OrderList.vue'
import Checkout from '../components/Checkout.vue'
Vue.use(VueRouter)

const routes = [{
    path: '*',
    redirect: '/main/mainpage'
  }, {
    path: '/main',
    name: 'main',
    component: Main,
    children: [{
        path: 'mainpage',
        name: 'mainpage',
        component: MainPage,
      }, {
        path: 'product',
        name: 'product',
        component: Product
      },
      {
        path: 'login',
        name: 'login',
        component: Login
      },
      {
        path: 'register',
        name: 'register',
        component: Register
      }
    ]
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    },
    children: [{
      path: 'addproduct',
      name: 'addproduct',
      component: AddProduct,
      meta: {
        requiresAuth: true
      }
    }, {
      path: 'onproduct',
      name: 'onproduct',
      component: OnProduct,
      meta: {
        requiresAuth: true
      }
    }, {
      path: 'offproduct',
      name: 'offproduct',
      component: OffProduct,
      meta: {
        requiresAuth: true
      }
    }, {
      path: 'coupon',
      name: 'coupon',
      component: Coupon,
      meta: {
        requiresAuth: true
      }
    }, {
      path: 'orderlist',
      name: 'orderlist',
      component: OrderList,
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