<template>
  <div>
    <ul class="priceList">
      <li class="goodsList"  v-for="(price,index) in prices" :key="price.money">
        <span class="goodsPrice">商品价格为：￥{{price.money}}元</span>
        <div class="count-wrapper">
          <span class="icon" @click="reduceCount"><i class="icon-remove_circle_outline"></i></span>
          <span class="num">{{count}}</span>
          <span class="icon" @click="addCount"><i class="icon-add_circle"></i></span>
        </div>
      </li>
    </ul>
    <div>总价格为：{{total}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      prices: [
        { money: 23 },
        { money: 24 },
        { money: 5 },
        { money: 14 },
        { money: 9 },
        { money: 17 }
      ],
      total: 0,
      count: 0
    }
  },
  methods: {
    addCount () {
      this.count++
    },
    reduceCount: function () {
      this.count--
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
