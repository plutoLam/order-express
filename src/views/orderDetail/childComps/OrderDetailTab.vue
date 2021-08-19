<template lang="">
  <div class="tab">
    <div class="cancel">
      取消订单
    </div>
    <div class="tab-right">
      <div class="add-food">
        加菜
      </div>
      <div class="pay-now">
        立即支付
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "orderDetailTab"
  }
</script>
<style scoped>
  .tab {
    width: 100%;
    /* height: 3.125rem; */
    position: fixed;
    bottom: 0;
    /* left: 50%;
    transform: translate(-50%, 0); */
    /* background-color: pink; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: -webkit-linear-gradient(top, #eee, white);
    padding: 0.625rem 0.9375rem;
  }

  .tab-right {
    display: flex;
    /* background-color: plum; */
    /* padding: 0.625rem; */
    border-radius: 2.5rem;
    color: white;
  }

  .add-food,
  .pay-now {
    padding: 0.625rem 1.5625rem;
    /* border-radius: 2.5rem; */
  }

  .add-food {
    background-color: #FAB823;
    border-top-left-radius: 2.5rem;
    border-bottom-left-radius: 2.5rem;
  }

  .pay-now {
    background-color: #FF6736;
    border-top-right-radius: 2.5rem;
    border-bottom-right-radius: 2.5rem;
  }
</style>