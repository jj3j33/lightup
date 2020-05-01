import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Index from '@/views/Index.vue'
import Items from '@/views/Items.vue'
import Item from '@/views/Item.vue'
import Shoppingcart from '@/views/Shoppingcart.vue'
import Checkout from '@/views/Checkout.vue'
import Payment from '@/views/Payment.vue'
import Order from '@/views/Order.vue'
import About from '@/views/About.vue'
import Discount from '@/views/Discount.vue'

import Login from '@/views/Login.vue'

import Admin from '@/views/Admin.vue'
import Coupons from '@/views/Coupons.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        name: 'Index',
        component: Index
      },
      {
        path: 'items',
        name: 'Items',
        component: Items
      },
      {
        path: 'item/:id',
        name: 'Item',
        component: Item
      },
      {
        path: 'shoppingcart',
        name: 'Shoppingcart',
        component: Shoppingcart
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: Checkout
      },
      {
        path: 'payment/:id',
        name: 'Payment',
        component: Payment
      },
      {
        path: 'order',
        name: 'Order',
        component: Order
      },
      {
        path: 'about',
        name: 'About',
        component: About
      },
      {
        path: 'discount',
        name: 'Discount',
        component: Discount
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: 'coupons',
        name: 'Coupons',
        component: Coupons,
        meta: { requiresAuth: true}
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
  }
})

export default router
