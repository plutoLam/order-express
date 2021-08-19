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
	import { postOrder, postCartlist, getOrder } from '@/network/order.js'
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
			// postOrderData(order) {
			// 	return new Promise((resolve, reject) => {
			// 		postOrder(order).then(res => {
			// 			// console.log('res', res);
			// 			resolve(res.data)
			// 		})
			// 	})
			// },
			// postCartData(cartlist, order) {
			// 	return new Promise((resolve, reject) => {
			// 		cartlist.forEach(item => {
			// 			postCartlist(item, order.orderNum).then(res => {
			// 				console.log('for', res);
			// 				resolve();
			// 			})
			// 		});

			// 	})
			// },


			operation1() {
				//提交菜单给后端
				//假定已支付成功
				function fun(order) {
					return new Promise((resolve, reject) => {
						postOrder(order).then(res => {
							console.log('res', res);
							resolve()
						})
					})
				}
				function fun2(cartlist, order) {
					return new Promise((resolve, reject) => {
						return new Promise((resolve, reject) => {
							cartlist.forEach(item => {
								postCartlist(item, order.orderNum).then(res => {
									console.log('for', res);

								})
							});
							resolve();
						})
					})
				}
				function postOrderData(order) {
					return new Promise((resolve, reject) => {
						postOrder(order).then(res => {
							// console.log('res', res);
							resolve()
						})
					})
				}
				function postCartData(cartlist, order) {
					return new Promise((resolve, reject) => {
						cartlist.forEach(item => {
							postCartlist(item, order.orderNum).then(res => {
								console.log('for', res);

							})
						});
						resolve();
					})
				}
				Promise.all([postOrderData(this.order), postCartData(this.cartlist, this.order)]).then(res => {
					console.log('over');
				})
				this.$store.commit('deleteAll') //清空购物车
			},
			operation() {
				return Promise.all([...this.cartlist.map(item => {
					return postCartlist(item, this.order.orderNum)
				}),
				postOrder(this.order)
				])
					.then((res) => {
						this.$store.commit('deleteAll') //清空购物车
					})
			},
			async back() {
				this.$store.commit('over', false)
				// console.log('back', this.order);

				this.operation()

				this.$router.push({ name: 'home' })
			},
			async pay() {
				this.$store.commit('over', true)
				this.operation()
				// console.log(res);
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