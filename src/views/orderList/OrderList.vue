<template>
	<div class="order-list">
		<nav-bar @back='back()' class="nav">
			<div slot="title">订单列表</div>
		</nav-bar>
		<div class="place"></div>
		<order-list-item v-for="(item, index) in orderlist" :orderItem="item" :key="index" @click.native="toOrder(item)">
		</order-list-item>
	</div>
</template>

<script>
	import NavBar from 'components/navBar/NavBar'
	import OrderListItem from './childComps/OrderListItem'
	import { mapState } from 'vuex'
	import { getOrder, getCartlist } from '@/network/order.js'
	export default {
		name: 'OrderList',
		data() {
			return {
				orderlist: []
			}
		},
		components: {
			NavBar,
			OrderListItem
		},
		created() {
			this.getOrderData()
		},
		methods: {
			getOrderData() {
				getOrder().then(res => {
					// console.log(res);
					this.orderlist = res.data
				})
			},
			back(item) {
				this.$router.push({
					name: 'home',
					params: {
						item
					}
				})
			},
			toOrder(item) {
				// console.log('toor');
				getCartlist(item.orderNum).then(res => {
					item.cartlist = res.data.data
					console.log('item', item);
					this.$router.push({
						name: 'orderdetail',
						params: {
							item
						}
					})
				})

			}
		},
		computed: {
			// ...mapState(['orderlist'])
		}
	}
</script>

<style scoped>
	.nav {
		position: absolute;
		top: 0;
		z-index: 2;
	}

	.place {
		width: 100%;
		height: 2.9rem;
	}

	.order-list {
		/* background-color: pink; */
		overflow-y: scroll;
		background-color: #eee;
		width: 100%;
		height: 100vh;
	}
</style>