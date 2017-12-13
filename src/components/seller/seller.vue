<template>
  <div class="seller">
    <div class="left" ref="menu">
      <ul class='box' >
        <li ref="menuList" :class="{'current':currentIndex === index}" v-for="(item,index) in items" 
        :key="index" class="text" @click="selectFood(index,$event)">{{item.name}}</li>
      </ul>
    </div>
    <div class="right" ref="food">
      <ul class="box2">
        <li v-for="(item2,index) in items" :key="index" class="text2" ref="foodList">
          <h2 class="h2">{{item2.name}}</h2>
          <ul  class="foods">
            <li v-for="(items,index) in item2.food" :key="index">{{items.name1}}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      items: [
        { 'name': '热销榜', 'food': [{ 'name1': '皮蛋瘦肉粥1' }, { 'name1': '红烧肉12' }, { 'name1': '红烧肉124' }, { 'name1': '红烧肉132' }] },
        { 'name': '热销榜2', 'food': [{ 'name1': '皮蛋瘦肉粥2' }, { 'name1': '红烧肉2' }] },
         { 'name': '热销榜3', 'food': [{ 'name1': '皮蛋瘦肉粥3' }, { 'name1': '红烧肉34' }, { 'name1': '红烧肉3234' }, { 'name1': '红烧肉2343' }] },
        { 'name': '热销榜4', 'food': [{ 'name1': '皮蛋瘦肉粥4' }, { 'name1': '红烧肉4' }] },
        { 'name': '热销榜5', 'food': [{ 'name1': '皮蛋瘦肉粥5' }, { 'name1': '红烧肉5' }] },
        { 'name': '热销榜6', 'food': [{ 'name1': '皮蛋瘦肉粥6' }, { 'name1': '红烧肉6' }] },
        { 'name': '热销榜7', 'food': [{ 'name1': '皮蛋瘦肉粥7' }, { 'name1': '红烧肉7' }] },
        { 'name': '热销榜8', 'food': [{ 'name1': '皮蛋瘦肉粥8' }, { 'name1': '红烧肉8' }] },
        { 'name': '热销榜9', 'food': [{ 'name1': '皮蛋瘦肉粥9' }, { 'name1': '红烧肉9' }, { 'name1': '皮蛋瘦肉粥9' }, { 'name1': '红烧肉9' }, { 'name1': '皮蛋瘦肉粥9' }, { 'name1': '红烧肉9' }, { 'name1': '皮蛋瘦肉粥9' }, { 'name1': '红烧肉9' }] }
      ],
      listHeight: [],
      scrollY: 0
    }
  },
  created () {
    this.$nextTick(() => {
      this._initScroll()
      this._caculateHeight()
    })
  },
  methods: {
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menu, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.food, {
        click: true,
        probeType: 3
      })
      this.foodScroll.on('scroll', (pos) => {
        if (pos.y < 0) {
          this.scrollY = Math.abs(Math.round(pos.y))
          console.log(this.scrollY)
          console.log(this.listHeight)
        }
      })
    },
    _caculateHeight () {
      let height = 0
      const itemHeight = this.$refs.foodList
      this.listHeight.push(height)
      for (let i = 0; i < itemHeight.length; i++) {
        height += itemHeight[i].clientHeight
        this.listHeight.push(height)
        console.log(height)
      }
    },
    selectFood (index, event) {
      if (!event._constructed) {
        return
      }
      const foodItem = this.$refs.foodList
      const el = foodItem[index]
      this.foodScroll.scrollToElement(el, 300)
    },
    _followMenu (index) {
      const menuItem = this.$refs.menuList
      const el = menuItem[index]
      this.menuScroll.scrollToElement(el, 100, 0, -150)
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        const height1 = this.listHeight[i]
        const height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          this._followMenu(i)
          return i
        }
      }
      return 0
    }
  }
}
</script>

<style lang="stylus">
.seller
  position absolute
  top 174px
  bottom 46px
  display flex
  width 100%
  background #d9dde1
  overflow hidden
  .left
    flex 0 0 100px
    background coral
    .box
      font-size 14px
      padding 5px 0
      text-align center
      line-height 50px
      .text
        padding 10px
        border-bottom 2px solid #ddd
        color white
        &.current
          background lightblue
          font-weight 700
          color white
  .right
    flex 1
    background lightblue
    .box2
      font-size 14px
      padding 0 5px
      line-height 50px
      .text2
        padding 0 10px
        border-bottom 2px solid #ddd
        .h2
          padding 0 5px
          border-bottom 5px solid #ddd
        .foods
          padding 10px

</style>
