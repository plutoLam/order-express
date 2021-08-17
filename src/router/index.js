import Vue from 'vue';
import VueRouter from 'vue-router'
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)}
const Index = () => import('views/index/Index')
const Home = () => import('views/home/Home')
const Submit = () => import('views/submit/Submit')
const SubmitOrder = () => import('components/submit/SubmitOrder')
const PayOrder = () => import('components/submit/PayOrder')
const OrderList = () => import('views/orderList/OrderList')
const OrderDetail = () => import('views/orderDetail/OrderDetail')

Vue.use(VueRouter)

const routes = [{
		path: '',
		redirect: '/index'
	}, 
	{
		path: '/index',
		component: Index
	},
  {
		name:'home',
		path: '/home',
		component: Home
	},
  {
		name:'orderlist',
		path: '/orderList',
		component: OrderList
	},
  {
		name:'orderdetail',
		path: '/orderlist',
		component: OrderDetail
	},
	{
		path: '/submit',
		component: Submit,
		children:[
			{
				name:'submitorder',
				path:'submitorder',  //子路由不能加斜杠
				component:SubmitOrder
			},
			{
				name:'payorder',
				path:'payorder',
				component:PayOrder
			},
			
		]
	},

]

const router = new VueRouter({
	routes,
	mode: 'history'
})

export default router
