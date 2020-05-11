import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home'
import Login from '@/view/login'
import Register from '@/view/register'
import Tsdetails from '@/view/tsdetails'
import Productlist from '@/view/productlist'
import Prdetails from '@/view/prdetails'
import Mycart from '@/view/mycart'
import Myaddress from '@/view/myaddress'
import Ordersucess from '@/view/ordersucess'
import Userhome from '@/view/userhome'
import Orderdetail from '@/view/orderdetail'
import personal from '@/components/personal'
import collect from '@/components/collect'
import order from '@/components/order'
import address from '@/components/address'
import Bhome from '@/backstage/bhome'
import buser from '@/backstage/buser'
import bgood from '@/backstage/bgood'
import border from '@/backstage/border'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
    	path:'/login',
    	name:'login',
    	component:Login
    },
    {
    	path:'/register',
    	name:'register',
    	component:Register
    },
    {
    	path:'/tsdetails',
    	name:'tsdetails',
    	component:Tsdetails
    },
    {
    	path:'/productlist',
    	name:'productlist',
    	component:Productlist
    },
    {
    	path:'/prdetails',
    	name:'prdetails',
    	component:Prdetails
    },
    {
    	path:'/mycart',
    	name:'mycart',
    	component:Mycart
    },
    {
    	path:'/myaddress',
    	name:'myaddress',
    	component:Myaddress
    },
    {
    	path:'/userhome',
    	name:'userhome',
    	component:Userhome,
    	redirect:"/userhome/personal",
    	children: [{
        path: '/userhome/personal',
        name: 'personal',
        component: personal,
      }, {
        path: '/userhome/collect',
        name: 'collect',
        component: collect,
      }, {
        path: '/userhome/order',
        name: 'order',
        component: order,
      }, {
        path: '/userhome/address',
        name: 'address',
        component: address,
      }]
    },
    {
    	path:'/orderdetail',
    	name:'orderdetail',
    	component:Orderdetail
    },
     {
    	path:'/ordersucess',
    	name:'ordersucess',
    	component:Ordersucess
    },
    {
    	path:'/bhome',
    	name:'bhome',
    	component:Bhome,
    	redirect:"bgood",
    	children: [{
        path: '/bgood',
        name: 'bgood',
        component: bgood,
      }, {
        path: '/buser',
        name: 'buser',
        component: buser,
      }, {
        path: '/border',
        name: 'border',
        component: border,
      }]
    },
  ]
})
