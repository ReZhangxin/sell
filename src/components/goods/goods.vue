<template>
  <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <!-- 如果当前index与goods中的index相等说明正好对应，就给他添加current样式 -->
          <li v-for="(item,index) in goods" :key="index" class="menu-item" 
          :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)" ref="menuList">
            <span class="text" border-1px>
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodWrapper">
        <ul>
          <li v-for="(item,index) in goods" :key="index" class="food-list" ref="foodList">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="(food,index) in item.foods" :key="index" class="food-item border-1px">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" alt="">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span>月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import shopcart from '@/components/shopcart/shopcart'
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      // 总高度，把所有累加的高度存入这个数组中
      listHeight: [],
      // 定义一个变量，来监听scrolly的高度用来响应左面菜单栏列表的index
      scrollY: 0
    }
  },
  created () {
    this.classMap = ['decress', 'discount', 'guarantee', 'invoice', 'special']
    axios
      .get('/api/goods')
      .then(res => {
        if (res.data.errno === ERR_OK) {
          this.goods = res.data.data
          this.$nextTick(() => {
            this._initScroll()
            // 方法计算food高度
            this._calculateHeight()
          })
        }
      })
  },
  computed: {
    // 表示左侧当前的索引应该在哪
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        // 获得区间上下之间的范围
        const height1 = this.listHeight[i]
        const height2 = this.listHeight[i + 1]
        // 如果当前的scrolly的坐标值也就是pos.y处于height1与height2之间返回当前的i
        // 通过这个i可以映射到左边栏的index
        // !height2 || (...)目的是滚动到最后一个的时候避免返回undefined
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          this._followScroll(i)
          return i
        }
      }
      // 如果没滚动：返回0也就是默认第一个不动~
      return 0
    }
  },
  methods: {
    selectMenu (index, event) {
      // 组织非vue事件
      if (!event._constructed) {
        return
      }
      const foodList = this.$refs.foodList
      const el = foodList[index]
      this.foodScroll.scrollToElement(el, 300)
    },
    // selectFood (food, event) {
    //   if (!event._constructed) {
    //     return
    //   }
    //   this.selectedFood = food
    //   this.$refs.food.show()
    // },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        click: true,
      /**
       * scroll事件：参数：{Object} {x, y} 滚动的实时坐标
       * 默认值为 0，即不派发 scroll 事件
       * 1 滚动的时候会派发scroll事件，会截流（非实时（屏幕滑动超过一定时间后）派发scroll 事件）。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
      */
        probeType: 3
      })
      this.foodScroll.on('scroll', (pos) => {
        // pos.y为：scroll 纵轴坐标。向下滚动是负数要转化为正整数
        if (pos.y <= 0) {
          // 获取scrolly的高度
          this.scrollY = Math.abs(Math.round(pos.y))
        }
      })
    },
    _calculateHeight () {
      // 通过ref配合v-for循环获得一个数组： 包含和循环数据源对应的子组件。
      const foodList = this.$refs.foodList
      // 定义一个临时变量height
      let height = 0
      // 要把获取的高度添加到这个数组中
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        // 获取每一项
        const item = foodList[i]
        // 储存每一项高度，并且累加存入数组中
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    _followScroll (index) {
      const menuList = this.$refs.menuList
      const el = menuList[index]
      this.menuScroll.scrollToElement(el, 100, 0, -100)
    }
  },
  components: {
    shopcart
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
        &.current
          position relative
          z-index 10
          margin-top -1px
          background #fff
          font-weight 700
          .text
            border-none()
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
        .title
          padding-left 14px
          height 26px
          line-height 26px
          border-left 2px solid #d9dde1
          font-size 12px
          color rgb(147,153,159)
          background #f3f5f7
        .food-item
          display flex
          margin 18px
          padding-bottom 18px
          border-1px(rgba(7,17,27,.1))
          &:last-child
            border-none()
            margin-bottom 0
          .icon
            flex 0 0 57px
            margin-right 10px
          .content
            flex 1
            .name
              margin 2px 0 8px 0
              height 14px
              line-height 14px
              font-size 14px
              color rgb(7,17,27)
            .desc,.extra
              line-height 10px
              font-size 10px
              color rgb(147,153,159)
            .desc
              margin-bottom 8px
            .extra
              &.count
                margin-right 12px
            .price
              font-weight 700
              line-height 24px
              .now
                margin-right 8px
                font-size 14px
                color rgb(240,20,20)
              .old
                text-decoration line-through
                font-size 10px
                color rgb(147,153,159)
    

</style>
