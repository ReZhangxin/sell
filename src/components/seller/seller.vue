<template>
  <div>
    <ul class="priceList">
      <li class="goodsList"  v-for="price in prices" :key="price.money">
        <span class="goodsPrice">商品价格为：￥{{price.money}}元</span>
        <div class="count-wrapper">
          <span class="icon" @click="decreaseCart"><i class="icon-remove_circle_outline"></i></span>
          <span class="num">{{price.count}}</span>
          <span class="icon" @click="addCart"><i class="icon-add_circle"></i></span>
        </div>
      </li>
    </ul>
    <div>总价格为：{{totalPrice}}</div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {
      prices: [
        { money: 23, count: 0 }
      ]
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.prices.forEach(food => {
        total += food.money * food.count
      })
      return total
    }
  },
  methods: {
    decreaseCart () {
      if (this.prices.count) {
        this.prices.count --
      }
    },
    addCart () {
      if (!this.prices.count) {
        Vue.set(this.prices, 'count', 1)
      } else {
        this.prices.count ++
      }
    }
  }
}
</script>

<style lang="stylus">
.goodsList
  display flex
  width 100%
  height 30px
  padding 5px
  margin 10px 0
  line-height 30px
  .goodsPrice
    flex 1
  .count-wrapper
    flex 0 0 120px
    .icon
      display inline-block
      width 30px
      height 100%
      text-align center
    .icon-add_circle,.icon-remove_circle_outline
      color lightblue
      font-size 24px
      vertical-align middle
    .num
      display inline-block
      width 30px
      border 1px solid #ddd
      border-radius 6px
      font-size 16px
      text-align center
      font-weight 700
      color coral
      vertical-align middle
    

</style>
