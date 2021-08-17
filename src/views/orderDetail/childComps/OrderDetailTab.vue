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
    /* height: 50px; */
    position: fixed;
    bottom: 0;
    /* left: 50%;
    transform: translate(-50%, 0); */
    /* background-color: pink; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: -webkit-linear-gradient(top, #eee, white);
    padding: 10px 15px;
  }

  .tab-right {
    display: flex;
    /* background-color: plum; */
    /* padding: 10px; */
    border-radius: 40px;
    color: white;
  }

  .add-food,
  .pay-now {
    padding: 10px 25px;
    /* border-radius: 40px; */
  }

  .add-food {
    background-color: #FAB823;
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
  }

  .pay-now {
    background-color: #FF6736;
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
  }
</style>