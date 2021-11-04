import { request } from './request.js'

export function postOrder(order) {
  return request({
    method: "post",
    url: '/order/orderlist/',
    data: {
      orderNum: order.orderNum,
      isOver: order.isOver,
      count: order.count,
      ALLMONEY: order.ALLMONEY,
    }
  });
}

export function postCartlist(cartlist, orderNum) {
  return request({
    method: "post",
    url: '/order/cartlist/',
    data: {
      name: cartlist.name,
      price: cartlist.price,
      count: cartlist.count,
      orderNum: orderNum,
      image: cartlist.image
    }
  });
}

export function getOrder() {
  return request({
    url: '/order/orderlist/',
  });
}

export function getCartlist(orderNum) {
  return request({
    url: '/order/getcart',
    params: {
      orderNum
    }
  });
}