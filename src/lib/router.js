import Vue from 'vue'
import Router from 'vue-router'
import Catalog from '@/components/Catalog'
import Dashboard from '@/components/Dashboard'
import Clients from '@/components/Clients'
import Suppliers from '@/components/Suppliers'
import Orders from '@/components/Orders'
import Settings from '@/components/Settings'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Catalog',
      component: Catalog
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/clients',
      name: 'Clients',
      component: Clients
    },
    {
      path: '/suppliers',
      name: 'Suppliers',
      component: Suppliers
    },
    {
      path: '/Orders',
      name: 'orders',
      component: Orders
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }
  ]
})
