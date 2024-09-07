import { createRouter, createWebHashHistory } from 'vue-router'
import {
  Main,
  MainPage,
  Login,
  Register,
  Product,
  Dashboard,
  Checkout,
  About
} from '@/pages'

import {
  ProductType,
  ProductList
} from '@/pages/Product/child'

import {
  ProductManage,
  ProductTypeMange,
  OffProduct,
  OnProduct,
  Coupon,
  OrderList
} from '@/pages/Dashboard/ChildPages'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main/mainpage'
    }, {
      path: '/main',
      name: 'main',
      component: Main,
      children: [{
        path: 'mainpage',
        name: 'mainpage',
        components: {
          mainpage: MainPage
        },
      }, {
        path: 'about',
        name: 'about',
        components: {
          about: About
        },
      }, {
        path: 'product',
        name: 'product',
        components: {
          product: Product
        },
        children: [{
          path: '/main/product',
          name: 'producttype',
          components: {
            producttype: ProductType
          },
        },{
          path: '/main/product/:typeName',
          name: 'productlist',
          components: {
            productlist: ProductList
          },
        }]
      }, {
        path: 'login',
        name: 'login',
        components: {
          login: Login
        }
      }, {
        path: 'register',
        name: 'register',
        components: {
          register: Register
        }
      }]
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
      children: [{
        path: 'productmanage',
        name: 'productmanage',
        components: {
          productmanage: ProductManage
        }
      }, {
        path: 'producttypemanage',
        name: 'producttypemanage',
        components: {
          producttypemanage: ProductTypeMange
        }
      }, {
        path: 'onproduct',
        name: 'onproduct',
        components: {
          onproduct: OnProduct
        }
      }, {
        path: 'offproduct',
        name: 'offproduct',
        components: {
          offproduct: OffProduct
        }
      }, {
        path: 'coupon',
        name: 'coupon',
        components: {
          coupon: Coupon
        }
      }, {
        path: 'orderlist',
        name: 'orderlist',
        components: {
          orderlist: OrderList
        }
      }]
    }
  ]
})

export default router
