<template>
  <div class="seller">
    <div class="left"></div>
    <div class="right" ref="box">
      <ul class="box">
        <li v-for="(item,index) in items" :key="item.id" class="text">{{item.id}}</li>
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
        { id: 'red' },
        { id: 'green' },
        { id: 'orange' },
        { id: 'white' },
        { id: 'black' },
        { id: 'lightblue' },
        { id: 'blue' },
        { id: 'lightgreen' },
        { id: 'lightcoral' },
        { id: 'aqua' },
        { id: 'teal' }
      ]
    }
  },
  created () {
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
    _initScroll () {
      this.scroll = new BScroll(this.$refs.box, {
        probeType: 3
      })
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
    flex 0 0 150px
    background coral
  .right
    flex 1
    background lightblue
    .box
      font-size 14px
      padding 5px
      text-align center
      line-height 50px
      .text
        margin-top 10px
        padding 10px
        border-bottom 2px solid #ddd

</style>
