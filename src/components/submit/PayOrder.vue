<template>
	<div>
		<nav-bar @back='back()'>
			<div slot="title">支付页</div>
		</nav-bar>
		<van-notice-bar color="#FE6635" background="#FEFBE8" left-icon="info-o">
			支付后，如需查看订单信息，可再次扫码进入
		</van-notice-bar>

		<ul class="container">
			<li class="all-price">
				<span>订单小计</span>
				<span class="price">￥{{$store.getters.ALLMONEY}}</span>

			</li>
			<li>
				<van-notice-bar :scrollable='false' wrapable color="#FE6635" background="#ffff" left-icon="info-o">
					商家设置了金额零头处理，如有疑问请咨询服务员。
				</van-notice-bar>
			</li>
		</ul>
		<submit-tabbar>
			<span slot="left">还需支付 </span>
			<div slot="right" @click="pay()">支付并下单</div>
		</submit-tabbar>
	</div>
</template>

<script>
	import NavBar from 'components/navBar/NavBar'
	import SubmitTabbar from './SubmitTabbar'
	import { NoticeBar } from 'vant';
	import { postOrder, postCartlist } from '@/network/order.js'
	import { mapState } from 'vuex'
	import 'assets/css/cart.css'
	// var Promise = require('promise');
	// import 'babel-polyfill';

	export default {
		name: 'PayOrder',
		components: {
			NavBar,
			SubmitTabbar,
			[NoticeBar.name]: NoticeBar
		},
		methods: {
			operation() {

				//提交菜单给后端
				//假定已支付成功

				this.$store.commit('deleteAll') //清空购物车
			},
			back() {
				this.$store.commit('over', false)
				console.log('back', this.order);
				Promise.all([this.postOrderData()]).then(() => {
					console.log('我是created中的事件，现在两个接口都执行完毕啦')
				})
				this.$router.push({ name: 'home' })
			},
			pay() {
				this.$store.commit('over', true)
				this.operation()
				this.$router.push({ name: 'orderlist' })
				//此处打开微信支付
				// let obj = {
				// 	orderNum: this.order.orderNum,
				// 	isOver: true,
				// 	count: this.order.count,
				// 	ALLMONEY: this.order.ALLMONEY
				// }
				// console.log('obj', obj);	
			},
			postOrderData() {
				return new Proimse((resolve, reject) => {
					postOrder(this.order).then(res => {
						console.log('res', res);
						resolve()
					})
				})
			},
			postCartData() {
				return new Promise((resolve, reject) => {
					// this.cartlist.forEach(item => {
					// 	postCartlist(item, this.order.orderNum).then(res => {
					// 		console.log('for', res);

					// 	})
					// });
					resolve();
				})
			}
		},
		computed: {
			...mapState(['order', 'cartlist'])
		}
	}
</script>

<style scoped>
	.all-price {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.price {
		color: #FE6635;
		font-size: 1.375rem;
	}
</style>