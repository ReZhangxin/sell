<template>
  <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li v-for="(item,index) in goods" :key="index" class="menu-item">
            <span class="text" border-1px>
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul>
          <li v-for="(item,index) in goods" :key="index" class="food-list">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" :key="food" class="food-item">
                <div class="icon">
                  <img :src="food.icon" alt="">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span>月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span>￥{{food.price}}</span>
                    <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: []
    }
  },
  created () {
    this.classMap = ['decress', 'discount', 'guarantee', 'invoice', 'special']
    axios
      .get('/api/goods')
      .then(res => {
        if (res.data.errno === ERR_OK) {
          this.goods = res.data.data
          // console.log(this.goods)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixin'
.goods 
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper 
        flex 0 0 80px
        width 80px
        background #f3f5f7
      .menu-item
        display table
        width 56px
        height 54px
        padding 0 12px
        font-size 12px
        line-height 14px
        .icon
          display inline-block
          width 14px
          height 14px
          margin-right 2px
          background-size 14px 14px
          background-repeat no-repeat
          vertical-align top
          &.decress
            bg-image('decrease_2')
          &.discount
            bg-image('discount_2')
          &.guarantee
            bg-image('guarantee_2')
          &.invoice
            bg-image('invoice_2')
          &.special
            bg-image('special_2')
        .text
          display table-cell
          width 56px
          border-1px(rgba(7,17,27,.1))
          font-size 12px
          vertical-align middle
          line-height 14px
    .foods-wrapper 
        flex 1
    

</style>
