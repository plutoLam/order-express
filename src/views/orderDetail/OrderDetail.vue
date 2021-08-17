<template lang="">
  <div class="order-detail">
    <nav-bar @back='back()'>
      <div slot="title">订单详情</div>
      <div slot="order">
        <a href="#" class="order">
          <img src="~assets/img/home/order.png" alt="">
        </a>
      </div>
    </nav-bar>
    <div class="order-status">
      <h2>{{status[0]}}</h2>
      <p>{{status[1]}}</p>
    </div>
    <div class="container">
      <ul>
        <li class="money-status" v-show="!order.isOver">
          待支付 ￥{{order.ALLMONEY}}
        </li>
        <li v-for="item in order.cartlist">
          <a href="#">
            <img :src="item.image" alt="">
          </a>
          <div class="info">
            <div class="info-top">
              <span>{{item.name}}</span>
              <span>￥{{(item.price*item.count).toFixed(2)}}</span>
            </div>
            <div class="count">
              数量: {{item.count}}
            </div>
          </div>
        </li>
        <li class="border">
          <span class="all">
            <span class="all-count">共{{order.count}}份 </span>
            小计￥<span class="price">{{order.ALLMONEY}}</span>
          </span>
        </li>
      </ul>
      <ul class="order-info">
        <li class="info">订单信息</li>
        <li>订单编号: {{order.orderNum}}</li>
        <li>下单时间: {{order.data|moment("YYYY-MM-DD HH:mm:ss")}}</li>
        <li>桌台名称: 31</li>
        <!-- <li class="notice"> -->
        <van-notice-bar :scrollable='false' wrapable color="#FE6635" background="#ffff" left-icon="info-o">
          商家设置了金额零头处理，如有疑问请咨询服务员。
        </van-notice-bar>
        <!-- </li> -->
      </ul>
    </div>
    <order-detail-tab v-show="!order.isOver"></order-detail-tab>
  </div>
</template>
<script>
  import 'assets/css/cart.css'
  import moment from 'moment'
  import { NoticeBar } from 'vant';
  import NavBar from 'components/navBar/NavBar'
  import OrderDetailTab from './childComps/OrderDetailTab'
  export default {
    name: 'OrderDetail',
    data() {
      return {
        order: {},
        orderStatus: {
          over: ['已支付', '支付成功，祝您用餐愉快'],
          noover: ['待支付', '付款后即可享受美味']
        }
      }
    },
    components: {
      [NoticeBar.name]: NoticeBar,
      NavBar,
      OrderDetailTab
    },
    computed: {
      status() {
        if (this.order.isOver) {
          return this.orderStatus.over
        } else {
          return this.orderStatus.noover
        }
      }
    },
    methods: {
      back() {
        this.$router.push({ name: 'orderlist' })
      }
    },
    created() {
      this.order = this.$route.params.item
    },
    filters: {
      moment(value) {
        return moment(value).format('YYYY-MM-DD HH:mm:ss')
      }
    },
  }
</script>
<style scoped>
  .order img {
    width: 1.35rem;
    height: 1.35rem;
  }

  .order-detail {
    width: 100%;
    background-color: #eee;
    height: 100vh;
    overflow-y: scroll;
    position: relative;
  }

  .container {
    position: absolute;
    top: 120px;
    width: 90%;
  }


  .money-status {
    display: flex;
    align-items: center;
    color: #FC7B41;
    font-weight: 500;
    font-size: 19px;
    border: none;
    margin-bottom: -15px;
  }

  .order-status {
    width: 100%;
    height: 150px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    background-color: #FC7B41;
    color: white;
  }

  .order-status h2 {
    margin-bottom: 10px;
    font-weight: 500;
  }

  .order-status p {
    font-size: 14px;
  }

  .border {
    display: flex;
    justify-content: end;
  }

  .all-count {
    /* line-height: 30px; */
    margin-right: 20px;
  }

  .order-info {
    margin: 10px 6px;
    font-size: 15px;
  }

  .info {
    font-size: 18px;
    margin-bottom: 5px;
  }

  .order-info li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 30px;
    border: none;

  }
</style>