<template>
  <div class="home" :class="{ wrap: isSearch }">
    <home-info @search="search()" @toOrderlist="toOrderlist()"></home-info>
    <home-recommend :recommend="recommend"></home-recommend>
    <goods-list
      :category="category"
      :goods="goods"
      :scroll="scroll"
      ref="goodlist"
      :goodlistHeight="goodlistHeight"
    >
    </goods-list>
    <home-tabbar @showCart="showCart()" @toast="toast()"></home-tabbar>

    <van-overlay
      :show="show"
      @click.self="show = false"
      z-index="3"
      duration="0.1"
    >
      <home-cart-list></home-cart-list>
    </van-overlay>
    <home-search
      v-show="isSearch"
      :goods="goods"
      @onCancel="isSearch = false"
    ></home-search>
  </div>
</template>

<script>
import GoodsList from "./childComps/GoodsList.vue";
import HomeInfo from "./childComps/HomeInfo.vue";
import HomeRecommend from "./childComps/HomeRecommend.vue";
import HomeTabbar from "./childComps/HomeTabbar.vue";
import HomeCartList from "./childComps/HomeCartList.vue";
import { getRecommend, getGoods, getCategory } from "@/network/home.js";
import { Overlay, Popup, Toast } from "vant";
import HomeSearch from "./childComps/HomeSearch";
export default {
  name: "Home",
  components: {
    GoodsList,
    HomeInfo,
    HomeRecommend,
    HomeTabbar,
    HomeCartList,
    [Overlay.name]: Overlay,
    [Popup.name]: Popup,
    HomeSearch,
  },
  data() {
    return {
      isSearch: false,
      recommend: [],
      category: [],
      goods: [],
      show: false,
      scroll: 0,
      goodlistHeight: 0,
    };
  },
  created() {
    this.getRecommendData();
    this.getGoodsData();
    this.getCategoryData();
  },
  computed: {
    goodsName() {
      return this.goods.map((item) => {
        return item.name;
      });
    },
  },
  mounted() {
    window.addEventListener("scroll", this.menu);
    this.goodlistHeight = this.$refs.goodlist.$el.offsetTop;
  },
  methods: {
    menu(e) {
      //文档卷上去的距离
      this.scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (this.scroll < this.goodlistHeight) {
        console.log("home在上面");
        this.$refs.goodlist.leftWarp.disable();
        this.$refs.goodlist.rightWarp.disable();
        // this.rightWarp.disable()
      } else if (this.scroll >= this.goodlistHeight) {
        console.log("home在下面");
        // e.preventDefault();
        this.$refs.goodlist.leftWarp.enable();
        this.$refs.goodlist.rightWarp.enable();
      }
      // console.log(this.scroll);
      //页面的高度
      // let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      //整个scroll的高度
      // let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      // console.log(this.scroll, windowHeight, scrollHeight)
      // console.log(this.scroll)
      // console.log(this.$refs.back)
      // if (this.scroll > 800) {
      // 	this.isShowBackTop = true
      // } else {
      // 	this.isShowBackTop = false
      // }
      // if ((this.scroll + windowHeight) >= scrollHeight) {
      // 	console.log('已到达底部')
      // 	this.getmore()
      // }
    },
    toast() {
      // console.log('Toast');
      Toast("请选择商品");
    },
    toOrderlist() {
      this.$router.push({ name: "orderlist" });
    },
    search() {
      this.isSearch = true;
    },
    showCart() {
      this.show = true;
    },
    getRecommendData() {
      // getRecommend().then(res => {
      // 	// console.log(res)
      // 	this.recommend = res.data.map(item => {
      // 		// console.log(item);
      // 		let baseURL = 'http://127.0.0.1:3000'
      // 		if (item.image) {
      // 			item.image = baseURL + item.image
      // 		} else {
      // 			let noPicURL = baseURL + '/images/nopic.png'
      // 			item.image = noPicURL
      // 		}
      // 		// console.log(item);
      // 		return item
      // 	})
      // })
    },
    getGoodsData() {
      getGoods().then((res) => {
        // console.log(res)
        let baseURL = "http://127.0.0.1:3000";
        this.recommend = res.data.slice(0, 3);
        this.goods = res.data.map((item) => {
          // console.log(item);
          if (item.image) {
            item.image = baseURL + item.image;
          } else {
            let noPicURL = baseURL + "/images/nopic.png";
            item.image = noPicURL;
          }
          // console.log(item);
          return item;
        });
      });
    },
    getCategoryData() {
      getCategory().then((res) => {
        // console.log(res)
        this.category = res.data;
      });
    },
  },
};
</script>

<style>
.wrap {
  height: 100vh;
  overflow: hidden;
}

.home {
  background-color: #fafafa;
  /* height: 2000px; */
}

.van-overlay {
  background-color: rgba(200, 200, 200, 0.7);
}
</style>