import { request } from './request.js'

export function getRecommend() {
	return request({
		url: '/order/recommend'
	});
}

export function getGoods() {
	return request({
		url: '/order/goods'
	});
}

export function getCategory() {
	return request({
		url: '/order/category'
	});
}